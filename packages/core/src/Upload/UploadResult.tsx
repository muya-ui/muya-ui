import React, { MouseEvent, Ref, useCallback, useEffect, useMemo, useState } from 'react';

import { CloseIcon as DefaultCloseIcon, PicIcon } from '@muya-ui/theme-light';

import { InlineButton } from '../Button';
import Img from '../Img';
import useLocale from '../Locale/useLocale';
import Progress from '../Progress';
import Spin from '../Spin';
import { ICustomStylePropMap } from '../types';
import Typography from '../Typography';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import {
  StyledButton,
  StyledCardIconWrapper,
  StyledContainer,
  StyledContentWrapper,
  StyledFilenameWrapper,
  StyledImgWrapper,
  StyledPictureCardIconWrapper,
  StyledPictureIconWrapper,
} from './styled';
import { IUploadResultProps, IUploadResultStyleKeys } from './types';

const { Text } = Typography;

export default memoForwardRef((props: IUploadResultProps, ref: Ref<HTMLDivElement>) => {
  const {
    previewFile,
    disableDefaultThumbnail = false,
    onRemove,
    onRetry,
    onMouseEnter,
    onMouseLeave,
    file,
    url,
    size = 'm',
    closeIcon,
    filename,
    type = 'picture-card',
    styles,
    ...other
  } = props;
  const theme = useTheme();
  const {
    progress: progressToken,
    retryButton: retryButtonToken,
    errorView: errorViewToken,
    spinSize,
  } = theme.components.Upload;

  const defaultStyles = useMemo<ICustomStylePropMap<IUploadResultStyleKeys>>(
    () => ({
      imgWrapper: '',
      img: '',
      contentWrapper: '',
      fileNameWrapper: '',
      link: '',
      closeIcon: '',
      errorWrapper: '',
      errorText: '',
      retryButton: '',
      iconWrapper: '',
      progress: '',
      cancelButton: '',
      spin: '',
      fileIcon: '',
    }),
    [],
  );
  const innerStyles = useStyles('upload-result', defaultStyles, styles);
  const { originFile } = file;
  const local = useLocale();
  const [entered, setEntered] = useState(false);
  const [thumbnail, setThumbnail] = useState<string>('');

  // 关闭图标
  const CloseIcon = theme.components.Upload.closeIcon || DefaultCloseIcon;
  const FileIcon = theme.components.Upload.fileIcon || PicIcon;

  // 进度条
  const progress = useMemo(
    () =>
      file.status === 'uploading' ? (
        <Progress
          style={{
            height: `${progressToken.height[size]}px`,
            marginTop: `${progressToken.marginTop[size]}px`,
            ...innerStyles.progress.style,
          }}
          className={innerStyles.progress.className}
          progress={file.percent}
        />
      ) : null,
    [
      file.percent,
      file.status,
      innerStyles.progress.className,
      innerStyles.progress.style,
      progressToken.height,
      progressToken.marginTop,
      size,
    ],
  );

  // 错误信息
  let retryButtonSpacing = retryButtonToken.marginInOtherType;
  if (type === 'picture') {
    retryButtonSpacing = retryButtonToken.marginInTypePicture[size];
  }

  const handleEnter = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      setEntered(true);
      if (onMouseEnter) {
        onMouseEnter(e);
      }
    },
    [onMouseEnter],
  );

  const handleRemove = useCallback(
    (e: React.SyntheticEvent) => {
      e.stopPropagation();
      e.preventDefault();
      onRemove && onRemove();
    },
    [onRemove],
  );

  const handleLeave = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      setEntered(false);
      if (onMouseLeave) {
        onMouseLeave(e);
      }
    },
    [onMouseLeave],
  );

  const handleRetry = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      if (onRetry) {
        onRetry();
      }
    },
    [onRetry],
  );

  // set thumbnail
  useEffect(() => {
    if (originFile && !disableDefaultThumbnail) {
      const objectURL = window.URL.createObjectURL(originFile);
      setThumbnail(objectURL);
      return () => window.URL.revokeObjectURL(objectURL);
    }
  }, [disableDefaultThumbnail, originFile]);

  // set custom thumbnail with previewFile function
  useEffect(() => {
    const getThumbnail = async () => {
      let newThumbnail;
      // 外部自定义了缩略图逻辑，则使用外部的逻辑
      if (previewFile) {
        newThumbnail = await previewFile();
      }

      if (newThumbnail) {
        // 设置自定义的封面图
        setThumbnail(newThumbnail);
      }
    };

    getThumbnail();
  }, [previewFile]);

  const error = useMemo(
    () =>
      file.status === 'error' ? (
        <>
          <Text {...innerStyles.errorText} type="error" fontSize={errorViewToken.fontLevel[size]}>
            {local['Upload.errorText']}
          </Text>
          <InlineButton
            type="primary"
            style={{
              margin: `${retryButtonSpacing}px`,
              padding: 0,
              ...innerStyles.retryButton.style,
            }}
            className={innerStyles.retryButton.className}
            size={errorViewToken.buttonSize[size]}
            onClick={handleRetry}
          >
            {local['Upload.retryText']}
          </InlineButton>
        </>
      ) : null,
    [
      errorViewToken.buttonSize,
      errorViewToken.fontLevel,
      file.status,
      handleRetry,
      innerStyles.errorText,
      innerStyles.retryButton.className,
      innerStyles.retryButton.style,
      local,
      retryButtonSpacing,
      size,
    ],
  );

  // picture-card
  const getPictureCardChildren = () => {
    return (
      <>
        <StyledImgWrapper theme={theme} size={size} {...innerStyles.imgWrapper}>
          <Img {...innerStyles.img} aspectRatio="1:1" src={thumbnail} suffix="off" />
        </StyledImgWrapper>

        <StyledContentWrapper {...innerStyles.contentWrapper}>
          <StyledButton {...innerStyles.link} href={url} size={size} target="_blank" busy={!url}>
            <StyledFilenameWrapper {...innerStyles.fileNameWrapper} title={filename}>
              {filename}
            </StyledFilenameWrapper>
          </StyledButton>
          {progress}
          <span {...innerStyles.errorWrapper}>{error}</span>
        </StyledContentWrapper>

        <StyledPictureCardIconWrapper
          size={size}
          type="weak"
          theme={theme}
          onClick={handleRemove}
          {...innerStyles.iconWrapper}
        >
          {closeIcon || <CloseIcon {...innerStyles.closeIcon} />}
        </StyledPictureCardIconWrapper>
      </>
    );
  };

  // card
  const getCardChildren = () => {
    return (
      <>
        <StyledButton
          href={url}
          size={size}
          target="_blank"
          component="a"
          prefixNode={
            file.status === 'uploading' ? (
              <Spin {...innerStyles.spin} />
            ) : (
              <FileIcon {...innerStyles.fileIcon} />
            )
          }
          busy={!url}
          {...innerStyles.link}
        >
          <StyledFilenameWrapper {...innerStyles.fileNameWrapper} title={filename}>
            {filename}
          </StyledFilenameWrapper>
          <StyledCardIconWrapper
            size={size}
            theme={theme}
            onClick={handleRemove}
            {...innerStyles.iconWrapper}
          >
            {closeIcon || <CloseIcon {...innerStyles.closeIcon} />}
          </StyledCardIconWrapper>
        </StyledButton>
        {progress}
        <span {...innerStyles.errorWrapper}>{error}</span>
      </>
    );
  };

  // picture
  const getPictureChildren = () => {
    if (file.status === 'uploading') {
      if (size === 's') {
        return entered ? (
          <InlineButton
            size="s"
            type="primary"
            onClick={handleRemove}
            {...innerStyles.cancelButton}
          >
            {local['Upload.cancelText']}
          </InlineButton>
        ) : (
          <Spin {...innerStyles.spin} />
        );
      }
      return (
        <Spin
          size={spinSize[size]}
          desc={entered ? '' : `${file.percent}%`}
          cancelText={entered ? local['Upload.cancelText'] : ''}
          onCancel={handleRemove}
          {...innerStyles.spin}
        />
      );
    } else if (file.status === 'success') {
      return (
        <>
          <StyledButton {...innerStyles.link} href={url} target="_blank" busy={!url}>
            <Img aspectRatio="1:1" src={thumbnail} suffix="off" {...innerStyles.img} />
          </StyledButton>
          <StyledPictureIconWrapper
            theme={theme}
            onClick={handleRemove}
            {...innerStyles.iconWrapper}
          >
            {closeIcon || <CloseIcon {...innerStyles.closeIcon} />}
          </StyledPictureIconWrapper>
        </>
      );
    } else if (file.status === 'error') {
      return error;
    }
  };

  const getChildren = () => {
    if (type === 'picture-card') {
      return getPictureCardChildren();
    } else if (type === 'card') {
      return getCardChildren();
    } else {
      return getPictureChildren();
    }
  };

  return (
    <StyledContainer
      file={file}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      size={size}
      ref={ref}
      type={type}
      theme={theme}
      {...other}
    >
      {getChildren()}
    </StyledContainer>
  );
});
