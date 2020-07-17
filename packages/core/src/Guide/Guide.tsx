import React, { forwardRef, useCallback, useState } from 'react';
import Tour from 'reactour';

import { useLockScroll } from '@muya-ui/utils';
import { CloseIcon, InformIcon } from '@muya-ui/theme-light';

import { Button } from '../Button';
import useLocale from '../Locale/useLocale';
import { IPopperPlacement } from '../Popper';
import { StyledArrow } from '../styled/components/Arrow';
import { Typography } from '../Typography';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import {
  ButtonWrapper,
  CloseIconWrapper,
  GlobalStyle,
  SkipWrapper,
  StyledIcon,
  TextWrapper,
  TitleWrapper,
  TooltipsArrowStyle,
  ToolTipsContent,
  TourWrapper,
} from './styled';
import { IGuideProps } from './types';

const defaultStyles = {
  content: '',
  text: '',
  next: '',
  close: '',
  skip: '',
  inform: '',
  title: '',
  subTitle: '',
};

const Guide = forwardRef<Tour, IGuideProps>((props, ref) => {
  const local = useLocale();
  const theme = useTheme();
  const {
    onRequestClose,
    arrowStyle,
    steps,
    showClose = true,
    showSkip = true,
    skipText = local['Guide.skip'],
    confirmText = local['Guide.confirm'],
    nextText,
    styles,
    maskSpace = 0,
    rounded = 0,
    closeWithMask = false,
    maskClassName = `${theme.prefix}-guide-mask`,
    tooltipsClassName = `${theme.prefix}-guide-tooltips`,
    disableInteraction = true,
  } = props;
  const innerStyles = useStyles('guide', defaultStyles, styles);
  const [step, setStep] = useState(0);
  const [lock, setLock] = useState(false);
  useLockScroll(lock);

  const goToNext = useCallback(
    (index: number, close: () => void) => {
      if (index + 1 === steps.length) {
        close();
      } else {
        setStep(index + 1);
      }
    },
    [steps.length],
  );

  const Inform = theme.components.Guide.informIcon.Icon || InformIcon;
  const Close = theme.components.Guide.closeIcon.Icon || CloseIcon;

  steps.map((step, index) => {
    const buttonTitle =
      index === steps.length - 1
        ? confirmText
        : nextText || `${local['Guide.nextStep']}(${index + 1}/${steps.length})`;
    if (!step.position) step.position = 'bottom';
    if (typeof step.content === 'string') {
      let placement: IPopperPlacement = 'bottom-start';
      switch (step.position) {
        case 'top': {
          placement = 'top-start';
          break;
        }
        case 'left': {
          placement = 'left-start';
          break;
        }
        case 'right': {
          placement = 'right-start';
          break;
        }
      }
      let content = step.content;
      step.content = ({ close }) => (
        <ToolTipsContent theme={theme} {...innerStyles.content}>
          <TooltipsArrowStyle
            $placement={step.position}
            $tooltipsClassName={tooltipsClassName}
            theme={theme}
          />
          <TextWrapper {...innerStyles.text}>
            <StyledIcon theme={theme} {...innerStyles.inform}>
              <Inform />
            </StyledIcon>
            <TitleWrapper>
              <Typography.Title level={theme.components.Guide.titleLevel} {...innerStyles.title}>
                {content}
              </Typography.Title>
              {step.subTitle ? (
                <Typography.Text color="assistant" {...innerStyles.subTitle}>
                  {step.subTitle}
                </Typography.Text>
              ) : null}
            </TitleWrapper>
          </TextWrapper>
          <ButtonWrapper theme={theme} {...innerStyles.next}>
            <Button onClick={_ => goToNext(index, close)} type="primary">
              {buttonTitle}
            </Button>
          </ButtonWrapper>
          <StyledArrow placement={step.arrowPosition || placement} arrowStyle={arrowStyle} />
          {showClose ? (
            <CloseIconWrapper
              weakLevel={1}
              type="weak"
              theme={theme}
              onClick={close}
              {...innerStyles.close}
            >
              <Close fontSize={theme.components.Guide.closeIcon.fontSize} />
            </CloseIconWrapper>
          ) : null}
          {showSkip ? (
            <SkipWrapper theme={theme} onClick={close} {...innerStyles.skip}>
              <Typography.Text color="disabled">{skipText}</Typography.Text>
            </SkipWrapper>
          ) : null}
        </ToolTipsContent>
      );
    }
    return step;
  });

  const disableBody = () => setLock(true);
  const enableBody = () => setLock(false);

  return (
    <>
      <TourWrapper
        onRequestClose={onRequestClose}
        theme={theme}
        steps={steps}
        isOpen
        maskClassName={maskClassName}
        className={tooltipsClassName}
        showNavigation={false}
        showButtons={false}
        showCloseButton={false}
        showNumber={false}
        goToStep={step}
        maskSpace={maskSpace}
        rounded={rounded}
        onAfterOpen={disableBody}
        onBeforeClose={enableBody}
        closeWithMask={closeWithMask}
        disableInteraction={disableInteraction}
        ref={ref}
      />
      <GlobalStyle theme={theme} />
    </>
  );
});

export default Guide;
