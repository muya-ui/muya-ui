import React from 'react';
import { Upload, postFile, Button, UploadResult, Typography } from '@muya-ui/core';

export default function Multiple() {
  return (
    <Upload
      request={option =>
        postFile({ ...option, action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76' })
      }
      multiple={false}
    >
      {({ getInputProps, getRootProps, getResultProps, uploadFiles }) => {
        return (
          <div>
            <input {...getInputProps()} />
            <Typography.Paragraph>一次只能选择一个文件哦</Typography.Paragraph>
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
  title: '禁用上传多个文件',
  desc:
    '默认组件是允许上传多个文件的，可以在上面的例子中尝试。将`multiple`设置为false可以禁用该功能',
};
