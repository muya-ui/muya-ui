import React, { useState } from 'react';
import styled from 'styled-components';

import { Animation, Tab, Tabs } from '@muya-ui/core';

const View = styled.div`
  height: 200px;
  box-sizing: border-box;
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #00a0e9;
`;

const Container = styled.div`
  .tabs {
    padding: 0 40px;
  }
  .content {
    margin: 10px 0;
  }
`;

interface ITabPanelProps {
  visible: boolean;
  children: React.ReactElement;
}
function TabPanel(props: ITabPanelProps) {
  const { visible, children } = props;
  if (!visible) {
    return null;
  }
  return (
    <Animation.Fade in={true} timeout={1500}>
      {children}
    </Animation.Fade>
  );
}

export default function BasicDemo() {
  const [tab, setTab] = useState(0);
  const onChange = (value: number | string) => {
    setTab(value as number);
  };
  return (
    <Container>
      <Tabs className="tabs" index={tab} onChange={onChange}>
        {/* Tab 不指定 index 默认就是数组的 index，比如当前 Tab 的 index = 0 */}
        <Tab>Tab 1</Tab>
        {/* index = 1 */}
        <Tab>Tab 2</Tab>
        {/* index = 2 */}
        <Tab>Tab 3</Tab>
        {/* index = 3 */}
        <Tab>Tab 4</Tab>
      </Tabs>
      <div className="content">
        <TabPanel visible={tab === 0}>
          <View>1</View>
        </TabPanel>
        <TabPanel visible={tab === 1}>
          <View>2</View>
        </TabPanel>
        <TabPanel visible={tab === 2}>
          <View>3</View>
        </TabPanel>
        <TabPanel visible={tab === 3}>
          <View>4</View>
        </TabPanel>
      </div>
    </Container>
  );
}

export const meta = {
  title: 'Tabs基础用法',
  desc: 'Tabs基础用法，页面级别的Tabs切换建议使用 `Animation.Fade` ',
};
