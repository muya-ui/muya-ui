import deepmerge from 'deepmerge';
import warning from 'warning';

import { ITreeContextValue, ITreeNodeDataEntity } from './innerTypes';
import {
  ITreeNodeData,
  ITreeNodeEventData,
  ITreeNodeKey,
  ITreeNodeState,
  ITreeProps,
} from './types';

const DRAG_SIDE_RANGE = 0.15;
const DRAG_MIN_GAP = 2;

interface IConductReturnType {
  checkedKeys: ITreeNodeKey[];
  halfCheckedKeys: ITreeNodeKey[];
}

interface IWrapper<T> {
  posEntities: Record<string, ITreeNodeDataEntity<T>>;
  keyEntities: Record<ITreeNodeKey, ITreeNodeDataEntity<T>>;
}
interface IEntityHandlers<T> {
  initWrapper?: (wrapper: IWrapper<T>) => IWrapper<T>;
  processEntity?: (entity: ITreeNodeDataEntity<T>, wrapper: IWrapper<T>) => void;
  onProcessFinished?: (wrapper: IWrapper<T>) => void;
}

export function isCheckDisabled(node: ITreeNodeData) {
  const { disabled, disableCheckbox, checkable } = (node || {}) as ITreeNodeData;
  return !!(disabled || disableCheckbox) || checkable === false;
}

export function getPosition(level: string | number, index: number) {
  return `${level}-${index}`;
}

/**
 * 检测 key 存在和重复
 * @param treeData
 */
export function warningWithoutKey(treeData: ITreeNodeData[] = []) {
  const keys: Record<string, boolean> = {};
  function dfs(list: ITreeNodeData[], path: string = '') {
    (list || []).forEach(treeNode => {
      const { key, children = [] } = treeNode;
      warning(key !== undefined, `[Tree]: TreeNode must have a certain key: [${path}${key}]`);
      const recordKey = String(key);
      warning(
        !keys[recordKey] || typeof key === 'undefined',
        `[Tree]: Same 'key' exist in the Tree: ${recordKey}`,
      );
      keys[recordKey] = true;
      dfs(children, `${path}${recordKey} > `);
    });
  }
  dfs(treeData);
}

/**
 * 遍历 tree
 * @param dataNodes
 * @param callback
 */
export function traverseDataNodes<T extends ITreeNodeData>(
  dataNodes: T[],
  callback: (data: {
    node: T;
    index: number;
    pos: string;
    key: ITreeNodeKey;
    parentPos: string | number;
    level: number;
  }) => void,
) {
  function dfs(
    node: T | null,
    index?: number,
    parent?: { node: T | null; pos: string; level: number },
  ) {
    const children = node ? (node.children as T[]) : dataNodes;
    const pos = node ? getPosition(parent!.pos, index!) : '0';
    if (node) {
      const data = {
        node,
        index: index!,
        pos,
        key: typeof node.key !== 'undefined' ? node.key : pos,
        parentPos: parent!.pos,
        level: parent!.level + 1,
      };
      callback(data);
    }
    if (children) {
      children.forEach((subNode, subIndex) => {
        dfs(subNode, subIndex, {
          node,
          pos,
          level: parent ? parent.level + 1 : -1,
        });
      });
    }
  }
  dfs(null);
}

/**
 * Convert `treeData` into entity records.
 */
export function convertDataToEntities<T>(dataNodes: T[], entityHandlers: IEntityHandlers<T> = {}) {
  const posEntities: Record<string, ITreeNodeDataEntity<T>> = {};
  const keyEntities: Record<ITreeNodeKey, ITreeNodeDataEntity<T>> = {};
  let wrapper: IWrapper<T> = {
    posEntities,
    keyEntities,
  };

  if (entityHandlers.initWrapper) {
    wrapper = entityHandlers.initWrapper(wrapper) || wrapper;
  }

  traverseDataNodes(dataNodes, item => {
    const { node, index, pos, key, parentPos, level } = item;
    const entity: ITreeNodeDataEntity<T> = { node, index, key, pos, level };

    posEntities[pos] = entity;
    keyEntities[key] = entity;

    entity.parent = posEntities[parentPos];
    if (entity.parent) {
      entity.parent.children = entity.parent.children || [];
      entity.parent.children.push(entity);
    }

    if (entityHandlers.processEntity) {
      entityHandlers.processEntity(entity, wrapper);
    }
  });

  if (entityHandlers.onProcessFinished) {
    entityHandlers.onProcessFinished(wrapper);
  }

  return wrapper;
}

