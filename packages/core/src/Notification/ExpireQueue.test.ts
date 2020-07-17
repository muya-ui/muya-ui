import * as sinon from 'sinon';

import { wait } from '@muya-ui/utils';

import ExpireQueue from './ExpireQueue';

test('测试 setting', () => {
  const pool = new ExpireQueue();
  pool.reset({ interval: 1000, timeout: 200, max: 3 });
  expect(pool.setting.interval).toBe(1000);
  expect(pool.setting.timeout).toBe(200);
});

test('测试 unshift & push & get items & remove', async () => {
  const pool = new ExpireQueue();
  pool.reset({ interval: 1000, timeout: 25, max: 2 });
  const id = pool.unshift({});
  expect(pool.items[0]).toHaveProperty('expiration');
  expect(pool.items[0]).toHaveProperty('id', id);
  expect(pool).toHaveLength(1);

  pool.remove(id);
  expect(pool).toHaveLength(0);
  pool.unshift({});
  pool.unshift({});
  pool.unshift({});
  pool.push({});
  pool.push({});
  pool.push({});
  expect(pool).toHaveLength(2);
});

test('测试 pop & shift', async () => {
  const pool = new ExpireQueue();
  pool.reset({ interval: 1000, timeout: 25, max: 2 });
  const emit = sinon.spy(pool, 'emit');
  pool.pop();
  pool.shift();
  expect(() => {
    sinon.assert.notCalled(emit);
  }).not.toThrow();
  pool.unshift({});
  pool.unshift({});
  emit.resetHistory();

  pool.pop();
  pool.shift();
  expect(() => {
    sinon.assert.calledTwice(emit);
  }).not.toThrow();
});

test('测试 fixed', async () => {
  const pool = new ExpireQueue();
  pool.reset({ interval: 10, timeout: 10, max: 2 });
  const emit = sinon.spy(pool, 'emit');
  const id = pool.unshift({});
  pool.fixedItem(id);
  pool.refresh();
  await wait.time(30);
  pool.unFixedItem(id);
  pool.refresh();

  expect(() => {
    sinon.assert.calledTwice(emit);
  }).not.toThrow();
});

test('测试 refresh & stop & tick', async () => {
  const pool = new ExpireQueue();
  pool.reset({ interval: 1000, timeout: 25, max: 2 });
  pool.stop();

  pool.unshift({
    expiration: Date.now() - 1000,
  });
  expect(pool).toHaveLength(1);
  pool.refresh();
  expect(pool).toHaveLength(0);

  const refresh = sinon.spy(pool, 'refresh');
  const emit = sinon.spy(pool, 'emit');

  pool.tick();
  pool.unshift({
    expiration: Date.now() - 1000,
  });
  pool.tick();

  pool.unshift({
    expiration: Date.now() + 10,
  });
  pool.tick();
  expect(() => {
    sinon.assert.calledOnce(refresh);
    sinon.assert.called(emit);
  }).not.toThrow();

  await wait.time(20);
  expect(() => {
    sinon.assert.calledTwice(refresh);
  }).not.toThrow();

  refresh.restore();
  emit.restore();
});
