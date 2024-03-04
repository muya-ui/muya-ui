import React from 'react';
import mockConsole from 'test/utils/mockConsole';

import theme from '@muya-ui/theme-light';
import { renderHook } from '@testing-library/react-hooks';

import { IImgEvent } from '../Img/types';
import { IImgPreviewMode } from './types';
import useImgPreview from './useImgPreview';

const imgUrl =
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575522314109/A40D2156C2BEF0A95420F26ED5C4A20B.png';

const imgUrls = [
  imgUrl,
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575632414453/6F636EC9BF76051907A79320247A47DC.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575632477623/EB373D8131655B7BECB88AB250E97248.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575943923231/2D9364A9D040352782D9B9C1B2281D38.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575943906529/6310624039D1BAF4F77B7BA4EF566716.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575943905780/57AE2846F8C96B6DA71A1A288610FEC4.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575943904885/7EBA50482362DE288A7ED3A645F03CC6.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575943889804/495DC44602B36994819228996204484F.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575943866176/9CED372B33480F8C36277499D9FC8F14.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575943855884/9F0C3FBB7788D3BE146040186F028477.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575943849260/A1DB107D477A197A5D7170465AAF2BB3.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575944864088/4FF7032310A540B356602CF6E75ED24D.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575944874937/22313FC2DE2E6C38A909C6E364078B43.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575944885781/5BF74E7CEEF53BBE422D4AC195F9594C.png',
  '//qhstaticssl.kujiale.com/newt/5/image/png/1575944894431/7401F28E4A5465E902C0E748CFE62AF1.png',
];

const imgScrollWrapperRef = React.createRef<HTMLDivElement>();
const imgWrapperRef = React.createRef<HTMLDivElement>();
const imgRef = React.createRef<HTMLDivElement>();
// @ts-ignore
imgRef.current = {
  style: {
    width: '900px',
    height: '500px',
  },
};

