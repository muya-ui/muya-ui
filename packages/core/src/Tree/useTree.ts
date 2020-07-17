import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import warning from 'warning';

import { useEventCallback } from '@muya-ui/utils';

import { ITreeContextValue } from './innerTypes';
import {
  CheckEventTrigger,
  ExpandEventTrigger,
  ITreeCheckInfo,
  ITreeNodeData,
  ITreeNodeEventData,
  ITreeNodeKey,
  ITreeProps,
} from './types';
import {
  calcDropPosition,
  calcSelectedKeys,
  conductCheck,
  conductExpandParent,
  convertDataToEntities,
  getDragNodesKeys,
  getInitCheckedKeys,
  getInitExpandedKeys,
  parseCheckedKeys,
  posToArray,
  transformTreeData,
  warningWithoutKey,
} from './utils';
import { arrayDel, arrayAdd } from '../utils/array';

function usePrevious<T>(value: T) {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export const useTree = <T extends ITreeNodeData>(props: ITreeProps<T>): ITreeContextValue<T> => {
  const {
    data,
    customKeyName,
    customTitleName,
    customChildrenName,
    disableNativeTitle,
    multiple,
    selectable,
    notLeafCheckable,
    checkable,
    size,
    disabled,
    draggable,
    checkStrictly,
    autoExpandParent,
    defaultExpandAll,
    selectedKeys: selectedKeysProp,
    expandedKeys: expandedKeysProp,
    checkedKeys: checkedKeysProp,
    loadedKeys: loadedKeysProp,
    defaultSelectedKeys,
    onDragStart,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDragEnd,
    onDrop,
    onClick,
    onDoubleClick,
    onSelect,
    onCheck,
    loadData,
    onLoad,
    onExpand,
    onMouseEnter,
    onMouseLeave,
    onRightClick,
    renderNodeContent,
    renderNodeRightArea,
    icon,
    expandIcon,
    expandOnClick,
    checkOnClick,
    showLine,
    renderAfterExpand,
  } = props;
  const dragNodeRef = useRef<ITreeNodeEventData<T> | null>(null);
  const delayedDragEnterLogicRef = useRef<Record<string, number>>();
  const [treeData, setTreeData] = useState(
    transformTreeData<T>(data, customKeyName, customTitleName, customChildrenName),
  );
  const [keyEntities, setKeyEntities] = useState(convertDataToEntities<T>(treeData).keyEntities);
  const [selectedKeys, setSelectedKeys] = useState(
    calcSelectedKeys(
      'selectedKeys' in props ? selectedKeysProp! : defaultSelectedKeys!,
      multiple!,
    ) || [],
  );
  const [checkedKeys, setCheckedKeys] = useState<ITreeNodeKey[]>(
    getInitCheckedKeys<T>(props, keyEntities).checkedKeys,
  );
  const [halfCheckedKeys, setHalfCheckedKeys] = useState<ITreeNodeKey[]>(
    getInitCheckedKeys<T>(props, keyEntities).halfCheckedKeys,
  );
  const [loadedKeys, setLoadedKeys] = useState<ITreeNodeKey[]>(
    'loadedKeys' in props ? loadedKeysProp! : [],
  );
  const [loadingKeys, setLoadingKeys] = useState<ITreeNodeKey[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<ITreeNodeKey[]>(
    getInitExpandedKeys<T>(props, keyEntities),
  );
  const [dragState, setDragState] = useState<{
    dragging: boolean;
    dragNodesKeys: ITreeNodeKey[];
    dragOverNodeKey: ITreeNodeKey | null;
    dropPosition: number | null;
  }>({
    dragging: false,
    dragNodesKeys: [],
    dragOverNodeKey: null,
    dropPosition: null,
  });
  const prevTreeData = usePrevious(data);
  const prevSelectedKeys = usePrevious(selectedKeysProp);
  const prevCheckedKeys = usePrevious(checkedKeysProp);
  const prevExpandedKeys = usePrevious(expandedKeysProp);
  const prevAutoExpandParent = usePrevious(autoExpandParent);
  const prevDefaultExpandAll = usePrevious(defaultExpandAll);

  /* eslint-disable complexity, react-hooks/exhaustive-deps */
  useEffect(() => {
    let newTreeData: T[] | null = null;
    if (prevTreeData !== data) {
      newTreeData = transformTreeData<T>(data, customKeyName, customTitleName, customChildrenName);
      setTreeData(newTreeData);
    }
    let newKeyEntities = keyEntities;
    if (newTreeData) {
      const entitiesMap = convertDataToEntities(newTreeData);
      newKeyEntities = entitiesMap.keyEntities;
      setKeyEntities(newKeyEntities);
      if (process.env.NODE_ENV !== 'production') {
        warningWithoutKey(treeData);
      }
    }
    if (
      ('expandedKeys' in props && expandedKeysProp !== prevExpandedKeys) ||
      ('autoExpandParent' in props && autoExpandParent !== prevAutoExpandParent)
    ) {
      setExpandedKeys(
        autoExpandParent || defaultExpandAll
          ? conductExpandParent(expandedKeysProp!, newKeyEntities)
          : expandedKeysProp!,
      );
    } else if ('defaultExpandAll' in props && defaultExpandAll !== prevDefaultExpandAll) {
      setExpandedKeys(getInitExpandedKeys<T>(props, keyEntities));
    }
    if (selectable) {
      if ('selectedKeys' in props && selectedKeysProp !== prevSelectedKeys) {
        setSelectedKeys(calcSelectedKeys(selectedKeysProp!, multiple!) || []);
      }
    }
    if (checkable) {
      let checkedKeyEntity: {
        checkedKeys?: ITreeNodeKey[];
        halfCheckedKeys?: ITreeNodeKey[];
      } | null = null;
      if ('checkedKeys' in props && checkedKeysProp !== prevCheckedKeys) {
        checkedKeyEntity = parseCheckedKeys(checkedKeysProp!) || {};
      } else if (newTreeData) {
        checkedKeyEntity = parseCheckedKeys(checkedKeys!) || {
          checkedKeys,
          halfCheckedKeys,
        };
      }
      if (checkedKeyEntity) {
        let { checkedKeys = [] } = checkedKeyEntity;
        if (!checkStrictly) {
          checkedKeyEntity = conductCheck(checkedKeys, true, newKeyEntities);
        }
        setCheckedKeys(checkedKeyEntity!.checkedKeys!);
        setHalfCheckedKeys(checkedKeyEntity!.halfCheckedKeys!);
      }
    }
    if ('loadedKeys' in props && loadedKeysProp !== loadedKeys) {
      setLoadedKeys(loadedKeysProp!);
    }
  });
  /* eslint-enable complexity, react-hooks/exhaustive-deps */

  const onNodeDragStart = useCallback(
    (event: React.DragEvent, eventData: ITreeNodeEventData<T>) => {
      const { nodeKey } = eventData;
      dragNodeRef.current = eventData;
      setDragState(state => ({
        ...state,
        dragging: true,
        dragNodesKeys: getDragNodesKeys(nodeKey, keyEntities),
        expandedKeys: arrayDel(expandedKeys, nodeKey),
      }));
      if (onDragStart) {
        onDragStart(event, eventData);
      }
    },
    [expandedKeys, keyEntities, onDragStart],
  );

  const onNodeDragEnd = useCallback(
    (event: React.DragEvent, eventData: ITreeNodeEventData<T>) => {
      setDragState(state => ({
        ...state,
        dragging: false,
        dragOverNodeKey: '',
      }));
      if (onDragEnd) {
        onDragEnd(event, eventData);
      }
      dragNodeRef.current = null;
    },
    [onDragEnd],
  );

  /**
   * [Legacy] Select handler is less small than node,
   * so that this will trigger when drag enter node or select handler.
   * This is a little tricky if customize css without padding.
   * Better for use mouse move event to refresh drag state.
   * But let's just keep it to avoid event trigger logic change.
   */
  const onNodeDragEnter = useEventCallback(
    (event: React.DragEvent, eventData: ITreeNodeEventData<T>) => {
      const { pos, nodeKey } = eventData;
      if (!dragNodeRef.current) return;
      const dropPosition = calcDropPosition(event, eventData);
      if (dragNodeRef.current.key === nodeKey && dropPosition === 0) {
        setDragState(state => ({
          ...state,
          dragOverNodeKey: '',
          dropPosition: null,
        }));
        return;
      }
      // Ref: https://github.com/react-component/tree/issues/132
      // Add timeout to let onDragLevel fire before onDragEnter,
      // so that we can clean drag props for onDragLeave node.
      // Macro task for this:
      // https://html.spec.whatwg.org/multipage/webappapis.html#clean-up-after-running-script
      setTimeout(() => {
        setDragState(state => ({
          ...state,
          dragOverNodeKey: nodeKey,
          dropPosition,
        }));
        if (!delayedDragEnterLogicRef.current) {
          delayedDragEnterLogicRef.current = {};
        }
        Object.keys(delayedDragEnterLogicRef.current).forEach(key => {
          clearTimeout(delayedDragEnterLogicRef.current![key]);
        });
        delayedDragEnterLogicRef.current[pos] = window.setTimeout(() => {
          if (!dragState.dragging) return;
          let newExpandedKeys = [...expandedKeys];
          const entity = keyEntities[nodeKey];
          if (entity && (entity.children || []).length) {
            newExpandedKeys = arrayAdd(expandedKeys, nodeKey);
          }
          if (!('expandedKeys' in props)) {
            setExpandedKeys(newExpandedKeys);
          }
          if (onDragEnter) {
            onDragEnter(event, eventData);
          }
        }, 400);
      }, 0);
    },
  );

  const onNodeDragOver = useEventCallback(
    (event: React.DragEvent, eventData: ITreeNodeEventData<T>) => {
      const { nodeKey } = eventData;
      if (dragNodeRef.current && nodeKey === dragState.dragOverNodeKey) {
        const dropPosition = calcDropPosition(event, eventData);
        if (dropPosition === dragState.dropPosition) return;
        setDragState(state => ({
          ...state,
          dropPosition,
        }));
      }
      if (onDragOver) {
        onDragOver(event, eventData);
      }
    },
  );

  const onNodeDragLeave = useCallback(
    (event: React.DragEvent, eventData: ITreeNodeEventData<T>) => {
      setDragState(state => ({
        ...state,
        dragOverNodeKey: '',
      }));
      if (onDragLeave) {
        onDragLeave(event, eventData);
      }
    },
    [onDragLeave],
  );

  const onNodeDrop = useEventCallback(
    (event: React.DragEvent, eventData: ITreeNodeEventData<T>) => {
      const { dragNodesKeys = [], dropPosition } = dragState;
      const { nodeKey, pos } = eventData;
      setDragState(state => ({
        ...state,
        dragging: false,
        dragOverNodeKey: '',
      }));
      if (dragNodesKeys.indexOf(nodeKey) !== -1) {
        warning(false, "[Tree]: Can not drop to dragNode(include it's children node)");
        return;
      }
      const posArr = posToArray(pos);
      const dropResult = {
        event,
        node: eventData,
        dragNode: dragNodeRef.current!,
        dragNodesKeys: dragNodesKeys.slice(),
        dropPosition: dropPosition! + Number(posArr[posArr.length - 1]),
        dropToGap: false,
      };
      if (dropPosition !== 0) {
        dropResult.dropToGap = true;
      }
      if (onDrop) {
        onDrop(dropResult);
      }
      dragNodeRef.current = null;
    },
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, eventData: ITreeNodeEventData<T>) => {
      if (onClick) {
        onClick(event, eventData);
      }
    },
    [onClick],
  );

  const onNodeDoubleClick = useCallback(
    (event: React.MouseEvent, eventData: ITreeNodeEventData<T>) => {
      if (onDoubleClick) {
        onDoubleClick(event, eventData);
      }
    },
    [onDoubleClick],
  );

  const onNodeSelect = useEventCallback(
    (event: React.MouseEvent, eventData: ITreeNodeEventData<T>) => {
      let newSelectedKeys;
      const { selected, nodeKey } = eventData;
      const targetSelected = !selected;
      if (!targetSelected) {
        newSelectedKeys = arrayDel(selectedKeys, nodeKey);
      } else if (!multiple) {
        newSelectedKeys = [nodeKey];
      } else {
        newSelectedKeys = arrayAdd(selectedKeys, nodeKey);
      }
      if (!('selectedKeys' in props)) {
        setSelectedKeys(newSelectedKeys);
      }
      if (onSelect) {
        onSelect(newSelectedKeys, {
          selected: targetSelected,
          nativeEvent: event.nativeEvent,
          data: eventData,
        });
      }
    },
  );

  const onNodeCheck = useEventCallback(
    (e: React.SyntheticEvent, eventData: ITreeNodeEventData<T>, trigger: CheckEventTrigger) => {
      const oriCheckedKeys = checkedKeys;
      const oriHalfCheckedKeys = halfCheckedKeys;
      const { nodeKey, checked } = eventData;
      const targetChecked = !checked;
      let checkedObj;
      const eventObj: Partial<ITreeCheckInfo> = {
        data: eventData,
        checked: targetChecked,
        trigger,
        nativeEvent: e.nativeEvent,
      };
      if (checkStrictly) {
        const newCheckedKeys = targetChecked
          ? arrayAdd(oriCheckedKeys, nodeKey)
          : arrayDel(oriCheckedKeys, nodeKey);
        const newHalfCheckedKeys = arrayDel(oriHalfCheckedKeys, nodeKey);
        checkedObj = { checked: newCheckedKeys, halfChecked: newHalfCheckedKeys };
        eventObj.checkedNodes = newCheckedKeys
          .map(checkedKey => keyEntities[checkedKey])
          .filter(entity => entity)
          .map(entity => entity.node);
        if (!('checkedKeys' in props)) {
          setCheckedKeys(newCheckedKeys);
        }
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
        eventObj.checkedNodes = [];
        eventObj.checkedNodesPositions = [];
        eventObj.halfCheckedKeys = newHalfCheckedKeys;
        newCheckedKeys.forEach(checkedKey => {
          const entity = keyEntities[checkedKey];
          if (!entity) return;
          const { node, pos } = entity;
          eventObj.checkedNodes!.push(node);
          eventObj.checkedNodesPositions!.push({ node, pos });
        });
        if (!('checkedKeys' in props)) {
          setCheckedKeys(newCheckedKeys);
          setHalfCheckedKeys(newHalfCheckedKeys);
        }
      }
      if (onCheck) {
        onCheck(checkedObj, eventObj as ITreeCheckInfo<T>);
      }
    },
  );

  const onNodeLoad = useEventCallback(async (eventData: ITreeNodeEventData<T>) => {
    const { nodeKey } = eventData;
    if (!loadData || loadedKeys.indexOf(nodeKey) !== -1 || loadingKeys.indexOf(nodeKey) !== -1) {
      return {};
    }
    setLoadingKeys(arrayAdd(loadingKeys, nodeKey));
    await loadData(eventData);
    const newLoadedKeys = arrayAdd(loadedKeys, nodeKey);
    const newLoadingKeys = arrayDel(loadingKeys, nodeKey);
    if (onLoad) {
      onLoad(newLoadedKeys, eventData);
    }
    if (!('loadedKeys' in props)) {
      setLoadedKeys(newLoadedKeys);
    }
    setLoadingKeys(newLoadingKeys);
  });

  const onNodeExpand = useEventCallback(
    async (
      event: React.MouseEvent,
      eventData: ITreeNodeEventData<T>,
      trigger: ExpandEventTrigger,
    ) => {
      let newExpandedKeys;
      const { nodeKey, expanded } = eventData;
      const index = expandedKeys.indexOf(nodeKey);
      const targetExpanded = !expanded;
      warning(
        (expanded && index !== -1) || (!expanded && index === -1),
        '[Tree]: Expand state not sync with index check',
      );
      if (targetExpanded) {
        newExpandedKeys = arrayAdd(expandedKeys, nodeKey);
      } else {
        newExpandedKeys = arrayDel(expandedKeys, nodeKey);
      }
      if (!('expandedKeys' in props)) {
        setExpandedKeys(newExpandedKeys);
      }
      if (onExpand) {
        onExpand(newExpandedKeys, {
          data: eventData,
          trigger,
          expanded: targetExpanded,
          nativeEvent: event.nativeEvent,
        });
      }
      if (targetExpanded && loadData) {
        await onNodeLoad(eventData);
        if (!('expandedKeys' in props)) {
          setExpandedKeys(newExpandedKeys);
        }
      }
    },
  );

  const onNodeMouseEnter = useCallback(
    (event: React.MouseEvent, eventData: ITreeNodeEventData<T>) => {
      if (onMouseEnter) {
        onMouseEnter(event, eventData);
      }
    },
    [onMouseEnter],
  );

  const onNodeMouseLeave = useCallback(
    (event: React.MouseEvent, eventData: ITreeNodeEventData<T>) => {
      if (onMouseLeave) {
        onMouseLeave(event, eventData);
      }
    },
    [onMouseLeave],
  );

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, eventData: ITreeNodeEventData<T>) => {
      if (onRightClick) {
        event.preventDefault();
        onRightClick(event, eventData);
      }
    },
    [onRightClick],
  );

  const contextValue = {
    keyEntities,
    selectedKeys,
    checkedKeys,
    halfCheckedKeys,
    loadedKeys,
    loadingKeys,
    expandedKeys,
    dragOverNodeKey: dragState.dragOverNodeKey,
    dropPosition: dragState.dropPosition,
    treeData,
    disableNativeTitle,
    onNodeDragStart,
    onNodeDragEnd,
    onNodeDragEnter,
    onNodeDragOver,
    onNodeDragLeave,
    onNodeDrop,
    onNodeClick,
    onNodeDoubleClick,
    onNodeSelect,
    onNodeCheck,
    onNodeExpand,
    onNodeMouseEnter,
    onNodeMouseLeave,
    onNodeContextMenu,
    onNodeLoad,
    size,
    disabled,
    selectable,
    checkable,
    notLeafCheckable,
    draggable,
    loadData,
    renderNodeContent,
    renderNodeRightArea,
    icon,
    expandIcon,
    expandOnClick,
    checkOnClick,
    showLine,
    renderAfterExpand,
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => contextValue, [
    contextValue.keyEntities,
    contextValue.selectedKeys,
    contextValue.checkedKeys,
    contextValue.halfCheckedKeys,
    contextValue.loadedKeys,
    contextValue.loadingKeys,
    contextValue.expandedKeys,
    contextValue.dragOverNodeKey,
    contextValue.dropPosition,
    contextValue.treeData,
    contextValue.size,
    contextValue.disableNativeTitle,
    contextValue.disabled,
    contextValue.selectable,
    contextValue.checkable,
    contextValue.notLeafCheckable,
    contextValue.draggable,
    contextValue.icon,
    contextValue.expandIcon,
    contextValue.expandOnClick,
    contextValue.checkOnClick,
    contextValue.showLine,
  ]);
};

export default useTree;
