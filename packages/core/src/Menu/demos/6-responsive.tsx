import React from 'react';
import styled from 'styled-components';
import { range } from 'lodash';
import { FileIcon } from '@muya-ui/theme-light';
import { IMenuSelectInfo, Menu, MenuItem, SubMenu, useTheme } from '@muya-ui/core';

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background: ${props => props.theme.colors.spec.neutral9.normal};
`;

function onSelectChange(info: IMenuSelectInfo) {
  console.log('Select: ', info);
}

export default function VerticalDemo() {
  const theme = useTheme();
  return (
    <MenuContainer theme={theme}>
      <Menu
        width={184}
        onSelectChange={onSelectChange}
        subMenuIcon={<FileIcon />}
        triggerSubMenuAction="click"
        mode="vertical"
        forceSubMenuRender
        autoItemCountPerPage
      >
        <SubMenu key="sub1" title={<span>导航一</span>}>
          {range(50).map(i => {
            if (i % 5 === 0) {
              return (
                <SubMenu key={`sub${i}`} title={<span>子导航</span>}>
                  {range(5).map(j => (
                    <MenuItem key={`sub${i}#${j}`}>Item {`sub${i}#${j}`}</MenuItem>
                  ))}
                </SubMenu>
              );
            }
            return <MenuItem key={i}>Item {i}</MenuItem>;
          })}
        </SubMenu>
      </Menu>
    </MenuContainer>
  );
}

export const meta = {
  title: '自适应每页条数',
  desc:
    '默认超出 6.5 条会显示滚动条，可以通过 `responsiveItemCountPerPage` 属性开启自适应屏幕高度显示每页条数。',
};
