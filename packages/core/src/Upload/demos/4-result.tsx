import React from 'react';

import {
  Col,
  IUploadFile,
  IUploadResultProps,
  Row,
  toast,
  Typography,
  UploadResult,
} from '@muya-ui/core';

export default function Result() {
  const getResult = (
    size: IUploadResultProps['size'],
    type: IUploadResultProps['type'],
    status: IUploadFile['status'],
  ) => (
    <UploadResult
      type={type}
      onRemove={() => toast.success('你点击了关闭')}
      onRetry={() => toast.success('你点击了重试')}
      previewFile={() =>
        '//qhstaticssl.kujiale.com/newt/29/image/png/1567069346213/A8C6DECED7C868F1E57AC115EA1D5BAA.png'
      }
      filename="我是一个文件"
      size={size}
      file={{
        originFile: new File(['foo'], 'foo.txt'),
        uid: 'test',
        status,
        percent: 80,
      }}
    />
  );
  return (
    <div>
      <Typography.Title level={5}>picture-card</Typography.Title>
      <Row gutter={10}>
        <Col>{getResult('m', 'picture-card', 'uploading')}</Col>
        <Col>{getResult('m', 'picture-card', 'error')}</Col>
        <Col>{getResult('m', 'picture-card', 'success')}</Col>
      </Row>
      <Typography.Title level={5}>card</Typography.Title>
      <Row gutter={10}>
        <Col>{getResult('m', 'card', 'uploading')}</Col>
        <Col>{getResult('m', 'card', 'error')}</Col>
        <Col>{getResult('m', 'card', 'success')}</Col>
      </Row>
      <Typography.Title level={5}>picture</Typography.Title>
      <Row gutter={10}>
        <Col>{getResult('m', 'picture', 'uploading')}</Col>
        <Col>{getResult('m', 'picture', 'error')}</Col>
        <Col>{getResult('m', 'picture', 'success')}</Col>
      </Row>
    </div>
  );
}

export const meta = {
  title: '展示上传结果',
  desc:
    '1. `UploadResult`有三种形式: `picture`、`picture-card`、`card`，每种形式都对应三个尺寸\n\n 2. `UploadResult`的上传状态也有三种 `success`、`uploading`、`error`',
};
