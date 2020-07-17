import React, { useMemo, useCallback } from 'react';
import { FoldIcon } from '@muya-ui/theme-light';
import memoForwardRef from '../utils/memoForwardRef';
import { ICollapsePanelProps } from './types';
import ExpandIconWrapper from '../styled/components/ExpandIconWrapper';
import Typography from '../Typography';
import {
  StyledCollapseItem,
  StyledCollapseHeader,
  StyledExpandWrapper,
  StyledCollapseContent,
  expandedRotateKeyframes,
  notExpandedRotateKeyframes,
} from './styled';
import useTheme from '../utils/useTheme';
import Animation from '../Animation';
import Space from '../Space';
import useStyles from '../utils/useStyles';

const defaultStyles = {
  header: '',
  content: '',
  expandWrapper: '',
  prefixNodeWrapper: '',
  suffixNodeWrapper: '',
};

export default memoForwardRef<HTMLDivElement, ICollapsePanelProps>((props, ref) => {
  const theme = useTheme();
  const {
    expandIconPosition = 'left',
    isActive = false,
    showArrow = true,
    disabled = false,
    header,
    children,
    extra,
    expandIcon,
    onHeaderClick,
    styles,
    ...other
  } = props;

  const innerStyles = useStyles('collapse-panel', defaultStyles, styles);
  const DefaultExpandIcon = theme.components.Collapse.expandIcon || FoldIcon;

  const handleHeaderClick = useCallback(
    (e: React.MouseEvent) => {
      if (onHeaderClick && !disabled) {
        onHeaderClick(e);
      }
    },
    [disabled, onHeaderClick],
  );

  const stopPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const icon = useMemo(() => {
    if (!showArrow) {
      return null;
    }
    return (
      <StyledExpandWrapper
        $expandIconPosition={expandIconPosition}
        expandedKeyframes={expandedRotateKeyframes}
        notExpandedKeyframes={notExpandedRotateKeyframes}
        theme={theme}
        expanded={isActive}
        {...innerStyles.expandWrapper}
      >
        <ExpandIconWrapper>{expandIcon || <DefaultExpandIcon />}</ExpandIconWrapper>
      </StyledExpandWrapper>
    );
  }, [expandIcon, expandIconPosition, innerStyles.expandWrapper, isActive, showArrow, theme]);

  const prefixNode = useMemo(() => {
    const text = <Typography.Text strong>{header}</Typography.Text>;
    if (icon && expandIconPosition === 'left') {
      return (
        <Space {...innerStyles.prefixNodeWrapper}>
          {icon}
          {text}
        </Space>
      );
    }
    return text;
  }, [expandIconPosition, header, icon, innerStyles.prefixNodeWrapper]);

  const suffixNode = useMemo(() => {
    if (icon && expandIconPosition === 'right') {
      return (
        <Space {...innerStyles.suffixNodeWrapper}>
          <span onClick={stopPropagation}>{extra}</span>
          {icon}
        </Space>
      );
    }
    return <span onClick={stopPropagation}>{extra}</span>;
  }, [expandIconPosition, extra, icon, innerStyles.suffixNodeWrapper, stopPropagation]);

  return (
    <StyledCollapseItem {...other}>
      <StyledCollapseHeader
        {...innerStyles.header}
        $disabled={disabled}
        onClick={handleHeaderClick}
        theme={theme}
      >
        {prefixNode}
        {suffixNode}
      </StyledCollapseHeader>
      <Animation.Collapse easing="linear" in={isActive && !disabled}>
        <StyledCollapseContent {...innerStyles.content}>{children}</StyledCollapseContent>
      </Animation.Collapse>
    </StyledCollapseItem>
  );
});
