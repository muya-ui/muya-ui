# 测试工具集

## mockHook

在测试 snapshot 的时候，mock 部分 hooks 返回的值。

```ts
import mockHook from 'test/utils/mockHook';

test('测试 TabsContainer', () => {
  const hook = mockHook(useTabsContainer);
  hook.returns({
    hasNext: true,
    hasPrev: true,
    stepIndex: 0,
  });
  const tree = renderer
    .create(
      <>
        <TabsContainer type="line"></TabsContainer>
        <TabsContainer type="card" size="l"></TabsContainer>
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
  hook.restore();
});
```
