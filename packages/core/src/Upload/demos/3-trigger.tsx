import React from 'react';

import { AddIcon, UploadIcon } from '@muya-ui/theme-light';
import {
  Button,
  InlineButton,
  postFile,
  Typography,
  Upload,
  UploadCard,
  UploadResult,
} from '@muya-ui/core';

const { Text } = Typography;
export default function Trigger() {
  return (
    <Upload
      request={option =>
        postFile({ ...option, action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76' })
      }
    >
      {({ getInputProps, getRootProps, getResultProps, uploadFiles }) => {
        return (
          <div style={{ width: '100%' }}>
            <input {...getInputProps()} />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexFlow: 'row wrap',
              }}
            >
              <InlineButton {...getRootProps()} prefixNode={<UploadIcon />}>
                点击上传
              </InlineButton>
              <InlineButton {...getRootProps()} type="primary">
                点击上传
              </InlineButton>
              <InlineButton {...getRootProps()}>
                <UploadIcon fontSize={24} />
              </InlineButton>
              <Button {...getRootProps()} type="primary">
                点击上传
              </Button>
              <UploadCard
                {...getRootProps()}
                width={80}
                height={80}
                size="s"
                icon={<AddIcon />}
                title="点击上传"
              />
            </div>
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
  title: '上传触发器',
  desc:
    '任何元素均可当做`Upload`的触发器，注意要为触发器设置`getRootProps`，我们提供了标准触发器`UploadCard`',
};
