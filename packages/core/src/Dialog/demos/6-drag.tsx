import React, { useState, CSSProperties } from 'react';
import { useDrag, useDrop, DndProvider, XYCoord } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import { Button, Dialog, InlineButton, Typography } from '@muya-ui/core';

const ItemTypes = {
  DIALOG: 'dialog',
};
interface DragItem {
  top: number;
  left: number;
}

function MyDialog() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  const [{ opacity }, dragRef] = useDrag({
    item: { type: ItemTypes.DIALOG },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  const [box, setBox] = useState<DragItem>({
    top: window.innerHeight / 3,
    left: window.innerWidth / 2,
  });

  const [, drop] = useDrop({
    accept: ItemTypes.DIALOG,
    drop(_item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      const left = Math.round(box.left + delta.x);
      const top = Math.round(box.top + delta.y);
      setBox({ left, top });
      return undefined;
    },
  });

  const style: CSSProperties = {
    ...box,
    opacity,
    transition: 'opacity 150ms ease',
  };

  return (
    <>
      <Dialog.Base
        ref={dragRef}
        rootRef={drop}
        open={show}
        onClose={handleClose}
        size="l"
        lazyMount
        dialogContainerProps={{ style }}
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
        打开拖拽弹窗
      </Button>
    </>
  );
}

export default function DragDemo() {
  return (
    <DndProvider backend={Backend}>
      <MyDialog />
    </DndProvider>
  );
}

export const meta = {
  title: '可拖拽弹窗',
  desc: '集成`react-dnd`实现',
};