describe('useImgPreview', () => {
  beforeAll(() => {
    mockConsole.restoreError();
    mockConsole.mockError();
  });

  afterAll(() => {
    mockConsole.restoreError();
  });

  test('img click event', () => {
    const onClick = jest.fn();
    const onClose = jest.fn();
    const stopPropagation = jest.fn();
    const { result, unmount } = renderHook(
      props => useImgPreview(props, theme, imgScrollWrapperRef, imgWrapperRef, imgRef),
      {
        initialProps: {
          src: imgUrl,
          open: true,
          onClick,
          onClose,
        },
      },
    );
    const event = {} as React.MouseEvent<HTMLDivElement>;
    event.stopPropagation = stopPropagation;
    result.current.handleImgClick(event);
    expect(onClick).toBeCalledTimes(1);
    expect(stopPropagation).toBeCalledTimes(1);
    expect(onClose).toBeCalledTimes(0);
    unmount();
  });

  test('img load event', () => {
    const { result, unmount } = renderHook(
      props => useImgPreview(props, theme, imgScrollWrapperRef, imgWrapperRef, imgRef),
      {
        initialProps: {
          src: imgUrl,
          open: true,
        },
      },
    );
    result.current.handleImgError();
    expect(result.current.imgLoadError).toBe(true);
    const event = {} as IImgEvent; // eslint-disable-line
    event.imgInstance = { naturalWidth: 1920, naturalHeight: 600 } as HTMLImageElement; // eslint-disable-line
    result.current.handleImgLoaded(event);
    expect(result.current.imgLoadError).toBe(false);
    expect(result.current.imgLoaded).toBe(true);
    unmount();
  });

  test('img resize event', () => {
    const { result, unmount } = renderHook(
      props => useImgPreview(props, theme, imgScrollWrapperRef, imgWrapperRef, imgRef),
      {
        initialProps: {
          src: imgUrl,
          open: true,
          scaleStep: 2,
        },
      },
    );
    result.current.handleZoomIn({} as React.MouseEvent<HTMLDivElement>);
    expect(result.current.scale).toBe(2);
    result.current.handleZoomOut({} as React.MouseEvent<HTMLDivElement>);
    expect(result.current.scale).toBe(1);
    result.current.handleZoomIn({} as React.MouseEvent<HTMLDivElement>);
    result.current.handleResetZoom({} as React.MouseEvent<HTMLDivElement>);
    expect(result.current.scale).toBe(1);
    unmount();
  });

  test('img move event', () => {
    const imgRef = React.createRef<HTMLDivElement>();
    // @ts-ignore
    imgRef.current = {
      style: {
        width: '1920px',
        height: '1000px',
      },
    };
    const imgScrollWrapperRef = React.createRef<HTMLDivElement>();
    // @ts-ignore
    imgScrollWrapperRef.current = {
      scrollTop: 10,
      scrollLeft: 10,
    };
    const { result, unmount } = renderHook(
      props => useImgPreview(props, theme, imgScrollWrapperRef, imgWrapperRef, imgRef),
      {
        initialProps: {
          src: imgUrl,
          open: true,
        },
      },
    );
    const imgEvent = {} as IImgEvent; // eslint-disable-line
    imgEvent.imgInstance = { naturalWidth: 1920, naturalHeight: 1000 } as HTMLImageElement; // eslint-disable-line
    result.current.handleImgLoaded(imgEvent);
    const event = {} as React.MouseEvent<HTMLDivElement>;
    event.clientX = 10;
    event.clientY = 10;
    result.current.handleImgMouseDown(event);
    result.current.handleImgMouseMove(event);
    result.current.handleImgMouseUp();
    unmount();
  });

  test('img 切换', () => {
    const { result, unmount } = renderHook(
      props => useImgPreview(props, theme, imgScrollWrapperRef, imgWrapperRef, imgRef),
      {
        initialProps: {
          src: imgUrls,
          mode: 'multiple' as IImgPreviewMode,
          open: true,
        },
      },
    );
    result.current.toImgIndex(1);
    expect(result.current.imgIndex).toBe(1);
    result.current.toPrevImg();
    expect(result.current.imgIndex).toBe(0);
    result.current.toPrevImg();
    expect(result.current.imgIndex).toBe(0);
    result.current.toImgIndex(-1);
    expect(result.current.imgIndex).toBe(0);
    result.current.toImgIndex(100);
    expect(result.current.imgIndex).toBe(0);
    result.current.toNextImg();
    expect(result.current.imgIndex).toBe(1);
    result.current.toImgIndex(14);
    expect(result.current.imgIndex).toBe(14);
    result.current.toNextImg();
    expect(result.current.imgIndex).toBe(14);

    expect(result.current.stepIndex).toBe(0);
    result.current.toPrevStep();
    expect(result.current.stepIndex).toBe(0);
    result.current.toNextStep();
    unmount();
  });

  test('onClose', () => {
    const onClose = jest.fn();
    const { result, unmount, rerender } = renderHook(
      props => useImgPreview(props, theme, imgScrollWrapperRef, imgWrapperRef, imgRef),
      {
        initialProps: {
          src: imgUrl,
          disableMaskClick: false,
          open: true,
          onClose,
        },
      },
    );
    result.current.handleMaskClick({} as React.MouseEvent<HTMLDivElement>);
    expect(onClose).toBeCalledTimes(1);
    rerender({
      src: imgUrl,
      disableMaskClick: true,
      open: true,
      onClose,
    });
    result.current.handleMaskClick({} as React.MouseEvent<HTMLDivElement>);
    expect(onClose).toBeCalledTimes(1);
    result.current.handleCloseIconClick({} as React.MouseEvent<HTMLDivElement>);
    expect(onClose).toBeCalledTimes(2);
    unmount();
  });

  test('exit', () => {
    const onExited = jest.fn();
    const { result, unmount } = renderHook(
      props => useImgPreview(props, theme, imgScrollWrapperRef, imgWrapperRef, imgRef),
      {
        initialProps: {
          src: imgUrls,
          mode: 'multiple' as IImgPreviewMode,
          open: true,
          onExited,
        },
      },
    );
    result.current.handleExited();
    expect(onExited).toBeCalledTimes(1);
    expect(result.current.imgIndex).toBe(0);
    result.current.toImgIndex(2);
    result.current.handleExited();
    expect(onExited).toBeCalledTimes(2);
    expect(result.current.imgIndex).toBe(0);
    unmount();
  });

  test('updateOccupyHeight', () => {
    const { result, unmount, rerender } = renderHook(
      props => useImgPreview(props, theme, imgScrollWrapperRef, imgWrapperRef, imgRef),
      {
        initialProps: {
          src: imgUrls,
          mode: 'single' as IImgPreviewMode,
          open: true,
        },
      },
    );
    result.current.updateOccupyHeight(100);
    rerender({
      src: imgUrls,
      mode: 'multiple' as IImgPreviewMode,
      open: true,
    });
    result.current.updateOccupyHeight(100);
    unmount();
  });

  test('defaultIndex', () => {
    const { result, unmount, rerender } = renderHook(
      props => useImgPreview(props, theme, imgScrollWrapperRef, imgWrapperRef, imgRef),
      {
        initialProps: {
          src: imgUrls,
          mode: 'multiple' as IImgPreviewMode,
          defaultIndex: 0,
          open: true,
        },
      },
    );
    expect(result.current.imgIndex).toBe(0);
    rerender({
      src: imgUrls,
      mode: 'multiple' as IImgPreviewMode,
      defaultIndex: -1,
      open: true,
    });
    expect(result.current.imgIndex).toBe(0);
    rerender({
      src: imgUrls,
      mode: 'multiple' as IImgPreviewMode,
      defaultIndex: imgUrls.length + 1,
      open: true,
    });
    expect(result.current.imgIndex).toBe(1);
    unmount();
  });

  test('动态 imgs imgIndex 越界', () => {
    const { result, unmount, rerender } = renderHook(
      props => useImgPreview(props, theme, imgScrollWrapperRef, imgWrapperRef, imgRef),
      {
        initialProps: {
          src: imgUrls.slice(0, 5),
          mode: 'multiple' as IImgPreviewMode,
          open: true,
        },
      },
    );
    expect(result.current.imgIndex).toBe(0);
    result.current.toImgIndex(4);
    expect(result.current.imgIndex).toBe(4);
    rerender({
      src: imgUrls.slice(0, 2),
      mode: 'multiple' as IImgPreviewMode,
      open: true,
    });
    result.current.handleImgError();
    expect(result.current.imgIndex).toBe(1);
    unmount();
  });

  test('图片错误态切换', () => {
    const imgEvent = {} as IImgEvent; // eslint-disable-line
    imgEvent.imgInstance = { naturalWidth: 1920, naturalHeight: 1000 } as HTMLImageElement; // eslint-disable-line
    const { result, unmount, rerender } = renderHook(
      props => useImgPreview(props, theme, imgScrollWrapperRef, imgWrapperRef, imgRef),
      {
        initialProps: {
          src: imgUrl,
          open: true,
        },
      },
    );
    result.current.handleImgLoaded(imgEvent);
    expect(result.current.imgLoadError).toBe(false);
    rerender({
      src: '',
      open: false,
    });
    result.current.handleImgError();
    expect(result.current.imgLoadError).toBe(true);
    rerender({
      src: imgUrl,
      open: true,
    });
    result.current.handleImgLoaded(imgEvent);
    expect(result.current.imgLoadError).toBe(false);
    unmount();
  });
});
