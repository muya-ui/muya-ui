import { omit } from 'lodash';
import React, { useMemo } from 'react';

import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { allTreeProps } from './const';
import { StyledTree } from './styled';
import TreeContext from './TreeContext';
import TreeNode from './TreeNode';
import { ITreeBaseProps, ITreeNodeData, ITreeProps } from './types';
import useTree from './useTree';

const Tree = <T extends ITreeNodeData>(props: ITreeProps<T>) => {
  const { className, style, styles, treeRef, scrollable } = props;
  const theme = useTheme();
  const contextValue = useTree<T>(props);
  const { treeData, size } = contextValue;
  let treeStyles;
  if (styles) {
    const { wrapper } = styles;
    treeStyles = { wrapper };
  }
  const innerStyles = useStyles(
    'tree',
    {
      wrapper: '',
    },
    treeStyles,
  );
  const innerStyle = useMemo(() => {
    return { ...innerStyles.wrapper.style, ...style };
  }, [innerStyles.wrapper.style, style]);
  const domProps = omit<ITreeProps<T>, keyof ITreeBaseProps<T>>(props, allTreeProps);
  const children = useMemo(() => {
    return treeData.map(node => (
      <TreeNode<T> styles={styles} key={node.key} nodeKey={node.key!} data={node} {...node} />
    ));
  }, [styles, treeData]);
  return (
    <TreeContext.Provider value={contextValue}>
      <StyledTree
        ref={treeRef}
        role="tree"
        $size={size!}
        $scrollable={scrollable!}
        theme={theme}
        {...domProps}
        className={[innerStyles.wrapper.className, className].join(' ').trim()}
        style={innerStyle}
      >
        {children}
      </StyledTree>
    </TreeContext.Provider>
  );
};

Tree.defaultProps = {
  size: 'm',
  showLine: false,
  expandOnClick: false,
  checkOnClick: false,
  renderAfterExpand: false,
  disabled: false,
  multiple: false,
  selectable: true,
  scrollable: false,
  defaultSelectedKeys: [],
  autoExpandParent: true,
  defaultExpandedKeys: [],
  defaultExpandAll: false,
  notLeafCheckable: true,
  checkable: false,
  defaultCheckedKeys: [],
  checkStrictly: false,
  draggable: false,
  disableNativeTitle: false,
};

export default Tree;
