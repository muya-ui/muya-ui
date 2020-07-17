import { omit } from 'lodash';
import warning from 'warning';

import {
  ICascaderDataEntity,
  ICascaderDisplayRender,
  ICascaderOptionType,
  ICascaderValueType,
  IFilledFieldNamesType,
} from './types';

/**
 * 默认的展示规则
 */
export const defaultDisplayRender: ICascaderDisplayRender = (labels: ICascaderValueType[]) =>
  labels.join('/');

/**
 * 从 value 获取激活态的 value
 */
export const getActiveStateFromValue = (
  value: ICascaderValueType[] | ICascaderValueType[][],
  multiple: boolean,
) => {
  if (multiple && value.length > 0) {
    return value[0] as ICascaderValueType[];
  } else {
    return value as ICascaderValueType[];
  }
};

/**
 * 遍历 options
 */
export function traverseOptions(
  options: ICascaderOptionType[],
  fieldNames: IFilledFieldNamesType,
  callback: (data: {
    node: ICascaderOptionType;
    index: number;
    key: ICascaderValueType;
    keyPath: ICascaderValueType[];
    pos: string;
    parentPos: string;
    level: number;
  }) => void,
) {
  function dfs(
    node: ICascaderOptionType,
    index: number,
    parent: {
      node: ICascaderOptionType | null;
      pos: string;
      keyPath: ICascaderValueType[];
      level: number;
    },
  ) {
    const { children } = node;
    const pos = `${parent.pos}-${index}`;
    const key = typeof node[fieldNames.value] !== 'undefined' ? node[fieldNames.value] : pos;
    const data = {
      node,
      index,
      pos,
      key,
      parentPos: parent.pos,
      level: parent.level + 1,
      keyPath: parent.keyPath.concat([key]),
    };
    callback(data);
    if (Array.isArray(children) && children.length > 0) {
      children.forEach((subNode, subIndex) => {
        dfs(subNode, subIndex, data);
      });
    }
  }
  const parent = {
    node: null,
    pos: '0',
    keyPath: [],
    level: -1,
  };
  for (let [index, item] of options.entries()) {
    dfs(item, index, parent);
  }
}

/**
 * 遍历 options 生成 key 和 pos 的索引结构
 */
export function getEntityDataFromOptions(
  options: ICascaderOptionType[],
  fieldNames: IFilledFieldNamesType,
) {
  const posEntities: Record<string, ICascaderDataEntity> = {};
  const keyEntities: Record<ICascaderValueType, ICascaderDataEntity> = {};
  let wrapper = {
    posEntities,
    keyEntities,
  };
  traverseOptions(options, fieldNames, item => {
    const { parentPos, pos, key } = item;
    const entity: ICascaderDataEntity = omit(item, 'parentPos');
    posEntities[pos] = entity;
    keyEntities[key] = entity;
    entity.parent = posEntities[parentPos];
    if (entity.parent) {
      entity.parent.children = entity.parent.children || [];
      entity.parent.children.push(entity);
    }
  });
  return wrapper;
}

/**
 * 根据之前的选中状态计算选中或者取消选中部分 key 后新的状态
 * @param keyList 需要改变的 key 列表
 * @param checked 改变为 true 还是 false
 * @param keyEntities key 索引的 option 数据
 * @param checkStatus 之前的选中状态
 */
