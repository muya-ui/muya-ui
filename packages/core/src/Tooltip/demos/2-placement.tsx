import React from 'react';
import styled from 'styled-components';

import { Button, IPopperPlacement, Tooltip } from '@muya-ui/core';

interface IItemProps {
  placement: IPopperPlacement;
}

const StyledBox = styled.div`
  width: 500px;
  transform: scale(0.9);
  transform-origin: top left;
  .item {
    margin: 4px;
    padding: 0 4px;
  }
  .top-row,
  .bottom-row {
    margin: -4px 0 -4px 88px;
  }

  .middle-row {
    display: flex;
  }
  .left-col,
  .right-col {
    display: flex;
    flex-direction: column;
  }
  .right-col {
    margin-left: 272px;
  }
`;

const Item = (props: IItemProps) => {
  const { placement } = props;
  return (
    <Tooltip title="记录第一次遇见的你 Jay Chou" triggerAction="hover" placement={placement}>
      <Button className="item" size="s" width={88} disableSiblingMargin>
        {placement}
      </Button>
    </Tooltip>
  );
};

export default function PlacementDemo() {
  return (
    <StyledBox>
      <div className="top-row">
        <Item placement="top-start" />
        <Item placement="top" />
        <Item placement="top-end" />
      </div>
      <div className="middle-row">
        <div className="left-col">
          <Item placement="left-start" />
          <Item placement="left" />
          <Item placement="left-end" />
        </div>
        <div className="right-col">
          <Item placement="right-start" />
          <Item placement="right" />
          <Item placement="right-end" />
        </div>
      </div>
      <div className="bottom-row">
        <Item placement="bottom-start" />
        <Item placement="bottom" />
        <Item placement="bottom-end" />
      </div>
    </StyledBox>
  );
}

export const meta = {
  title: '12个位置',
  desc: '12个标准位置，与`Popper`一致',
};
