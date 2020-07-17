import React from 'react';
import { EllipsisContent } from '@muya-ui/core';

export default function BasicDemo() {
  return (
    <EllipsisContent>
      真的猛士，敢于直面惨淡的人生，敢于正视淋漓的鲜血。这是怎样的哀痛者和幸福者？然而造化又常常为庸人设计，以时间的流驶，来洗涤旧迹，仅使留下淡红的血色和微漠的悲哀。在这淡红的血色和微漠的悲哀中，又给人暂得偷生，维持着这似人非人的世界。我不知道这样的世界何时是一个尽头！
    </EllipsisContent>
  );
}

export const meta = {
  title: '基本使用',
  desc: '默认文本溢出时，hover 会显示 `Tooltip`。',
};
