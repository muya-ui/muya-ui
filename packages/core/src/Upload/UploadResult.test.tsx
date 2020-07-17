import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import UploadResult from './UploadResult';
import { IUploadResultProps, IUploadFile } from '@muya-ui/core';
import mockConsole from 'test/utils/mockConsole';
import { CloseIcon } from '@muya-ui/theme-light';

const mockRemoveFn = jest.fn();
const mockRetryFn = jest.fn();
const mockMouseEnterFn = jest.fn();
const mockMouseLeaveFn = jest.fn();

beforeAll(() => {
  mockConsole.restoreError();
  mockConsole.mockError();
  window.URL.createObjectURL = jest.fn();
});

afterAll(() => {
  mockConsole.restoreError();
});

const getResult = (
  size: IUploadResultProps['size'],
  type: IUploadResultProps['type'],
  status: IUploadFile['status'],
  customIcon: boolean = true,
) => (
  <UploadResult
    type={type}
    onRemove={mockRemoveFn}
    onRetry={mockRetryFn}
    onMouseEnter={mockMouseEnterFn}
    onMouseLeave={mockMouseLeaveFn}
    previewFile={() =>
      '//qhstaticssl.kujiale.com/newt/29/image/png/1567069346213/A8C6DECED7C868F1E57AC115EA1D5BAA.png'
    }
    url="https://qhstaticssl.kujiale.com/newt/29/image/png/1567069346213/A8C6DECED7C868F1E57AC115EA1D5BAA.png"
    filename="我是一个文件"
    size={size}
    file={{
      originFile: new File(['foo'], 'foo.txt'),
      uid: 'test',
      status,
      percent: 80,
    }}
    closeIcon={customIcon ? <CloseIcon /> : null}
  />
);

describe('UploadResult component', () => {
  it(`should render success status of different size's picture-card`, function() {
    const wrapper = renderer
      .create(
        <>
          {getResult('s', 'picture-card', 'success')}
          {getResult('s', 'picture-card', 'success', false)}
          {getResult('m', 'picture-card', 'success')}
          {getResult('l', 'picture-card', 'success')}
          {getResult('xl', 'picture-card', 'success')}
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it(`should render error status of different size's picture-card`, function() {
    const wrapper = renderer
      .create(
        <>
          {getResult('s', 'picture-card', 'error')}
          {getResult('m', 'picture-card', 'error')}
          {getResult('l', 'picture-card', 'error')}
          {getResult('xl', 'picture-card', 'error')}
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it(`should render success status of different size's picture`, function() {
    const wrapper = renderer
      .create(
        <>
          {getResult('s', 'picture', 'success')}
          {getResult('s', 'picture', 'success', false)}
          {getResult('s', 'picture', 'uploading')}
          {getResult('m', 'picture', 'uploading')}
          {getResult('m', 'picture', 'success')}
          {getResult('l', 'picture', 'success')}
          {getResult('xl', 'picture', 'success')}
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it(`should render error status of different size's picture`, function() {
    const wrapper = renderer
      .create(
        <>
          {getResult('s', 'picture', 'error')}
          {getResult('m', 'picture', 'error')}
          {getResult('l', 'picture', 'error')}
          {getResult('xl', 'picture', 'error')}
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it(`should render success status of different size's card`, function() {
    const wrapper = renderer
      .create(
        <>
          {getResult('s', 'card', 'uploading')}
          {getResult('s', 'card', 'success')}
          {getResult('s', 'card', 'success', false)}
          {getResult('m', 'card', 'success')}
          {getResult('l', 'card', 'success')}
          {getResult('xl', 'card', 'success')}
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it(`should render error status of different size's card`, function() {
    const wrapper = renderer
      .create(
        <>
          {getResult('s', 'card', 'error')}
          {getResult('m', 'card', 'error')}
          {getResult('l', 'card', 'error')}
          {getResult('xl', 'card', 'error')}
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it(`should remove callback called`, function() {
    const wrapper = mount(getResult('s', 'picture-card', 'success'));
    wrapper.find('button').simulate('click');
    expect(mockRemoveFn.mock.calls).toHaveLength(1);
  });
  it(`should retry callback called`, function() {
    const wrapper = mount(<>{getResult('s', 'picture-card', 'error')}</>);
    wrapper.find('button').map(node => node.simulate('click'));
    expect(mockRetryFn.mock.calls).toHaveLength(1);
  });
  it('should call mouseEnter and mouseLeave', function() {
    const wrapper = mount(<>{getResult('s', 'picture', 'uploading')}</>);
    wrapper.simulate('mouseEnter');
    wrapper.simulate('mouseLeave');
    expect(mockMouseEnterFn.mock.calls).toHaveLength(1);
    expect(mockMouseLeaveFn.mock.calls).toHaveLength(1);
  });
  it('should change text in mouseEnter and mouseLeave', function() {
    const wrapper = mount(<>{getResult('m', 'picture', 'uploading')}</>);
    wrapper.simulate('mouseEnter');
    expect(wrapper.text()).toEqual('取消');
    wrapper.simulate('mouseLeave');
    expect(wrapper.text()).toEqual('80%');
  });
});
