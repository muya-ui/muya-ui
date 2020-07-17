import React, { useMemo } from 'react';

import Tooltip from '../Tooltip';
import Typography from '../Typography';
import memoForwardRef from '../utils/memoForwardRef';
import mergeStyleItem from '../utils/mergeStyleItem';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';

import { IBaseSliderProps } from './innerTypes';
import {
  StyledBaseRootTrack,
  StyledCircle,
  StyledMarkLabel,
  StyledMarkPoint,
  StyledMarksRow,
  StyledRange,
  StyledRoot,
} from './styled';
import { ISliderMarkItem } from './types';
import useBaseSlider from './useBaseSlider';

function defaultTipFormatter(str: number) {
  return str.toString();
}

const defaultStyles = {
  startCircle: '',
  endCircle: '',
  markPoint: '',
  markPointInclude: '',
  marksRow: '',
  markLabel: '',
  track: '',
  range: '',
};
const BaseSlider = memoForwardRef<HTMLDivElement, IBaseSliderProps>((props, ref) => {
  const {
    startCircleStyle,
    endCircleStyle,
    rangeStyle,
    start,
    end,

    innerMarksOnly,
    finalMarks,
    markPropsMap,
    markNums,
    movingType,
    trackRef,
    handleStartMoveStartCircle,
    handleStartMoveEndCircle,
    handleTrackClick,

    handleEnterStart,
    handleLeaveStart,
    handleEnterEnd,
    handleLeaveEnd,

    endTooltipOpen,
    startTooltipOpen,

    // 透传
    hideStart,
    vertical,
    tooltipVisible,
    otherProps,
    styles,
    disabled,
    tooltipPlacement,
    markLabelDisabled,
    tipFormatter = defaultTipFormatter,
  } = useBaseSlider(props);
  const innerStyles = useStyles('slider', defaultStyles, styles);
  const theme = useTheme();
  const memoStartCircleStyle = useMemo(() => {
    if (!innerStyles.startCircle.style) {
      return startCircleStyle;
    }
    return {
      ...innerStyles.startCircle.style,
      ...startCircleStyle,
    };
  }, [innerStyles.startCircle.style, startCircleStyle]);
  const startCircleNode = useMemo(
    () =>
      hideStart ? null : (
        <StyledCircle
          className={innerStyles.startCircle.className}
          $moving={movingType === 'start'}
          theme={theme}
          $disabled={disabled}
          $vertical={vertical}
          style={memoStartCircleStyle}
          onMouseDown={handleStartMoveStartCircle}
          onMouseEnter={handleEnterStart}
          onMouseLeave={handleLeaveStart}
        />
      ),
    [
      disabled,
      handleEnterStart,
      handleLeaveStart,
      handleStartMoveStartCircle,
      hideStart,
      innerStyles.startCircle.className,
      memoStartCircleStyle,
      movingType,
      theme,
      vertical,
    ],
  );
  const memoEndCircleStyle = useMemo(() => {
    if (!innerStyles.endCircle.style) {
      return endCircleStyle;
    }
    return {
      ...innerStyles.endCircle.style,
      ...endCircleStyle,
    };
  }, [endCircleStyle, innerStyles.endCircle.style]);
  // 第二个控制点的渲染
  const endCircleNode = useMemo(
    () => (
      <StyledCircle
        className={innerStyles.endCircle.className}
        $moving={movingType === 'end'}
        theme={theme}
        $disabled={disabled}
        $vertical={vertical}
        style={memoEndCircleStyle}
        onMouseDown={handleStartMoveEndCircle}
        onMouseEnter={handleEnterEnd}
        onMouseLeave={handleLeaveEnd}
      />
    ),
    [
      disabled,
      handleEnterEnd,
      handleLeaveEnd,
      handleStartMoveEndCircle,
      innerStyles.endCircle.className,
      memoEndCircleStyle,
      movingType,
      theme,
      vertical,
    ],
  );
  let startNode = startCircleNode;
  let endNode = endCircleNode;
  if (tooltipVisible) {
    startNode = startCircleNode && (
      <Tooltip title={tipFormatter(start)} placement={tooltipPlacement} open={startTooltipOpen}>
        {startCircleNode}
      </Tooltip>
    );
    endNode = (
      <Tooltip title={tipFormatter(end)} placement={tooltipPlacement} open={endTooltipOpen}>
        {endCircleNode}
      </Tooltip>
    );
  }
  let markPointsNode;
  let marksRowNode;

  if (finalMarks) {
    markPointsNode = markNums.map(keyNum => {
      const $include = keyNum > start && keyNum < end;
      const markProps = markPropsMap[keyNum];
      let innerStyle = markProps.style;
      if ($include && innerStyles.markPointInclude.style) {
        innerStyle = {
          ...innerStyles.markPointInclude.style,
          ...innerStyle,
        };
      } else if (!$include && innerStyles.markPoint.style) {
        innerStyle = {
          ...innerStyles.markPoint.style,
          ...innerStyle,
        };
      }
      const pointClassName = $include
        ? innerStyles.markPointInclude.className
        : innerStyles.markPoint.className;

      return (
        <StyledMarkPoint
          className={pointClassName}
          theme={theme}
          $include={$include}
          $disabled={disabled}
          key={keyNum}
          $vertical={vertical}
          style={innerStyle}
          onClick={markProps.onClick}
        />
      );
    });
  }
  const markLabelPropsMap = useMemo(() => {
    const map: Record<
      number,
      { markLabel: React.ReactNode; markProps: React.HTMLAttributes<HTMLDivElement> }
    > = {};
    if (!finalMarks) {
      return map;
    }
    markNums.forEach(keyNum => {
      const label = finalMarks[keyNum];
      const markItem = label as ISliderMarkItem;
      const markProps = markPropsMap[keyNum];
      let markStyle = markProps.style;
      let markLabel = label;
      if (markItem.label) {
        markLabel = markItem.label;
      }
      if (markItem.style) {
        markStyle = {
          ...markItem.style,
          ...markStyle,
        };
      }
      if (innerStyles.markLabel.style) {
        markStyle = {
          ...innerStyles.markLabel.style,
          ...markStyle,
        };
      }
      map[keyNum] = {
        markProps: {
          className: innerStyles.markLabel.className,
          style: markStyle,
          onClick: markProps.onClick,
        },
        markLabel,
      };
    });
    return map;
  }, [
    finalMarks,
    innerStyles.markLabel.className,
    innerStyles.markLabel.style,
    markNums,
    markPropsMap,
  ]);
  if (finalMarks && !markLabelDisabled) {
    marksRowNode = (
      <StyledMarksRow theme={theme} $vertical={vertical}>
        {markNums.map(keyNum => {
          const { markProps, markLabel } = markLabelPropsMap[keyNum];
          let labelNode;
          if (React.isValidElement(markLabel)) {
            labelNode = markLabel;
          } else {
            labelNode = <Typography.Text>{markLabel}</Typography.Text>;
          }

          return (
            <StyledMarkLabel
              theme={theme}
              $disabled={disabled}
              key={keyNum}
              $vertical={vertical}
              {...markProps}
            >
              {labelNode}
            </StyledMarkLabel>
          );
        })}
      </StyledMarksRow>
    );
  }

  const rangeStyleItem = useMemo(() => mergeStyleItem({ style: rangeStyle }, innerStyles.range), [
    innerStyles.range,
    rangeStyle,
  ]);

  return (
    <StyledRoot
      theme={theme}
      $disabled={disabled}
      $vertical={vertical}
      $moving={movingType !== 'none'}
      $disableClick={innerMarksOnly}
      {...otherProps}
      ref={ref}
    >
      <StyledBaseRootTrack
        {...innerStyles.track}
        theme={theme}
        $disabled={disabled}
        $disableClick={innerMarksOnly}
        $moving={movingType !== 'none'}
        $vertical={vertical}
        ref={trackRef}
        onClick={handleTrackClick}
      >
        {startNode}
        {endNode}
        {markPointsNode}
        <StyledRange
          $moving={movingType !== 'none'}
          theme={theme}
          $disabled={disabled}
          $vertical={vertical}
          $disableClick={innerMarksOnly}
          {...rangeStyleItem}
        />
      </StyledBaseRootTrack>
      {marksRowNode}
    </StyledRoot>
  );
});

export default BaseSlider;
