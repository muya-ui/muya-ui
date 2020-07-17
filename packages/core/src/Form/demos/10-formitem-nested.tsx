import React from 'react';

import { CheckboxGroup, Form, FormItem, Input, Option, RadioGroup, Select } from '@muya-ui/core';

export default function FormItemNestedDemo() {
  return (
    <Form
      defaultValues={{
        radio: 'dog',
        sports: ['篮球'],
        job: '业余爱好者',
        checkboxs: ['dance'],
      }}
      requiredTipAlignLeft
      labelPosition="left"
      labelWidth={100}
      inlineSpacing={12}
      onSubmit={values => {
        console.log(JSON.stringify(values, null, 4));
        alert(JSON.stringify(values, null, 4));
      }}
    >
      <FormItem
        name="radio"
        id="radio10"
        label="宠物"
        rule={[{ type: 'string', required: true, message: '养宠物才是好孩子' }]}
      >
        <RadioGroup
          options={[
            { label: '喜欢猫', value: 'cat' },
            { label: '喜欢狗', value: 'dog' },
            { label: '都喜欢', value: 'cat + dog' },
          ]}
        ></RadioGroup>
      </FormItem>
      <FormItem label="职业🏃">
        <FormItem
          inline
          name="sports"
          id="sports10"
          rule={[{ type: 'array', required: true, message: '运动项目必填' }]}
        >
          <Select allowClear mode="multiple">
            <Option value="篮球" label="篮球🏀" key="1" />
            <Option value="排球" label="排球🏐" key="2" />
            <Option value="足球" label="⚽足球️" key="3" />
            <Option value="乒乓球" label="乒乓球🏓" key="4" />
            <Option value="网球" label="网球🎾" key="5" />
          </Select>
        </FormItem>
        <FormItem
          inline
          name="job"
          rule={[{ type: 'string', required: true, message: '职业描述必填' }]}
        >
          <Input placeholder="填写职业的具体描述" />
        </FormItem>
      </FormItem>
      <FormItem
        id="checkboxs10"
        name="checkboxs"
        inline
        label="个人标签"
        rule={[{ type: 'array', required: true, min: 1, message: '请选择个人标签，最少一项' }]}
      >
        <CheckboxGroup
          options={[
            {
              label: '唱歌',
              value: 'sing',
            },
            {
              label: '跳舞',
              value: 'dance',
            },
            {
              label: 'Rap',
              value: 'rap',
            },
          ]}
        />
      </FormItem>
    </Form>
  );
}

export const meta = {
  title: 'FormItem嵌套',
  desc:
    '1. 容器`FormItem`设置`label`，不需要设置`name` \n\n 1. 内部`FormItem`请设置`inline={true}`，不需要传`label`属性，间距可以通过`FormItem/Form.inlineSpacing`属性调整`',
};
