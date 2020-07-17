import React, { useState } from 'react';

import { IInputTagValue, TagsInput } from '@muya-ui/core';

export default function TagDemo() {
  const [value, setValue] = useState<IInputTagValue[]>(['标签一', '标签二']);
  const onAddTag = (tag: IInputTagValue, e: React.SyntheticEvent) => {
    setValue([...value, tag]);
  };
  const onRemoveTag = (tag: IInputTagValue, index: number, e: React.SyntheticEvent) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    setValue(newValue);
  };
  return <TagsInput value={value} onAddTag={onAddTag} onRemoveTag={onRemoveTag} allowAdd />;
}

export const meta = {
  title: '标签输入框',
  desc: '标签输入框',
};
