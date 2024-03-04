import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';

import { GuildLeftIcon, GuildRightIcon, NextYearIcon, PrevYearIcon } from '@muya-ui/theme-light';

import { InlineButton } from '../Button';
import IconButton from '../IconButton/IconButton';
import useLocale from '../Locale/useLocale';
import Tooltip from '../Tooltip';
import { ICustomStyleItem } from '../types';
import Typography from '../Typography';
import forkHandler from '../utils/forkHandler';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { ICalendarHeadProps } from './innerTypes';
import { ICalendarType } from './types';
import { getDecade } from './utils';

const StyledDecadeTitle = styled(props => <Typography.Title {...props} />)``;

const PagerButton = styled(IconButton)``;

const pagerCss = css`
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
`;

const PagerPrev = styled.div`
  ${pagerCss}
  left: 0;
`;

const PagerNext = styled.div`
  ${pagerCss}
  right: 0;
`;

const SwitchButton = styled(InlineButton)``;

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  ${StyledDecadeTitle} {
    margin-bottom: 0;
  }

  ${props => {
    const {
      colors,
      components: { Calendar: token },
    } = props.theme;
    return css`
      height: ${token.head.height}px;
      border-bottom: 1px solid ${colors.pattern.border.normal};

      ${SwitchButton} {
        margin: 0;
        padding: ${token.headButton.padding};
      }

      ${PagerPrev} ${PagerButton},
      ${PagerNext} ${PagerButton} {
        margin: ${token.pagerButton.margin};
      }
      ${PagerPrev} ${PagerButton} {
        margin-right: 0;
      }
      ${PagerNext} ${PagerButton} {
        margin-left: 0;
      }
    `;
  }}
