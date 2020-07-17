import sinon from 'sinon';
import mockConsole from 'test/utils/mockConsole';

import notification from './notification';

beforeAll(() => {
  mockConsole.restoreError();
  mockConsole.mockError();
});

afterAll(() => {
  mockConsole.restoreError();
});

test('测试 几个常用的方法', () => {
  const unshift = sinon.stub(notification, 'add');

  notification.success({
    title: 'success',
    content: 'success',
  });
  notification.error({
    title: 'error',
    content: 'error',
  });
  notification.info({
    title: 'info',
    content: 'info',
  });
  notification.warning({
    title: 'warning',
    content: 'warning',
  });
  notification.loading({
    title: 'loading',
    content: 'loading',
  });
  const id = notification.add({
    title: 'no icon',
    content: 'no icon',
  });
  notification.close(id);

  notification.destroy();
  notification._autoInit();
  notification._autoInit();
  notification.config();
  notification.config();
  notification.config({ setting: { interval: 1000, timeout: 10, max: 3 } });

  expect(() => {
    sinon.assert.calledWith(
      unshift,
      sinon.match({ content: 'success', title: 'success', type: 'success' }),
    );
  }).not.toThrow();

  unshift.restore();
});
