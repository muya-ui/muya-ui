import React from 'react';

import { GuildLeftIcon, GuildRightIcon } from '@muya-ui/theme-light';

import useLocale from '../Locale/useLocale';
import Tooltip from '../Tooltip';
import { ICustomStyleItem, ISizeSpecBaseProps } from '../types';
import addPx from '../utils/addPx';
import useTheme from '../utils/useTheme';
import { StyledPageArrow } from './styled';

interface IPagerButtonProps extends ICustomStyleItem, ISizeSpecBaseProps {
  onClick: () => void;
  disabled: boolean;
  type: 'prev' | 'next';
  simple: boolean;
  isDarkBackground: boolean;
}

const pagerIconStyle = { verticalAlign: 'middle' };
export default React.memo<IPagerButtonProps>(props => {
  const theme = useTheme();
  const locale = useLocale();

  const {
    PageForwardIcon = GuildLeftIcon,
    PageBackwardIcon = GuildRightIcon,
    tooltipDelay,
    pageIconSize,
  } = theme.components.Pagination;
  const { type, ...other } = props;
  const Icon = type === 'next' ? PageBackwardIcon : PageForwardIcon;
  const title = type === 'next' ? locale['Pagination.nextPage'] : locale['Pagination.prevPage'];

  return (
    <Tooltip title={title} placement="top" enterDelay={tooltipDelay}>
      <StyledPageArrow theme={theme} {...other}>
        <Icon fontSize={addPx(pageIconSize)} style={pagerIconStyle} />
      </StyledPageArrow>
    </Tooltip>
  );
});
