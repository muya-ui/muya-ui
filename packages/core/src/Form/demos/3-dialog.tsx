import React, { useState } from 'react';
import { Form, Button, FormItem, Input, Select, Option, Dialog } from '@muya-ui/core';

export default function DialogSimple() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开弹窗</Button>
      <Form
        defaultValues={{
          name: '',
          email: '',
          select: '',
        }}
        onSubmit={(values, helpers) => {
          alert(JSON.stringify(values, null, 4));
          handleClose();
          helpers.resetForm();
        }}
        labelWidth={100}
      >
        <Dialog.Base disablePortal open={open} onClose={handleClose}>
          <Dialog.Title onClose={handleClose}>对话框中的表单</Dialog.Title>
          <Dialog.Content>
            <FormItem
              name="name"
              label="帅气的名字"
              rule={[
                { type: 'string', required: true, message: '名字必填' },
                { type: 'string', min: 4, message: '最少四个字符' },
              ]}
            >
              <Input id="test111" />
            </FormItem>
            <FormItem
              name="email"
              label="邮箱"
              rule={{ type: 'email', required: true, message: '请填入正确的邮箱' }}
            >
              <Input />
            </FormItem>
            <FormItem
              name="select"
              label="选项"
              rule={{ type: 'string', required: true, message: '选择选项' }}
            >
              <Select allowClear={false} width={120}>
                <Option value="one">选项一</Option>
                <Option value="two">选项二</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="three">选项三</Option>
              </Select>
            </FormItem>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onClick={handleClose}>取消</Button>
            <Button htmlType="submit" type="primary">
              提交
            </Button>
          </Dialog.Actions>
        </Dialog.Base>
      </Form>
    </>
  );
}

export const meta = {
  title: '对话框中的表单',
  desc: '直接使用Form包裹对话框即可。注意：需要将`Dialog.Base`的`disablePortal`属性置为`true`',
};
