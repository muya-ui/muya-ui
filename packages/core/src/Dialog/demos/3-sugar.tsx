import React from 'react';

import { Button, Dialog } from '@muya-ui/core';
import { wait } from '@muya-ui/utils';

export default function AlertDemo() {
  const alertProps = {
    title: '提示型对话框',
    text: '长长长长长长长长长长长长长长长长长长长长长长长长长长长长篇大论',
    onConfirm: () => wait.time(1000),
    hideClose: false,
  };

  const confirmProps = {
    size: 'm',
    title: '提示型对话框',
    text: '长长长长长长长长长长长长长长长长长长长长长长长长长长长长篇大论',
    cancelText: '取消',
    onCancel: () => wait.time(1000),
    hideClose: false,
  };
  return (
    <>
      <Button
        plain
        style={{ marginRight: '8px' }}
        onClick={() => Dialog.info(alertProps)}
        type="primary"
      >
        info提示
      </Button>
      <Button
        plain
        style={{ marginRight: '8px' }}
        onClick={() => Dialog.success(alertProps)}
        type="success"
      >
        success提示
      </Button>
      <Button
        plain
        style={{ marginRight: '8px' }}
        onClick={() => Dialog.warning(alertProps)}
        type="warning"
      >
        warning提示
      </Button>
      <Button
        plain
        style={{ marginRight: '8px' }}
        onClick={() => Dialog.error(alertProps)}
        type="danger"
      >
        error提示
      </Button>
      <div style={{ margin: '10px' }}></div>
      <Button
        plain
        style={{ marginRight: '8px' }}
        onClick={() => Dialog.info(confirmProps)}
        type="primary"
      >
        info决策
      </Button>
      <Button
        plain
        style={{ marginRight: '8px' }}
        onClick={() => Dialog.success(confirmProps)}
        type="success"
      >
        success决策
      </Button>
      <Button
        plain
        style={{ marginRight: '8px' }}
        onClick={() => Dialog.warning(confirmProps)}
        type="warning"
      >
        warning决策
      </Button>
      <Button
        plain
        style={{ marginRight: '8px' }}
        onClick={() => Dialog.error(confirmProps)}
        type="danger"
      >
        error决策
      </Button>
    </>
  );
}

export const meta = {
  title: '决策/提醒型弹窗语法糖',
  desc:
    '为了方便开发者使用提示型弹窗，封装了`Dialog.alert`方法，可以编程式调用，参数类型同 `Dialog.Alert` 组件',
};
