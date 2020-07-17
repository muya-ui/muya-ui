import { isUndefined } from 'lodash';
import { RefObject, useEffect, useMemo, useState } from 'react';

import { useEventCallback } from '@muya-ui/utils';

import { ITreeContextValue } from './innerTypes';
import { CheckEventTrigger, ExpandEventTrigger, ITreeNodeData, ITreeNodeProps } from './types';
import { getTreeNodeState } from './utils';

export const useTreeNode = <T extends ITreeNodeData>(
  props: ITreeNodeProps<T>,
  context: ITreeContextValue<T>,
  nodeRef: RefObject<HTMLDivElement>,
) => {
  const {
    nodeKey,
    isLeaf: isLeafProp,
    disabled: nodeDisabled,
    checkable: nodeCheckable,
    selectable: nodeSelectable,
    disableCheckbox,
  } = props;
  const [hovering, setHovering] = useState(false);
  const state = useMemo(() => {
    const state = getTreeNodeState(nodeKey, context);
    state.hovering = hovering;
    return state;
  }, [context, hovering, nodeKey]);
  const { loaded, expanded, loading } = state;
  const {
    expandOnClick,
    checkOnClick,
    keyEntities,
    loadData,
    disabled: treeDisabled,
    checkable: treeCheckable,
    notLeafCheckable,
    selectable: treeSelectable,
    onNodeLoad,
    onNodeClick,
    onNodeCheck,
    onNodeSelect,
    onNodeDoubleClick,
    onNodeMouseEnter,
    onNodeMouseLeave,
    onNodeContextMenu,
    onNodeDragStart,
    onNodeDragEnter,
    onNodeDragOver,
    onNodeDragLeave,
    onNodeDragEnd,
    onNodeDrop,
    onNodeExpand,
  } = context;
  // 首次渲染不需要展开动画
  const [expandAppear, setExpandAppear] = useState(false);
  const [dragNodeHighlight, setDragNodeHighlight] = useState(false);
  const disabled = !!(treeDisabled || nodeDisabled);
  const hasChildren = useMemo(() => {
    const { children = [] } = keyEntities[nodeKey] || {};
    return !!children.length;
  }, [keyEntities, nodeKey]);
  const isLeaf = useMemo(() => {
    if (isLeafProp === false) {
      return false;
    }
    return isLeafProp || (!loadData && !hasChildren) || (loadData && loaded && !hasChildren);
  }, [hasChildren, isLeafProp, loadData, loaded]);
  const checkable = useMemo(() => {
    /**
     * 1. 树或者树节点 checkable 为 false，那么当前节点不能选中
     * 2. 树可以选中且当前为非叶子节点，且 notLeafCheckable 为 false，那么当前节点不能选中
     */
    if (
      !treeCheckable ||
      nodeCheckable === false ||
      (treeCheckable &&
        (nodeCheckable || isUndefined(nodeCheckable)) &&
        !isLeaf &&
        !notLeafCheckable)
    ) {
      return false;
    }
    return treeCheckable;
  }, [treeCheckable, nodeCheckable, isLeaf, notLeafCheckable]);
  const selectable = useMemo(() => {
    if (typeof nodeSelectable === 'boolean') {
      return nodeSelectable;
    }
    return treeSelectable;
  }, [nodeSelectable, treeSelectable]);
  const eventData = useMemo(() => {
    return {
      ...state,
      ...props,
      nodeRef,
    };
  }, [nodeRef, props, state]);

  const onExpand = useEventCallback(
    (e: React.MouseEvent, trigger: ExpandEventTrigger = ExpandEventTrigger.ExpandIcon) => {
      e.stopPropagation();
      // 事件触发的第一次展开需要动画
      if (!expandAppear) {
        setExpandAppear(true);
      }
      onNodeExpand(e, eventData, trigger);
    },
  );

  const onSelect = useEventCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      onNodeSelect(e, eventData);
    },
    [disabled, eventData, onNodeSelect],
  );

  const onCheck = useEventCallback(
    (e: React.SyntheticEvent, trigger: CheckEventTrigger = CheckEventTrigger.Checkbox) => {
      if (disabled) return;
      if (!checkable || disableCheckbox) return;
      onNodeCheck(e, eventData, trigger);
    },
  );

  const onClick = useEventCallback((e: React.MouseEvent) => {
    onNodeClick(e, eventData);
    if (selectable) {
      onSelect(e);
    }
    if (checkOnClick) {
      onCheck(e, CheckEventTrigger.TreeNode);
    }
    if (expandOnClick) {
      onExpand(e, ExpandEventTrigger.TreeNode);
    }
  });

  const onDoubleClick = useEventCallback((e: React.MouseEvent) => {
    onNodeDoubleClick(e, eventData);
  });

  const onMouseEnter = useEventCallback((e: React.MouseEvent) => {
    if (!hovering) {
      setHovering(true);
    }
    onNodeMouseEnter(e, eventData);
  });

  const onMouseLeave = useEventCallback((e: React.MouseEvent) => {
    if (hovering) {
      setHovering(false);
    }
    onNodeMouseLeave(e, eventData);
  });

  const onContextMenu = useEventCallback((e: React.MouseEvent) => {
    onNodeContextMenu(e, eventData);
  });

  const onDragStart = useEventCallback((e: React.DragEvent) => {
    e.stopPropagation();
    setDragNodeHighlight(true);
    onNodeDragStart(e, eventData);
    try {
      e.dataTransfer.setData('text/plain', '');
    } catch (error) {}
  });

  const onDragEnter = useEventCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onNodeDragEnter(e, eventData);
  });

  const onDragOver = useEventCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onNodeDragOver(e, eventData);
  });

  const onDragLeave = useEventCallback((e: React.DragEvent) => {
    e.stopPropagation();
    onNodeDragLeave(e, eventData);
  });

  const onDragEnd = useEventCallback((e: React.DragEvent) => {
    e.stopPropagation();
    setDragNodeHighlight(false);
    onNodeDragEnd(e, eventData);
  });

  const onDrop = useEventCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragNodeHighlight(false);
    onNodeDrop(e, eventData);
  });

  useEffect(() => {
    if (loading) return;
    if (loadData && expanded && !isLeaf && !loaded && !hasChildren) {
      onNodeLoad(eventData);
    }
  });

  return {
    dragNodeHighlight,
    nodeState: state,
    expandAppear,
    disabled,
    checkable,
    selectable,
    isLeaf,
    onSelect,
    onCheck,
    onClick,
    onDoubleClick,
    onMouseEnter,
    onMouseLeave,
    onContextMenu,
    onDragStart,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDragEnd,
    onDrop,
    onExpand,
  };
};
