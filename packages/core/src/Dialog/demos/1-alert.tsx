import React, { useState } from 'react';

import { wait } from '@muya-ui/utils';
import { Button, Dialog, IDialogAlertProps } from '@muya-ui/core';

export default function AlertDemo() {
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
        size="s"
        open={show}
        title="提示型对话框"
        type={type}
        confirmText="知道了"
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
        info提示
      </Button>
      <Button
        plain
        style={{ marginRight: '8px' }}
        onClick={() => handleOpen('success')}
        type="success"
      >
        success提示
      </Button>
      <Button
        plain
        style={{ marginRight: '8px' }}
        onClick={() => handleOpen('warning')}
        type="warning"
      >
        warning提示
      </Button>
      <Button
        plain
        style={{ marginRight: '8px' }}
        onClick={() => handleOpen('error')}
        type="danger"
      >
        error提示
      </Button>
    </>
  );
}

export const meta = {
  title: '提醒型弹窗',
  desc: '直接使用`Dialog.Alert`，配置关闭按钮，弹窗尺寸建议使用`s`',
};
