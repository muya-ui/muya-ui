import React from 'react';
import { Upload, postFile, Button, UploadResult, Typography } from '@muya-ui/core';

export default function Accept() {
  return (
    <Upload
      request={option =>
        postFile({ ...option, action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76' })
      }
      accept="video/*"
    >
      {({ getInputProps, getRootProps, getResultProps, uploadFiles }) => {
        return (
          <div>
            <input {...getInputProps()} />
            <Typography.Paragraph>只能选择视频类型的文件，accept: video/*</Typography.Paragraph>
            <Button {...getRootProps()} type="primary">
              点击上传
            </Button>
            <div>
              {uploadFiles.map(file => (
                <UploadResult
                  {...getResultProps({ file })}
                  style={{ marginTop: '10px' }}
                  key={file.uid}
                />
              ))}
            </div>
          </div>
        );
      }}
    </Upload>
  );
}

export const meta = {
  title: '设置接收的文件类型',
  desc: '为`Upload`or`useUpload`设置`accept`属性可以控制用户选择的文件类型',
};
