# 组件开发规范

## 目录约定

```
- packages/muya-ui/src/
  - ExampleComponent/             # 案例组件
    - index.ts                    # 只维护 export ，不包含任何逻辑
    - types.ts                    # 所有要 export 出去的类型都定义这个文件中
    - styled.tsx                  # 维护组件样式逻辑
    - ExampleComponent.tsx        # 组件本身，只做渲染相关的操作
    - ExampleComponent.test.tsx   # 组件渲染测试
    - useExampleComponent.ts      # 组件逻辑，使用 hooks 来封装
    - useExampleComponent.test.ts # 使用 @testing-library/react-hooks 进行 hooks 的测试
```
