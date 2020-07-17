import React, { useState } from 'react';

import {
  Collapse,
  CollapsePanel,
  Typography,
  InlineButton,
  Checkbox,
  RadioGroup,
  ICollapseExpandIconPosition,
} from '@muya-ui/core';
import { GuildDownIcon, EditIcon } from '@muya-ui/theme-light';

export default function SimpleDemo() {
  const [arrowPosition, setArrowPosition] = useState<ICollapseExpandIconPosition>('left');
  const [showArrow, setShowArrow] = useState(true);
  const expandIcon = <GuildDownIcon />;
  const extra = (
    <InlineButton size="s">
      <EditIcon />
    </InlineButton>
  );
  const text =
    '酷家乐是一家面向未来的大家居全案设计平台及生态解决方案提供商，致力于为数字化升级提供一站式的解决方案。平台以设计为入口，链接大家居行业生态，为家居企业提供设计、营销、生产、管理、供应链等场景的解决方案和服务，助力全行业实现“所见即所得”的愿景。';
  return (
    <div>
      <Checkbox checked={showArrow} onChange={e => setShowArrow(e.target.checked)}>
        是否展示箭头
      </Checkbox>
      <RadioGroup
        options={[{ label: '箭头在左侧', value: 'left' }, { label: '箭头在右侧', value: 'right' }]}
        onChange={v => {
          setArrowPosition(v as ICollapseExpandIconPosition);
        }}
      />
      <Collapse
        defaultActiveKeys={['1', '2', '3']}
        expandIcon={expandIcon}
        expandIconPosition={arrowPosition}
      >
        <CollapsePanel showArrow={showArrow} header="标题1" key="1" extra={extra}>
          <Typography.Paragraph>{text}</Typography.Paragraph>
        </CollapsePanel>
        <CollapsePanel showArrow={showArrow} header="标题2" key="2">
          <Typography.Paragraph>{text}</Typography.Paragraph>
        </CollapsePanel>
        <CollapsePanel showArrow={showArrow} header="标题3" key="3" disabled>
          <Typography.Paragraph>{text}</Typography.Paragraph>
        </CollapsePanel>
      </Collapse>
    </div>
  );
}

export const meta = {
  title: '自定义面板',
  desc:
    '1. 通过`CollapsePanel`中的`showArrow`、`extra`、`expandIcon`属性控制面板箭头和操作区域内容，通过`Collapse.expandIcon/expandIconPosition`统一设置所以面板的箭头图标和箭头位置 \n\n 2. 通过样式覆盖组件内部样式 ',
};