/**
 * Return selectedKeys according with multiple prop
 * @param selectedKeys
 * @param props
 * @returns [string]
 */
export function calcSelectedKeys(selectedKeys: ITreeNodeKey[], multiple: boolean) {
  if (!selectedKeys) return undefined;
  if (multiple) {
    return selectedKeys.slice();
  }
  if (selectedKeys.length) {
    return [selectedKeys[0]];
  }
  return selectedKeys;
}

/**
 * If user use `autoExpandParent` we should get the list of parent node
 * @param keyList
 * @param keyEntities
 */
export function conductExpandParent(
  keyList: ITreeNodeKey[],
  keyEntities: Record<ITreeNodeKey, ITreeNodeDataEntity>,
) {
  const expandedKeys: Record<ITreeNodeKey, boolean> = {};

  function conductUp(key: ITreeNodeKey) {
    if (expandedKeys[key]) return;
    const entity = keyEntities[key];
    if (!entity) return;
    expandedKeys[key] = true;
    const { parent, node } = entity;
    if (node.disabled) return;
    if (parent) {
      conductUp(parent.key);
    }
  }

  (keyList || []).forEach(key => {
    conductUp(key);
  });

  return Object.keys(expandedKeys).map(key => keyEntities[key].key);
}

/**
 * Parse `checkedKeys` to { checkedKeys, halfCheckedKeys } style
 */
export function parseCheckedKeys(
  keys: ITreeNodeKey[] | { checked: ITreeNodeKey[]; halfChecked: ITreeNodeKey[] },
) {
  if (!keys) {
    return null;
  }
  let keyProps;
  if (Array.isArray(keys)) {
    keyProps = {
      checkedKeys: keys,
      halfCheckedKeys: [],
    };
  } else if (typeof keys === 'object') {
    keyProps = {
      checkedKeys: keys.checked || [],
      halfCheckedKeys: keys.halfChecked || [],
    };
  } else {
    warning(false, '[Tree]: `checkedKeys` is not an array or an object');
    return null;
  }
  return keyProps;
}

/**
 * Conduct with keys.
 * @param keyList current key list
 * @param keyEntities key - dataEntity map
 * @param mode `fill` to fill missing key, `clean` to remove useless key
 */
export function conductCheck(
  keyList: ITreeNodeKey[],
  checked: boolean,
  keyEntities: Record<ITreeNodeKey, ITreeNodeDataEntity>,
  checkStatus: { checkedKeys?: ITreeNodeKey[]; halfCheckedKeys?: ITreeNodeKey[] } = {},
): IConductReturnType {
  const checkedKeys: Record<ITreeNodeKey, boolean> = {};
  const halfCheckedKeys: Record<ITreeNodeKey, boolean> = {};

  (checkStatus.checkedKeys || []).forEach(key => {
    checkedKeys[key] = true;
  });

  (checkStatus.halfCheckedKeys || []).forEach(key => {
    halfCheckedKeys[key] = true;
  });

  // Conduct up
  function conductUp(key: ITreeNodeKey) {
    if (checkedKeys[key] === checked) return;

    const entity = keyEntities[key];
    if (!entity) return;

    const { children, parent, node } = entity;

    if (isCheckDisabled(node)) return;

    // Check child node checked status
    let everyChildChecked = true;
    let someChildChecked = false; // Child checked or half checked

    (children || [])
      .filter(child => !isCheckDisabled(child.node))
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
  function conductDown(key: ITreeNodeKey) {
    if (checkedKeys[key] === checked) return;

    const entity = keyEntities[key];
    if (!entity) return;

    const { children, node } = entity;

    if (isCheckDisabled(node)) return;

    checkedKeys[key] = checked;

    (children || []).forEach(child => {
      conductDown(child.key);
    });
  }

  function conduct(key: ITreeNodeKey) {
    const entity = keyEntities[key];

    if (!entity) {
      warning(false, `[Tree]: '${key}' does not exist in the tree.`);
      return;
    }

    const { children, parent, node } = entity;
    checkedKeys[key] = checked;

    if (isCheckDisabled(node)) return;

    // Conduct down
    (children || [])
      .filter(child => !isCheckDisabled(child.node))
      .forEach(child => {
        conductDown(child.key);
      });

    // Conduct up
    if (parent) {
      conductUp(parent.key);
    }
  }

  (keyList || []).forEach(key => {
    conduct(key);
  });

  const checkedKeyList: ITreeNodeKey[] = [];
  const halfCheckedKeyList: ITreeNodeKey[] = [];

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
    checkedKeys: checkedKeyList,
    halfCheckedKeys: halfCheckedKeyList,
  };
}

