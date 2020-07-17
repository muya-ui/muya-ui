/* eslint-disable */
import * as React from 'react';
import sinon from 'sinon';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';

import { UploadIcon } from '@muya-ui/theme-light';
import { mount } from 'enzyme';
import { StyledError } from './styled';

import {
  AutoComplete,
  Button,
  Cascader,
  CheckboxGroup,
  DatePicker,
  Form,
  FormItem,
  Input,
  InputNumber,
  Option,
  postFile,
  RadioGroup,
  RangeInput,
  Select,
  Switch,
  TreeSelect,
  Upload,
  UploadCard,
  UploadResult,
  TimePicker,
  IFormProps,
} from '@muya-ui/core';

const options = [
  {
    label: '福建',
    value: 'fj',
    children: [
      {
        label: '福州',
        value: 'fuzhou',
        children: [
          {
            label: '马尾',
            value: 'mawei',
          },
        ],
      },
      {
        label: '泉州',
        value: 'quanzhou',
      },
    ],
  },
  {
    label: '浙江',
    value: 'zj',
    children: [
      {
        label: '杭州',
        value: 'hangzhou',
        children: [
          {
            label: '余杭',
            value: 'yuhang',
          },
          {
            label: '江干',
            value: 'jianggan',
          },
        ],
      },
    ],
  },
  {
    label: '北京',
    value: 'bj',
    children: [
      {
        label: '朝阳区',
        value: 'chaoyang',
      },
      {
        label: '海淀区',
        value: 'haidian',
      },
    ],
  },
];

