import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

import { InlineButton } from '../Button';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { ICalendarFooterProps } from './innerTypes';

const StyledButton = styled(InlineButton as any)``;

interface IRootProps {
  $type?: ICalendarFooterProps['type'];
}
const Root = styled.div<IRootProps>`
  display: flex;
  ${({ theme, $type = 'date' }) => {
    const {
      colors,
      components: {
        Calendar: { footer: footerToken },
      },
    } = theme;
    if ($type === 'date-time') {
      return css`
        flex: 1;
        padding: 0 12px;
        & ${StyledButton} {
          margin: 0 16px 0 0;
        }
      `;
    }
    return css`
      width: 100%;
      align-items: center;
      justify-content: center;
      height: ${footerToken.height}px;
      border-top: 1px solid ${colors.pattern.border.normal};

      & ${StyledButton} {
        margin: ${footerToken.optionMargin};
      }
    `;
  }}
`;

const defaultStyles = {
  footerOption: '',
};

const CalendarFooter = memoForwardRef<HTMLDivElement, ICalendarFooterProps>((props, ref) => {
  const { options, styles, type, ...otherProps } = props;
  const theme = useTheme();
  const pickStyles = useMemo(() => {
    if (styles) {
      const { footerOption } = styles;
      return { footerOption };
    }
  }, [styles]);

  const innerStyles = useStyles('calendar', defaultStyles, pickStyles);
  const optionsNode = useMemo(() => {
    if (!options || options.length < 1) {
      return;
    }
    return options.map(({ label, onClick, disabled }, index) => {
      return (
        <StyledButton
          {...innerStyles.footerOption}
          key={index}
          type="primary"
          size="s"
          fontWeight="lighter"
          disabled={disabled}
          onClick={onClick}
        >
          {label}
        </StyledButton>
      );
    });
  }, [innerStyles.footerOption, options]);
  return (
    <Root theme={theme} $type={type} {...otherProps} ref={ref}>
      {optionsNode}
    </Root>
  );
});

export default CalendarFooter;
