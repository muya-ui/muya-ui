import React from 'react';
import styled from 'styled-components';

import { Button, Dropdown, IPopperPlacement, Link, Menu, MenuItem } from '@muya-ui/core';

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

const menu = (
  <Menu>
    <MenuItem key="1">
      <Link target="_blank" rel="noopener noreferrer" href="http://www.kujiale.com/">
        1st menu item
      </Link>
    </MenuItem>
    <MenuItem key="2">
      <Link target="_blank" rel="noopener noreferrer" href="http://www.kujiale.com/">
        2nd menu item
      </Link>
    </MenuItem>
    <MenuItem key="3">
      <Link target="_blank" rel="noopener noreferrer" href="http://www.kujiale.com/">
        3rd menu item
      </Link>
    </MenuItem>
  </Menu>
);

const Item = (props: IItemProps) => {
  const { placement } = props;
  return (
    <Dropdown key={placement} overlay={menu} placement={placement}>
      <Button className="item" size="s" width={88} disableSiblingMargin>
        {placement}
      </Button>
    </Dropdown>
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
  title: '弹出位置',
  desc: '支持 Popper.js 支持的十二个弹出位置',
};
