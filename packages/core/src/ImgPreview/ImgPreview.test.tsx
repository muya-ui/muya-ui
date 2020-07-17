import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import useImgPreview from './useImgPreview';
import ImgPreview from './ImgPreview';

jest.mock('./useImgPreview');

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

describe('ImgPreview 渲染', () => {
  beforeAll(() => {
    // @ts-ignore
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element;
    });
  });

  afterEach(() => {
    (ReactDOM.createPortal as jest.Mock).mockClear();
  });

  test('单图渲染', () => {
    const useImgPreviewMock = useImgPreview as jest.Mock;
    useImgPreviewMock.mockReturnValue({
      imgLoading: false,
      imgLoadError: false,
      imgLoaded: true,
      imgs: [imgUrl],
      containerSize: { width: 1180, height: 700 },
    });
    const tree = renderer.create(<ImgPreview src={imgUrl} open={true}></ImgPreview>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('多图渲染', () => {
    const useImgPreviewMock = useImgPreview as jest.Mock;
    useImgPreviewMock.mockReturnValue({
      imgLoading: false,
      imgLoadError: false,
      imgLoaded: true,
      imgs: imgUrls,
      showPagination: true,
      showPaginationButton: true,
      imgOverflow: true,
      containerSize: { width: 1180, height: 700 },
    });
    const tree = renderer
      .create(<ImgPreview src={imgUrls} mode="multiple" open={true}></ImgPreview>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('自定义节点渲染', () => {
    const useImgPreviewMock = useImgPreview as jest.Mock;
    useImgPreviewMock.mockReturnValue({
      imgLoading: false,
      imgLoadError: false,
      imgLoaded: true,
      imgs: imgUrls,
      containerSize: { width: 1180, height: 700 },
    });
    const tree = renderer
      .create(
        <ImgPreview
          src={imgUrls}
          mode="multiple"
          open={true}
          renderInImgNode={() => <div>renderInImgNode</div>}
          renderInImgContainer={() => <div>renderInImgContainer</div>}
          renderCustomPageButton={() => <button>renderCustomPageButton</button>}
          renderCustomPagination={() => <div>renderCustomPagination</div>}
        ></ImgPreview>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('渲染出错', () => {
    const useImgPreviewMock = useImgPreview as jest.Mock;
    useImgPreviewMock.mockReturnValue({
      imgLoading: false,
      imgLoadError: true,
      imgLoaded: false,
      imgs: [imgUrl],
      containerSize: { width: 1180, height: 700 },
    });
    const tree = renderer.create(<ImgPreview src={imgUrl} open={true}></ImgPreview>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('异步渲染', () => {
    const useImgPreviewMock = useImgPreview as jest.Mock;
    useImgPreviewMock.mockReturnValue({
      imgLoading: false,
      imgLoadError: true,
      imgLoaded: false,
      imgs: [],
      containerSize: { width: 1180, height: 700 },
    });
    const tree = renderer
      .create(<ImgPreview src={imgUrl} open={true} loading></ImgPreview>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
