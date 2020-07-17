import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import useUpload from './useUpload';
import postFile from './post-file';
import mockXHR from 'xhr-mock';
import mockConsole from 'test/utils/mockConsole';
import { IUploadFile, IUploadResultProps } from '@muya-ui/core';
import getUid from './uid';

let files: IUploadFile[];
let result: (props: Omit<IUploadResultProps, 'theme'>) => Omit<IUploadResultProps, 'theme'>;
let wrapper: ReactWrapper;

beforeAll(() => {
  mockXHR.setup();
  mockXHR.post('/', {});
  mockConsole.restoreError();
  mockConsole.mockError();
  const Upload = () => {
    const { getInputProps, uploadFiles, getResultProps } = useUpload({
      request: option => postFile({ ...option, action: '/' }),
    });
    files = uploadFiles;
    result = getResultProps;
    return <input {...getInputProps()} />;
  };
  wrapper = mount(<Upload />);
});
afterAll(() => {
  mockXHR.teardown();
  mockConsole.restoreError();
});

const mockFile = new File(['foo'], 'foo.png', {
  type: 'image/png',
});

describe('useUpload', () => {
  it('should upload file success', done => {
    wrapper.find('input').simulate('change', { target: { files: [mockFile] } });
    setTimeout(() => {
      files.forEach(file => {
        expect(file.status).toEqual('success');
      });
      done();
    });
  });
  it('should onRemove success', done => {
    wrapper.find('input').simulate('change', { target: { files: [mockFile] } });
    setTimeout(() => {
      files.forEach(file => {
        const { onRemove } = result({ file });
        onRemove && onRemove();
      });
      expect(files).toHaveLength(0);
      done();
    });
  });
  it('should onRetry success', done => {
    wrapper.find('input').simulate('change', { target: { files: [mockFile] } });
    setTimeout(() => {
      files.forEach(file => {
        const { onRetry } = result({ file });
        onRetry && onRetry();
      });
      expect(files[0].status).toEqual('uploading');
      done();
    });
  });

  it('should beforeUpload call success', () => {
    const Upload = () => {
      const { getInputProps, uploadFiles } = useUpload({
        request: option => postFile({ ...option, action: '/' }),
        beforeUpload: () => false,
      });
      files = uploadFiles;
      return <input {...getInputProps()} />;
    };
    wrapper = mount(<Upload />);
    wrapper.find('input').simulate('change', { target: { files: [mockFile] } });
    expect(files).toHaveLength(0);
  });

  it('should beforeUploadAll call success', () => {
    const Upload = () => {
      const { getInputProps, uploadFiles } = useUpload({
        request: option => postFile({ ...option, action: '/' }),
        beforeUploadAll: () => false,
      });
      files = uploadFiles;
      return <input {...getInputProps()} />;
    };
    wrapper = mount(<Upload />);
    wrapper.find('input').simulate('change', { target: { files: [mockFile] } });
    expect(files).toHaveLength(0);
  });

  it('should beforeUpload change file', done => {
    const uid = getUid();
    const Upload = () => {
      const { getInputProps, uploadFiles } = useUpload({
        request: option => postFile({ ...option, action: '/' }),
        beforeUpload: () => ({
          uid: uid,
          percent: 0,
          status: 'uploading',
          originFile: mockFile,
        }),
      });
      files = uploadFiles;
      return <input {...getInputProps()} />;
    };
    wrapper = mount(<Upload />);
    wrapper.find('input').simulate('change', { target: { files: [mockFile] } });
    setTimeout(() => {
      files.forEach(file => {
        expect(uid).toEqual(file.uid);
      });
      done();
    });
  });

  it('should onDrop call once', done => {
    const mockFn = jest.fn();
    const Upload = () => {
      const { getInputProps } = useUpload({
        request: option => postFile({ ...option, action: '/' }),
        onDrop: mockFn,
      });
      return <input {...getInputProps()} />;
    };
    wrapper = mount(<Upload />);
    wrapper.find('input').simulate('change', { target: { files: [mockFile] } });
    setTimeout(() => {
      expect(mockFn.mock.calls).toHaveLength(1);
      done();
    });
  });
});
