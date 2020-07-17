import sinon from 'sinon';
import mockConsole from 'test/utils/mockConsole';

import toast from './toast';

beforeAll(() => {
  mockConsole.restoreError();
  mockConsole.mockError();
});

afterAll(() => {
  mockConsole.restoreError();
});

test('测试 几个常用的方法', () => {
  const unshift = sinon.stub(toast, 'add');

  toast.success('success');
  toast.error('error');
  toast.info('info');
  toast.warning('warning');
  toast.loading('loading');

  toast.warning({
    content: 'wwww',
  });
  toast.destroy();
  toast._autoInit();
  toast._autoInit();
  toast.config();
  toast.config();
  toast.config({ setting: { interval: 1000, timeout: 10, max: 3 } });

  expect(() => {
    sinon.assert.calledWith(unshift, sinon.match({ content: 'success', type: 'success' }));
    sinon.assert.calledWith(unshift, sinon.match({ content: 'wwww', type: 'warning' }));
  }).not.toThrow();

  unshift.restore();
});

test('测试 unshift', () => {
  const unshift = sinon.spy(toast._expQueue, 'unshift');

  toast.success('msg');
  expect(() => {
    sinon.assert.calledWith(unshift, sinon.match({ content: 'msg', type: 'success' }));
  }).not.toThrow();
});
