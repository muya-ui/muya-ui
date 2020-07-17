import React from 'react';
import { EllipsisContent } from '@muya-ui/core';

export default function disableTooltipDemo() {
  return (
    <EllipsisContent enableTooltip={false}>
      真的猛士，敢于直面惨淡的人生，敢于正视淋漓的鲜血。这是怎样的哀痛者和幸福者？然而造化又常常为庸人设计，以时间的流驶，来洗涤旧迹，仅使留下淡红的血色和微漠的悲哀。在这淡红的血色和微漠的悲哀中，又给人暂得偷生，维持着这似人非人的世界。我不知道这样的世界何时是一个尽头！
    </EllipsisContent>
  );
}

export const meta = {
  title: '禁用 Tooltip',
  desc:
    '可以通过 `enableTooltip: false` 禁用 `Tooltip`，那么这个组件就等同于 `Typography.Paragraph` 设置了 `ellipsis` 参数。',
};
