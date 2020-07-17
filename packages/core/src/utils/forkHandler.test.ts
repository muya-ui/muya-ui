import sinon from 'sinon';

import forkHandler from './forkHandler';

test('forkHandler', async () => {
  const A = sinon.spy();
  const B = sinon.spy();
  const h = forkHandler(A, B);
  h('sss');
  expect(() => {
    sinon.assert.calledWith(A, 'sss');
    sinon.assert.calledWith(B, 'sss');
  }).not.toThrow();
});

test('forkHandler beforeCheck', async () => {
  const A = sinon.spy();
  const B = sinon.spy();
  const h = forkHandler(A, B, (e: string) => {
    if (e === 'sss') {
      return false;
    }
    return true;
  });
  h('sss');
  expect(() => {
    sinon.assert.notCalled(A);
    sinon.assert.notCalled(B);
  }).not.toThrow();
});

test('forkHandler beforeCheck B always run', async () => {
  const A = sinon.spy();
  const B = sinon.spy();
  const h = forkHandler(A, B, (e: string) => {
    if (e === 'sss') {
      return 'B';
    }
    return true;
  });
  h('sss');
  expect(() => {
    sinon.assert.notCalled(A);
    sinon.assert.calledOnce(B);
  }).not.toThrow();
});
