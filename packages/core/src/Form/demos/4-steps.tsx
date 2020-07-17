import React, { useState } from 'react';
import { Form, Button, FormItem, Input, Steps, Step, DatePicker } from '@muya-ui/core';

export default function StepDemo() {
  const [step, setStep] = useState(0);
  const defaultValues = {
    step0: {
      date: '2019-01-01',
    },
    step1: {
      account: '',
      password: '',
    },
    step2: {
      email: '',
    },
  };

  return (
    <>
      <Steps current={step}>
        <Step title="第一步"></Step>
        <Step title="第二步"></Step>
        <Step title="第三步"></Step>
      </Steps>
      <Form
        defaultValues={defaultValues}
        onSubmit={values => {
          if (step < 2) {
            setStep(s => s + 1);
          } else {
            alert(JSON.stringify(values, null, 4));
          }
        }}
        // inline
        labelPosition="right"
        labelWidth={100}
      >
        {({ values }) => {
          const formItems: Record<string, any> = {
            step0: (
              <FormItem
                name="step0.date"
                label="开学时间"
                trigger="onDateChange"
                rule={[
                  {
                    type: 'string',
                    message: '开学时间必填',
                  },
                ]}
              >
                <DatePicker />
              </FormItem>
            ),
            step1: (
              <>
                <FormItem
                  name="step1.account"
                  label="账号"
                  rule={[{ type: 'string', required: true, message: '账号必填' }]}
                >
                  <Input />
                </FormItem>
                <FormItem
                  name="step1.password"
                  label="密码"
                  rule={[{ type: 'string', required: true, message: '密码必填' }]}
                >
                  <Input type="password" />
                </FormItem>
              </>
            ),
            step2: (
              <FormItem
                name="step2.email"
                label="邮箱"
                rule={{ type: 'email', required: true, message: '请填入正确的邮箱' }}
              >
                <Input />
              </FormItem>
            ),
          };
          return (
            <div>
              {formItems[`step${step}`]}
              <FormItem>
                {step > 0 && <Button onClick={() => setStep(s => s - 1)}>上一步</Button>}
                <Button htmlType="submit" type="primary">
                  {step < 2 ? '下一步' : '提交'}
                </Button>
              </FormItem>
              <pre>{JSON.stringify(values, null, 4)}</pre>
            </div>
          );
        }}
      </Form>
    </>
  );
}

export const meta = {
  title: '分步表单',
  desc: 'Form传入整体的数据，不同步骤渲染不同的`FormItem`，即可实现分步校验',
};
