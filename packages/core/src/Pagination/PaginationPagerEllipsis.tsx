import React from 'react';

import { MoreIcon as More, SpeedIcon, SpeedLeftIcon } from '@muya-ui/theme-light';

import useLocale from '../Locale/useLocale';
import Tooltip from '../Tooltip';
import { ICustomStyleItem, ISizeSpecBaseProps } from '../types';
import useTheme from '../utils/useTheme';
import { StyledJumpIcon, StyledMoreIcon, StyledPaginationEllipsis } from './styled';

interface IPagerButtonProps extends ICustomStyleItem, ISizeSpecBaseProps {
  onClick: () => void;
  type: 'prev' | 'next';
  isDarkBackground: boolean;
}

export default React.memo<IPagerButtonProps>(props => {
  const theme = useTheme();
  const locale = useLocale();

  const {
    MoreIcon = More,
    FastBackwardIcon = SpeedLeftIcon,
    FastForwardIcon = SpeedIcon,
    tooltipDelay,
  } = theme.components.Pagination;
  const { type, ...other } = props;
  const Icon = type === 'next' ? FastForwardIcon : FastBackwardIcon;
  const title = type === 'next' ? locale['Pagination.next5'] : locale['Pagination.prev5'];

  return (
    <Tooltip title={title} placement="top" enterDelay={tooltipDelay}>
      <StyledPaginationEllipsis theme={theme} {...other}>
        <StyledMoreIcon theme={theme}>
          <MoreIcon />
        </StyledMoreIcon>
        <StyledJumpIcon theme={theme}>
          <Icon />
        </StyledJumpIcon>
      </StyledPaginationEllipsis>
    </Tooltip>
  );
});
