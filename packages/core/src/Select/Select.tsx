import { useForkRef } from '@muya-ui/utils';

import { omit, get } from 'lodash';

import React, {
  FunctionComponentElement,
  ReactElement,
  Ref,
  RefObject,
  useMemo,
  useRef,
  useCallback,
} from 'react';

import BaseMenu from '../BaseMenu';
import { Result } from '../Result';
import Spin from '../Spin';
import Trigger from '../Trigger';
import useLocale from '../Locale/useLocale';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';

import SelectInput from './SelectInput';
import { allSelectProps } from './const';
import { StyledMenuItemWithoutContent, StyledNotFoundContent } from './styled';
import { ISelectBaseProps, ISelectOptionState, ISelectProps } from './types';
import useSelect from './useSelect';
import {
  getChildType,
  getOptionPropValue,
  isOption,
  isOptionDivider,
  isOptionGroup,
} from './utils';

const defaultStyles = {
  menu: '',
  menuGroup: '',
  menuItem: '',
  menuDivider: '',
};

const Select = memoForwardRef((props: ISelectProps, ref: Ref<HTMLDivElement>) => {
  const locale = useLocale();
  const {
    disabled = false,
    placeholder = locale['Select.placeholder'],
    maxVerticalTagCount = 2.5,
    notFoundContent,
    showSearch = false,
    loading = false,
    loadingIcon,
    placement = 'bottom-start',
    popperProps,
    flip,
    arrowPointAtCenter,
    getPopupContainer,
    onPopupScroll,
    leaveDelay = 100,
    selectedIcon,
    width,
    maxItemCountPerPage = 6.5,
    mode = 'default',
    size = 'm',
    children,
    styles,
    labelInValue = false,
    backfill = false,
    expandIcon,
    hideExpandIcon = false,
    loadingAll = true,
    inputRef,
  } = props;
  const theme = useTheme();
  const {
    components: { Select: token },
  } = theme;
  const menuRef = useRef<HTMLDivElement>(null);
  const firstSelectedItemRef = useRef<HTMLDivElement>(null);
  const innerInputRef = useRef<HTMLInputElement>(null);
  const handleInputRef = useForkRef(innerInputRef, inputRef);
  const nodeRef = useRef<HTMLDivElement>(null);
  const handleRef = useForkRef(ref, nodeRef);
  const {
    // 状态
    inputValue,
    popupVisibleState,
    valueState,
    activeKey,
    // 计算值
    mergedOptions,
    filteredOptions,
    allOptions,
    isMultiple,
    hasValue,
    isSearchMode,
    tagsExtraOptions,
    searchReservedOptions,
    firstSelectedOption,
    // utils
    optionSelectedIndex,
    // 选择面板
    handleSelect,
    handleDeselect,
    handleOptionClick,
    handleOptionMouseEnter,
    handlePopupExited,
    handlePopupVisibleChange,
    // 选择器
    handleClear,
    handleInputChange,
    handleInputKeyDown,
    handleAddTag,
    menuWidth,
  } = useSelect(props, nodeRef, innerInputRef, menuRef, firstSelectedItemRef);
  const selectMenuStyles = useMemo(() => {
    if (styles) {
      const { menu, menuGroup, menuItem, menuDivider } = styles;
      return { menu, menuGroup, menuItem, menuDivider };
    }
  }, [styles]);
  const innerStyles = useStyles('select', defaultStyles, selectMenuStyles);

  const loadingContentNode = useMemo(
    () => (
      <StyledMenuItemWithoutContent key="loading" theme={theme} size={size}>
        {loadingIcon || <Spin />}
      </StyledMenuItemWithoutContent>
    ),
    [loadingIcon, size, theme],
  );

  const notFoundContentNode = useMemo(() => {
    if (notFoundContent) {
      return notFoundContent;
    } else {
      let subTitle = locale['Select.noDataText'];
      if (mode === 'tags') {
        subTitle = locale['Select.pressEnterText'];
      } else if (isSearchMode) {
        subTitle = locale['Select.noResultText'];
      }
      return (
        <StyledNotFoundContent theme={theme}>
          <Result subTitle={subTitle} type="emptySmall"></Result>
        </StyledNotFoundContent>
      );
    }
  }, [isSearchMode, locale, mode, notFoundContent, theme]);

  const getMenuItemByOption = useCallback(
    (option: ISelectOptionState) => {
      const selectedIndex = optionSelectedIndex(option);
      const refProps: { ref?: RefObject<HTMLDivElement> } = {};
      if (firstSelectedOption && firstSelectedOption.value === option.value) {
        refProps.ref = firstSelectedItemRef;
      }
      return (
        <BaseMenu.Item
          {...refProps}
          {...innerStyles.menuItem}
          key={option.value}
          size={size}
          selected={selectedIndex !== -1}
          selectedIcon={selectedIcon}
          active={activeKey === `${option.value}`}
          onClick={e => handleOptionClick(option, e)}
          onMouseEnter={handleOptionMouseEnter}
        >
          {option.label || option.value}
        </BaseMenu.Item>
      );
    },
    [
      activeKey,
      firstSelectedOption,
      handleOptionClick,
      handleOptionMouseEnter,
      innerStyles.menuItem,
      optionSelectedIndex,
      selectedIcon,
      size,
    ],
  );

  const getSearchReservedMenuItem = useCallback(() => {
    const menus = [];
    if (isSearchMode) {
      for (const key of Object.keys(searchReservedOptions)) {
        const option = searchReservedOptions[key];
        if (!filteredOptions[option.value] && !tagsExtraOptions[option.value]) {
          menus.push(getMenuItemByOption(option));
        }
      }
    }
    return menus;
  }, [filteredOptions, getMenuItemByOption, isSearchMode, searchReservedOptions, tagsExtraOptions]);

  const getTagsExtraMenuItem = useCallback(() => {
    const menus = [];
    if (mode === 'tags') {
      for (const key of Object.keys(tagsExtraOptions)) {
        menus.push(getMenuItemByOption(tagsExtraOptions[key]));
      }
    }
    return menus;
  }, [getMenuItemByOption, mode, tagsExtraOptions]);

  // 渲染逻辑
  const getMenuContentFromChildren = useCallback(
    (children: ReactElement | ReactElement[], menus: ReactElement[] = []) => {
      // eslint-disable-next-line complexity
      React.Children.forEach(children, (child, index) => {
        if (!child) return;
        const type = getChildType(child as FunctionComponentElement<any>);
        if (isOptionGroup(type)) {
          const groupChildren = getMenuContentFromChildren(child.props.children as
            | ReactElement
            | ReactElement[]);
          if (groupChildren.length > 0) {
            let style = innerStyles.menuGroup.style;
            const childStyle = get(child, 'props.style');
            if (childStyle) {
              style = { ...style, ...childStyle };
            }
            menus.push(
              <BaseMenu.Group
                {...child.props}
                style={style}
                className={[innerStyles.menuGroup.className, get(child, 'props.className', '')]
                  .join(' ')
                  .trim()}
                key={child.key || child.props.label}
              >
                {groupChildren}
              </BaseMenu.Group>,
            );
          }
        } else if (isOption(type)) {
          let option: ISelectOptionState | undefined;
          const value = getOptionPropValue(child, 'value');
          if (isSearchMode && filteredOptions[value]) {
            option = filteredOptions[value];
          } else if (!isSearchMode && mergedOptions[value]) {
            option = mergedOptions[value];
          }
          if (option) {
            const selectedIndex = optionSelectedIndex(option);
            const refProps: { ref?: RefObject<HTMLDivElement> } = {};
            if (firstSelectedOption && firstSelectedOption.value === value) {
              refProps.ref = firstSelectedItemRef;
            }
            const children = getOptionPropValue(child, 'children');
            // 没有 child.style 时保证是一个引用
            let style = innerStyles.menuItem.style;
            const childStyle = get(child, 'props.style');
            if (childStyle) {
              style = { ...style, ...childStyle };
            }
            menus.push(
              <BaseMenu.Item
                {...child.props}
                {...refProps}
                style={style}
                className={[innerStyles.menuItem.className, get(child, 'props.className', '')]
                  .join(' ')
                  .trim()}
                key={child.key || option.value}
                size={size}
                selected={selectedIndex !== -1}
                active={activeKey === `${option.value}`}
                selectedIcon={selectedIcon}
                onClick={e => handleOptionClick(option!, e)}
                onMouseEnter={e => handleOptionMouseEnter(e, get(child, 'props.onMouseEnter'))}
              >
                {children || option.label || option.value}
              </BaseMenu.Item>,
            );
          }
        } else if (isOptionDivider(type)) {
          menus.push(
            <BaseMenu.Divider
              {...child.props}
              {...innerStyles.menuDivider}
              key={child.key || `divider_${index}`}
            />,
          );
        } else if (child.props && Array.isArray(child.props.children)) {
          const children = getMenuContentFromChildren(child.props.children);
          if (children && children.length > 0) {
            menus.push(...children);
          }
        }
        return;
      });
      return menus;
    },
    [
      activeKey,
      filteredOptions,
      firstSelectedOption,
      handleOptionClick,
      handleOptionMouseEnter,
      innerStyles.menuDivider,
      innerStyles.menuGroup.className,
      innerStyles.menuGroup.style,
      innerStyles.menuItem.className,
      innerStyles.menuItem.style,
      isSearchMode,
      mergedOptions,
      optionSelectedIndex,
      selectedIcon,
      size,
    ],
  );

  const menuContent = useMemo(() => {
    let menuContent: ReactElement | ReactElement[];
    if (loading && loadingAll) {
      menuContent = loadingContentNode;
    } else {
      menuContent = [
        ...getSearchReservedMenuItem(),
        ...getMenuContentFromChildren(children),
        ...getTagsExtraMenuItem(),
      ];
      if (loading) {
        menuContent.push(loadingContentNode);
      }
    }
    if (
      ((isSearchMode && inputValue) || !isSearchMode) &&
      (menuContent as ReactElement[]).length === 0
    ) {
      menuContent = notFoundContentNode;
    }
    return menuContent;
  }, [
    children,
    getMenuContentFromChildren,
    getSearchReservedMenuItem,
    getTagsExtraMenuItem,
    inputValue,
    isSearchMode,
    loading,
    loadingAll,
    loadingContentNode,
    notFoundContentNode,
  ]);

  const menus = useMemo(
    () => (
      <BaseMenu.Menu
        ref={menuRef}
        maxItemCountPerPage={maxItemCountPerPage}
        width={menuWidth}
        size={size}
        onScroll={onPopupScroll}
        {...innerStyles.menu}
      >
        {menuContent}
      </BaseMenu.Menu>
    ),
    [innerStyles.menu, maxItemCountPerPage, menuContent, menuWidth, onPopupScroll, size],
  );

  const showMenu = useMemo(() => {
    let showMenu = true;
    if (isSearchMode && !inputValue && (menuContent as ReactElement[]).length === 0) {
      showMenu = false;
    }
    return showMenu;
  }, [inputValue, isSearchMode, menuContent]);

  const restProps = omit<ISelectProps, keyof ISelectBaseProps>(props, allSelectProps);
  return (
    <Trigger
      container={getPopupContainer}
      placement={placement}
      leaveDelay={leaveDelay}
      triggerAction="click"
      open={disabled ? false : popupVisibleState && showMenu}
      offset={token.offset[size!]}
      onVisibleChange={handlePopupVisibleChange}
      popperProps={popperProps}
      flip={flip}
      arrowPointAtCenter={arrowPointAtCenter}
      popup={menus}
      transitionProps={{
        onExited: handlePopupExited,
      }}
      disabled={disabled}
      hideArrow
      {...restProps}
    >
      <SelectInput
        ref={handleRef}
        inputRef={handleInputRef}
        disabled={disabled!}
        placeholder={placeholder!}
        inputValue={inputValue}
        popupVisible={popupVisibleState}
        maxVerticalTagCount={maxVerticalTagCount!}
        showSearch={showSearch!}
        labelInValue={labelInValue!}
        backfill={backfill!}
        expandIcon={expandIcon}
        hideExpandIcon={hideExpandIcon!}
        value={valueState!}
        allOptions={allOptions}
        isMultiple={isMultiple}
        hasValue={hasValue}
        isSearchMode={isSearchMode}
        onClear={handleClear}
        onKeyDown={handleInputKeyDown}
        onInputChange={handleInputChange}
        onAddTag={handleAddTag}
        onSelect={handleSelect}
        onDeselect={handleDeselect}
        size={size!}
        mode={mode!}
        width={width}
        styles={styles}
      />
    </Trigger>
  );
});

(Select as any).__MUYA_SELECT = true;

export default Select;
