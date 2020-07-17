import { omit } from 'lodash';
import React, { useMemo, useRef } from 'react';

import { RightIcon } from '@muya-ui/theme-light';

import Animation from '../Animation';
import Checkbox from '../Checkbox';
import Spin from '../Spin';
import ExpandIconWrapper from '../styled/components/ExpandIconWrapper';
import ExpandWrapper from '../styled/components/ExpandWrapper';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { allTreeNodeProps } from './const';
import { ITreeContextValue } from './innerTypes';
import {
  expandedRotateKeyframes,
  notExpandedRotateKeyframes,
  StyledChildTree,
  StyledExpandHotZoneLine,
  StyledTitle,
  StyledTreeIconWrapper,
  StyledTreeNode,
  StyledTreeNodeContent,
  StyledTreeNodeSelector,
  StyledTreeNodeSelectorWrapper,
  StyleExpandHotZone,
} from './styled';
import { useTreeContext } from './TreeContext';
import { ITreeNodeBaseProps, ITreeNodeData, ITreeNodeProps } from './types';
import { useTreeNode } from './useTreeNode';

const defaultStyles = {
  node: '',
  nodeContent: '',
  nodeSelector: '',
  nodeIconWrapper: '',
  nodeTitle: '',
  childTree: '',
};

const TreeNode = <T extends ITreeNodeData>(props: ITreeNodeProps<T>) => {
  const {
    children,
    title,
    nodeKey,
    disableCheckbox,
    icon: nodeIcon,
    expandIcon: nodeExpandIcon,
    styles,
  } = props;
  const nodeRef = useRef<HTMLDivElement>(null);
  const childTreeRenderedRef = useRef<boolean>(false);
  const theme = useTheme();
  const {
    components: { Tree: token },
  } = theme;
  const context = useTreeContext() as ITreeContextValue<T>;
  const {
    size,
    keyEntities,
    draggable,
    icon: treeIcon,
    expandIcon: treeExpandIcon,
    renderNodeContent,
    renderNodeRightArea,
    showLine,
    renderAfterExpand,
    disableNativeTitle,
  } = context;
  // 通过 tree 状态计算得到的节点状态
  const {
    nodeState,
    dragNodeHighlight,
    isLeaf,
    disabled,
    checkable,
    expandAppear,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
    onCheck,
    onExpand,
    onMouseEnter,
    onMouseLeave,
    onContextMenu,
    onClick,
    onDoubleClick,
    onDragStart,
  } = useTreeNode<T>(props, context, nodeRef);
  const treeNodeStyles = useMemo(() => {
    if (styles) {
      const { node, nodeContent, nodeSelector, nodeTitle, childTree } = styles;
      return { node, nodeContent, nodeSelector, nodeTitle, childTree };
    }
  }, [styles]);
  const innerStyles = useStyles('tree', defaultStyles, treeNodeStyles);
  const {
    selected,
    checked,
    halfChecked,
    expanded,
    loading,
    dragOver,
    dragOverGapTop,
    dragOverGapBottom,
  } = nodeState;
  const { level = 0 } = keyEntities[nodeKey] || {};
  const renderExpandIcon = () => {
    if (loading) {
      return (
        <StyleExpandHotZone>
          <Spin />
        </StyleExpandHotZone>
      );
    }
    const expandIcon = nodeExpandIcon || treeExpandIcon;
    if (expandIcon) {
      return (
        <span onClick={onExpand}>
          {typeof expandIcon === 'function'
            ? expandIcon({ ...props, ...nodeState, isLeaf })
            : expandIcon}
        </span>
      );
    }
    if (!isLeaf) {
      const ExpandIcon = token.expandIcon || RightIcon;
      return (
        <StyleExpandHotZone onClick={onExpand}>
          <ExpandWrapper
            theme={theme}
            expanded={expanded}
            expandedKeyframes={expandedRotateKeyframes}
            notExpandedKeyframes={notExpandedRotateKeyframes}
          >
            <ExpandIconWrapper
              width={token.expandIconWidth}
              height={token.expandIconHeight}
              color={token.expandIconColor}
            >
              <ExpandIcon />
            </ExpandIconWrapper>
          </ExpandWrapper>
        </StyleExpandHotZone>
      );
    } else {
      return <StyleExpandHotZone>{showLine && <StyledExpandHotZoneLine />}</StyleExpandHotZone>;
    }
  };

  const checkboxNode = useMemo(() => {
    if (checkable) {
      return (
        <Checkbox
          size="s"
          indeterminate={!checked && halfChecked}
          checked={checked}
          onChange={onCheck}
          disabled={disabled || disableCheckbox}
        />
      );
    }
  }, [checkable, checked, disableCheckbox, disabled, halfChecked, onCheck]);

  const iconNode = useMemo(() => {
    const icon = 'icon' in props ? nodeIcon : treeIcon;
    if (icon) {
      return <StyledTreeIconWrapper {...innerStyles.nodeIconWrapper}>{icon}</StyledTreeIconWrapper>;
    }
    return null;
  }, [innerStyles.nodeIconWrapper, nodeIcon, props, treeIcon]);

  const rightAreaNode = useMemo(() => {
    if (renderNodeRightArea) {
      return renderNodeRightArea({ ...props, ...nodeState, isLeaf });
    }
  }, [isLeaf, nodeState, props, renderNodeRightArea]);

  const renderSelector = () => {
    let content: React.ReactNode;
    // 自定义所有内容
    if (renderNodeContent) {
      content = renderNodeContent({ ...props, ...nodeState, isLeaf });
      // 自定义右侧操作区
    } else if (rightAreaNode) {
      content = (
        <StyledTreeNodeSelector>
          <StyledTitle {...innerStyles.nodeTitle}>{title}</StyledTitle>
          {rightAreaNode}
        </StyledTreeNodeSelector>
      );
    } else {
      // 默认内容
      content = <StyledTitle {...innerStyles.nodeTitle}>{title}</StyledTitle>;
    }
    return (
      <StyledTreeNodeSelectorWrapper
        title={typeof title === 'string' && !disableNativeTitle ? title : ''}
        {...innerStyles.nodeSelector}
      >
        {iconNode}
        {content}
      </StyledTreeNodeSelectorWrapper>
    );
  };

  const childTreeNode = useMemo(() => {
    if (renderAfterExpand && !expanded && !childTreeRenderedRef.current) {
      return null;
    } else if (children && children.length > 0) {
      childTreeRenderedRef.current = true;
      return (
        <Animation.Collapse appear={expandAppear} in={expanded}>
          <>
            {children.map(node => (
              <TreeNode
                key={node.key}
                nodeKey={node.key!}
                parentKey={nodeKey}
                data={node}
                {...node}
              />
            ))}
          </>
        </Animation.Collapse>
      );
    }
  }, [children, expandAppear, expanded, nodeKey, renderAfterExpand]);

  const domProps = omit<ITreeNodeProps, keyof ITreeNodeBaseProps>(props, allTreeNodeProps);

  return (
    <StyledTreeNode
      {...domProps}
      {...innerStyles.node}
      role="treeitem"
      theme={theme}
      $size={size!}
      $isLeaf={isLeaf!}
      $level={level}
      $selected={selected}
      $disabled={disabled!}
      $dragOver={dragOver}
      $dragOverGapTop={dragOverGapTop}
      $dragOverGapBottom={dragOverGapBottom}
      $dragNodeHighlight={dragNodeHighlight}
      $showLine={showLine!}
      onDragEnter={draggable ? onDragEnter : undefined}
      onDragOver={draggable ? onDragOver : undefined}
      onDragLeave={draggable ? onDragLeave : undefined}
      onDrop={draggable ? onDrop : undefined}
      onDragEnd={draggable ? onDragEnd : undefined}
    >
      <StyledTreeNodeContent
        ref={nodeRef}
        {...innerStyles.nodeContent}
        draggable={(!disabled && draggable) || undefined}
        aria-grabbed={(!disabled && draggable) || undefined}
        onDragStart={draggable ? onDragStart : undefined}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onContextMenu={onContextMenu}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      >
        {renderExpandIcon()}
        {checkboxNode}
        {renderSelector()}
      </StyledTreeNodeContent>
      <StyledChildTree {...innerStyles.childTree}>{childTreeNode}</StyledChildTree>
    </StyledTreeNode>
  );
};

export default TreeNode;
