import React, { Ref, useMemo } from 'react';

import { SvgIcon } from '@muya-ui/theme-light';

import useTheme from '../utils/useTheme';
import { StyledProgressBg, StyledProgressLine } from './styled';
import { IProgressProps } from './types';
import memoForwardRef from '../utils/memoForwardRef';

export default memoForwardRef((props: IProgressProps, ref: Ref<SVGSVGElement>) => {
  const { status = 'normal', progress = 0 } = props;
  const theme = useTheme();
  const {
    transition: { pattern: transitionPattern },
    colors: { pattern: colorsPattern },
    components: { Progress: token },
  } = theme;
  let defaultProgressColor = colorsPattern.feature.info;
  let defaultTextColor = colorsPattern.text.assistant;

  if (status === 'error') {
    defaultProgressColor = colorsPattern.feature.error;
  } else if (status === 'success' || progress >= 100) {
    defaultTextColor = colorsPattern.feature.success;
    defaultProgressColor = colorsPattern.feature.success;
  }

  const {
    // color
    textStyle,
    textColor = defaultTextColor,
    progressColor = defaultProgressColor,
    bgColor = token.defaultBgColor,

    // precent text
    percentSpacing = 0,
    showPercentage = true,
    showPercentageSymbol = true,

    // animate
    animate = true,
    animationDuration = transitionPattern.duration.status,

    fontSize = token.defaultFontSize,
    style,
    className,
    type = 'line',
    circleLineWidth: circleWidthPercent = 12.5,
    roundedStroke = true,
    ...other
  } = props;

  const outerRadius = 200;
  const circleLineWidth = (circleWidthPercent * outerRadius) / 100;
  const radius = outerRadius - circleLineWidth;
  const diameter = Math.round(Math.PI * radius * 2); // 内部圆直径
  const strokeDashoffset = Math.round(((100 - Math.min(progress, 100)) / 100) * diameter);
  const transition = animate
    ? `${type === 'line' ? 'width' : 'stroke-dashoffset'} ${animationDuration}ms ${
        transitionPattern.easing.status
      }`
    : undefined;
  const viewBox = `-${circleLineWidth} -${circleLineWidth} ${outerRadius * 2} ${outerRadius * 2}`;

  const textElement = useMemo(
    () => (
      <text
        style={textStyle}
        fill={textColor}
        x={radius}
        y={radius}
        fontSize={radius / 2}
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan textAnchor="middle" dominantBaseline="central">
          {progress}
        </tspan>
        {showPercentageSymbol && (
          <tspan textAnchor="middle" dominantBaseline="central" dx={percentSpacing}>
            %
          </tspan>
        )}
      </text>
    ),
    [percentSpacing, progress, radius, showPercentageSymbol, textColor, textStyle],
  );

  if (type === 'line') {
    return (
      <StyledProgressLine theme={theme} $bgColor={bgColor} style={style} className={className}>
        <StyledProgressBg
          style={{
            width: `${progress}%`,
            background: progressColor,
            transition,
          }}
        />
      </StyledProgressLine>
    );
  }
  return (
    <SvgIcon
      ref={ref}
      style={style}
      className={className}
      fontSize={fontSize}
      viewBox={viewBox}
      {...other}
    >
      <circle
        stroke={bgColor}
        cx={radius}
        cy={radius}
        r={radius}
        strokeWidth={circleLineWidth}
        fill="none"
      />
      <circle
        stroke={progressColor}
        transform={`rotate(-90 ${radius} ${radius})`}
        cx={radius}
        cy={radius}
        r={radius}
        strokeDasharray={diameter}
        strokeDashoffset={diameter}
        strokeWidth={circleLineWidth}
        strokeLinecap={roundedStroke ? 'round' : 'butt'}
        fill="none"
        style={{ strokeDashoffset, transition }}
      />
      {showPercentage ? textElement : <></>}
    </SvgIcon>
  );
});
