import React, { useState } from 'react';
import { Form, FormItem, Input, Button } from '@muya-ui/core';

export default function Controled() {
  const [values, setValues] = useState({
    name: '',
    password: '',
  });
  return (
    <div>
      <Form
        values={values}
        onChange={v => {
          console.log(v);
          setValues(v);
        }}
        style={{ width: '300px' }}
        onSubmit={values => {
          alert(JSON.stringify(values, null, 4));
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
        <FormItem>
          <Button htmlType="reset">重置</Button>
          <Button htmlType="submit" type="primary">
            提交
          </Button>
        </FormItem>
      </Form>
      <pre>{JSON.stringify(values, null, 4)};</pre>
    </div>
  );
}

export const meta = {
  title: '受控模式',
  desc: '传入onChange和values，即可自行控制表单values，values数据可以存放在外层Redux or store中',
};
