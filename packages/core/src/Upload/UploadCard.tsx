import React, { Ref } from 'react';

import Typography from '../Typography';
import useTheme from '../utils/useTheme';
import { StyledUploadCard } from './styled';
import { IUploadCardProps } from './types';
import useStyles from '../utils/useStyles';
import memoForwardRef from '../utils/memoForwardRef';
import addPx from '../utils/addPx';

const { Text } = Typography;

export default memoForwardRef((props: IUploadCardProps, ref: Ref<HTMLDivElement>) => {
  const {
    title,
    subtitle,
    icon,
    children,
    size = 'm',
    disabled = false,
    isDragActive = false,
    width,
    height,
    styles,
    ...other
  } = props;
  const theme = useTheme();
  const innerStyles = useStyles(
    'upload-card',
    {
      titleWrapper: '',
      iconWrapper: '',
      subtitleWrapper: '',
    },
    styles,
  );
  const token = theme.components.Upload.card;
  const innerChildren = (
    <>
      <Text
        {...innerStyles.iconWrapper}
        style={{ lineHeight: 1 }}
        fontSize={token.iconFontLevel[size]}
        strong
        color="assistant"
      >
        {icon}
      </Text>
      <Text
        style={{ marginTop: `${token.titleMarginTop[size]}px` }}
        fontSize={token.fontLevel[size]}
        strong
        color="assistant"
        {...innerStyles.titleWrapper}
      >
        {title}
      </Text>
      <Text
        style={{ marginTop: `${token.subTitleMarginTop}px` }}
        fontSize={token.fontLevel[size]}
        color="secondary"
        {...innerStyles.subtitleWrapper}
      >
        {subtitle}
      </Text>
    </>
  );
  return (
    <StyledUploadCard
      ref={ref}
      theme={theme}
      $disabled={disabled}
      $isDragActive={isDragActive}
      $width={addPx(width)}
      $height={addPx(height)}
      {...other}
    >
      {innerChildren}
      {children}
    </StyledUploadCard>
  );
});