export const calcCheckedKeys = (
  keyList: ICascaderValueType[] | ICascaderValueType[][],
  checked: boolean,
  checkStrictly: boolean,
  keyEntities: Record<ICascaderValueType, ICascaderDataEntity>,
  checkStatus: { checked?: ICascaderValueType[]; halfChecked?: ICascaderValueType[] } = {},
) => {
  const checkedKeys: Record<ICascaderValueType, boolean> = {};
  const halfCheckedKeys: Record<ICascaderValueType, boolean> = {};

  (checkStatus.checked || []).forEach(key => {
    checkedKeys[key] = true;
  });

  (checkStatus.halfChecked || []).forEach(key => {
    halfCheckedKeys[key] = true;
  });

  // Conduct up
  function conductUp(key: ICascaderValueType) {
    if ((checked && checkedKeys[key]) || (!checked && !checkedKeys[key] && !halfCheckedKeys[key]))
      return;
    const entity = keyEntities[key];
    if (!entity) return;
    const { children, parent, node } = entity;
    if (node.disabled) return;
    // Check child node checked status
    let everyChildChecked = true;
    let someChildChecked = false; // Child checked or half checked
    (children || [])
      .filter(child => !child.node.disabled)
      .forEach(({ key: childKey }) => {
        const childChecked = checkedKeys[childKey];
        const childHalfChecked = halfCheckedKeys[childKey];
        if (childChecked || childHalfChecked) someChildChecked = true;
        if (!childChecked) everyChildChecked = false;
      });
    // Update checked status
    if (checked) {
      checkedKeys[key] = everyChildChecked;
    } else {
      checkedKeys[key] = false;
    }
    halfCheckedKeys[key] = someChildChecked;
    if (parent) {
      conductUp(parent.key);
    }
  }

  // Conduct down
  function conductDown(key: ICascaderValueType) {
    if (checkedKeys[key] === checked) return;
    const entity = keyEntities[key];
    if (!entity) return;
    const { children, node } = entity;
    if (node.disabled) return;
    checkedKeys[key] = checked;
    (children || []).forEach(child => {
      conductDown(child.key);
    });
  }

  function conduct(key: ICascaderValueType) {
    const entity = keyEntities[key];

    if (!entity) {
      warning(false, `[Cascader]: '${key}' does not exist in the cascader.`);
      return;
    }

    const { children, parent, node } = entity;
    checkedKeys[key] = checked;

    if (node.disabled) return;

    // Conduct down
    (children || [])
      .filter(child => !child.node.disabled)
      .forEach(child => {
        conductDown(child.key);
      });

    // Conduct up
    if (parent) {
      conductUp(parent.key);
    }
  }

  (keyList || []).forEach((key: ICascaderValueType | ICascaderValueType[]) => {
    if (checkStrictly) {
      if (Array.isArray(key)) {
        checkedKeys[key[key.length - 1]] = checked;
      } else {
        checkedKeys[key] = checked;
      }
    } else {
      if (Array.isArray(key)) {
        conduct(key[key.length - 1]);
      } else {
        conduct(key);
      }
    }
  });

  const checkedKeyList: ICascaderValueType[] = [];
  const halfCheckedKeyList: ICascaderValueType[] = [];

  // Fill checked list
  Object.keys(checkedKeys).forEach(key => {
    if (checkedKeys[key]) {
      checkedKeyList.push(keyEntities[key].key);
    }
  });

  // Fill half checked list
  Object.keys(halfCheckedKeys).forEach(key => {
    if (!checkedKeys[key] && halfCheckedKeys[key]) {
      halfCheckedKeyList.push(keyEntities[key].key);
    }
  });

  return {
    checked: checkedKeyList,
    halfChecked: halfCheckedKeyList,
  };
};

export const diffValue = (
  newValue: ICascaderValueType[] | ICascaderValueType[][],
  oldValue: ICascaderValueType[] | ICascaderValueType[][],
) => {
  if (newValue.length !== oldValue.length) {
    return false;
  } else {
    return newValue.every((nv: ICascaderValueType | ICascaderValueType[]) => {
      if (Array.isArray(nv)) {
        const nvStr = nv.join('-');
        return (
          oldValue.findIndex((ov: ICascaderValueType | ICascaderValueType[]) => {
            if (Array.isArray(ov)) {
              return ov.join('-') === nvStr;
            } else {
              return ov === nvStr;
            }
          }) > -1
        );
      } else {
        return (
          oldValue.findIndex((ov: ICascaderValueType | ICascaderValueType[]) => ov === nv) > -1
        );
      }
    });
  }
};

export function findOption(
  options: ICascaderOptionType[],
  value: ICascaderValueType,
  fieldNames: IFilledFieldNamesType,
): ICascaderOptionType | undefined {
  for (const option of options) {
    if (option[fieldNames.value] === value) {
      return option;
    }
    if (Array.isArray(option[fieldNames.children])) {
      const result = findOption(option[fieldNames.children], value, fieldNames);
      if (result) {
        return result;
      }
    }
  }
}
