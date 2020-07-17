import React, { useState } from 'react';

import { Button, Dialog } from '@muya-ui/core';

export default function CustomDemo() {
  const [show, setShow] = useState(false);
  const [showOther, setShowOther] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleCloseOther = () => {
    setShowOther(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  const handleOpenOther = () => {
    setShowOther(true);
  };

  return (
    <>
      <Dialog.Base open={show} onClose={handleClose} disableSize>
        <Dialog.Title onClose={handleClose}>自定义DialogContent</Dialog.Title>
        <Dialog.Content>
          <p>使用了标准的DialogTitle和DialogActions，但是定制了DialogContent的内容</p>
          <p>
            <img
              src="https://qhstaticssl.kujiale.com/newt/29/image/png/1564467685432/EB6BD3A294454A98A65AF964C7666D94.png"
              style={{
                width: '600px',
                height: '300px',
              }}
            />
          </p>
        </Dialog.Content>
        <Dialog.Actions>
          <Button plain type="primary" onClick={handleClose}>
            真好看
          </Button>
        </Dialog.Actions>
      </Dialog.Base>
      <Dialog.Base open={showOther} disableSize onClose={handleCloseOther}>
        <div
          id="custom-content"
          style={{
            width: '600px',
            height: '300px',
            padding: '20px',
            background: '#f2f2f2',
          }}
        >
          <p>不使用任何标准组件，传入自定义节点，完全自定义内容</p>
          <p>
            <img
              src="https://qhstaticssl.kujiale.com/newt/29/image/png/1564467685432/EB6BD3A294454A98A65AF964C7666D94.png"
              style={{
                width: '300px',
                height: '150px',
              }}
            />
          </p>
          <Button plain style={{ marginRight: '8px' }}>
            她不好看
          </Button>
          <Button plain type="primary" onClick={handleCloseOther}>
            她真好看
          </Button>
        </div>
      </Dialog.Base>

      <Button plain style={{ marginRight: '8px' }} onClick={handleOpen}>
        自定义DialogContent
      </Button>
      <Button plain style={{ marginRight: '8px' }} onClick={handleOpenOther}>
        自定义所有内容
      </Button>
    </>
  );
}

export const meta = {
  title: '功能型弹窗 — 自定义弹窗内容',
  desc: '将`disableSize`设置为`true`，禁用掉容器的默认宽高。接下来，传入你的自定义元素即可',
};