const treeData = [
  {
    title: '成组条目#0',
    key: '0-0',
    children: [
      {
        title: '成组条目#0#0',
        key: '0-0-0',
        children: [
          { title: '普通条目#0#0#0', key: '0-0-0-0' },
          { title: '普通条目#0#0#1', key: '0-0-0-1' },
          { title: '普通条目#0#0#2', key: '0-0-0-2' },
        ],
      },
      {
        title: '成组条目#0#1',
        key: '0-0-1',
        children: [
          { title: '普通条目#0#1#0', key: '0-0-1-0' },
          { title: '普通条目#0#1#1', key: '0-0-1-1' },
          { title: '普通条目#0#1#2', key: '0-0-1-2' },
        ],
      },
      {
        title: '成组条目#0#2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '成组条目#1',
    key: '0-1',
    children: [
      { title: '普通条目#1#0#0', key: '0-1-0-0' },
      { title: '普通条目#1#0#1', key: '0-1-0-1' },
      { title: '普通条目#1#0#2', key: '0-1-0-2' },
    ],
  },
  {
    title: '成组条目#2',
    key: '0-2',
  },
];

jest.spyOn(global.console, 'warn');

interface Values {
  name: string;
  password: string;
}

const defaultValues = { name: 'jared', password: 'default' };

function renderForm(props?: IFormProps<Values>) {
  let injected: any;
  const result = render(
    <Form<Values> defaultValues={defaultValues} {...props}>
      {formbag => {
        return (
          (injected = formbag) && (
            <>
              <FormItem
                name="name"
                label="name"
                rule={[
                  {
                    type: 'string',
                    required: true,
                    message: 'name is required',
                  },
                ]}
              >
                <Input type="text" data-testid="name-input" />
              </FormItem>
              <FormItem
                id="password1"
                name="password"
                label="密码"
                rule={{ type: 'string', required: true, message: '请输入密码' }}
              >
                <Input type="password" />
              </FormItem>
              <Button htmlType="submit" data-testid="submit-button">
                Submit
              </Button>
            </>
          )
        );
      }}
    </Form>,
  );
  return {
    ...result,
    getProps() {
      return injected;
    },
  };
}

describe('<Form>', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <Form
          defaultValues={{
            name: '',
            password: '',
            way: ['杭州东站', '汉口火车站'],
            desc: '',
            checkboxs: ['dance'],
            radio: 'dog',
            album: '范特西',
            sports: ['篮球'],
            files: [],
            birthday: '',
            address: [],
            address1: [['bj', 'chaoyang']],
            isDesigner: false,
            autocomplete: '',
            inputNumber: 1,
            'treeselect-single': '0-0-0',
            'treeselect-multiple': ['0-0-0-1'],
          }}
          hasFeedback
          requiredTipAlignLeft
          labelPosition="left"
          labelWidth={100}
          onSubmit={values => {
            console.log(JSON.stringify(values, null, 4));
            alert(JSON.stringify(values, null, 4));
          }}
        >
          <FormItem
            id="name1"
            name="name"
            label="账号"
            rule={[{ type: 'string', required: true, message: '用户名必填' }]}
          >
            <Input />
          </FormItem>
          <FormItem
            id="password1"
            name="password"
            label="密码"
            rule={{ type: 'string', required: true, message: '请输入密码' }}
          >
            <Input type="password" />
          </FormItem>
          <FormItem
            name="inputNumber"
            label="幸运数字"
            hideRequiredTip
            rule={{ type: 'number', required: true, message: '必须填写合法数字' }}
          >
            <InputNumber />
          </FormItem>
          <FormItem
            name="way"
            label="回家的路"
            getValueFromEvent={e => e.value}
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
            id="desc1"
            name="desc"
            label="个人简介"
            rule={[{ type: 'string', required: true, message: '个人简介必填' }]}
          >
            <Input multiline placeholder="介绍一下你自己吧" />
          </FormItem>
          <FormItem
            id="checkboxs1"
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
            id="radio1"
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
            name="album"
            id="album1"
            label="专辑"
            rule={[{ type: 'string', required: true, message: '专辑必填' }]}
          >
            <Select allowClear>
              <Option value="范特西" key="1">
                范特西
              </Option>
              <Option value="八度空间" key="2">
                八度空间
              </Option>
              <Option value="叶惠美" key="3">
                叶惠美
              </Option>
            </Select>
          </FormItem>
          <FormItem
            name="sports"
            id="sports1"
            label="运动"
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
            label="联想"
            name="autocomplete"
            rule={[{ type: 'string', required: true, message: '联想词必填' }]}
          >
            <AutoComplete
              dataSource={['联想词1', '联想词2', '联想词3']}
              allowClear
              placeholder="联想词autoComplete"
            />
          </FormItem>
          <FormItem
            label="树选择单选"
            name="treeselect-single"
            rule={[{ type: 'string', required: true, message: '单选必填' }]}
          >
            <TreeSelect
              showSearch
              treeData={treeData}
              treeRenderAfterExpand
              treeDefaultExpandedKeys={['0-0-0']}
            ></TreeSelect>
          </FormItem>
          <FormItem
            label="树选择多选"
            name="treeselect-multiple"
            rule={[{ type: 'array', required: true, message: '单选必填' }]}
          >
            <TreeSelect
              multiple
              treeData={treeData}
              treeRenderAfterExpand
              treeDefaultExpandedKeys={['0-0-0']}
            ></TreeSelect>
          </FormItem>
          <FormItem
            name="files"
            id="files1"
            label="上传文件"
            valuePropName="uploadFiles"
            rule={[
              {
                type: 'array',
                required: true,
                message: '文件必传',
              },
              { type: 'array', min: 1, message: '最少传一个文件' },
            ]}
          >
            <Upload
              request={option =>
                postFile({ ...option, action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76' })
              }
            >
              {({ getInputProps, getRootProps, getResultProps, uploadFiles }) => {
                return (
                  <div>
                    <UploadCard
                      {...getRootProps()}
                      width={336}
                      height={160}
                      icon={<UploadIcon fontSize={24} />}
                      title="将文件拖拽到此处，或点击上传"
                      subtitle="支持balabala、balabala类型的文件"
                    >
                      <input {...getInputProps()} />
                    </UploadCard>
                    <div>
                      {uploadFiles.map(file => (
                        <UploadResult
                          style={{ marginTop: '10px', width: '336px' }}
                          {...getResultProps({ file })}
                          key={file.uid}
                        />
                      ))}
                    </div>
                  </div>
                );
              }}
            </Upload>
          </FormItem>
          <FormItem
            label="地址"
            id="cascader1"
            name="address"
            rule={[{ type: 'array', required: true, message: '请选择地址' }]}
          >
            <Cascader allowClear options={options} />
          </FormItem>
          <FormItem
            label="地址多选"
            id="cascader2"
            name="address1"
            rule={[{ type: 'array', required: true, message: '请选择地址' }]}
          >
            <Cascader options={options} multiple />
          </FormItem>
          <FormItem valuePropName="checked" label="设计师" name="isDesigner" id="isDesigner1">
            <Switch />
          </FormItem>
          <FormItem
            label="破壳日"
            name="birthday"
            id="birthday1"
            trigger="onDateChange"
            rule={[{ type: 'string', required: true, message: '出生日期必填' }]}
          >
            <DatePicker placeholder="选择出生日期" />
          </FormItem>
          <FormItem
            label="出生时间"
            name="birthday-time"
            id="birthday-time"
            normalize={d => d.valueOf()}
            rule={[{ type: 'number', required: true, message: '出生时间必填' }]}
          >
            <TimePicker placeholder="选择时间" />
          </FormItem>
          <FormItem>
            <Button htmlType="reset">重置</Button>
            <Button htmlType="submit" type="primary">
              提交
            </Button>
          </FormItem>
        </Form>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should initialize state and pass down props', () => {
    const { getProps } = renderForm();
    const props = getProps();

    expect(props.isSubmitting).toBe(false);
    expect(props.touched).toEqual({});
    expect(props.values).toEqual(defaultValues);
    expect(props.errors).toEqual({});
    expect(props.submitCount).toBe(0);
  });

  it('should combine two forms with one context', () => {
    let injected: any;
    let injectedInner: any;
    const result = render(
      <Form<Values> defaultValues={defaultValues}>
        {formbag => {
          return (
            (injected = formbag) && (
              <Form defaultValues={{ name: 'inner' }}>
                {formbagInner =>
                  (injectedInner = formbagInner) && (
                    <>
                      <FormItem
                        name="name"
                        label="name"
                        rule={[
                          {
                            type: 'string',
                            required: true,
                            message: 'name is required',
                          },
                        ]}
                      >
                        <Input type="text" data-testid="name-input" />
                      </FormItem>
                      <FormItem
                        id="password1"
                        name="password"
                        label="密码"
                        rule={{ type: 'string', required: true, message: '请输入密码' }}
                      >
                        <Input type="password" />
                      </FormItem>
                      <Button htmlType="submit" data-testid="submit-button">
                        Submit
                      </Button>
                    </>
                  )
                }
              </Form>
            )
          );
        }}
      </Form>,
    );
    expect(injected).toBe(injectedInner);
  });

  it('should get formBag with formBagRef', () => {
    let injected: any;
    let injectedInner: any;
    let ref: any;
    const wrapper = mount(
      <Form<Values>
        defaultValues={defaultValues}
        formBagRef={r => {
          ref = r;
        }}
      >
        {formbag => {
          return (
            (injected = formbag) && (
              <Form defaultValues={{ name: 'inner' }}>
                {formbagInner =>
                  (injectedInner = formbagInner) && (
                    <>
                      <FormItem
                        name="name"
                        label="name"
                        noError
                        rule={[
                          {
                            type: 'string',
                            required: true,
                            message: 'name is required',
                          },
                        ]}
                      >
                        <Input type="text" data-testid="name-input" />
                      </FormItem>
                      <FormItem
                        id="password1"
                        name="password"
                        label="密码"
                        rule={{ type: 'string', required: true, message: '请输入密码' }}
                      >
                        <Input type="password" />
                      </FormItem>
                      <Button htmlType="submit" data-testid="submit-button">
                        Submit
                      </Button>
                    </>
                  )
                }
              </Form>
            )
          );
        }}
      </Form>,
    );
    expect(injected).toBe(injectedInner);
    expect(wrapper.find(StyledError)).toHaveLength(1);
    expect(ref).toBe(injected);
  });

  it('should hide error node with noError', () => {
    let injected: any;
    let injectedInner: any;
    let ref: any;
    const result = render(
      <Form<Values>
        defaultValues={defaultValues}
        formBagRef={r => {
          ref = r;
        }}
      >
        {formbag => {
          return (
            (injected = formbag) && (
              <Form defaultValues={{ name: 'inner' }}>
                {formbagInner =>
                  (injectedInner = formbagInner) && (
                    <>
                      <FormItem
                        name="name"
                        label="name"
                        rule={[
                          {
                            type: 'string',
                            required: true,
                            message: 'name is required',
                          },
                        ]}
                      >
                        <Input type="text" data-testid="name-input" />
                      </FormItem>
                      <FormItem
                        id="password1"
                        name="password"
                        label="密码"
                        rule={{ type: 'string', required: true, message: '请输入密码' }}
                      >
                        <Input type="password" />
                      </FormItem>
                      <Button htmlType="submit" data-testid="submit-button">
                        Submit
                      </Button>
                    </>
                  )
                }
              </Form>
            )
          );
        }}
      </Form>,
    );
    expect(injected).toBe(injectedInner);
    expect(ref).toBe(injected);
  });

  it('formItem should render correctly', () => {
    const CustomForm = (props: IFormProps<any>) => (
      <Form
        defaultValues={{
          name: '',
          password: '',
        }}
        defaultErrors={{
          name: [{ field: 'name', message: 'has error' }],
        }}
        style={{ width: '300px' }}
        onSubmit={values => {
          console.log(values);
        }}
        {...props}
      >
        <FormItem
          name="name"
          labelPosition="left"
          normalize={e => e}
          label={<span data-testid="name-label">姓名</span>}
          rule={[{ type: 'string', required: true, min: 3, message: '用户名长度不能小于3' }]}
        >
          <Input data-testid="name1" />
        </FormItem>
        <FormItem
          labelPosition="top"
          data-testid="password1"
          name="password"
          label="密码"
          rule={{ type: 'string', required: true, message: '请输入密码' }}
        >
          <Input data-testid="password1" type="password" />
        </FormItem>
        <FormItem>
          <Button htmlType="reset">重置</Button>
          <Button htmlType="submit" type="primary">
            提交
          </Button>
        </FormItem>
      </Form>
    );
    const result = render(<CustomForm />);
    const input = result.getByTestId('name1');
    const label = result.getByTestId('name-label');
    fireEvent.change(input, {
      target: {
        value: '111',
      },
    });
    fireEvent.change(input, undefined);
    fireEvent.change(input, {
      target: {
        type: 'checkbox',
        checked: true,
      },
    });
    fireEvent.click(label, {});
    fireEvent.blur(input, {});
    result.rerender(<CustomForm inline />);
  });
});

it('formItem should not override children onChange & onBlur', () => {
  const onChangeSpy = sinon.spy();
  const onBlurSpy = sinon.spy();
  const CustomForm = (props: IFormProps<any>) => (
    <Form
      defaultValues={{
        name: '',
      }}
      style={{ width: '300px' }}
      {...props}
    >
      <FormItem
        name="name"
        labelPosition="left"
        normalize={e => e}
        label={<span data-testid="name-label">姓名</span>}
        rule={[{ type: 'string', required: true, min: 3, message: '用户名长度不能小于3' }]}
      >
        <Input onChange={onChangeSpy} onBlur={onBlurSpy} data-testid="name1" />
      </FormItem>
    </Form>
  );
  const result = render(<CustomForm />);
  const input = result.getByTestId('name1');
  const changeEvent = {
    target: {
      value: '111',
    },
  };
  const blurEvent = {};
  fireEvent.change(input, changeEvent);
  expect(onChangeSpy.calledOnce).toBe(true);
  fireEvent.blur(input, blurEvent);
  expect(onBlurSpy.calledOnce).toBe(true);

  result.rerender(<CustomForm inline />);
});
