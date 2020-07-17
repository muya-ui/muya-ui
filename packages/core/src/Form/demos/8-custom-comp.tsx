import React, { forwardRef } from 'react';
import { Form, FormItem, Button, Option, Select, InputNumber, Space } from '@muya-ui/core';

interface PriceValue {
  price?: string | number;
  currency?: 'rmb' | 'dollar';
}

interface PriceInputProps {
  value?: PriceValue;
  onChange?: (value: PriceValue) => void;
}

const PriceInput = forwardRef<HTMLDivElement, PriceInputProps>(({ value = {}, onChange }, ref) => {
  const triggerChange = (changedValue: PriceValue) => {
    if (onChange) {
      onChange({ ...value, ...changedValue });
    }
  };

  const onNumberChange = (displayNumber?: string) => {
    triggerChange({ price: displayNumber });
  };

  const onCurrencyChange = (selectValue: any) => {
    triggerChange({ currency: selectValue });
  };

  console.log(value);
  return (
    <Space>
      <InputNumber min={0} value={value.price} onChange={onNumberChange} width={100} />
      <Select value={value.currency} width={80} onChange={onCurrencyChange}>
        <Option value="rmb">RMB</Option>
        <Option value="dollar">Dollar</Option>
      </Select>
    </Space>
  );
});

export default function CustomComp() {
  return (
    <Form
      onSubmit={values => {
        alert(JSON.stringify(values, null, 4));
      }}
      defaultValues={{
        price: {
          price: 0,
          currency: 'rmb',
        },
      }}
    >
      <FormItem name="price" label="Price">
        <PriceInput />
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormItem>
    </Form>
  );
}

export const meta = {
  title: '自定义表单控件',
  desc:
    '自定义或第三方的表单控件，也可以与 Form 组件一起使用。只要该组件遵循以下的约定：\n\n 1. 提供受控属性 value 或其它与 valuePropName 的值同名的属性。\n\n2.提供 onChange 事件或 trigger 的值同名的事件。\n\n 3. 支持获取`ref`，函数组件需要用`forwardRef`包裹',
};
