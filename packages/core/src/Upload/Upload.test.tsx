import React from 'react';
import Upload from './Upload';
import { mount } from 'enzyme';
import { postFile } from '@muya-ui/core';

describe('Upload Component', () => {
  it('should Upload Component mount success', () => {
    const Com = () => (
      <Upload
        request={option =>
          postFile({ ...option, action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76' })
        }
      >
        {({ getInputProps, getRootProps, getResultProps, uploadFiles }) => {
          expect(typeof getInputProps).toEqual('function');
          expect(typeof getRootProps).toEqual('function');
          expect(typeof getResultProps).toEqual('function');
          expect(Array.isArray(uploadFiles)).toEqual(true);
          return <input type="text" />;
        }}
      </Upload>
    );
    mount(<Com />);
  });
});
