import React from 'react';

import { ISelectValueType, Option, Select } from '@muya-ui/core';

const handleChange = (value: ISelectValueType) => {
  console.log('selected: ', value); // { value: "lucy", label: "Lucy (101)" }
};

export default function LabelInValueDemo() {
  return (
    <Select labelInValue defaultValue={{ value: 'one' }} width={120} onChange={handleChange}>
      <Option value="one">One (100)</Option>
      <Option value="two">Two (101)</Option>
    </Select>
  );
}

export const meta = {
  title: '获得选项的文本',
  desc:
    '默认情况下 `onChange` 里只能拿到 value，如果需要拿到选中的节点文本 label，可以使用 `labelInValue` 属性。\n\n选中项的 label 会被包装到 value 中传递给 `onChange` 等函数，此时 value 是一个对象。',
};
