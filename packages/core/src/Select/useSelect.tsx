import { usePrevious, useEventCallback } from '@muya-ui/utils';

import { RefObject, useEffect, useMemo, useRef, useState, useCallback } from 'react';

import { shallowEqualArrays, shallowEqualObjects } from 'shallow-equal';

import { get } from 'lodash';

import { ILabeledValue } from '../types';
import { KeyCode } from '../utils/keyCode';

import {
  ISelectDeselectTriggerEvent,
  ISelectMultiValueType,
  ISelectOptionState,
  ISelectProps,
  ISelectSelectTriggerEvent,
  ISelectValueType,
} from './types';
import { getOptionsFromChildren, getValueFromProps } from './utils';

export default function useSelect(
  props: ISelectProps,
  nodeRef: RefObject<HTMLDivElement>,
  inputRef: RefObject<HTMLInputElement>,
  menuRef: RefObject<HTMLDivElement>,
  firstSelectedItemRef: RefObject<HTMLDivElement>,
) {
  const {
    mode = 'default',
    popupVisible,
    labelInValue = false,
    maxTagCount,
    children,
    filterOption = true,
    showSearch = false,
    backfill = false,
    reservedSearchResult = true,
    defaultActiveFirstOption = false,
    onClear,
    onSelect,
    onDeselect,
    onChange,
    onPopupVisibleChange,
  } = props;
  const menuWidthRef = useRef(0);

  /**
   * 是否受控
   */
  const isControlled = 'value' in props;
  const isPopupVisibleControlled = 'popupVisible' in props;

  /**
   * 搜索框的的内容：
   * 1. mode 为 default 且 showSearch 为 true 时，显示搜索框
   * 2. mode 为 multiple 时，显示搜索框
   * 3. mode 为 tags 时，显示搜索框，此搜索框还支持回车将输入的文字作为新的 option，且选中
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

  /**
   * 键盘激活的 index
   */
  const [activeKey, setActiveKey] = useState<string | number>(get(valueState, '0', ''));

  /**
   * tags 模式下，通过 input 添加的 option
   */
  const [tagsExtraOptions, setTagsExtraOptions] = useState<Record<string, ISelectOptionState>>({});

  /**
   * search 模式下，保留选项，防止二次搜索被清空
   */
  const [searchReservedOptions, setSearchReservedOptions] = useState<
    Record<string, ISelectOptionState>
  >({});

  /**
   * 上一次的 inputValue
   */
  const preInputValue = usePrevious(inputValue);

  /**
   * 是否多选
   */
  const isMultiple = mode === 'multiple' || mode === 'tags';

  /**
   * 是否支持搜索
   */
  const isSearchMode = (showSearch && mode === 'default') || isMultiple;

  /**
   * 当前值是否存在
   */
  const hasValue =
    (isMultiple && (valueState as ISelectMultiValueType).length > 0) ||
    (!isMultiple && !!valueState[0]);

  /**
   * 从 children 中解析出的 options
   */
  const options = useMemo(() => {
    return getOptionsFromChildren(children);
  }, [children]);

  /**
   * 合并了 tag 生成的 options 和从 children 解析出来的 options
   */
  const mergedOptions = useMemo(() => {
    return {
      ...options,
      ...tagsExtraOptions,
    };
  }, [options, tagsExtraOptions]);

  /**
   * 所有的 options
   */
  const allOptions = useMemo(() => {
    return {
      ...searchReservedOptions,
      ...mergedOptions,
    };
  }, [mergedOptions, searchReservedOptions]);

  /**
   * 搜索词过滤后的 options
   */
  const filteredOptions = useMemo(() => {
    if (!filterOption) {
      return mergedOptions;
    } else {
      const filteredOptions: Record<string, ISelectOptionState> = {};
      for (const key of Object.keys(mergedOptions)) {
        const option = mergedOptions[key];
        if (filterOption === true) {
          const { label = '', value } = option;
          if (`${label}`.indexOf(inputValue) >= 0 || `${value}`.indexOf(inputValue) >= 0) {
            filteredOptions[key] = option;
          }
        } else {
          if (filterOption(inputValue, option)) {
            filteredOptions[key] = option;
          }
        }
      }
      return filteredOptions;
    }
  }, [filterOption, mergedOptions, inputValue]);

  /**
   * 上一次的 filteredOptions
   */
  const preFilteredOptions = usePrevious(filteredOptions);

  /**
   * 选中的第一个 option
   */
  const firstSelectedOption = useMemo(() => {
    if (valueState.length > 0) {
      if (labelInValue) {
        return allOptions[(valueState[0] as ILabeledValue).value];
      } else {
        return allOptions[valueState[0] as string];
      }
    }
  }, [labelInValue, allOptions, valueState]);

  /**
   * 计算 option 在当前选中值中的下标，下标为 -1 表示未选中
   */
  const optionSelectedIndex = useCallback(
    (option: ISelectOptionState) => {
      let selectedIndex = -1;
      for (let i = 0; i < valueState.length; i++) {
        const temp = valueState[i];
        if (
          (labelInValue && (temp as ILabeledValue).value === option.value) ||
          (!labelInValue && temp === option.value)
        ) {
          selectedIndex = i;
          break;
        }
      }
      return selectedIndex;
    },
    [labelInValue, valueState],
  );

  /**
   * 单选
   * 非搜索模式：统一清空
   * 搜索模式：
   * - backfill 为 true，如果有选中的则设置为选中的，否则清空
   * - backfill 为 false，清空
   */
  const resetInputValue = useCallback(() => {
    if (mode === 'default' && showSearch && backfill) {
      const option = firstSelectedOption;
      if (option) {
        setInputValue(`${option.label || option.value}`);
      } else {
        setInputValue('');
      }
    } else {
      setInputValue('');
    }
  }, [backfill, firstSelectedOption, mode, showSearch]);

  const focusInput = useCallback(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  /**
   * 修改 popup 状态，内部使用
   */
  const handlePopupVisibleChange = useCallback(
    (popupVisible: boolean) => {
      if (!isPopupVisibleControlled) {
        setPopupVisibleState(popupVisible);
      }
      if (onPopupVisibleChange) {
        onPopupVisibleChange(popupVisible);
      }
      // 动态调整下拉菜单的宽度
      if (nodeRef.current && nodeRef.current.offsetWidth !== menuWidthRef.current && popupVisible) {
        menuWidthRef.current = nodeRef.current.offsetWidth;
      }
    },
    [isPopupVisibleControlled, nodeRef, onPopupVisibleChange],
  );

  /**
   * value 变化回调
   */
  const handleChange = useCallback(
    (value: ISelectValueType, visible: boolean) => {
      if (onChange) {
        onChange(value);
      }
      // 单选需要关闭
      handlePopupVisibleChange(visible);
    },
    [handlePopupVisibleChange, onChange],
  );

  /**
   * 选择一个 option：
   * 1. 点击一个未选中的 option
   * 2. tags 模式下回车
   */
  // eslint-disable-next-line complexity
  const handleSelect = useEventCallback(
    (option: ISelectOptionState, popupVisible: boolean = false, e?: ISelectSelectTriggerEvent) => {
      focusInput();
      if (option.disabled && e) {
        e.stopPropagation();
        return;
      }
      let newValueState;
      if (labelInValue) {
        if (isMultiple) {
          if (typeof maxTagCount === 'undefined' || Object.keys(valueState).length < maxTagCount) {
            newValueState = [
              ...valueState,
              {
                label: option.label,
                value: option.value,
              },
            ];
            handleChange(newValueState as ILabeledValue[], isMultiple);
            setInputValue('');
          }
        } else {
          newValueState = [
            {
              label: option.label,
              value: option.value,
            },
          ];
          handleChange(newValueState[0] as ILabeledValue, popupVisible);
        }
      } else {
        if (isMultiple) {
          if (typeof maxTagCount === 'undefined' || Object.keys(valueState).length < maxTagCount) {
            newValueState = [...valueState, option.value];
            handleChange(newValueState, isMultiple);
            setInputValue('');
          }
        } else {
          newValueState = [option.value];
          handleChange(newValueState[0], popupVisible);
        }
      }
      // 保存搜索选项
      if (isSearchMode && reservedSearchResult) {
        if (isMultiple) {
          setSearchReservedOptions({
            ...searchReservedOptions,
            [option.value]: option,
          });
        } else {
          setSearchReservedOptions({
            [option.value]: option,
          });
        }
      }
      if (!isControlled && newValueState) {
        setValueState(newValueState as ISelectMultiValueType);
      }
      if (onSelect) {
        onSelect(option);
      }
    },
  );

  /**
   * 取消选择一个 option：
   * 1. 点击一个已选中的 option
   * 2. tags 模式下点击 tag 的 closeIcon
   */
  const handleDeselect = useEventCallback(
    (option: ISelectOptionState, selectedIndex: number, e?: ISelectDeselectTriggerEvent) => {
      focusInput();
      if (option.disabled && e) {
        e.stopPropagation();
        return;
      }
      let newValueState;
      newValueState = [...valueState];
      newValueState.splice(selectedIndex, 1);
      handleChange(newValueState, true);
      /**
       * tags 模式下取消选择需要删除 tags 回车增加的 option 选项
       */
      if (mode === 'tags' && tagsExtraOptions[option.value]) {
        const newTagsExtraOptions = {
          ...tagsExtraOptions,
        };
        delete newTagsExtraOptions[option.value];
        setTagsExtraOptions({
          ...newTagsExtraOptions,
        });
      }
      // 去除搜索的选项
      if (isSearchMode && reservedSearchResult) {
        const newSearchReservedOptions = {
          ...searchReservedOptions,
        };
        delete newSearchReservedOptions[option.value];
        setSearchReservedOptions(newSearchReservedOptions);
      }
      if (!isControlled) {
        setValueState(newValueState as ISelectMultiValueType);
      }
      if (onDeselect) {
        onDeselect(option, selectedIndex);
      }
    },
  );

  /**
   * 点击 option
   */
  const handleOptionClick = useCallback(
    (option: ISelectOptionState, e: React.MouseEvent) => {
      e.stopPropagation();
      let selectedIndex = optionSelectedIndex(option);
      if (selectedIndex === -1) {
        handleSelect(option, false, e);
      } else {
        if (isMultiple) {
          handleDeselect(option, selectedIndex, e);
        } else {
          focusInput();
          // 单选模式下点击 item 只关闭
          handlePopupVisibleChange(false);
        }
      }
    },
    [
      focusInput,
      handleDeselect,
      handlePopupVisibleChange,
      handleSelect,
      isMultiple,
      optionSelectedIndex,
    ],
  );

  const handleOptionMouseEnter = useEventCallback(
    (e: React.MouseEvent, onMouseEnter?: React.MouseEventHandler) => {
      if (activeKey) {
        setActiveKey('');
      }
      if (onMouseEnter) {
        onMouseEnter(e);
      }
    },
  );

  /**
   * popup 动画退出时，清空 input
   */
  const handlePopupExited = useCallback(() => {
    resetInputValue();
    if (
      firstSelectedOption &&
      firstSelectedOption.value &&
      firstSelectedOption.value !== activeKey
    ) {
      setActiveKey(firstSelectedOption.value);
    }
    if (menuRef && menuRef.current) {
      if (firstSelectedItemRef && firstSelectedItemRef.current) {
        menuRef.current.firstElementChild!.scrollTop = firstSelectedItemRef.current.offsetTop;
      } else {
        menuRef.current.firstElementChild!.scrollTop = 0;
      }
    }
  }, [activeKey, firstSelectedItemRef, firstSelectedOption, menuRef, resetInputValue]);

  /**
   * 清空输入框
   */
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      setInputValue('');
      if (isMultiple) {
        handleChange([], false);
      } else {
        if (labelInValue) {
          handleChange(undefined, false);
        } else {
          handleChange('', false);
        }
      }
      if (isSearchMode && reservedSearchResult) {
        setSearchReservedOptions({});
      }
      if (mode === 'tags') {
        setTagsExtraOptions({});
      }
      if (!isControlled) {
        setValueState([]);
      }
      if (onClear) {
        onClear(e);
      }
    },
    [
      handleChange,
      isControlled,
      isMultiple,
      isSearchMode,
      labelInValue,
      mode,
      onClear,
      reservedSearchResult,
    ],
  );

  /**
   * 输入框输入文本
   */
  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const getNextAvailableKey = useCallback(
    (keyCode: number) => {
      const keys = Object.keys(filteredOptions);
      const len = keys.length;
      let flag = false;
      if (keyCode === KeyCode.UP) {
        for (let i = len - 1; i >= 0; i--) {
          const key = keys[i];
          if (key === `${activeKey}` || flag) {
            flag = true;
            if (i === 0 && !filteredOptions[keys[len - 1]].disabled) {
              return keys[len - 1];
            } else if (i !== 0 && !filteredOptions[keys[i - 1]].disabled) {
              return keys[i - 1];
            }
          }
        }
      } else {
        for (let i = 0; i < len; i++) {
          const key = keys[i];
          if (key === `${activeKey}` || flag) {
            flag = true;
            if (i === len - 1 && !filteredOptions[keys[0]].disabled) {
              return keys[0];
            } else if (i !== len - 1 && !filteredOptions[keys[i + 1]].disabled) {
              return keys[i + 1];
            }
          }
        }
      }
    },
    [activeKey, filteredOptions],
  );

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      e.stopPropagation();
      if (
        e.keyCode !== KeyCode.DOWN &&
        e.keyCode !== KeyCode.UP &&
        e.keyCode !== KeyCode.ENTER &&
        e.keyCode !== KeyCode.ESC
      ) {
        return;
      }
      if (e.keyCode === KeyCode.ENTER) {
        if (mode === 'tags' && inputValue) return;
        if (popupVisibleState && activeKey) {
          const option = allOptions[activeKey];
          const selectedIndex = optionSelectedIndex(option);
          if (selectedIndex === -1) {
            handleSelect(option, false, e);
          } else {
            if (isMultiple) {
              handleDeselect(option, selectedIndex, e);
            } else {
              handlePopupVisibleChange(false);
            }
          }
        } else {
          handlePopupVisibleChange(!popupVisibleState);
        }
        return;
      }
      if (e.keyCode === KeyCode.ESC && popupVisibleState) {
        handlePopupVisibleChange(false);
        return;
      }
      if (e.keyCode === KeyCode.DOWN || e.keyCode === KeyCode.UP) {
        if (activeKey) {
          const key = getNextAvailableKey(e.keyCode);
          if (key) {
            setActiveKey(key);
          }
        } else {
          if (Object.keys(filteredOptions).length > 0) {
            setActiveKey(Object.keys(filteredOptions)[0]);
          }
        }
      }
    },
    [
      activeKey,
      allOptions,
      filteredOptions,
      getNextAvailableKey,
      handleDeselect,
      handlePopupVisibleChange,
      handleSelect,
      inputValue,
      isMultiple,
      mode,
      optionSelectedIndex,
      popupVisibleState,
    ],
  );

  /**
   * tags 模式下输入文本并回车
   */
  const handleAddTag = useCallback(
    (value: string, e: React.KeyboardEvent | React.FocusEvent) => {
      if (value) {
        const tagOption = {
          value,
        };
        if (optionSelectedIndex(tagOption) === -1) {
          setInputValue('');
          setTagsExtraOptions({
            ...tagsExtraOptions,
            [value]: tagOption,
          });
          handleSelect(tagOption, true, e);
        }
      } else {
        handlePopupVisibleChange(false);
      }
    },
    [handlePopupVisibleChange, handleSelect, optionSelectedIndex, tagsExtraOptions],
  );

  useEffect(() => {
    // 单选搜索模式下输入值改变或者搜索项改变后(远程搜索的情况)选择第一项
    if (
      mode === 'default' &&
      showSearch &&
      defaultActiveFirstOption &&
      popupVisibleState &&
      (inputValue !== preInputValue || !shallowEqualObjects(preFilteredOptions, filteredOptions)) &&
      inputValue
    ) {
      const keys = Object.keys(filteredOptions);
      if (keys.length > 0) {
        handleSelect(filteredOptions[keys[0]], true);
      }
    }
    // 多选的时候如果输入框输入了内容，且 popup 是关闭的，那么打开输入框
    if (mode !== 'default' && !popupVisibleState && inputValue !== preInputValue && inputValue) {
      handlePopupVisibleChange(true);
    }
  }, [
    defaultActiveFirstOption,
    filteredOptions,
    handlePopupVisibleChange,
    handleSelect,
    inputValue,
    mode,
    popupVisibleState,
    preFilteredOptions,
    preInputValue,
    showSearch,
  ]);

  // props 改变，更新状态
  if (isControlled) {
    const newValueState = getValueFromProps(props);
    if (!shallowEqualArrays(valueState, newValueState)) {
      setValueState(newValueState);
    }
  }

  if (isPopupVisibleControlled && popupVisible !== popupVisibleState) {
    setPopupVisibleState(popupVisible!);
  }

  return {
    // 状态
    inputValue,
    popupVisibleState,
    valueState,
    activeKey,
    // 计算值
    options,
    filteredOptions,
    mergedOptions,
    allOptions,
    isMultiple,
    hasValue,
    isSearchMode,
    tagsExtraOptions,
    searchReservedOptions,
    firstSelectedOption,
    // utils
    optionSelectedIndex,
    // 弹出
    handlePopupVisibleChange,
    // 选择面板
    handleSelect,
    handleDeselect,
    handleOptionClick,
    handlePopupExited,
    handleOptionMouseEnter,
    // 选择器
    handleClear,
    handleInputChange,
    handleInputKeyDown,
    handleAddTag,
    menuWidth: menuWidthRef.current,
  };
}
