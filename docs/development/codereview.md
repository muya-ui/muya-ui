# CodeReview

标准作业流程：

## 1. 检查 export 出去的类型是否都带有组件前缀，比如

```ts
// bad
export type Icon = 'main' | 'other';

// good
export type IButtonIconType = 'main' | 'other';
```

## 2. 检查 demos 文件夹下的 demo 文件，不能有相对路径的引用

```ts
// bad
import Button from '../Button';

// good
import { Button } from '@muya-ui/core';
```

## 3. 检查破坏性修改，注意看 snapshot ，如果有影响多个组件，询问为啥引起了其他组件的变化

## 4. 检查有没有样式写死了

常见问题：

- style 写死在 styles 文件中
  - 解决办法：style 写在主题包中。
- Icon 写死

  - 解决办法：在主题包中定义好变量，可以覆盖组件中默认的 icon ，比如：

  ```
  const icon = theme.componentA.icon || DefaultIcon;
  ```

- class 写死在文件中
  - 解决办法：通过 ICustomStyleMap 配置，让外部通过 props 传递，另外类名前缀从 theme.prefix 中取。

## 5. 检查是否对通用的样式组件做了样式覆盖

根据文档提到的 [styled-components 问题汇总](http://confluence.qunhequnhe.com/pages/viewpage.action?pageId=1246038)，如果要做样式覆盖，建议用下面的方法提升优先级

```ts
const StyledA = styled.a`
  padding: 10px;
`;

const CompA = styled(StyledA)`
  // 用两个class提升优先级
  && {
    padding: 20px;
  }
`;
```

## 6. 检查性能

- callback 使用 useCallback 包裹，值使用 useMemo 包裹。

## 7. 新增组件或 hooks 是否需要在 `muya-import` 中设置。