`;

const defaultStyles = {
  pagerPrev: '',
  pagerPrevYear: '',
  pagerPrevMonth: '',
  pagerNext: '',
  pagerNextYear: '',
  pagerNextMonth: '',
  switchYear: '',
  switchMonth: '',
};
const CalendarHead = memoForwardRef<HTMLDivElement, ICalendarHeadProps>((props, ref) => {
  const {
    viewType = 'month',
    viewDate,
    onNextMonth,
    onNextYear,
    onPrevMonth,
    onPrevYear,
    onSwitch,
    styles,
    ...otherProps
  } = props;
  const pickStyles = useMemo(() => {
    if (styles) {
      const {
        pagerPrev,
        pagerPrevYear,
        pagerPrevMonth,
        pagerNext,
        pagerNextYear,
        pagerNextMonth,
        switchYear,
        switchMonth,
      } = styles;
      return {
        pagerPrev,
        pagerPrevYear,
        pagerPrevMonth,
        pagerNext,
        pagerNextYear,
        pagerNextMonth,
        switchYear,
        switchMonth,
      };
    }
  }, [styles]);

  const innerStyles = useStyles('calendar', defaultStyles, pickStyles);
  const theme = useTheme();
  const {
    pagerArrow,
    pagerArrowTipDelay,
    head: { defaultDecadeTitleLevel },
  } = theme.components.Calendar;
  const Arrow = {
    monthPrev: GuildLeftIcon,
    monthNext: GuildRightIcon,
    yearPrev: PrevYearIcon,
    yearNext: NextYearIcon,
    ...pagerArrow,
  };
  const {
    'Calendar.yearFormat': yearFormat,
    'Calendar.headOrder': headOrder,
    'Calendar.pagerNextMonth': pagerNextMonth,
    'Calendar.pagerNextYear': pagerNextYear,
    'Calendar.pagerNextDecade': pagerNextDecade,
    'Calendar.pagerPrevMonth': pagerPrevMonth,
    'Calendar.pagerPrevYear': pagerPrevYear,
    'Calendar.pagerPrevDecade': pagerPrevDecade,
  } = useLocale();
  const handleSwitch = (type: ICalendarType) => () => {
    onSwitch && onSwitch(type);
  };
  const yearBtn = (
    <SwitchButton
      {...innerStyles.switchYear}
      type="strong"
      onClick={handleSwitch('decade')}
      size="s"
    >
      {viewDate.format(yearFormat)}
    </SwitchButton>
  );
  const monthBtn = (
    <SwitchButton
      {...innerStyles.switchMonth}
      type="strong"
      onClick={handleSwitch('year')}
      size="s"
    >
      {viewDate.format('MMM')}
    </SwitchButton>
  );
  let headNode;
  if (viewType === 'year') {
    headNode = yearBtn;
  } else if (viewType === 'decade') {
    const [firstYear, lastYear] = getDecade(viewDate);
    const title = `${firstYear.format(yearFormat)}-${lastYear.format(yearFormat)}`;
    headNode = <StyledDecadeTitle level={defaultDecadeTitleLevel}>{title}</StyledDecadeTitle>;
  } else if (headOrder === 'month') {
    headNode = (
      <>
        {monthBtn}
        {yearBtn}
      </>
    );
  } else {
    headNode = (
      <>
        {yearBtn}
        {monthBtn}
      </>
    );
  }

  const nextYearTip = viewType === 'decade' ? pagerNextDecade : pagerNextYear;
  const prevYearTip = viewType === 'decade' ? pagerPrevDecade : pagerPrevYear;
  const [showTooltip, setShowTooltip] = useState(true);

  const renderPagerButton = useCallback(
    (
      title: string,
      iconNode: ReactNode,
      styleItem: ICustomStyleItem,
      clickHandler?: () => void,
    ) => {
      const innerClickHandler = forkHandler(() => {
        setShowTooltip(false);
      }, clickHandler);
      const pagerNode = (
        <PagerButton {...styleItem} size="s" fontWeight="lighter" onClick={innerClickHandler}>
          {iconNode}
        </PagerButton>
      );
      if (showTooltip) {
        return (
          <Tooltip title={title} enterDelay={pagerArrowTipDelay}>
            {pagerNode}
          </Tooltip>
        );
      }
      return pagerNode;
    },
    [pagerArrowTipDelay, showTooltip],
  );

  const pagerPrev = useMemo(() => {
    const monthPrevPagerBtn =
      viewType === 'month'
        ? renderPagerButton(
            pagerPrevMonth,
            <Arrow.monthPrev />,
            innerStyles.pagerPrevMonth,
            onPrevMonth,
          )
        : null;
    return (
      <PagerPrev {...innerStyles.pagerPrev}>
        {renderPagerButton(prevYearTip, <Arrow.yearPrev />, innerStyles.pagerPrevYear, onPrevYear)}
        {monthPrevPagerBtn}
      </PagerPrev>
    );
  }, [
    innerStyles.pagerPrev,
    innerStyles.pagerPrevMonth,
    innerStyles.pagerPrevYear,
    onPrevMonth,
    onPrevYear,
    pagerPrevMonth,
    prevYearTip,
    renderPagerButton,
    viewType,
  ]);
  const pagerNext = useMemo(() => {
    const monthNextPagerBtn =
      viewType === 'month'
        ? renderPagerButton(
            pagerNextMonth,
            <Arrow.monthNext />,
            innerStyles.pagerNextMonth,
            onNextMonth,
          )
        : null;
    return (
      <PagerNext {...innerStyles.pagerNext}>
        {monthNextPagerBtn}
        {renderPagerButton(nextYearTip, <Arrow.yearNext />, innerStyles.pagerNextYear, onNextYear)}
      </PagerNext>
    );
  }, [
    innerStyles.pagerNext,
    innerStyles.pagerNextMonth,
    innerStyles.pagerNextYear,
    nextYearTip,
    onNextMonth,
    onNextYear,
    pagerNextMonth,
    renderPagerButton,
    viewType,
  ]);

  return (
    <Root {...otherProps} theme={theme} ref={ref}>
      {pagerPrev}
      {headNode}
      {pagerNext}
    </Root>
  );
});

export default CalendarHead;
