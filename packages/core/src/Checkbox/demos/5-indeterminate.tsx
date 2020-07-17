import React, { ChangeEvent, useMemo, useState } from 'react';

import { Checkbox, CheckboxGroup, ICheckboxGroupValue } from '@muya-ui/core';

export default function IndeterminateDemo() {
  const [list, setList] = useState([] as ICheckboxGroupValue[]);
  const options = ['Lakers', 'Warriors', 'Suns'];

  const indeterminate = useMemo(() => list.length !== options.length && list.length > 0, [
    list.length,
    options.length,
  ]);
  const checked = useMemo(() => list.length === options.length, [list.length, options.length]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    if (checked) {
      setList(options);
    } else {
      setList([]);
    }
  }

  return (
    <div>
      <Checkbox checked={checked} indeterminate={indeterminate} onChange={handleChange}>
        Check all
      </Checkbox>
      <br />
      <CheckboxGroup
        options={options}
        value={list}
        onChange={(value: ICheckboxGroupValue[]) => setList(value)}
      />
    </div>
  );
}

export const meta = {
  title: '全选',
  desc: '在实现全选效果时，你可能会用到 indeterminate 属性',
};
