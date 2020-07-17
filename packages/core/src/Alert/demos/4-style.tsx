import React from 'react';

import { Alert, Typography } from '@muya-ui/core';

export default function ActionDemo() {
  return (
    <div className="doc-alert-container">
      <div className="item">
        <Typography.Title className="title" level={5}>
          基础(纯文字)
        </Typography.Title>
        <div className="alert-wp">
          <div className="alert" style={{ width: '432px' }}>
            <Alert type="info" showIcon={false}>
              通过填写个人信息可以让用户更方便地找到你。
            </Alert>
          </div>
          <div className="alert" style={{ width: '432px' }}>
            <Alert type="info" showIcon={false}>
              通过填写个人信息可以让用户更方便地找到你。通过填写个人信息可以让用户更方便地找到你。
            </Alert>
          </div>
        </div>
      </div>
      <div className="item">
        <Typography.Title className="title" level={5}>
          文字+icon
        </Typography.Title>
        <div className="alert-wp">
          <div className="alert" style={{ width: '432px' }}>
            <Alert type="info">这是一条提示文案这是一条提示文案</Alert>
          </div>
          <div className="alert" style={{ width: '432px' }}>
            <Alert type="info">
              通过填写个人信息可以让用户更方便地找到你。通过填写个人信息可以让用户更方便地找到你。
            </Alert>
          </div>
        </div>
      </div>
      <div className="item">
        <Typography.Title className="title" level={5}>
          标题+描述
        </Typography.Title>
        <div className="alert-wp">
          <div className="alert" style={{ width: '419px' }}>
            <Alert
              type="info"
              title="信息文字"
              description="通过填写个人信息可以让用户更方便地找到你。通过填写个人信息可以让用户更方便地找到你。通过填写个人信息可以让用户更方便地找"
            ></Alert>
          </div>
          <div className="alert" style={{ width: '419px' }}>
            <Alert
              type="success"
              title="信息文字"
              description="通过填写个人信息可以让用户更方便地找到你。通过填写个人信息可以让用户更方便地找到你。"
            ></Alert>
          </div>
          <div className="alert" style={{ width: '419px' }}>
            <Alert
              type="error"
              title="错误文字"
              description="通过填写个人信息可以让用户更方便地找到你。通过填写个人信息可以让用户更方便地找到你。"
            ></Alert>
          </div>
          <div className="alert" style={{ width: '419px' }}>
            <Alert
              type="warning"
              title="警告文字"
              description="通过填写个人信息可以让用户更方便地找到你。通过填写个人信息可以让用户更方便地找到你。"
            ></Alert>
          </div>
        </div>
      </div>
    </div>
  );
}

export const meta = {
  title: '样式',
  desc: '',
};
