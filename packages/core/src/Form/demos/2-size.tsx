import React, { useState } from 'react';
import { Form, Button, FormItem, Input, RadioGroup, Checkbox } from '@muya-ui/core';
import { IComponentSizeSpec } from '@muya-ui/theme-light';
import { ILabelPosition } from '../types';

export default function SizeAndLayout() {
  const [size, setSize] = useState<IComponentSizeSpec>('m');
  const [inline, setInline] = useState(false);
  const [labelPosition, setLabelPosition] = useState<ILabelPosition>('right');
  const sizeList: IComponentSizeSpec[] = ['s', 'm', 'l', 'xl'];
  const labelPositionList: ILabelPosition[] = ['left', 'right', 'top'];
  return (
    <div>
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <RadioGroup
          style={{ marginRight: '20px' }}
          options={sizeList.map(s => ({ label: s, value: s }))}
          onChange={(s: any) => s && setSize(s)}
        />
        <RadioGroup
          options={labelPositionList.map(s => ({ label: s, value: s }))}
          onChange={(s: any) => setLabelPosition(s)}
        />
        <Checkbox
          style={{ marginLeft: '10px' }}
          onChange={e => setInline(e.target.checked)}
          value={inline}
        >
          inline
        </Checkbox>
      </div>
      <Form
        defaultValues={{
          name: '',
          password: '',
        }}
        onSubmit={values => {
          alert(JSON.stringify(values, null, 4));
        }}
        labelPosition={labelPosition}
        inline={inline}
        size={size}
        labelWidth={100}
      >
        <FormItem
          id="name2"
          name="name"
          label="用户名"
          rule={[{ type: 'string', required: true, min: 3, message: '用户名长度不能小于3' }]}
        >
          <Input />
        </FormItem>
        <FormItem
          id="password2"
          name="password"
          label="密码"
          rule={{ type: 'string', required: true, message: '请输入密码' }}
        >
          <Input type="password" />
        </FormItem>
        <div>
          <Button htmlType="reset">重置</Button>
          <Button htmlType="submit" type="primary">
            提交
          </Button>
        </div>
      </Form>
    </div>
  );
}

export const meta = {
  title: '表单布局和尺寸',
  desc:
    '1. 将`Form`的`inline`为`true`开启行内表单\n\n2. 为表单设置`size`，即可保证表单下的标准组件`size`统一，控件可单独设置独立`size`\n\n3. 设置`Form`和`FormItem`的`labelPosition`，可以控制label的位置',
};
