import React from 'react';
import { Form, Button, FormItem, Input, Checkbox, Select, Option } from '@muya-ui/core';

export default function Simple() {
  return (
    <Form
      defaultValues={{
        name: '',
        email: '',
        sex: '',
        emailRequired: false,
      }}
      onSubmit={values => {
        alert(JSON.stringify(values, null, 4));
      }}
      onChange={(_values, helpers, field, value) => {
        if (field === 'sex') {
          helpers.setFieldValue('name', value ? `Hello, my ${value}` : value);
        }
      }}
      style={{ width: '300px' }}
    >
      {({ values }) => {
        return (
          <>
            <FormItem
              name="sex"
              label="性别"
              rule={{ type: 'string', required: true, message: '性别必填' }}
            >
              <Select allowClear>
                <Option value="boy">男</Option>
                <Option value="girl">女</Option>
              </Select>
            </FormItem>
            <FormItem
              id="name5"
              name="name"
              label="名字"
              rule={[{ type: 'string', required: true, min: 3, message: '用户名长度不能小于3' }]}
            >
              <Input placeholder="名字会根据性别自动填充" />
            </FormItem>
            <FormItem
              id="email5"
              name="email"
              label="邮箱"
              rule={{ type: 'email', required: values.emailRequired, message: '请输入邮箱' }}
            >
              <Input />
            </FormItem>
            <FormItem name="emailRequired" label="邮箱必填" rule={{ type: 'boolean' }}>
              <Checkbox></Checkbox>
            </FormItem>
            <FormItem>
              <Button htmlType="reset">重置</Button>
              <Button htmlType="submit" type="primary">
                提交
              </Button>
            </FormItem>
          </>
        );
      }}
    </Form>
  );
}

export const meta = {
  title: '表单联动',
  desc:
    '1. Form提供了完整的表单状态和helper函数，可以很方便实现表单项直接的联动。要求给Form传入函数式children\n\n 2. 上述例子中，使用`setFieldValue`设置了Select和Input的值，并且实现了动态校验规则',
};
