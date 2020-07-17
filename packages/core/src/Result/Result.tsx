import React, { forwardRef } from 'react';

import useLocale from '../Locale/useLocale';
import {
  ClearIcon,
  InformIcon,
  IResultStatusIconType,
  ReminderIcon,
  SuccessIcon,
} from '@muya-ui/theme-light';

import { ImgImg } from '../Img';
import Typography from '../Typography';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import {
  StyleButton,
  StyledIcon,
  StyledResult,
  StyleReason,
  StyleSubTitle,
  StyleTitle,
} from './styled';
import { IResultIconType, IResultProps } from './types';

export const Icons = ['success', 'error', 'info', 'warning'];

export const ExceptionStatus = ['forbidden', 'empty', 'emptySmall'];

const Result = forwardRef<HTMLDivElement, IResultProps>((props, ref) => {
  const theme = useTheme();
  const {
    components: { Result: token },
  } = theme;
  const {
    title,
    subTitle,
    icon,
    type = 'info',
    iconSize = token.defaultIconSize,
    vertical = true,
    extra,
    reason,
    styles,
    imgProps,
    ...otherProps
  } = props;
  const local = useLocale();
  const innerStyles = useStyles(
    'result',
    {
      content: '',
      icon: '',
      title: '',
      subTitle: '',
      reason: '',
      extra: '',
    },
    styles,
  );
  let iconNode;
  const isStatusIcon = ExceptionStatus.includes(type);
  const typeIcon = {
    success: SuccessIcon,
    info: InformIcon,
    warning: ReminderIcon,
    error: ClearIcon,
    forbidden:
      '//qhstaticssl.kujiale.com/newt/100759/image/svgxml/1573020737658/62EC08BDA2CDEA69697790DCB6240015.svg',
    empty:
      '//qhstaticssl.kujiale.com/newt/100759/image/svgxml/1573020737659/28AD5A0CE2237E2987B3D751C4C5BA83.svg',
    emptySmall:
      '//qhstaticssl.kujiale.com/newt/100759/image/svgxml/1573020737281/D8307EB1E1C8C21BCE88D2D55B980DE5.svg',
    ...theme.components.Result.typeIcon,
  };
  if (isStatusIcon) {
    const icon = typeIcon[type] as string;
    const { width, height } = token.typeIconSize[type as IResultStatusIconType];
    iconNode = (
      <StyledIcon
        {...innerStyles.icon}
        theme={theme}
        $vertical={vertical}
        $type={type}
        $iconSize={height}
      >
        <img src={icon} width={width} alt="" />
      </StyledIcon>
    );
  } else {
    if (React.isValidElement(icon)) {
      iconNode = icon;
    } else {
      const Icon = typeIcon[type];
      const iconBgColor = token.typeBg[type as IResultIconType];
      iconNode = (
        <StyledIcon
          {...innerStyles.icon}
          theme={theme}
          $vertical={vertical}
          $type={type}
          $iconSize={iconSize}
        >
          {typeof icon === 'string' ? (
            <ImgImg src={icon} suffixWidth={iconSize} {...imgProps} />
          ) : (
            <Icon bgColor={iconBgColor} fontSize={iconSize} />
          )}
        </StyledIcon>
      );
    }
  }
  let renderTitle = title;
  let renderSubTitle = subTitle;
  if (type === 'forbidden') {
    renderTitle = renderTitle || '403';
    renderSubTitle = renderSubTitle || local['Result.forbiddenSubTitle'];
  }
  if (type.includes('empty')) {
    renderSubTitle = renderSubTitle || local['Result.emptyText'];
  }

  return (
    <StyledResult ref={ref} theme={theme} $vertical={vertical} {...otherProps}>
      {iconNode}
      <div {...innerStyles.content}>
        {renderTitle ? (
          <StyleTitle
            {...innerStyles.title}
            theme={theme}
            $vertical={vertical}
            $iconSize={iconSize}
          >
            <Typography.Title strong level={token.defaultTitleLevel}>
              {renderTitle}
            </Typography.Title>
          </StyleTitle>
        ) : null}
        {renderSubTitle ? (
          <StyleSubTitle {...innerStyles.subTitle} theme={theme}>
            <Typography.Paragraph fontSize={token.defaultSubTitleFontLevel} color="assistant">
              {renderSubTitle}
            </Typography.Paragraph>
          </StyleSubTitle>
        ) : null}
        {reason ? (
          <StyleReason {...innerStyles.reason} theme={theme}>
            {reason}
          </StyleReason>
        ) : null}
        {extra ? (
          <StyleButton {...innerStyles.extra} theme={theme}>
            {extra}
          </StyleButton>
        ) : null}
      </div>
    </StyledResult>
  );
});

export default Result;
