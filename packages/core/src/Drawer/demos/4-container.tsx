import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Dialog, Drawer, Typography } from '@muya-ui/core';

const StyledContainer = styled.div`
  height: 300px;
  width: 100%;
  margin-bottom: 10px;
  background: #fafafa;
  position: relative;
`;

export default function DialogDemo() {
  const [open, setOpen] = useState(false);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <StyledContainer ref={e => setContainer(e)} />
      <Drawer width="50%" container={container} open={open} onClose={handleClose}>
        <Dialog.Title closeButtonSize="xl" onClose={handleClose}>
          漂亮的标题
        </Dialog.Title>
        <Dialog.Content>
          <Typography.Paragraph color="assistant">
            酷家乐是一家面向未来的大家居全案设计平台及生态解决方案提供商，致力于为数字化升级提供一站式的解决方案。平台以设计为入口，链接大家居行业生态，为家居企业提供设计、营销、生产、管理、供应链等场景的解决方案和服务，助力全行业实现“所见即所得”的愿景。
          </Typography.Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button plain type="secondary" onClick={handleClose}>
            取 消
          </Button>
          <Button type="primary" onClick={handleClose}>
            确 认
          </Button>
        </Dialog.Actions>
      </Drawer>
      <Button
        onClick={() => {
          setOpen(v => !v);
        }}
      >
        切换Drawer状态
      </Button>
    </div>
  );
}

export const meta = {
  title: '自定义Drawer根节点',
  desc:
    '默认情况下，Drawer使用`body`作为根节点，可以传入`container`属性来修改。注意，请为`Drawer`设置样式`position:absolute`，自定义根节点需要设置样式`position: relative`',
};
