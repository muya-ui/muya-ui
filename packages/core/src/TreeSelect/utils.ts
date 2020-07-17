import deepmerge from 'deepmerge';

import { ITreeNodeData, ITreeNodeKey } from '../Tree/types';
import { ITreeSelectMultiValueType, ITreeSelectProps, ITreeSelectValueType } from './types';

export const toArray = (value?: ITreeSelectValueType): ITreeSelectMultiValueType => {
  let ret: ITreeSelectMultiValueType = [];
  if (typeof value === 'undefined') {
    ret = [];
  } else if (!Array.isArray(value)) {
    ret = [value];
  } else {
    ret = value;
  }
  return ret;
};

export const getValueFromProps = (
  props: Pick<ITreeSelectProps, 'value' | 'defaultValue' | 'labelInValue'>,
): ITreeSelectMultiValueType => {
  let value: ITreeSelectMultiValueType = [];
  if ('value' in props) {
    value = toArray(props.value);
  } else if ('defaultValue' in props) {
    value = toArray(props.defaultValue);
  }
  return value;
};

export const getCheckedKeysFromValue = (
  props: Pick<ITreeSelectProps, 'value' | 'defaultValue' | 'labelInValue'>,
): ITreeNodeKey[] => {
  return getValueFromProps(props).map(item => {
    if (item && typeof item === 'object') {
      return item.value;
    } else {
      return item;
    }
  });
};

export function defaultFilterFunc(searchValue: string, node: ITreeNodeData) {
  let match = false;
  if (searchValue) {
    if (`${node.key}`.indexOf(searchValue) > -1 || `${node.title}`.indexOf(searchValue) > -1) {
      match = true;
    }
  }
  return match;
}

export function getFilterTree(
  treeNodes: ITreeNodeData[],
  searchValue: string,
  filterFunc: (searchValue: string, node: ITreeNodeData) => boolean,
) {
  if (!searchValue) {
    return treeNodes;
  }
  function mapFilteredNodeToData(node: ITreeNodeData) {
    if (!node) return null;
    let match = false;
    if (filterFunc(searchValue, node)) {
      match = true;
    }
    let children: ITreeNodeData[] = [];
    if (node.children) {
      children = node.children.map(mapFilteredNodeToData).filter(n => n) as ITreeNodeData[];
    }
    if (children.length || match) {
      return deepmerge({}, { ...node, children });
    }
    return null;
  }
  return treeNodes.map(mapFilteredNodeToData).filter(node => node) as ITreeNodeData[];
}
