import React, { useState } from 'react';

import { Button, Dialog, InlineButton, Typography } from '@muya-ui/core';

export default function FuncDemo() {
  const [show, setShow] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
    setFullWidth(false);
    setFullScreen(false);
  };

  const handleFullScreenOpen = () => {
    setShow(true);
    setFullWidth(false);
    setFullScreen(true);
  };

  const handleFullWidth = () => {
    setShow(true);
    setFullScreen(false);
    setFullWidth(true);
  };

  return (
    <>
      <Dialog.Base
        open={show}
        onClose={handleClose}
        size="l"
        lazyMount
        rootRef={el => console.log(el)}
        fullWidth={fullWidth}
        fullScreen={fullScreen}
      >
        <Dialog.Title onClose={handleClose}>漂亮的标题</Dialog.Title>
        <Dialog.Content>
          <Typography.Paragraph color="assistant">
            酷家乐是一家面向未来的大家居全案设计平台及生态解决方案提供商，致力于为数字化升级提供一站式的解决方案。平台以设计为入口，链接大家居行业生态，为家居企业提供设计、营销、生产、管理、供应链等场景的解决方案和服务，助力全行业实现“所见即所得”的愿景。
          </Typography.Paragraph>
        </Dialog.Content>
        <Dialog.Actions
          tipAction={
            <InlineButton size="s" href="https://www.kujiale.com" target="_blank">
              查看帮助
            </InlineButton>
          }
        >
          <Button plain type="secondary" onClick={handleClose}>
            取 消
          </Button>
          <Button type="primary" onClick={handleClose}>
            确 认
          </Button>
        </Dialog.Actions>
      </Dialog.Base>
      <Button plain style={{ marginRight: '8px' }} onClick={handleOpen}>
        标准的功能型弹窗
      </Button>
      <Button plain style={{ marginRight: '8px' }} onClick={handleFullWidth}>
        最大宽度的功能型弹窗
      </Button>
      <Button plain style={{ marginRight: '8px' }} onClick={handleFullScreenOpen}>
        全屏的功能型弹窗
      </Button>
    </>
  );
}

export const meta = {
  title: '功能型弹窗',
  desc:
    '对话框大小：建议使用`l`尺寸的`Dialog`，`Dialog`还提供了两个特殊的尺寸`fullWidth`，`fullScreen`\n\n内容部分：建议直接使用`Dialog(Title/Content/Actions)`，也可以传入自定义内容\n\n用户行为：点击蒙层、按下ESC建时会触发`onClose`事件，业务方可以自行处理',
};
