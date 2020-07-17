import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { shallowEqualArrays } from 'shallow-equal';

import { usePrevious } from '@muya-ui/utils';

import { ITagInputRemoveEvent } from '../Input/types';
import useLocale from '../Locale/useLocale';
import {
  ITreeCheckedKeys,
  ITreeCheckInfo,
  ITreeNodeData,
  ITreeNodeKey,
  ITreeProps,
  ITreeSelectInfo,
} from '../Tree/types';
import {
  conductCheck,
  convertDataToEntities,
  transformTreeData,
  warningWithoutKey,
} from '../Tree/utils';
import { ITriggerProps } from '../Trigger/types';
import { ILabeledValue } from '../types';
import {
  ITreeSelectInputProps,
  ITreeSelectMultiValueType,
  ITreeSelectProps,
  ITreeSelectValueType,
} from './types';
import {
  defaultFilterFunc,
  getCheckedKeysFromValue,
  getFilterTree,
  getValueFromProps,
} from './utils';
import { arrayAdd, arrayDel } from '../utils/array';

export default function useTreeSelect(
  props: ITreeSelectProps,
  nodeRef: RefObject<HTMLDivElement>,
  inputRef: RefObject<HTMLInputElement>,
) {
  const locale = useLocale();
  const {
    // form
    value,
    multiple,
    defaultValue,
    disabled,
    onChange,
    // input
    size = 'm',
    placeholder = locale['TreeSelect.placeholder'],
    showSearch,
    backfill,
    maxVerticalTagCount,
    labelInValue,
    onClear,
    onSelect,
    onDeselect,
    maxTagCount,
    expandIcon,
    // tree
    treeData,
    treeIcon,
    treeExpandIcon,
    treeExpandOnClick,
    treeRenderAfterExpand,
    treeRenderNodeContent,
    filterTreeNode = defaultFilterFunc,
    treeExpandedKeys,
    treeAutoExpandParent,
    treeDefaultExpandedKeys,
    treeDefaultExpandAll,
    showAllChecked,
    onTreeExpand,
    treeCheckStrictly,
    treeCheckable,
    treeScrollable,
    loadData,
    onLoad,
    customKeyName,
    customTitleName,
    customChildrenName,
    // trigger
    popupVisible,
    getPopupContainer,
    onPopupVisibleChange,
    placement,
    styles,
    ...restProps
  } = props;
  const treeWidthRef = useRef<string | number>('auto');

  /**
   * 是否受控
   */
  const isControlled = 'value' in props;
  const isPopupVisibleControlled = 'popupVisible' in props;

  /**
   * Tree 数据
   */
  const [treeDataState, setTreeDataState] = useState(
    transformTreeData(treeData, customKeyName, customTitleName, customChildrenName),
  );

  /**
   * 直接用 key 索引的 treeData 数据
   */
  const [keyEntities, setKeyEntities] = useState(convertDataToEntities(treeDataState).keyEntities);

  /**
   * 搜索框的的内容：
   * 1. 单选且 showSearch 为 true 时，显示搜索框
   * 2. 多选时，显示搜索框
   */
  const [inputValue, setInputValue] = useState('');

  /**
   * 弹出状态，可传入 popupVisible 作为初始值并进行控制
   */
  const [popupVisibleState, setPopupVisibleState] = useState(popupVisible || false);

  /**
   * 选中的值
   */
  const [valueState, setValueState] = useState(getValueFromProps(props));

  const [checkedKeysState, setCheckedKeysState] = useState<ITreeCheckedKeys>(
    getCheckedKeysFromValue(props),
  );

  /**
   * 是否多选，checkable 时自动开启
   */
  const isMultiple = !!(multiple || treeCheckable);

  /**
   * 是否支持搜索，多选默认开启
   */
  const isSearchMode = showSearch || isMultiple;

  /**
   * 上一次的 inputValue
   */
  const prevInputValue = usePrevious(inputValue);
  const prevTreeData = usePrevious(treeData);

  /**
   * 当前值是否存在
   */
  const hasValue =
    (isMultiple && (valueState as ITreeSelectMultiValueType).length > 0) ||
    (!isMultiple && !!valueState[0]);

  /**
   * 第一个选中节点的 entity
   */
  const firstSelectedEntity = useMemo(() => {
    if (valueState && valueState[0]) {
      if (labelInValue) {
        return keyEntities[(valueState[0] as ILabeledValue).value];
      } else {
        return keyEntities[valueState[0] as ITreeNodeKey];
      }
    }
  }, [keyEntities, labelInValue, valueState]);

  const valueKeys = useMemo(() => {
    if (labelInValue) {
      return (valueState as ILabeledValue[]).map(item => item.value);
    } else {
      return valueState as ITreeNodeKey[];
    }
  }, [labelInValue, valueState]);

  const filterTreeData = useMemo(() => {
    return getFilterTree(treeDataState, inputValue, filterTreeNode);
  }, [filterTreeNode, inputValue, treeDataState]);

  const showEmptyView = filterTreeData.length === 0;

  /**
   * 单选
   * 非搜索模式：统一清空
   * 搜索模式：
   * - backfill 为 true，如果有选中的则设置为选中的，否则清空
   * - backfill 为 false，清空
   */
  const resetInputValue = () => {
    if (!multiple && showSearch && backfill) {
      if (firstSelectedEntity) {
        const title = firstSelectedEntity.node.title;
        setInputValue(`${title}`);
      } else {
        setInputValue('');
      }
    } else {
      setInputValue('');
    }
  };

  const focusInput = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  /**
   * 修改 popup 状态，内部使用
   */
  const handlePopupVisibleChange = (popupVisible: boolean) => {
    if (!isPopupVisibleControlled) {
      setPopupVisibleState(popupVisible);
    }
    if (onPopupVisibleChange) {
      onPopupVisibleChange(popupVisible);
    }
    // 动态调整下拉菜单的宽度
    if (nodeRef.current && nodeRef.current.offsetWidth !== treeWidthRef.current && popupVisible) {
      treeWidthRef.current = nodeRef.current.offsetWidth;
    }
  };

  /**
   * popup 动画退出时，清空 input
   */
  const handlePopupExited = () => {
    resetInputValue();
  };

  const getLabeledValue = (value: ITreeNodeKey[]) => {
    return value.map(key => {
      if (keyEntities[key]) {
        return {
          label: keyEntities[key].node.title,
          value: key,
        };
      } else {
        return {
          label: key,
          value: key,
        };
      }
    });
  };

  /**
   * value 变化回调
   */
  const handleChange = (
    value: ITreeSelectValueType,
    visible: boolean,
    info?: ITreeSelectInfo | ITreeCheckInfo,
  ) => {
    if (onChange) {
      onChange(value, info);
    }
    // 单选需要关闭
    handlePopupVisibleChange(visible);
  };

  const triggerChange = (selectedKeys: ITreeNodeKey[], info: ITreeSelectInfo | ITreeCheckInfo) => {
    if (isMultiple) {
      if (typeof maxTagCount === 'undefined' || Object.keys(valueState).length < maxTagCount) {
        if (labelInValue) {
          handleChange(getLabeledValue(selectedKeys), true, info);
        } else {
          handleChange(selectedKeys, true, info);
        }
        setInputValue('');
      }
    } else {
      if (labelInValue) {
        handleChange(
          {
            label: info.data.title,
            value: selectedKeys[0],
          },
          false,
          info,
        );
      } else {
        handleChange(selectedKeys[0], false, info);
      }
    }
  };

  /**
   * 清空输入框
   */
  const handleClear = (e: React.MouseEvent) => {
    setInputValue('');
    if (isMultiple) {
      handleChange([], false);
    } else {
      handleChange(undefined, false);
    }
    if (treeCheckable) {
      setCheckedKeysState([]);
    }
    if (!isControlled) {
      setValueState([]);
    }
    if (onClear) {
      onClear(e);
    }
  };

  /**
   * 输入框输入文本
   */
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  /**
   * 选择
   */
  const handleSelect = (selectedKeys: ITreeNodeKey[], info: ITreeSelectInfo) => {
    focusInput();
    if (info.data.disabled && info.nativeEvent) {
      info.nativeEvent.stopPropagation();
      return;
    }
    triggerChange(selectedKeys, info);
    if (!isControlled && selectedKeys) {
      if (labelInValue) {
        setValueState(getLabeledValue(selectedKeys));
      } else {
        setValueState(selectedKeys);
      }
    }
    if (info.selected && onSelect) {
      onSelect(selectedKeys, info);
    } else if (!info.selected && onDeselect) {
      onDeselect(selectedKeys, info);
    }
  };

  const removeCheckKey = (nodeKey: ITreeNodeKey) => {
    let oriCheckedKeys: ITreeNodeKey[] = [];
    let oriHalfCheckedKeys: ITreeNodeKey[] = [];
    if (Array.isArray(checkedKeysState)) {
      oriCheckedKeys = checkedKeysState;
    } else {
      oriCheckedKeys = checkedKeysState.checked;
      oriHalfCheckedKeys = checkedKeysState.halfChecked;
    }
    const targetChecked = false;
    let checkedObj;
    if (treeCheckStrictly) {
      const newCheckedKeys = targetChecked
        ? arrayAdd(oriCheckedKeys, nodeKey)
        : arrayDel(oriCheckedKeys, nodeKey);
      const newHalfCheckedKeys = arrayDel(oriHalfCheckedKeys, nodeKey);
      checkedObj = { checked: newCheckedKeys, halfChecked: newHalfCheckedKeys };
    } else {
      const { checkedKeys: newCheckedKeys, halfCheckedKeys: newHalfCheckedKeys } = conductCheck(
        [nodeKey],
        targetChecked,
        keyEntities,
        {
          checkedKeys: oriCheckedKeys,
          halfCheckedKeys: oriHalfCheckedKeys,
        },
      );
      checkedObj = { checked: newCheckedKeys, halfChecked: newHalfCheckedKeys };
      newCheckedKeys.forEach(checkedKey => {
        const entity = keyEntities[checkedKey];
        if (!entity) return;
      });
    }
    setCheckedKeysState(checkedObj);
  };

  const handleDeselect = (nodeKey: ITreeNodeKey, e: ITagInputRemoveEvent) => {
    e.stopPropagation();
    focusInput();
    const newKeys = valueKeys.filter(key => key !== nodeKey);
    if (isMultiple) {
      if (labelInValue) {
        handleChange(getLabeledValue(newKeys), true);
      } else {
        handleChange(newKeys, true);
      }
      setInputValue('');
    } else {
      handleChange(undefined, false);
    }
    if (treeCheckable) {
      removeCheckKey(nodeKey);
    }
    if (!isControlled && newKeys) {
      if (labelInValue) {
        setValueState(getLabeledValue(newKeys));
      } else {
        setValueState(newKeys);
      }
    }
    if (onDeselect) {
      onDeselect(newKeys);
    }
  };

  /** 如果父节点选中了，那么过滤掉子节点 */
  const filterChildCheckedKeys = (key: ITreeNodeKey, index: number, keys: ITreeNodeKey[]) => {
    const entity = keyEntities[key];
    if (entity && entity.parent) {
      const parentKey = entity.parent.key;
      if (keys.indexOf(parentKey) > -1) {
        return false;
      }
    }
    return true;
  };

  const handleCheck = (checkedKeys: ITreeCheckedKeys, info: ITreeCheckInfo) => {
    setCheckedKeysState(checkedKeys);
    let newKeys: ITreeNodeKey[] = [];
    if (showAllChecked || treeCheckStrictly) {
      if (Array.isArray(checkedKeys)) {
        newKeys = checkedKeys;
      } else {
        newKeys = checkedKeys.checked;
      }
    } else {
      if (Array.isArray(checkedKeys)) {
        newKeys = checkedKeys.filter(filterChildCheckedKeys);
      } else {
        newKeys = checkedKeys.checked.filter(filterChildCheckedKeys);
      }
    }
    if (!isControlled) {
      if (labelInValue) {
        setValueState(getLabeledValue(newKeys));
      } else {
        setValueState(newKeys);
      }
    }
    triggerChange(newKeys, info);
    if (info.checked && onSelect) {
      onSelect(newKeys, info);
    } else if (!info.checked && onDeselect) {
      onDeselect(newKeys, info);
    }
  };

  const getTriggerProps = (): Partial<ITriggerProps> => {
    return {
      ...restProps,
      container: getPopupContainer,
      placement,
      triggerAction: 'click',
      open: disabled ? false : popupVisibleState,
      onVisibleChange: handlePopupVisibleChange,
      transitionProps: {
        onExited: handlePopupExited,
      },
      hideArrow: true,
      disabled,
    };
  };

  const getInputProps = () => {
    const inputProps: ITreeSelectInputProps = {
      size,
      disabled,
      placeholder,
      showSearch: showSearch!,
      inputValue,
      popupVisible: popupVisibleState,
      value: valueKeys,
      treeKeyEntities: keyEntities,
      multiple: isMultiple!,
      hasValue,
      isSearchMode,
      backfill: backfill!,
      maxVerticalTagCount: maxVerticalTagCount!,
      onClear: handleClear,
      onInputChange: handleInputChange,
      onDeselect: handleDeselect,
      labelInValue: labelInValue!,
      expandIcon,
    };
    return inputProps;
  };

  const getTreeProps = () => {
    const treeCheckOnClick = treeCheckable;
    const treeSelectable = !treeCheckable;
    const treeProps: ITreeProps = {
      size,
      icon: treeIcon,
      expandIcon: treeExpandIcon,
      expandOnClick: treeExpandOnClick,
      checkOnClick: treeCheckOnClick,
      renderAfterExpand: treeRenderAfterExpand,
      multiple,
      data: filterTreeData,
      autoExpandParent: treeAutoExpandParent,
      defaultExpandAll: treeDefaultExpandAll,
      onExpand: onTreeExpand,
      checkable: treeCheckable,
      checkStrictly: treeCheckStrictly,
      selectable: treeSelectable,
      scrollable: treeScrollable,
      loadData,
      onLoad,
    };
    if (isSearchMode && inputValue) {
      treeProps.defaultExpandAll = true;
    }
    if (treeDefaultExpandedKeys) {
      treeProps.defaultExpandedKeys = treeDefaultExpandedKeys;
    }
    if (treeExpandedKeys) {
      treeProps.expandedKeys = treeExpandedKeys;
    }
    if (treeCheckable) {
      treeProps.checkedKeys = checkedKeysState;
      treeProps.onCheck = handleCheck;
    } else {
      treeProps.selectedKeys = valueKeys;
      treeProps.onSelect = handleSelect;
    }
    return treeProps;
  };

  useEffect(() => {
    let newTreeDataState: ITreeNodeData[] | null = null;
    if (prevTreeData !== treeData) {
      newTreeDataState = transformTreeData(
        treeData,
        customKeyName,
        customTitleName,
        customChildrenName,
      );
      setTreeDataState(newTreeDataState);
    }
    if (newTreeDataState) {
      const entitiesMap = convertDataToEntities(newTreeDataState);
      let newKeyEntities = entitiesMap.keyEntities;
      setKeyEntities(newKeyEntities);
      if (process.env.NODE_ENV !== 'production') {
        warningWithoutKey(newTreeDataState);
      }
    }
  }, [
    treeData,
    treeDataState,
    keyEntities,
    prevTreeData,
    customKeyName,
    customTitleName,
    customChildrenName,
  ]);

  useEffect(() => {
    if (multiple && !popupVisibleState && inputValue !== prevInputValue && inputValue) {
      handlePopupVisibleChange(true);
    }
  });

  useEffect(() => {
    if (isControlled) {
      const newValueState = getValueFromProps(props);
      if (!shallowEqualArrays(valueState, newValueState)) {
        // value 改变时同步更新 checked 状态
        if (treeCheckable) {
          const newCheckedKeysState = getCheckedKeysFromValue(props);
          if (
            (Array.isArray(checkedKeysState) &&
              !shallowEqualArrays(checkedKeysState, newCheckedKeysState)) ||
            (!Array.isArray(checkedKeysState) &&
              !shallowEqualArrays(checkedKeysState.checked, newCheckedKeysState))
          ) {
            setCheckedKeysState(newCheckedKeysState);
          }
        }
        setValueState(newValueState);
      }
    }

    if (isPopupVisibleControlled && popupVisible !== popupVisibleState) {
      setPopupVisibleState(popupVisible!);
    }
  }, [
    popupVisible,
    popupVisibleState,
    valueState,
    props,
    treeCheckable,
    checkedKeysState,
    isControlled,
    isPopupVisibleControlled,
  ]);

  return {
    getTriggerProps,
    getInputProps,
    getTreeProps,
    treeWidthRef,
    isSearchMode,
    inputValue,
    showEmptyView,
    noResultText: locale['TreeSelect.noResultText'],
  };
}
