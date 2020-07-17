import React, { Ref, useRef } from 'react';

import { useForkRef } from '@muya-ui/utils';
import { SelectIcon } from '@muya-ui/theme-light';

import Result from '../Result';
import Tree from '../Tree';
import { StyledTreeNodeLabel } from '../Tree/styled';
import { ITreeNodeProps, ITreeNodeState } from '../Tree/types';
import Trigger from '../Trigger';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { StyledTreeNodeLabelWithIcon, StyledTreePopup, StyledTreeScrollContainer } from './styled';
import TreeSelectInput from './TreeSelectInput';
import { ITreeSelectProps } from './types';
import useTreeSelect from './useTreeSelect';

const defaultStyles = {
  inputWrapper: '',
  popup: '',
  scrollContainer: '',
};

const TreeSelect = React.forwardRef((props: ITreeSelectProps, ref: Ref<HTMLDivElement>) => {
  const {
    size = 'm',
    treeCheckable,
    selectedIcon,
    treeRenderNodeContent,
    styles,
    inputRef,
  } = props;
  const theme = useTheme();
  const {
    components: { TreeSelect: token },
  } = theme;
  const innerInputRef = useRef<HTMLInputElement>(null);
  const handleInputRef = useForkRef(innerInputRef, inputRef);
  const nodeRef = useRef<HTMLDivElement>(null);
  const handleRef = useForkRef(ref, nodeRef);
  const {
    getTriggerProps,
    getInputProps,
    getTreeProps,
    treeWidthRef,
    showEmptyView,
    noResultText,
    isSearchMode,
    inputValue,
  } = useTreeSelect(props, nodeRef, innerInputRef);
  const innerStyles = useStyles('tree-select', defaultStyles, styles);
  const renderNodeContent = (props: ITreeNodeProps & ITreeNodeState) => {
    if (typeof treeRenderNodeContent === 'function') {
      return treeRenderNodeContent({
        ...props,
        inputValue,
      });
    } else {
      let titleNode = props.title;
      // 搜索模式下文本高亮，title 为对象类型时无法匹配文本，因此忽略高亮
      if (isSearchMode && typeof props.title !== 'object') {
        const title = `${props.title}` || '';
        const index = title.indexOf(inputValue);
        const beforeStr = title.substr(0, index);
        const afterStr = title.substr(index + inputValue.length);
        titleNode =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: theme.colors.pattern.text.highlight }}>{inputValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{title}</span>
          );
      }
      if (treeCheckable) {
        return <StyledTreeNodeLabel>{titleNode}</StyledTreeNodeLabel>;
      } else {
        const SelectedIcon = token.selectedIcon || SelectIcon;
        const selectedIconNode = selectedIcon || (
          <SelectedIcon
            style={{
              flexShrink: 0,
              marginLeft: token.selectedIconMarginLeft,
              color: token.selectedIconColor,
            }}
          />
        );
        return (
          <StyledTreeNodeLabelWithIcon>
            <StyledTreeNodeLabel>{titleNode}</StyledTreeNodeLabel>
            {props.selected && selectedIconNode}
          </StyledTreeNodeLabelWithIcon>
        );
      }
    }
  };

  const renderTree = () => {
    return (
      <StyledTreePopup
        theme={theme}
        $width={treeWidthRef.current}
        $showEmptyView={showEmptyView}
        {...innerStyles.popup}
      >
        {showEmptyView ? (
          <Result subTitle={noResultText} type="emptySmall"></Result>
        ) : (
          <StyledTreeScrollContainer {...innerStyles.scrollContainer}>
            <Tree {...getTreeProps()} renderNodeContent={renderNodeContent}></Tree>
          </StyledTreeScrollContainer>
        )}
      </StyledTreePopup>
    );
  };

  const tree = renderTree();

  return (
    <Trigger {...getTriggerProps()} popup={tree} offset={token.offset[size!]}>
      <TreeSelectInput
        ref={handleRef}
        inputRef={handleInputRef}
        wrapperStyleItem={innerStyles.inputWrapper}
        {...getInputProps()}
      ></TreeSelectInput>
    </Trigger>
  );
});

TreeSelect.defaultProps = {
  allowClear: false,
  autoFocus: false,
  defaultValue: [],
  disabled: false,
  readOnly: false,
  placement: 'bottom-start',
  leaveDelay: 100,
  maxVerticalTagCount: 2.5,
  showAllChecked: true,
  labelInValue: false,
  showSearch: false,
  backfill: false,
  popperProps: {},
  treeExpandOnClick: false,
  treeRenderAfterExpand: false,
  multiple: false,
  treeAutoExpandParent: true,
  treeDefaultExpandedKeys: [],
  treeDefaultExpandAll: false,
  treeCheckable: false,
  treeCheckStrictly: false,
  treeScrollable: false,
};

(TreeSelect as any).__MUYA_TREESELECT = true;

export default TreeSelect;
