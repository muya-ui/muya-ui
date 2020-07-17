import React from 'react';

import { createOSSPostTool } from '@muya-ui/utils';
import { Button, Upload, UploadResult } from '@muya-ui/core';

const oss = createOSSPostTool();

export default function CustomRequest() {
  return (
    <Upload
      request={({ file, onError, onSuccess, onProgress }) => {
        let request: XMLHttpRequest | undefined;
        oss
          .upload({
            file,
            onProgress,
            getRequest(r) {
              console.log('get request', r);
              request = r;
            },
          })
          .then(res => {
            onSuccess(res);
          })
          .catch(onError);
        return {
          abort() {
            console.log('abort', request);
            request && request.abort();
          },
        };
      }}
    >
      {({ getInputProps, getRootProps, getResultProps, uploadFiles }) => {
        return (
          <div>
            <input {...getInputProps()} />
            <Button {...getRootProps()} type="primary">
              点击上传
            </Button>
            <div>
              {uploadFiles.map(file => (
                <UploadResult
                  {...getResultProps({ file })}
                  filename={file.body ? file.body.url : file.filename}
                  url={file.body && file.body.url}
                  style={{ marginTop: '10px', width: '500px' }}
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
  title: 'oss直传',
  desc:
    '1. 使用`muya-core`中提供的oss直传工具来自定义上传逻辑 \n\n 2. 注意处理`request`参数中的回调函数',
};