export function getDragNodesKeys(
  dragNodeKey: ITreeNodeKey,
  keyEntities: Record<ITreeNodeKey, ITreeNodeDataEntity>,
): ITreeNodeKey[] {
  const dragNodesKeys = [dragNodeKey];
  const entity = keyEntities[dragNodeKey];
  function dfs(list: ITreeNodeDataEntity[] = []) {
    list.forEach(({ key, children }) => {
      dragNodesKeys.push(key);
      dfs(children);
    });
  }
  dfs(entity.children);
  return dragNodesKeys;
}

export function posToArray(pos: string) {
  return pos.split('-');
}

export function calcDropPosition(event: React.MouseEvent, treeNode: ITreeNodeEventData) {
  const { clientY } = event;
  const { top, bottom, height } = treeNode.nodeRef.current!.getBoundingClientRect();
  const des = Math.max(height * DRAG_SIDE_RANGE, DRAG_MIN_GAP);
  if (clientY <= top + des) {
    return -1;
  }
  if (clientY >= bottom - des) {
    return 1;
  }
  return 0;
}

export function getTreeNodeState<T>(
  key: ITreeNodeKey,
  {
    expandedKeys,
    selectedKeys,
    loadedKeys,
    loadingKeys,
    checkedKeys,
    halfCheckedKeys,
    dragOverNodeKey,
    dropPosition,
    keyEntities,
  }: ITreeContextValue<T>,
): ITreeNodeState {
  const entity = keyEntities[key];
  const treeNodeState = {
    expanded: expandedKeys.indexOf(key) !== -1,
    selected: selectedKeys.indexOf(key) !== -1,
    loaded: loadedKeys.indexOf(key) !== -1,
    loading: loadingKeys.indexOf(key) !== -1,
    checked: checkedKeys.indexOf(key) !== -1,
    halfChecked: halfCheckedKeys.indexOf(key) !== -1,
    pos: String(entity ? entity.pos : ''),
    dragOver: dragOverNodeKey === key && dropPosition === 0,
    dragOverGapTop: dragOverNodeKey === key && dropPosition === -1,
    dragOverGapBottom: dragOverNodeKey === key && dropPosition === 1,
    hovering: false,
  };
  return treeNodeState;
}

export const getInitExpandedKeys = <T>(
  props: ITreeProps<T>,
  keyEntities: Record<ITreeNodeKey, ITreeNodeDataEntity>,
) => {
  const expandedKeys =
    ('expandedKeys' in props ? props.expandedKeys : props.defaultExpandedKeys) || [];
  if (props.defaultExpandAll) {
    return Object.keys(keyEntities).map(key => keyEntities[key].key);
  } else if (props.defaultExpandedKeys) {
    return props.autoExpandParent ? conductExpandParent(expandedKeys, keyEntities) : expandedKeys;
  }
  return expandedKeys;
};

export const getInitCheckedKeys = <T>(
  props: ITreeProps<T>,
  keyEntities: Record<ITreeNodeKey, ITreeNodeDataEntity>,
) => {
  const checkedKeysProp =
    ('checkedKeys' in props ? props.checkedKeys : props.defaultCheckedKeys) || [];
  let checkedKeyEntity = parseCheckedKeys(checkedKeysProp) || {
    checkedKeys: [],
    halfCheckedKeys: [],
  };
  let { checkedKeys = [], halfCheckedKeys = [] } = checkedKeyEntity;
  if (!props.checkStrictly) {
    ({ checkedKeys, halfCheckedKeys } = conductCheck(checkedKeys, true, keyEntities));
  }
  return {
    checkedKeys,
    halfCheckedKeys,
  };
};

export function transformTreeData<T extends ITreeNodeData>(
  dataNodes: T[],
  keyName?: string,
  titleName?: string,
  childrenName?: string,
) {
  const data: T[] = deepmerge([], dataNodes);
  function dfs(node: T | null) {
    const children: T[] = node ? node[childrenName || 'children'] : data;
    if (node) {
      if (keyName && typeof node[keyName] !== 'undefined') {
        node.key = node[keyName];
      }
      if (typeof node.key === 'undefined') {
        warning(false, '[Tree]: node does not exist key.');
      }
      if (titleName && node[titleName]) {
        node.title = node[titleName];
      }
      if (childrenName && node[childrenName]) {
        node.children = node[childrenName];
      }
    }
    if (children) {
      children.forEach(subNode => {
        dfs(subNode);
      });
    }
  }
  dfs(null);
  return data;
}
