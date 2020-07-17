import React, { useState } from 'react';
import styled from 'styled-components';

import {
  Dialog,
  Button,
  Swipe,
  Img,
  useSwipe,
  PagerButton,
  Typography,
  Switch,
} from '@muya-ui/core';
import { CloseIcon } from '@muya-ui/theme-light';

const DialogContent = styled.div`
  position: relative;
  width: 640px;

  .arrow {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    transition: all 0.3s;
    z-index: 999;
  }

  .arrow-left {
    left: 0;
  }

  .arrow-right {
    right: 0;
  }
`;

const ButtonWrapper = styled.div`
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 32px;
`;

const SkipWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -32px;
  margin: 0 auto;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

const CloseIconWrapper = styled(CloseIcon)`
  position: absolute;
  right: 16px;
  top: 16px;
  color: #ccc;
  z-index: 999;
  &:hover {
    cursor: pointer;
  }
`;

export default function SwipeDemo() {
  const imgItems = [
    '//qhyxpicoss.kujiale.com/r/2019/08/27/L3D186S20ENDIB5TT7YUI5NYALUF3P3WW888_1920x1080.jpg',
    '//qhyxpicoss.kujiale.com/r/2019/08/23/L3D206S20ENDIBAMP6YUI5NYALUF3P3WE888_2560x1440.jpg',
    '//qhyxpicoss.kujiale.com/r/2019/08/07/L3D206S8ENDIBKVORYUI5L7ELUF3P3XE888_2560x1440.jpg',
    '//qhyxpicoss.kujiale.com/r/2019/08/24/L3D186S21ENDIB7VLLYUI5NFSLUF3P3W2888_1920x1080.jpg',
    '//qhyxpicoss.kujiale.com/r/2019/08/23/L3D123S21ENDIBAGI2AUI5NYALUF3P3XC888_3200x2400.jpg',
    '//qhyxpicoss.kujiale.com/r/2019/06/25/L3D206S8ENDIAHI4TYUI5NYALUF3P3X6888_2560x1440.jpg',
  ];
  const [open, setOpen] = useState(false);
  const { stepIndex, hasNext, hasPrev, onNext, onStepsChange, onPrev } = useSwipe();

  return (
    <>
      <Switch onChange={value => setOpen(value)} checked={open} style={{ marginBottom: 30 }} />
      <Dialog.Base open={open} disableSize zIndex={9999}>
        <DialogContent>
          <CloseIconWrapper onClick={() => setOpen(false)} />
          <PagerButton
            className="arrow arrow-left"
            arrow="left"
            disabled={!hasPrev}
            onClick={onPrev}
          />
          <PagerButton
            className="arrow arrow-right"
            arrow="right"
            disabled={!hasNext}
            onClick={onNext}
          />
          <Swipe
            onStepsChange={onStepsChange}
            stepIndex={stepIndex}
            equalNum={1}
            duration={600}
            style={{ height: '420px' }}
          >
            {imgItems.map((item, i) => (
              <Img className="main-img" key={i} src={item} />
            ))}
          </Swipe>
          <ButtonWrapper>
            <Button
              type="primary"
              size="l"
              onClick={() => {
                hasNext ? onNext() : setOpen(false);
              }}
            >
              {hasNext ? '下一步' : '确定'}
            </Button>
          </ButtonWrapper>
          <SkipWrapper onClick={() => setOpen(false)}>
            <Typography.Text color="disabled">跳过引导</Typography.Text>
          </SkipWrapper>
        </DialogContent>
      </Dialog.Base>
    </>
  );
}

export const meta = {
  title: '引导弹窗',
  desc: '引导弹窗用法',
};
