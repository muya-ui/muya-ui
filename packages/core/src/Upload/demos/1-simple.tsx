import React from 'react';

import { UploadIcon } from '@muya-ui/theme-light';
import { postFile, Upload, UploadCard, UploadResult } from '@muya-ui/core';

export default function Simple() {
  return (
    <Upload
      request={option =>
        postFile({ ...option, action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76' })
      }
    >
      {({ getInputProps, getRootProps, getResultProps, uploadFiles }) => {
        return (
          <div style={{ width: '100%' }}>
            <UploadCard
              {...getRootProps()}
              width="100%"
              height={160}
              icon={<UploadIcon fontSize={24} />}
              title="将文件拖拽到此处，或点击上传"
              subtitle="支持balabala、balabala类型的文件"
            >
              <input {...getInputProps()} />
            </UploadCard>
            <div>
              {uploadFiles.map(file => (
                <UploadResult
                  style={{ marginTop: '10px', width: '100%' }}
                  {...getResultProps({ file })}
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
  title: '基础用法',
  desc:
    '1. 推荐使用标准的`UploadCard`作为触发器，使用`UploadResult`作为上传结果展示\n\n 2. 通过`getInputProps`获取`input`的props，通过`getRootProps`获取触发器的props\n\n 2. 定义`request`函数来定义上传的具体行为, 提供了基础的`postFile`上传文件函数',
};
