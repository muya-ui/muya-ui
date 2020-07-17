import sinon from 'sinon';
import callOnce from './once';

test('测试异步只调用一次的方法', async () => {
  const spy = sinon.spy();
  const func = (...args: any[]) => {
    return new Promise(resolve => {
      setTimeout(() => {
        // console.log('ok');
        spy(...args);
        resolve();
      }, 100);
    });
  };
  const func1 = callOnce(func);
  await Promise.all([func1('1', '2'), func1()]);

  sinon.assert.calledWith(spy, '1', '2');
});
