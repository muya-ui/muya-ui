import React, { Ref, useMemo, useRef } from 'react';

import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import CascaderMenuItem from './CascaderMenuItem';
import { StyledCascaderMenu, StyledCascaderMenuBorderBox, StyledCascaderPanel } from './styled';
import { ICascaderOptionType, ICascaderPanelProps } from './types';
import useCascaderPanel from './useCascaderPanel';

const defaultStyles = {
  panel: '',
  menuBox: '',
  menu: '',
  menuItem: '',
};

const CascaderPanel = memoForwardRef((props: ICascaderPanelProps, ref: Ref<HTMLDivElement>) => {
  const {
    size,
    menusWidth,
    menuReverse,
    expandTrigger,
    checkedKeys,
    styles,
    fieldNames,
    multiple,
    placement,
    expandIcon,
    loadingIcon,
    loadingKeys,
    loadedKeys,
    onLoad,
    onSelect,
    onDeselect,
  } = props;
  const theme = useTheme();
  const activeOptionsRef = useRef<HTMLLIElement[]>([]);
  const pickStyles = useMemo(() => {
    if (styles) {
      const { panel, menuBox, menu, menuItem } = styles;
      return { panel, menuBox, menu, menuItem };
    }
  }, [styles]);
  const innerStyles = useStyles('cascader', defaultStyles, pickStyles);
  const { isActiveOption, showOptions } = useCascaderPanel(props, activeOptionsRef);

  // 渲染 Menu
  const menuNode = useMemo(() => {
    return showOptions.map((options: ICascaderOptionType[], menuIndex: number) => {
      const hasScrollBar = options.length > 6;
      let menuWidth = menusWidth as number;
      if (Array.isArray(menusWidth)) {
        menuWidth = menusWidth[menuIndex];
      }
      return (
        <StyledCascaderMenuBorderBox
          key={menuIndex}
          theme={theme}
          menuReverse={menuReverse}
          hasScrollBar={hasScrollBar}
          onScroll={(e: React.UIEvent) => e.stopPropagation()}
          {...innerStyles.menuBox}
        >
          <StyledCascaderMenu
            size={size!}
            theme={theme}
            menuWidth={menuWidth}
            {...innerStyles.menu}
          >
            {options.map((option, index) => (
              <CascaderMenuItem
                activeOptionsRef={activeOptionsRef}
                key={option[fieldNames.value]}
                loading={loadingKeys.indexOf(option[fieldNames.value]) > -1}
                loaded={loadedKeys.indexOf(option[fieldNames.value]) > -1}
                menuIndex={menuIndex}
                size={size}
                option={option}
                active={isActiveOption(option, menuIndex)}
                expandTrigger={expandTrigger}
                checkedKeys={checkedKeys}
                fieldNames={fieldNames}
                expandIcon={expandIcon}
                loadingIcon={loadingIcon}
                multiple={multiple}
                placement={placement}
                onLoad={onLoad}
                onSelect={onSelect}
                onDeselect={onDeselect}
                {...innerStyles.menuItem}
              />
            ))}
          </StyledCascaderMenu>
        </StyledCascaderMenuBorderBox>
      );
    });
  }, [
    checkedKeys,
    expandIcon,
    expandTrigger,
    fieldNames,
    innerStyles.menu,
    innerStyles.menuBox,
    innerStyles.menuItem,
    isActiveOption,
    loadedKeys,
    loadingIcon,
    loadingKeys,
    menuReverse,
    menusWidth,
    multiple,
    onDeselect,
    onLoad,
    onSelect,
    placement,
    showOptions,
    size,
    theme,
  ]);

  return (
    <StyledCascaderPanel ref={ref} theme={theme} menuReverse={menuReverse} {...innerStyles.panel}>
      {menuNode}
    </StyledCascaderPanel>
  );
});

export default CascaderPanel;
