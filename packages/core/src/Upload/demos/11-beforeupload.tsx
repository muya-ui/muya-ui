import React from 'react';
import { Upload, postFile, Button, UploadResult, toast, Typography } from '@muya-ui/core';

import { createGlobalStyle } from 'styled-components';

const G = createGlobalStyle`
  h1,h2,h3,h4,h5,h6,p {
    margin: 10px 0 !important;
  }
`;
export default function BeforeUpload() {
  return (
    <Upload
      request={option =>
        postFile({ ...option, action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76' })
      }
      beforeUpload={uploadFile => {
        if (!uploadFile.originFile) {
          return false;
        }
        if (uploadFile.originFile.name.length >= 10) {
          toast.error(`你的文件太长了: ${uploadFile.originFile.name.length}`);
          return false;
        }
        return uploadFile;
      }}
    >
      {({ getInputProps, getRootProps, getResultProps, uploadFiles }) => {
        return (
          <div>
            <input {...getInputProps()} />
            <Typography.Paragraph>
              自定义上传前的行为，此处只上传文件名长度小于10的文件
            </Typography.Paragraph>
            <Button {...getRootProps()} type="primary">
              点击上传
            </Button>
            <div>
              {uploadFiles.map(file => (
                <UploadResult
                  {...getResultProps({ file })}
                  style={{ marginTop: '10px' }}
                  key={file.uid}
                >
                  {file.filename}
                </UploadResult>
              ))}
            </div>
            <G />
          </div>
        );
      }}
    </Upload>
  );
}

export const meta = {
  title: '自定义上传前的操作',
  desc:
    '1. 为`Upload`or`useUpload`设置`beforeUpload`回调函数，支持返回Promise\n\n2. 若返回值如果是`false`可以阻止上传行为，若返回`IUploadFile`类型的数据，则使用返回的数据来做上传',
};
