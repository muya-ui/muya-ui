import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import { wait } from '@muya-ui/utils';
import mockConsole from 'test/utils/mockConsole';

import Space from '../Space';
import Typography from '../Typography';
import Img from '../Img';
import Anchor from '.';
import { renderHook } from '@testing-library/react-hooks';

beforeAll(() => {
  mockConsole.restoreError();
  mockConsole.mockError();
});

afterAll(() => {
  mockConsole.restoreError();
});

test('should render correctly', () => {
  const tree = renderer
    .create(
      <Anchor.Provider>
        <div style={{ width: 400, position: 'relative', paddingLeft: 100 }}>
          <Anchor.Tabs style={{ position: 'absolute', left: 0, top: 0 }}>
            <Anchor.Tab index="#tab1" title="Tab1" />
            <Anchor.Tab index="#tab2" title="Tab2" />
            <Anchor.Tab index="#tab3" title="Tab3">
              <Anchor.Tab index="#tab3-1" title="Tab3-1" />
              <Anchor.Tab index="#tab3-2" title="Tab3-2" />
            </Anchor.Tab>
          </Anchor.Tabs>
          <Anchor.ScrollView height={200}>
            <Space block direction="vertical">
              <Typography.Title level={4} id="tab1">
                Tab 1
              </Typography.Title>
              <Img
                src="https://y.gtimg.cn/music/photo_new/T002R300x300M000004U2Cn83dZlWt_1.jpg?max_age=2592000"
                width={200}
                height={200}
              />
              <Typography.Title level={4} id="tab2">
                Tab 2
              </Typography.Title>
              <Img
                src="https://y.gtimg.cn/music/photo_new/T002R300x300M000000P3l050Olt27_1.jpg?max_age=2592000"
                width={200}
                height={200}
              />
              <Typography.Title level={4} id="tab3">
                Tab 3
              </Typography.Title>
              <Img
                src="https://y.gtimg.cn/music/photo_new/T002R300x300M000002ehzTm0TxXC2_2.jpg?max_age=2592000"
                width={200}
                height={200}
              />
              <Typography.Title level={4} id="tab3-1">
                Tab 3 - 1
              </Typography.Title>
              <Img
                src="//qhstaticssl.kujiale.com/newt/29/image/png/1567069312065/7FD37039428117756880A94B3224477C.png"
                width={200}
                height={200}
              />
              <Typography.Title level={4} id="tab3-2">
                Tab 3 - 2
              </Typography.Title>
              <Img
                src="//qhstaticssl.kujiale.com/newt/29/image/png/1567069346213/A8C6DECED7C868F1E57AC115EA1D5BAA.png"
                width={200}
                height={200}
              />
            </Space>
          </Anchor.ScrollView>
        </div>
      </Anchor.Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('should horizontal Anchor render correctly', () => {
  const tree = renderer
    .create(
      <Anchor.Provider disableHash direction="horizontal">
        <Anchor.Tabs style={{ marginBottom: 12 }}>
          <Anchor.Tab index="#demo-20-tab1" title="Tab1" />
          <Anchor.Tab index="#demo-20-tab2" title="Tab2" />
          <Anchor.Tab index="#demo-20-tab3" title="Tab3" />
        </Anchor.Tabs>
        <Anchor.ScrollView height={200}>
          <Space block direction="vertical">
            <Typography.Title level={4} id="demo-20-tab1">
              Tab 1
            </Typography.Title>
            <Img
              src="https://y.gtimg.cn/music/photo_new/T002R300x300M000004U2Cn83dZlWt_1.jpg?max_age=2592000"
              width={200}
              height={200}
            />
            <Typography.Title level={4} id="demo-20-tab2">
              Tab 2
            </Typography.Title>
            <Img
              src="https://y.gtimg.cn/music/photo_new/T002R300x300M000000P3l050Olt27_1.jpg?max_age=2592000"
              width={200}
              height={200}
            />
            <Typography.Title level={4} id="demo-20-tab3">
              Tab 3
            </Typography.Title>
            <Img
              src="https://y.gtimg.cn/music/photo_new/T002R300x300M000002ehzTm0TxXC2_2.jpg?max_age=2592000"
              width={200}
              height={200}
            />
          </Space>
        </Anchor.ScrollView>
      </Anchor.Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('should scroll when click Tab', async () => {
  const onChange = sinon.spy();
  const wrapper = mount(
    <Anchor.Provider disableHash direction="horizontal" onChange={onChange}>
      <Anchor.Tabs style={{ marginBottom: 12 }}>
        <Anchor.Tab index="#demo-20-tab1" title="Tab1" />
        <Anchor.Tab index="#demo-20-tab2" title="Tab2" />
        <Anchor.Tab index="#demo-20-tab3" title="Tab3" />
        <Anchor.Tab index="#demo-20-tab3" title="Tab3" />
        <Anchor.Tab index="#demo-20-tab4" title="Tab3" />
        <Anchor.Tab index="not-valid" title="Tab3" />
      </Anchor.Tabs>
      <Anchor.ScrollView height={200}>
        <Space block direction="vertical">
          <Typography.Title level={4} id="demo-20-tab1">
            Tab 1
          </Typography.Title>
          <Img
            src="https://y.gtimg.cn/music/photo_new/T002R300x300M000004U2Cn83dZlWt_1.jpg?max_age=2592000"
            width={200}
            height={200}
          />
          <Typography.Title level={4} id="demo-20-tab2">
            Tab 2
          </Typography.Title>
          <Img
            src="https://y.gtimg.cn/music/photo_new/T002R300x300M000000P3l050Olt27_1.jpg?max_age=2592000"
            width={200}
            height={200}
          />
          <Typography.Title level={4} id="demo-20-tab3">
            Tab 3
          </Typography.Title>
          <Img
            src="https://y.gtimg.cn/music/photo_new/T002R300x300M000002ehzTm0TxXC2_2.jpg?max_age=2592000"
            width={200}
            height={200}
          />
        </Space>
      </Anchor.ScrollView>
    </Anchor.Provider>,
    { attachTo: document.body },
  );

  wrapper
    .find('button')
    .at(1)
    .simulate('click');

  await wait.time(300);

  expect(onChange.calledWith('#demo-20-tab2')).toBe(true);

  await wait.time(300);

  wrapper
    .find('button')
    .at(1)
    .simulate('click');

  await wait.time(300);

  wrapper
    .find('button')
    .at(5)
    .simulate('click');

  await wait.time(300);

  wrapper
    .find('button')
    .at(4)
    .simulate('click');

  await wait.time(300);

  wrapper.unmount();
});

test('should scroll when click vertical Tab', async () => {
  const wrapper = mount(
    <Anchor.Provider disableHash>
      <Anchor.Tabs style={{ marginBottom: 12 }}>
        <Anchor.Tab index="#vertical-demo-20-tab1" title="Tab1" />
        <Anchor.Tab index="#vertical-demo-20-tab2" title="Tab2" />
        <Anchor.Tab index="#vertical-demo-20-tab3" title="Tab3" />
        <Anchor.Tab index="#vertical-demo-20-tab3" title="Tab3" />
        <Anchor.Tab index="#vertical-demo-20-tab4" title="Tab3" />
        <Anchor.Tab index="vertical-not-valid" title="Tab3" />
      </Anchor.Tabs>
      <Anchor.ScrollView height={200}>
        <Space block direction="vertical">
          <Typography.Title level={4} id="vertical-demo-20-tab1">
            Tab 1
          </Typography.Title>
          <Img
            src="https://y.gtimg.cn/music/photo_new/T002R300x300M000004U2Cn83dZlWt_1.jpg?max_age=2592000"
            width={200}
            height={200}
          />
          <Typography.Title level={4} id="vertical-demo-20-tab2">
            Tab 2
          </Typography.Title>
          <Img
            src="https://y.gtimg.cn/music/photo_new/T002R300x300M000000P3l050Olt27_1.jpg?max_age=2592000"
            width={200}
            height={200}
          />
          <Typography.Title level={4} id="vertical-demo-20-tab3">
            Tab 3
          </Typography.Title>
          <Img
            src="https://y.gtimg.cn/music/photo_new/T002R300x300M000002ehzTm0TxXC2_2.jpg?max_age=2592000"
            width={200}
            height={200}
          />
        </Space>
      </Anchor.ScrollView>
    </Anchor.Provider>,
    { attachTo: document.body },
  );

  wrapper
    .find('button')
    .at(1)
    .simulate('click');

  await wait.time(300);

  wrapper
    .find('button')
    .at(1)
    .simulate('click');

  await wait.time(300);

  wrapper
    .find('button')
    .at(5)
    .simulate('click');

  await wait.time(300);

  wrapper
    .find('button')
    .at(4)
    .simulate('click');

  await wait.time(300);

  wrapper.unmount();
});

test('should work correctly when container scroll', async () => {
  const getBoundingClientRect = sinon.spy(() => ({ width: 100, height: 100 }));
  const { result, rerender } = renderHook(() => Anchor.useAnchor({}));
  result.current.registerLink('#tab1');
  result.current.registerLink('#tab2');
  const tab1Target = document.createElement('div');
  tab1Target.id = 'tab1';
  tab1Target.getBoundingClientRect = getBoundingClientRect as any;
  document.documentElement.append(tab1Target);
  rerender();

  result.current.handleScroll();
  expect(getBoundingClientRect.called).toBe(true);
});
