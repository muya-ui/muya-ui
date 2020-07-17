import React, { useMemo } from 'react';

import Trigger from '../Trigger';
import Typography from '../Typography';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { StyledActionsWrapper, StyledCardWrapper, StyledTitleWrapper } from './styled';
import { IPopoverCardProps, IPopoverCardStyleKeys } from './types';
import { ICustomStylePropMap } from '../types';
import memoForwardRef from '../utils/memoForwardRef';

export default memoForwardRef<HTMLDivElement, IPopoverCardProps>((props, ref) => {
  const { className, style, title, content, actions, arrowStyle = {}, styles, ...other } = props;
  const defaultStyles = useMemo<ICustomStylePropMap<IPopoverCardStyleKeys>>(
    () => ({
      wrapper: '',
      actionsWrapper: '',
      titleWrapper: '',
      contentWrapper: '',
    }),
    [],
  );
  const innerStyles = useStyles('popovercard', defaultStyles, styles);
  const theme = useTheme();
  const popup = useMemo(
    () => (
      <StyledCardWrapper
        theme={theme}
        className={[innerStyles.wrapper.className, className].join(' ').trim()}
        style={{ ...innerStyles.wrapper.style, ...style }}
      >
        {title && (
          <StyledTitleWrapper {...innerStyles.titleWrapper} theme={theme}>
            <Typography.Title level={theme.components.PopoverCard.title.level}>
              {title}
            </Typography.Title>
          </StyledTitleWrapper>
        )}
        {content && (
          <Typography.Text {...innerStyles.contentWrapper} color="assistant">
            {content}
          </Typography.Text>
        )}
        {actions && (
          <StyledActionsWrapper {...innerStyles.actionsWrapper} theme={theme}>
            {actions}
          </StyledActionsWrapper>
        )}
      </StyledCardWrapper>
    ),
    [
      actions,
      className,
      content,
      innerStyles.actionsWrapper,
      innerStyles.contentWrapper,
      innerStyles.titleWrapper,
      innerStyles.wrapper.className,
      innerStyles.wrapper.style,
      style,
      theme,
      title,
    ],
  );

  return (
    <Trigger
      ref={ref}
      popup={popup}
      arrowStyle={{
        color: theme.colors.pattern.background.higher,
        ...arrowStyle,
      }}
      {...other}
    ></Trigger>
  );
});
