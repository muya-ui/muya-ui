import React, { Ref, useMemo } from 'react';

import { useMedia } from '@muya-ui/utils';
import { breakpointKeys, breakpointsUtils, IBreakpoint } from '@muya-ui/theme-light';

import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import RowContext, { defaultBreakpoint } from './RowContext';
import { StyledRow } from './styled';
import { IRowProps } from './types';

const Row = React.forwardRef((props: IRowProps, ref: Ref<HTMLDivElement>) => {
  const {
    children,
    align,
    justify,
    gutter: gutterProp,
    equalNum: equalNumProp,
    styles,
    className,
    style,
  } = props;
  const innerStyles = useStyles(
    'row',
    {
      wrapper: '',
    },
    styles,
  );
  const theme = useTheme();
  const {
    breakpoints: {
      spec: { breakpointsMap },
    },
  } = theme;
  const responsiveMap = useMemo(() => {
    return breakpointKeys.map((key: IBreakpoint) =>
      breakpointsUtils
        .only(
          {
            breakpointsMap,
          },
          key,
        )
        .replace('@media ', ''),
    );
  }, [breakpointsMap]);
  const breakpoint = useMedia(responsiveMap, breakpointKeys, defaultBreakpoint);
  const gutter: number = useMemo(() => {
    if (gutterProp && typeof gutterProp === 'object') {
      let flag = false;
      let latestNum;
      for (const point of [...breakpointKeys].reverse()) {
        if (breakpoint === point) {
          flag = true;
        }
        if (gutterProp[point]) {
          latestNum = gutterProp[point];
        }
        if (flag && gutterProp[point]) {
          return gutterProp[point] as number;
        }
      }
      return latestNum as number;
    }
    return gutterProp as number;
  }, [breakpoint, gutterProp]);
  const equalNum: number | undefined = useMemo(() => {
    if (equalNumProp && typeof equalNumProp === 'object') {
      let flag = false;
      let latestNum;
      for (const point of [...breakpointKeys].reverse()) {
        if (breakpoint === point) {
          flag = true;
        }
        if (equalNumProp[point]) {
          latestNum = equalNumProp[point];
        }
        if (flag && equalNumProp[point]) {
          return equalNumProp[point] as number;
        }
      }
      return latestNum;
    }
    return equalNumProp as number | undefined;
  }, [breakpoint, equalNumProp]);
  return (
    <RowContext.Provider value={{ gutter, breakpoint, equalNum }}>
      <StyledRow
        {...props}
        className={[innerStyles.wrapper.className, className].join(' ').trim()}
        style={{ ...innerStyles.wrapper.style, ...style }}
        ref={ref}
        theme={theme}
        $align={align}
        $justify={justify}
        $gutter={gutter}
      >
        {children}
      </StyledRow>
    </RowContext.Provider>
  );
});

Row.defaultProps = {
  align: 'top',
  justify: 'start',
  gutter: 0,
};

export default Row;
