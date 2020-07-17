import React from 'react';

import {
  CheckableTag,
  Col,
  Row,
  Typography,
  useCheckboxGroup,
  useRadioGroup,
} from '@muya-ui/core';

const options = ['全部', '审核中', '已通过'];

export default function CheckedTagDemo() {
  const {
    opts: singleopts,
    valueState: singleValueState,
    handleClick: singleHandleClick,
  } = useRadioGroup({
    options,
  });
  const {
    opts: multipleOpts,
    valueState: multipleValueState,
    handleClick: multipleHandleClick,
  } = useCheckboxGroup({
    options,
  });
  return (
    <>
      <Row>
        <Col>
          <Typography.Text style={{ lineHeight: '24px' }}>单选：</Typography.Text>
        </Col>
        <Col>
          {singleopts.map(option => {
            const { label, value, disabled } = option;
            return (
              <CheckableTag
                key={value as string}
                disabled={disabled}
                checked={singleValueState === value}
                onClick={singleHandleClick.bind(null, option)}
              >
                {label}
              </CheckableTag>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col>
          <Typography.Text style={{ lineHeight: '24px' }}>多选：</Typography.Text>
        </Col>
        <Col>
          {multipleOpts.map(option => {
            const { label, value, disabled } = option;
            return (
              <CheckableTag
                key={value as string}
                disabled={disabled}
                checked={multipleValueState.indexOf(value) > -1}
                onClick={multipleHandleClick.bind(null, option)}
              >
                {label}
              </CheckableTag>
            );
          })}
        </Col>
      </Row>
    </>
  );
}

export const meta = {
  title: '可选择标签组',
  desc:
    '可结合 `useCheckboxGroup` 以及 `useRadioGroup` 实现可选择标签组的单选和多选功能。\n\n 该组件为完全受控组件，不支持非受控用法。',
};
