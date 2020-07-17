import React, { useState } from 'react';

import { Button, Dialog } from '@muya-ui/core';

import { IDialogAlertProps } from '../types';
import { wait } from '@muya-ui/utils';

export default function ConfirmDemo() {
  const [show, setShow] = useState(false);
  const [type, setType] = useState<IDialogAlertProps['type']>('info');
  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = (type: IDialogAlertProps['type']) => {
    setShow(true);
    setType(type);
  };

  return (
    <>
      <Dialog.Alert
        open={show}
        size="m"
        type={type}
        title="决策型对话框"
        text="正文提示，正文部分正文提示，正文部分正文提示，正文部分正文提示，正文部分正文提示，正文部分正文提示，正文部分"
        confirmText="主按钮"
        cancelText="取消"
        hideClose={false}
        closeFn={handleClose}
        onConfirm={() => {
          return wait.time(1000);
        }}
      />
      <Button
        plain
        style={{ marginRight: '8px' }}
        onClick={() => handleOpen('info')}
        type="primary"
      >
        info决策
      </Button>
      <Button
        plain
        style={{ marginRight: '8px' }}
        onClick={() => handleOpen('success')}
        type="success"
      >
        success决策
      </Button>
      <Button
        plain
        style={{ marginRight: '8px' }}
        onClick={() => handleOpen('warning')}
        type="warning"
      >
        warning决策
      </Button>
      <Button
        plain
        style={{ marginRight: '8px' }}
        onClick={() => handleOpen('error')}
        type="danger"
      >
        error决策
      </Button>
    </>
  );
}

export const meta = {
  title: '决策型弹窗',
  desc: '直接使用`Dialog.Alert`，弹窗尺寸建议使用`m`\n\n',
};
