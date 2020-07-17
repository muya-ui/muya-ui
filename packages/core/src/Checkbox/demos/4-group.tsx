import React from 'react';

import { Checkbox, CheckboxGroup, ICheckboxGroupOption, Tooltip } from '@muya-ui/core';

const renderCheckbox = (checkboxNode: React.ReactElement, option: ICheckboxGroupOption) => {
  return <Tooltip title={option.label}>{checkboxNode}</Tooltip>;
};

export default function GroupDemo() {
  const plainOptions: string[] = ['Lakers', 'Warriors', 'Suns'];
  const options: ICheckboxGroupOption[] = [
    { label: 'Lakers', value: 1, data: [111] },
    { label: 'Warriors', value: 2 },
    { label: 'Suns', value: 3 },
  ];
  const disabledOptions: ICheckboxGroupOption[] = [
    { label: 'Lakers', value: 1, disabled: true },
    { label: 'Warriors', value: 2, disabled: true },
    { label: 'Suns', value: 3, disabled: false },
  ];

  return (
    <div>
      <CheckboxGroup
        defaultValue={['Lakers']}
        options={plainOptions}
        styles={{ wrapper: 'item' }}
      />
      <br />
      <CheckboxGroup defaultValue={[2]} options={options} />
      <br />
      <CheckboxGroup defaultValue={[3]} options={disabledOptions} />
      <br />
      <CheckboxGroup
        defaultValue={[3]}
        renderCheckbox={renderCheckbox}
        checkboxWidth={100}
        checkboxEllipsis
      >
        <Checkbox value={1}>LakersLakersLakersLakersLakers</Checkbox>
        <Checkbox value={2}>WarriorsWarriorsWarriorsWarriors</Checkbox>
        <Checkbox value={3}>SunsSunsSunsSunsSuns</Checkbox>
      </CheckboxGroup>
    </div>
  );
}

export const meta = {
  title: 'Checkbox组',
  desc: '方便的从数组生成Checkbox组',
};
