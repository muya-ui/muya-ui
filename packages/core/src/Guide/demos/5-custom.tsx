import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { CloseIcon } from '@muya-ui/theme-light';
import { Button, Guide, IGuideStep, ImgSpan, Switch, Typography, useTheme } from '@muya-ui/core';

const StyledArrow = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-color: transparent;
  bottom: 100%;
  left: 16px;
  border-width: 6px 6px;
  border-bottom-color: #fff;
`;

const ToolTipsContent = styled.div`
  position: relative;
  padding: 25px 0;
  width: 220px;
  text-align: center;
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
  right: 10px;
  top: 10px;
  color: #ccc;
  &:hover {
    cursor: pointer;
  }
  font-size: 10px;
`;

const ToolTipsStyle = createGlobalStyle`
  .muya-guide-tooltips {
    top: 20px !important;
  }
`;

const BasicImg = styled(ImgSpan)`
  width: 60px;
  height: 68px;
  margin-top: 11px;
  margin-bottom: 28px;
`;

export default function Demo() {
  const theme = useTheme();
  const [show, setShow] = React.useState(false);
  const tourConfig: IGuideStep[] = [
    {
      selector: '.step5',
      position: 'bottom',
      content: ({ close, goTo }) => (
        <ToolTipsContent>
          <ToolTipsStyle />
          <CloseIconWrapper onClick={close} />
          <BasicImg src="//qhstaticssl.kujiale.com/newt/100759/image/png/1579416072785/7A418011F3C7308AFC85A1FDADEBB273.png" />
          <Typography.Title style={{ marginBottom: 4 }} level={theme.components.Guide.titleLevel}>
            批量导入员工
          </Typography.Title>
          <Typography.Text>用Excel表格，在这批量导入员工</Typography.Text>
          <div style={{ marginTop: 23 }}>
            <Button type="primary" onClick={() => goTo(1)}>
              下一步(1/3)
            </Button>
          </div>
          <StyledArrow />
          <SkipWrapper onClick={close}>
            <Typography.Text color="disabled">跳过引导</Typography.Text>
          </SkipWrapper>
        </ToolTipsContent>
      ),
    },
    {
      selector: '.step6',
      position: 'bottom',
      content: '这是第二个新功能',
    },
    {
      selector: '#step7',
      position: 'bottom',
      content: '这是第三个新功能',
    },
  ];
  return (
    <>
      <Switch onChange={value => setShow(value)} checked={show} style={{ marginBottom: 30 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button className="step5">功能 1</Button>
        <Button className="step6">功能 2</Button>
        <Button id="step7">功能 3</Button>
      </div>
      {show ? <Guide rounded={2} steps={tourConfig} onRequestClose={() => setShow(false)} /> : null}
    </>
  );
}

export const meta = {
  title: '强提示多步自定义气泡样式',
  desc: '强提示多步自定义气泡样式用法',
};
