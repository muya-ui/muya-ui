import React, { useState } from 'react';

import { IRadioGroupOption, IRadioGroupValue, Radio, RadioGroup, Tooltip } from '@muya-ui/core';

const renderRadio = (radioNode: React.ReactElement, option: IRadioGroupOption) => {
  return <Tooltip title={option.label}>{radioNode}</Tooltip>;
};

export default function GroupDemo() {
  const plainOptions: string[] = ['Apple', 'Banana', 'Orange'];
  const options: IRadioGroupOption[] = [
    { label: 'Apple', value: 1 },
    { label: 'Banana', value: 2 },
    { label: 'Orange', value: 3 },
  ];
  const disabledOptions: IRadioGroupOption[] = [
    { label: 'Apple', value: 1 },
    { label: 'Banana', value: 2, disabled: true },
    { label: 'Orange', value: 3, disabled: true },
  ];

  const [value, setValue] = useState(options[1].value);

  const onChange = (checkedValue: IRadioGroupValue) => {
    console.log('radio checked: ', checkedValue);
    setValue(checkedValue);
  };

  return (
    <>
      <div className="doc-radio-group-item">
        <RadioGroup defaultValue="Apple" options={plainOptions} radioWidth={100} />
      </div>
      <div className="doc-radio-group-item">
        <RadioGroup value={value} options={options} onChange={onChange} radioWidth={100} />
      </div>
      <div className="doc-radio-group-item">
        <RadioGroup
          defaultValue={3}
          options={disabledOptions}
          radioWidth={100}
          styles={{
            wrapper: 'radio-demo-wrapper',
          }}
        />
      </div>
      <div className="doc-radio-group-item">
        <RadioGroup defaultValue={3} radioWidth={100} radioEllipsis renderRadio={renderRadio}>
          <Radio value={1}>AppleAppleAppleApple</Radio>
          <Radio value={2}>BananaBananaBananaBanana</Radio>
          <Radio value={3}>OrangeOrangeOrangeOrange</Radio>
        </RadioGroup>
      </div>
    </>
  );
}

export const meta = {
  title: 'Radio 组',
  desc: '一组互斥的 Radio 配合使用',
};
