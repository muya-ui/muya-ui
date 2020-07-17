import React, { useRef, useMemo } from 'react';
import Tooltip from '../Tooltip';
import Typography from '../Typography';
import useEllipsis from '../utils/useEllipsis';
import { IEllipsisContentProps } from './types';

export const EllipsisContent = React.memo((props: IEllipsisContentProps) => {
  const {
    enableTooltip = true,
    placement = 'top',
    children,
    color,
    fontSize,
    tooltipProps,
    style,
    ...restProps
  } = props;
  const paragraphRef = useRef<HTMLDivElement | null>(null);
  const showTooltip = useEllipsis(paragraphRef, children);
  const innerStyle = useMemo(() => {
    const innerStyle: React.CSSProperties = style || {};
    if (!color && !innerStyle.color) {
      innerStyle.color = 'inherit';
    }
    if (!fontSize && !innerStyle.fontSize) {
      innerStyle.fontSize = 'inherit';
    }
    return innerStyle;
  }, [color, fontSize, style]);
  const ellipsisParagraph = useMemo(
    () => (
      <Typography.Paragraph
        ref={paragraphRef}
        as="div"
        ellipsis
        style={innerStyle}
        color={color}
        fontSize={fontSize}
        {...restProps}
      >
        {children}
      </Typography.Paragraph>
    ),
    [children, color, fontSize, innerStyle, restProps],
  );
  return enableTooltip && showTooltip ? (
    <Tooltip {...tooltipProps} title={children} placement={placement}>
      {ellipsisParagraph}
    </Tooltip>
  ) : (
    ellipsisParagraph
  );
});

export default EllipsisContent;
