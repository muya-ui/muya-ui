import React, { useCallback, useState } from 'react';

import { CheckableTag } from '@muya-ui/core';

interface IMyTagProps {
  children: string;
  disabled?: boolean;
  defaultChecked?: boolean;
}

const MyTag = (props: IMyTagProps) => {
  const { disabled, defaultChecked } = props;
  const [checked, setChecked] = useState(!!defaultChecked);

  const handleChange = useCallback(
    checked => {
      if (!disabled) {
        setChecked(checked);
      }
    },
    [disabled],
  );

  return (
    <CheckableTag {...props} disabled={!!disabled} checked={checked} onChange={handleChange} />
  );
};

export default function CheckedTagDemo() {
  return (
    <>
      <MyTag key="tag1">标签一</MyTag>
      <MyTag key="tag2">标签二</MyTag>
      <MyTag key="tag3">标签三</MyTag>
      <MyTag key="tag4" defaultChecked disabled>
        禁用的标签
      </MyTag>
    </>
  );
}

export const meta = {
  title: '可选择标签',
  desc:
    '该组件为完全受控组件，不支持非受控用法。本例为单独使用的方法，但是在更多场景中会以标签组的形式使用，用法可见[可选择标签]的 demo',
};
