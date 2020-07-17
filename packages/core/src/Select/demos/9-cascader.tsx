import React, { useState } from 'react';

import { ISelectValueType, Option, Select } from '@muya-ui/core';

type IProvinceKey = 'Zhejiang' | 'Jiangsu';
const provinceData: IProvinceKey[] = ['Zhejiang', 'Jiangsu'];
const cityData: Record<IProvinceKey, string[]> = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

export default function CascaderDemo() {
  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0]);

  const onProvinceChange = (value: ISelectValueType) => {
    setCities(cityData[value as IProvinceKey]);
    setSecondCity(cityData[value as IProvinceKey][0]);
  };

  const onSecondCityChange = (value: ISelectValueType) => {
    setSecondCity(value as string);
  };
  return (
    <>
      <Select allowClear={false} defaultValue={provinceData[0]} onChange={onProvinceChange}>
        {provinceData.map(province => (
          <Option key={province} value={province}>
            {province}
          </Option>
        ))}
      </Select>
      <Select allowClear={false} value={secondCity} onChange={onSecondCityChange}>
        {cities.map(city => (
          <Option key={city} value={city}>
            {city}
          </Option>
        ))}
      </Select>
    </>
  );
}

export const meta = {
  title: '联动',
  desc: '省市联动的典型例子。\n\n推荐使用 Cascader 组件。',
};
