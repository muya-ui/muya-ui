import React, { Ref, useMemo } from 'react';

import { CloseIcon, SelectIcon } from '@muya-ui/theme-light';

import Typography from '../Typography';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import {
  StyledCircle,
  StyledDescriptionWrapper,
  StyledProgressLine,
  StyledStepContent,
  StyledStepWrapper,
  StyledTitle,
} from './styled';
import { IStepProps, IStepStyleKeys } from './types';
import { ICustomStylePropMap } from '../types';
import memoForwardRef from '../utils/memoForwardRef';

export default memoForwardRef((props: IStepProps, ref: Ref<HTMLDivElement>) => {
  const {
    onStepClick,
    stepNumber = 0,
    status,
    title,
    description,
    styles,
    size,
    icon,
    ...other
  } = props;
  const theme = useTheme();

  const {
    components: {
      Steps: { finishIcon: FinishIcon = SelectIcon, errorIcon: ErrorIcon = CloseIcon },
    },
  } = theme;
  const defaultStyles = useMemo<ICustomStylePropMap<IStepStyleKeys>>(
    () => ({
      content: '',
      circle: '',
      title: '',
      progressLine: '',
      descriptionWrapper: '',
      text: '',
    }),
    [],
  );
  const innerStyles = useStyles('step', defaultStyles, styles);

  let innerIcon: React.ReactNode;
  if (status === 'finish') {
    innerIcon = <FinishIcon />;
  } else if (status === 'error') {
    innerIcon = <ErrorIcon />;
  } else {
    innerIcon = stepNumber + 1;
  }

  if (icon) {
    innerIcon = icon;
  }

  const handleClick = useMemo(
    () =>
      onStepClick
        ? () => {
            onStepClick(stepNumber);
          }
        : undefined,
    [onStepClick, stepNumber],
  );

  return (
    <StyledStepWrapper ref={ref} theme={theme} {...other}>
      <StyledStepContent
        {...innerStyles.content}
        onClick={handleClick}
        theme={theme}
        status={status}
        size={size}
      >
        <StyledCircle {...innerStyles.circle} theme={theme} size={size} $bordered={!icon}>
          {innerIcon}
        </StyledCircle>
        <StyledTitle {...innerStyles.title} theme={theme}>
          {title}
        </StyledTitle>
        <StyledProgressLine {...innerStyles.progressLine} theme={theme} status={status} />
      </StyledStepContent>

      <StyledDescriptionWrapper {...innerStyles.descriptionWrapper} theme={theme} size={size}>
        <Typography.Text
          type={status === 'error' ? 'error' : undefined}
          {...innerStyles.text}
          color="assistant"
        >
          {description}
        </Typography.Text>
      </StyledDescriptionWrapper>
    </StyledStepWrapper>
  );
});
