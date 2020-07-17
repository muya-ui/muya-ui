import React, { useState } from 'react';
import styled from 'styled-components';

import { FoldIcon } from '@muya-ui/theme-light';
import { Dropdown, IMenuSelectInfo, InlineButton, Menu, MenuItem } from '@muya-ui/core';

const ExpandIcon = styled(FoldIcon)`
  width: 8px;
  height: 8px;
  margin-left: 4px;
`;

export default function CloseMethodDemo() {
  const [visible, setVisible] = useState(false);
  const handleMenuClick = (info: IMenuSelectInfo) => {
    if (info.key === '3') {
      setVisible(false);
    }
  };

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <MenuItem key="1">Clicking me will not close the menu.</MenuItem>
      <MenuItem key="2">Clicking me will not close the menu also.</MenuItem>
      <MenuItem key="3">Clicking me will close the menu</MenuItem>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} onVisibleChange={handleVisibleChange} visible={visible}>
      <InlineButton type="primary">
        Hover me
        <ExpandIcon />
      </InlineButton>
    </Dropdown>
  );
}

export const meta = {
  title: '菜单隐藏方式',
  desc: '默认是点击关闭菜单，可以关闭此功能。',
};
