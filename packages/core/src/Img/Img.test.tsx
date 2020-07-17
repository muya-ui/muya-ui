import * as React from 'react';
import renderer from 'react-test-renderer';

import { ImgDiv, ImgImg, ImgSpan } from './Img';
import useImg from './useImg';

jest.mock('./useImg');

test('测试图片节点 & aspectRatio', () => {
  const useImgMock = useImg as jest.Mock;
  useImgMock.mockReturnValue({
    imgState: {
      imgSrc: 'none',
      loadStatus: 'loaded',
    },
    handleRef: () => {},
    imgPool: {
      settings: {},
    },
  });

  const tree = renderer
    .create(
      <>
        <ImgDiv />
        <ImgSpan />
        <ImgImg />

        <ImgDiv width="30%" />
        <ImgDiv width={30} />
        <ImgDiv height="30%" />
        <ImgDiv height={30} />

        <ImgDiv loadingType="skeleton" />
        <ImgDiv loadingType="spin" />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('aspectRatio', () => {
  const useImgMock = useImg as jest.Mock;
  useImgMock.mockReturnValue({
    imgState: {
      imgSrc: 'none',
      loadStatus: 'loaded',
    },
    handleRef: () => {},
    imgPool: {
      settings: {},
    },
  });

  const tree = renderer
    .create(
      <>
        <ImgDiv aspectRatio="1:1" />
        <ImgDiv aspectRatio="4:3" />
        <ImgDiv aspectRatio="3:2" />
        <ImgDiv aspectRatio="16:9" />
        <ImgDiv aspectRatio="3:4" />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
test('aspectRatio 同时设置宽度为数字', () => {
  const useImgMock = useImg as jest.Mock;
  useImgMock.mockReturnValue({
    imgState: {
      imgSrc: 'none',
      loadStatus: 'loaded',
    },
    handleRef: () => {},
    imgPool: {
      settings: {},
    },
  });

  const tree = renderer
    .create(
      <>
        <ImgDiv aspectRatio="1:1" width={100} />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试图片 error', () => {
  const useImgMock = useImg as jest.Mock;
  useImgMock.mockReturnValue({
    imgState: {
      imgSrc: 'none',
      loadStatus: 'error',
    },
    handleRef: () => {},
    imgPool: {
      settings: {
        defaultImg: 'aa',
      },
    },
  });

  const tree1 = renderer.create(<ImgDiv />).toJSON();
  expect(tree1).toMatchSnapshot();
  const tree2 = renderer.create(<ImgDiv defaultImg="aaa" />).toJSON();
  expect(tree2).toMatchSnapshot();
});
