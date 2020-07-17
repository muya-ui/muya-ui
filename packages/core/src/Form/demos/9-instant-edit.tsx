import React, { useState, useCallback, useMemo } from 'react';

import {
  Button,
  CheckboxGroup,
  Form,
  FormItem,
  Input,
  Option,
  RadioGroup,
  RangeInput,
  Select,
  Switch,
  Typography,
  Space,
  Spin,
  IFormInstantEditingRenderProps,
  IFormInstantEditingConfig,
  InlineButton,
} from '@muya-ui/core';
import { SelectIcon, CloseIcon, EditIcon } from '@muya-ui/theme-light';

// 以下是默认渲染逻辑，仅供参考，无需设置
function defaultInstantEditingContentRender(value: any) {
  return <Typography.Text>{String(value)}</Typography.Text>;
}

function defaultInstantEditingRender(props: IFormInstantEditingRenderProps) {
  const {
    layout,
    inputNode,
    validating,
    isEditing,
    value,
    size,
    confirm,
    cancel,
    edit,
    renderContent,
  } = props;
  return (
    <>
      <Space
        style={{
          alignItems: layout === 'vertical' ? 'flex-end' : 'center',
          display: isEditing ? undefined : 'none',
        }}
        direction={layout}
      >
        {inputNode}
        <Space>
          {validating ? (
            <Spin />
          ) : (
            <>
              <Button onClick={confirm} size={size} shape="square">
                <SelectIcon />
              </Button>
              <Button onClick={cancel} size={size} shape="square">
                <CloseIcon />
              </Button>
            </>
          )}
        </Space>
      </Space>
      <div
        style={{
          display: !isEditing ? undefined : 'none',
        }}
        onClick={edit}
      >
        {renderContent(value)}
      </div>
    </>
  );
}

// 用户自定渲染逻辑
function instantRenderContent(value: any) {
  const formatValue = () => {
    if (Array.isArray(value)) {
      return value.join('、');
    } else if (typeof value === 'boolean') {
      return value ? '开启' : '关闭';
    } else {
      return value;
    }
  };
  return <Typography.Text>{formatValue()}</Typography.Text>;
}

function instantRender(props: IFormInstantEditingRenderProps) {
  const {
    inputNode,
    validating,
    isEditing,
    value,
    size,
    confirm,
    cancel,
    edit,
    renderContent,
  } = props;
  return (
    <>
      <Space
        style={{
          display: isEditing ? undefined : 'none',
        }}
      >
        {inputNode}
        <Space>
          {validating ? (
            <Spin />
          ) : (
            <>
              <InlineButton size={size} type="primary" onClick={confirm}>
                确认
              </InlineButton>
              <InlineButton size={size} onClick={cancel}>
                取消
              </InlineButton>
            </>
          )}
        </Space>
      </Space>
      <Space
        style={{
          display: !isEditing ? undefined : 'none',
        }}
      >
        {renderContent(value)}
        <InlineButton type="primary" onClick={edit} size={size}>
          <EditIcon />
        </InlineButton>
      </Space>
    </>
  );
}

export default function InstantForm() {
  const [instantEditing, setInstantEditing] = useState<
    IFormInstantEditingConfig | undefined | boolean
  >(true);
  const options = useMemo(
    () => [
      {
        label: 'false',
        value: 1,
        data: false,
      },
      {
        label: 'true',
        value: 2,
        data: true,
      },
      {
        label: '空对象',
        value: 3,
        data: {},
      },
      {
        label: 'layout: vertical',
        value: 4,
        data: {
          layout: 'vertical',
        },
      },
      {
        label: '自定义渲染',
        value: 5,
        data: {
          render: instantRender,
          renderContent: instantRenderContent,
        },
      },
    ],
    [],
  );
  const handleInstantEditingChange = useCallback(
    (value: any) => {
      const targetOption: any = options.find(o => o.value === value);
      if (targetOption) {
        setInstantEditing(targetOption.data);
      }
    },
    [options],
  );
  return (
    <Space direction="vertical" spacing={20} block>
      <Space>
        <Typography.Text>instantEditing: </Typography.Text>
        <RadioGroup defaultValue={2} onChange={handleInstantEditingChange} options={options} />
      </Space>
      <Form
        defaultValues={{
          way: ['杭州东站', '汉口火车站'],
          desc: '我会发着呆，然后忘记你，接着静静闭上眼~',
          checkboxs: ['dance'],
          radio: 'dog',
          sports: ['篮球'],
          switch: false,
        }}
        size="s"
        instantEditing={instantEditing}
        requiredTipAlignLeft
        labelPosition="left"
        labelWidth={100}
        onSubmit={values => {
          console.log(JSON.stringify(values, null, 4));
          alert(JSON.stringify(values, null, 4));
        }}
      >
        <FormItem
          name="way"
          label="回家的路"
          getValueFromEvent={e => e.value}
          instantEditing={
            instantEditing && {
              renderContent(value) {
                return <Typography.Text>{value.join(' 至 ')}🚆</Typography.Text>;
              },
            }
          }
          rule={[
            {
              type: 'array',
              required: true,
              validator: (_r, v) => v.every((c: any) => !!c),
              min: 2,
              message: '请正确填写回家的路线',
            },
          ]}
        >
          <RangeInput placeholder={['起点', '终点']} width={200} middleNode={['至']} />
        </FormItem>
        <FormItem
          id="desc3"
          name="desc"
          label="个人简介"
          rule={[{ type: 'string', required: true, message: '个人简介必填' }]}
        >
          <Input multiline placeholder="介绍一下你自己吧" />
        </FormItem>
        <FormItem
          id="checkboxs3"
          name="checkboxs"
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
        <FormItem
          name="radio"
          id="radio3"
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
        <FormItem
          name="sports"
          id="sports3"
          label="运动"
          instantEditing={
            instantEditing && {
              disableClickAway: true,
            }
          }
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
        <FormItem valuePropName="checked" label="开关状态" name="switch" id="switch1">
          <Switch />
        </FormItem>
        <FormItem>
          <Button htmlType="reset">重置</Button>
          <Button htmlType="submit" type="primary">
            提交
          </Button>
        </FormItem>
      </Form>
    </Space>
  );
}

export const meta = {
  title: '即时编辑表单',
  desc:
    '1. 即时编辑表单，通常在表单数据已存在时使用。用户既可以浏览数据，也可以编辑数据\n\n 2. `instantEditing`可以设置在`Form`上，对内部所有`FormItem`生效，也可以为`FormItem`单独设置，两份配置最终会合并 \n\n 3. 由于该场景的UI可能多有变化，在默认渲染逻辑不满足要求时，建议用户自行定义渲染逻辑。`instantEditing`提供两个自定义渲染的接口`renderContent`和`render`。`renderContent`用来控制非编辑状态下，展示型内容的渲染逻辑。`render`用来渲染整个即时编辑的内容，所用到的内部状态、回调函数均通过参数传递给用户',
};
