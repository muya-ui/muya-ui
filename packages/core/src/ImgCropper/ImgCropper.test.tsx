import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import ImgCropper from './ImgCropper';
import * as useImgCropper from './useImgCropper';

test('测试 ImgCropper', () => {
  const tree = renderer.create(<ImgCropper src="sss" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 ImgCropper moving=true', () => {
  const hook = sinon.stub(useImgCropper, 'default');
  hook.returns({
    moving: true,
    imgSrc: '',
    imgStyle: {},
    getImg: sinon.spy(),
    handleMouseDown: sinon.spy(),
    handleMouseMove: sinon.spy(),
    handleMouseUp: sinon.spy(),
    handleMouseEnter: sinon.spy(),
    handleWheel: sinon.spy(),
    handleSliderChange: sinon.spy(),
    rotateImg: sinon.spy(),
    handleZoom: sinon.spy(),
    handleZoomOut: sinon.spy(),
    finalScaleMin: 0,
    finalScaleMax: 100,
    finalScale: 1,
  } as any);
  const tree = renderer.create(<ImgCropper src="sss" />).toJSON();
  expect(tree).toMatchSnapshot();
});
