import React from 'react';

import { Button, postFile, Typography, Upload, UploadResult } from '@muya-ui/core';

export default function Size() {
  return (
    <Upload
      request={option =>
        postFile({ ...option, action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76' })
      }
      minSize={100 * 1024}
      maxSize={2 * 1024 * 1024}
    >
      {({ getInputProps, getRootProps, getResultProps, uploadFiles, rejectedFiles }) => {
        return (
          <div>
            <input {...getInputProps()} />
            <Typography.Paragraph>
              文件大小要求，最小100kb(100*1024 byte)，最大为2M(2*1024*1024 byte)
            </Typography.Paragraph>
            <Button {...getRootProps()} type="primary">
              点击上传
            </Button>
            <Typography.Title level={5}>符合大小要求的文件</Typography.Title>
            <div>
              {uploadFiles.map(file => (
                <UploadResult
                  style={{ marginTop: '10px', width: '500px' }}
                  {...getResultProps({ file })}
                  key={file.uid}
                />
              ))}
            </div>
            <Typography.Title level={5}>拒收的文件</Typography.Title>
            <div>
              {rejectedFiles.map(file => (
                <li key={file.name}>
                  {file.name} —— {file.size}byte
                </li>
              ))}
            </div>
          </div>
        );
      }}
    </Upload>
  );
}

export const meta = {
  title: '自定义文件大小',
  desc:
    '向`Upload` or `useUpload`传入`minSize`、`maxSize`属性，可以控制接收的文件大小。通过`uploadFiles`和`rejectedFiles`拿到接收/拒收的文件数据',
};
