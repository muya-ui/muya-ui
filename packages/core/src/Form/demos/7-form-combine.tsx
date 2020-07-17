import React from 'react';

import { Button, Form, FormItem, Input, Typography } from '@muya-ui/core';

import { IFormProps } from '../types';

const EmailForm = (props: IFormProps) => {
  return (
    <Form
      defaultValues={{
        email: '',
      }}
      onSubmit={values => {
        alert(`邮箱表单数据：${values.email}`);
      }}
      {...props}
    >
      <FormItem
        label="邮箱"
        name="email"
        id="email7"
        rule={{ type: 'email', required: true, message: '请填写正确的邮箱' }}
      >
        <Input placeholder="请输入另一个表单的邮箱" />
      </FormItem>
      <FormItem>
        <Button htmlType="reset">重置</Button>
        <Button htmlType="submit" type="primary">
          提交
        </Button>
      </FormItem>
    </Form>
  );
};

export default function FormCombined() {
  return (
    <div>
      <Typography.Title style={{ margin: '10px' }} level={5}>
        单独使用邮箱表单
      </Typography.Title>
      {<EmailForm />}
      <Typography.Title style={{ margin: '10px' }} level={5}>
        嵌套邮箱表单，组合成新的表单
      </Typography.Title>
      <Form
        defaultValues={{
          name: '',
          password: '',
          email: '',
        }}
        style={{ width: '300px' }}
        onSubmit={values => {
          alert(`组合表单的数据：\n ${JSON.stringify(values, null, 4)}`);
        }}
      >
        <FormItem
          id="name6"
          name="name"
          label="账号"
          rule={[{ type: 'string', required: true, min: 3, message: '用户名长度不能小于3' }]}
        >
          <Input />
        </FormItem>
        <FormItem
          id="password6"
          name="password"
          label="密码"
          rule={{ type: 'string', required: true, message: '请输入密码' }}
        >
          <Input type="password" />
        </FormItem>
        <EmailForm />
      </Form>
    </div>
  );
}

export const meta = {
  title: '表单嵌套',
  desc: '多个表单可以组合嵌套使用，内部表单会自动检测当前是否被嵌套，由外部表单统一收集/校验数据。',
};
