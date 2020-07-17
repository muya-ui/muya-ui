import arrayTreeFilter from 'array-tree-filter';
import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import { flattenDeep } from 'lodash';
import { useEventCallback } from '@muya-ui/utils';
import { IInputTagValue, ITagInputRemoveEvent } from '../Input/types';
import { useLocale } from '../Locale/useLocale';
import { ITriggerProps } from '../Trigger';
import { KeyCode } from '../utils/keyCode';
import useRealPlacement from '../utils/useRealPlacement';
import { useTheme } from '../utils/useTheme';
import {
  ICascaderInputProps,
  ICascaderOptionType,
  ICascaderProps,
  ICascaderValueType,
  IFilledFieldNamesType,
} from './types';
import {
  calcCheckedKeys,
  defaultDisplayRender,
  diffValue,
  getActiveStateFromValue,
  getEntityDataFromOptions,
  findOption,
} from './utils';
import { arrayDel, arrayAdd } from '../utils/array';

const defaultFlipSetting = { enabled: true, flipVariationsByContent: true };

export default function useCascader(props: ICascaderProps, inputRef: RefObject<HTMLInputElement>) {
  const locale = useLocale();
  const theme = useTheme();
  const token = theme.components.Cascader;
  const isControlled = 'value' in props;
  const isPopupVisibleControlled = 'popupVisible' in props;
  const isLoadedControlled = 'loadedKeys' in props;
  const {
    // common
    size = 'm',
    multiple = false,
    fieldNames: fieldNamesProp,
    styles,
    // input
    inputWidth,
    allowClear = true,
    placeholder = locale['Cascader.placeholder'],
    disabled = false,
    maxVerticalTagCount = 2.5,
    collapseTags = false,
    displayRender = defaultDisplayRender,
    onKeyDown,
    inputExpandIcon,
    // menu
    menusWidth,
    expandIcon,
    loadingIcon,
    loadedKeys,
    onLoad,
    // trigger
    expandTrigger = 'click',
    placement = 'bottom-start',
    popupVisible,
    getPopupContainer,
    onPopupVisibleChange,
    flip = defaultFlipSetting,
    popperProps,
    // parent
    options,
    value,
    defaultValue = [],
    changeOnSelect = false,
    checkStrictly = false,
    onChange,
    children,
    loadData,
    ...restProps
  } = props;

  const fieldNames = useMemo(() => {
    const fieldNames = fieldNamesProp || {};
    const names: IFilledFieldNamesType = {
      children: fieldNames.children || 'children',
      label: fieldNames.label || 'label',
      value: fieldNames.value || 'value',
      isLeaf: fieldNames.isLeaf || 'isLeaf',
    };
    return names;
  }, [fieldNamesProp]);

  // state
  const { realPlacement, onPopperCreate } = useRealPlacement(placement!);
  const [popupVisibleState, setPopupVisibleState] = useState(popupVisible || false);
  const [valueState, setValueState] = useState((isControlled ? value : defaultValue) || []);
  const [activeValueState, setActiveValueState] = useState(
    getActiveStateFromValue(valueState, multiple),
  );
  const [loadingKeys, setLoadingKeys] = useState<Array<ICascaderValueType>>([]);
  const [loadedKeysState, setLoadedKeysState] = useState<Array<ICascaderValueType>>(
    loadedKeys || [],
  );
  const [entityData, setEntityData] = useState(
    multiple ? getEntityDataFromOptions(options, fieldNames) : { keyEntities: {}, posEntities: {} },
  );
  const [checkedKeysState, setCheckedKeysState] = useState(
    multiple
      ? calcCheckedKeys(valueState, checkStrictly, true, entityData.keyEntities)
      : { checked: [], halfChecked: [] },
  );

  // computed
  const menuReverse = realPlacement.indexOf('end') > -1;
  const currentLevelOptions = useMemo((): ICascaderOptionType[] => {
    const result = arrayTreeFilter(
      options,
      (o, level) => o[fieldNames.value] === activeValueState[level],
      { childrenKeyName: fieldNames.children },
    );
    if (result[result.length - 2]) {
      return result[result.length - 2][fieldNames.children] || [];
    }
    return [...options].filter(o => !o.disabled);
  }, [activeValueState, fieldNames.children, fieldNames.value, options]);

  const inputValue: string | string[] = useMemo(() => {
    if (multiple) {
      const tagValues = (valueState as ICascaderValueType[][])
        .map(value =>
          arrayTreeFilter(
            options,
            (o: ICascaderOptionType, level: number) => o[fieldNames.value] === value[level],
            { childrenKeyName: fieldNames.children },
          ),
        )
        .map(options => {
          const labels = options.map(o => o[fieldNames.label] || o[fieldNames.value]);
          return displayRender(labels, options);
        });
      // 折叠 tags 的情况下进行过滤
      if (collapseTags && tagValues.length > 1) {
        return [tagValues[0], `${tagValues.length - 1}+`];
      } else {
        return tagValues;
      }
    } else {
      const selectedOptions = arrayTreeFilter(
        options,
        (o: ICascaderOptionType, level: number) =>
          o[fieldNames.value] === (valueState as ICascaderValueType[])[level],
        { childrenKeyName: fieldNames.children },
      );
      const labels = selectedOptions.map(o => o[fieldNames.label] || o[fieldNames.value]);
      return displayRender(labels, selectedOptions);
    }
  }, [
    collapseTags,
    displayRender,
    fieldNames.children,
    fieldNames.label,
    fieldNames.value,
    multiple,
    options,
    valueState,
  ]);

  // utils
  // 当前选中的选项
  const getSelectedOptions = useCallback(
    (selectedValue: ICascaderValueType[] | ICascaderValueType[][]) => {
      if (multiple) {
        return (selectedValue as ICascaderValueType[][]).map(value =>
          arrayTreeFilter(options, (o, level) => o[fieldNames.value] === value[level], {
            childrenKeyName: fieldNames.children,
          }),
        );
      } else {
        return arrayTreeFilter(
          options,
          (o, level) => o[fieldNames.value] === (selectedValue as ICascaderValueType[])[level],
          { childrenKeyName: fieldNames.children },
        );
      }
    },
    [fieldNames.children, fieldNames.value, multiple, options],
  );
  // 当前打开激活的选项
  const getActiveOptions = useCallback(
    (activeValue: ICascaderValueType[]) => {
      return arrayTreeFilter(options, (o, level) => o[fieldNames.value] === activeValue[level], {
        childrenKeyName: fieldNames.children,
      });
    },
    [fieldNames.children, fieldNames.value, options],
  );

  // popup
  const handlePopupVisibleChange = useCallback(
    (popupVisible: boolean) => {
      if (popupVisible && !popupVisibleState && !multiple) {
        setActiveValueState(getActiveStateFromValue(valueState, multiple));
      }
      if (!isPopupVisibleControlled) {
        setPopupVisibleState(popupVisible);
      }
      if (onPopupVisibleChange) {
        onPopupVisibleChange(popupVisible);
      }
    },
    [isPopupVisibleControlled, multiple, onPopupVisibleChange, popupVisibleState, valueState],
  );

  // change
  const assertChangeEvent = useCallback((e: React.SyntheticEvent) => {
    return e.type !== 'keydown' || (e as React.KeyboardEvent).keyCode === KeyCode.ENTER;
  }, []);

  const handleChange = useCallback(
    (
      value: ICascaderValueType[] | ICascaderValueType[][],
      options: ICascaderOptionType[] | ICascaderOptionType[][],
      visible: boolean,
      e: React.SyntheticEvent,
    ) => {
      if (assertChangeEvent(e)) {
        if (!isControlled) {
          setValueState(value);
        }
        if (onChange) {
          onChange(value, options);
        }
        handlePopupVisibleChange(visible);
      }
    },
    [assertChangeEvent, isControlled, onChange, handlePopupVisibleChange],
  );

  const handleLoad = useEventCallback(
    async (targetValue: ICascaderValueType, activeOptions?: ICascaderOptionType[]) => {
      if (
        !loadData ||
        loadedKeysState.indexOf(targetValue) !== -1 ||
        loadingKeys.indexOf(targetValue) !== -1
      ) {
        return;
      }
      const innerActiveOptions = activeOptions || getActiveOptions(activeValueState);
      setLoadingKeys(arrayAdd(loadingKeys, targetValue));
      await loadData(innerActiveOptions);
      const newLoadedKeys = arrayAdd(loadedKeysState, targetValue);
      const newLoadingKeys = arrayDel(loadingKeys, targetValue);
      if (onLoad) {
        onLoad(newLoadedKeys);
      }
      if (!isLoadedControlled) {
        setLoadedKeysState(newLoadedKeys);
      }
      setLoadingKeys(newLoadingKeys);
    },
  );

  // 菜单项点击、键盘触发、Checkbox 点击触发
  const handleSelect = useEventCallback(
    async (
      targetOption: ICascaderOptionType,
      menuIndex: number,
      e: React.MouseEvent | React.KeyboardEvent | React.ChangeEvent,
    ) => {
      // 保持 input 的 focus 状态
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
      // 禁用情况
      if (!targetOption || targetOption.disabled) {
        return;
      }
      // 菜单激活状态更新
      const targetValue = targetOption[fieldNames.value];
      const newActiveValueState = activeValueState.slice(0, menuIndex + 1);
      newActiveValueState[menuIndex] = targetValue;
      setActiveValueState(newActiveValueState);
      // 菜单选中状态更新
      let newValueState: ICascaderValueType[] | ICascaderValueType[][] = newActiveValueState;
      if (multiple) {
        if (e.type === 'change') {
          const newCheckedKeysState = calcCheckedKeys(
            [targetValue],
            true,
            checkStrictly,
            entityData.keyEntities,
            checkedKeysState,
          );
          setCheckedKeysState(newCheckedKeysState);
          newValueState = newCheckedKeysState.checked
            .map(key => entityData.keyEntities[key])
            .filter(entity => entity && (!entity.children || checkStrictly))
            .map(entity => entity.keyPath);
          const selectedOptions = getSelectedOptions(newValueState);
          handleChange(newValueState, selectedOptions, true, e);
        }
      } else {
        /**
         * 非叶子节点无 children 的情况，且支持远程加载，远程加载下级的节点
         */
        if (
          targetOption[fieldNames.isLeaf] === false &&
          loadedKeysState.indexOf(targetValue) === -1 &&
          loadData
        ) {
          if (loadingKeys.indexOf(targetValue) > -1) {
            return;
          }
          const activeOptions = getActiveOptions(newActiveValueState);
          if (changeOnSelect) {
            handleChange(newValueState, activeOptions, true, e);
          }
          await handleLoad(targetValue, activeOptions);
          return;
        }
        const selectedOptions = getSelectedOptions(newValueState);
        /**
         * 子节点：需要关闭选择面板并更新 value 状态
         */
        if (!targetOption[fieldNames.children] || !targetOption[fieldNames.children].length) {
          handleChange(newValueState, selectedOptions, false, e);
          /**
           * 非子节点：且选择即触发更新
           */
        } else if (changeOnSelect && (e.type === 'click' || e.type === 'keydown')) {
          handleChange(newValueState, selectedOptions, true, e);
        }
      }
    },
  );

  // 只有多选下 tag close 点击和 checkbox 点击会触发取消选中
  const handleDeselect = useCallback(
    (targetOptions: ICascaderOptionType[], e: React.MouseEvent | React.ChangeEvent) => {
      // 保持 input 的 focus 状态
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
      let allOptionsDisabled = targetOptions.every(option => option && option.disabled);
      if (allOptionsDisabled || !multiple) {
        return;
      }
      // 计算新的 state
      const removedValue = targetOptions.map(option => option[fieldNames.value]);
      const newCheckedKeysState = calcCheckedKeys(
        removedValue,
        false,
        checkStrictly,
        entityData.keyEntities,
        checkedKeysState,
      );
      setCheckedKeysState(newCheckedKeysState);
      const newValueState = newCheckedKeysState.checked
        .map(key => entityData.keyEntities[key])
        .filter(entity => entity && (!entity.children || checkStrictly))
        .map(entity => entity.keyPath);
      const selectedOptions = getSelectedOptions(newValueState);
      handleChange(newValueState, selectedOptions, true, e);
    },
    [
      checkStrictly,
      checkedKeysState,
      entityData.keyEntities,
      fieldNames.value,
      getSelectedOptions,
      handleChange,
      inputRef,
      multiple,
    ],
  );

  // input 事件
  const handleInputKeyDown = useEventCallback(
    // eslint-disable-next-line complexity
    (e: React.KeyboardEvent) => {
      e.stopPropagation();
      // 多选不支持键盘事件
      if (multiple) {
        return;
      }
      if (children && children.props.onKeyDown) {
        children.props.onKeyDown(e);
        return;
      }
      const newActiveValueState = [...activeValueState];
      const currentLevel = newActiveValueState.length - 1 < 0 ? 0 : newActiveValueState.length - 1;
      const currentOptions = currentLevelOptions;
      const currentIndex = currentOptions
        .map((o: ICascaderOptionType) => o[fieldNames.value])
        .indexOf(newActiveValueState[currentLevel]);
      if (
        e.keyCode !== KeyCode.DOWN &&
        e.keyCode !== KeyCode.UP &&
        e.keyCode !== KeyCode.LEFT &&
        e.keyCode !== KeyCode.RIGHT &&
        e.keyCode !== KeyCode.ENTER &&
        e.keyCode !== KeyCode.SPACE &&
        e.keyCode !== KeyCode.BACKSPACE &&
        e.keyCode !== KeyCode.ESC &&
        e.keyCode !== KeyCode.TAB
      ) {
        return;
      }
      // Press any keys above to reopen menu
      if (
        !popupVisibleState &&
        e.keyCode !== KeyCode.BACKSPACE &&
        e.keyCode !== KeyCode.LEFT &&
        e.keyCode !== KeyCode.RIGHT &&
        e.keyCode !== KeyCode.ESC &&
        e.keyCode !== KeyCode.TAB
      ) {
        handlePopupVisibleChange(true);
        return;
      }

      if (e.keyCode === KeyCode.DOWN || e.keyCode === KeyCode.UP) {
        e.preventDefault();
        let nextIndex = currentIndex;
        if (nextIndex !== -1) {
          if (e.keyCode === KeyCode.DOWN) {
            nextIndex += 1;
            nextIndex = nextIndex >= currentOptions.length ? 0 : nextIndex;
          } else {
            nextIndex -= 1;
            nextIndex = nextIndex < 0 ? currentOptions.length - 1 : nextIndex;
          }
        } else {
          nextIndex = 0;
        }
        newActiveValueState[currentLevel] = currentOptions[nextIndex][fieldNames.value];
      } else if (
        (!menuReverse && (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.BACKSPACE)) ||
        (menuReverse && e.keyCode === KeyCode.RIGHT)
      ) {
        e.preventDefault();
        newActiveValueState.splice(newActiveValueState.length - 1, 1);
      } else if (
        (!menuReverse && e.keyCode === KeyCode.RIGHT) ||
        (menuReverse && (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.BACKSPACE))
      ) {
        e.preventDefault();
        if (currentOptions[currentIndex] && currentOptions[currentIndex][fieldNames.children]) {
          newActiveValueState.push(
            currentOptions[currentIndex][fieldNames.children][0][fieldNames.value],
          );
        }
      } else if (e.keyCode === KeyCode.ESC || e.keyCode === KeyCode.TAB) {
        handlePopupVisibleChange(false);
        return;
      }
      if (!newActiveValueState || newActiveValueState.length === 0) {
        handlePopupVisibleChange(false);
      }
      const activeOptions = getActiveOptions(newActiveValueState);
      const targetOption = activeOptions[activeOptions.length - 1];
      handleSelect(targetOption, activeOptions.length - 1, e);

      if (onKeyDown) {
        onKeyDown(e);
      }
    },
  );

  const handleInputClear = useCallback(
    (e: React.MouseEvent) => {
      if (multiple) {
        setCheckedKeysState({
          checked: [],
          halfChecked: [],
        });
      }
      handleChange([], [], false, e);
    },
    [handleChange, multiple],
  );

  const handleTagRemove = useCallback(
    (value: IInputTagValue, index: number, e: ITagInputRemoveEvent) => {
      let targetOptions: ICascaderOptionType[];
      if (collapseTags && index === 1) {
        const removeValues: ICascaderValueType[][] = [
          ...(valueState as ICascaderValueType[][]),
        ].slice(1);
        targetOptions = removeValues.map(
          value => entityData.keyEntities[value[value.length - 1]].node,
        );
      } else {
        const removeValue = valueState[index] as ICascaderValueType[];
        targetOptions = [entityData.keyEntities[removeValue[removeValue.length - 1]].node];
      }
      handleDeselect(targetOptions, e as React.MouseEvent);
    },
    [collapseTags, entityData.keyEntities, handleDeselect, valueState],
  );

  const preLoadOptions = async (values: ICascaderValueType[]) => {
    for (const value of values) {
      const option = findOption(options, value, fieldNames);
      if (option) {
        const isLeaf = option[fieldNames.isLeaf];
        const children = option[fieldNames.children];
        const hasChildren = children && children.length > 0;
        if (isLeaf === false && loadedKeysState.indexOf(value) === -1 && !hasChildren) {
          await handleLoad(value);
        }
      }
    }
  };

  // props
  const inputProps: ICascaderInputProps = {
    allowClear,
    placeholder,
    maxVerticalTagCount,
    inputValue,
    popupVisible: popupVisibleState,
    value: valueState,
    multiple,
    onClear: handleInputClear,
    onKeyDown: handleInputKeyDown,
    onRemoveTag: handleTagRemove,
    width: inputWidth,
    inputRef,
    fieldNames,
    expandIcon: inputExpandIcon,
    size,
  };

  const panelProps = {
    menusWidth,
    placement,
    menuReverse,
    size,
    options,
    activeValue: activeValueState,
    onSelect: handleSelect,
    onDeselect: handleDeselect,
    expandTrigger,
    fieldNames,
    visible: popupVisibleState,
    expandIcon,
    loadingIcon,
    styles,
    multiple,
    checkedKeys: checkedKeysState,
    loadingKeys,
    loadedKeys: loadedKeysState,
    onLoad: handleLoad,
  };

  const triggerProps: Omit<ITriggerProps, 'popup' | 'children'> = {
    ...restProps,
    container: getPopupContainer,
    placement,
    flip,
    triggerAction: 'click',
    open: disabled ? false : popupVisibleState,
    onVisibleChange: handlePopupVisibleChange,
    offset: token.offset[size],
    hideArrow: true,
    disabled,
    popperProps: {
      ...popperProps,
      popperOptions: {
        onCreate: onPopperCreate,
      },
    },
  };

  // props 改变，更新状态
  if (isControlled && !diffValue(value || [], valueState)) {
    setValueState(value || []);
  }

  if (isPopupVisibleControlled && popupVisible !== popupVisibleState) {
    setPopupVisibleState(popupVisible!);
  }

  if (isLoadedControlled && loadedKeys !== loadedKeysState) {
    setLoadingKeys(loadedKeys || []);
  }

  useEffect(() => {
    if (multiple) {
      const newEntityData = getEntityDataFromOptions(options, fieldNames);
      setEntityData(newEntityData);
      setCheckedKeysState(
        calcCheckedKeys(valueState, true, checkStrictly, newEntityData.keyEntities),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldNames, multiple, options]);

  // 如果是异步加载的，那么第一次渲染的时候要预加载已经选中项的 options
  useEffect(() => {
    if (loadData) {
      const values = flattenDeep(activeValueState);
      preLoadOptions(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    panelProps,
    triggerProps,
    inputProps,
  };
}
