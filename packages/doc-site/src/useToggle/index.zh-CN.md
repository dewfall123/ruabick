---
map:
  path: /use-toggle
---

# useToggle

用于在两个状态值间切换的 Hook。

::: warning
API 有改动，见[ahooks](https://ahooks.js.org/hooks/state/use-toggle)。
:::

## Examples

### 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基础用法"
  desc="点击按钮，切换值">
</demo>

## API

```typescript
const [state, { toggle, setLeft, setRight }] = useToggle(
  defaultValue?: boolean,
);

const [state,{ toggle, setLeft, setRight }] = useToggle(
  defaultValue: any = false,
  reverseValue?: any,
);
```

### Params

| 参数         | 说明                     | 类型                                             | 默认值  |
| ------------ | ------------------------ | ------------------------------------------------ | ------- |
| defaultValue | 可选项，传入默认的状态值 | `number` \| `string` \| `boolean` \| `undefined` | `false` |
| reverseValue | 可选项，传入取反的状态值 | `number` \| `string` \| `boolean` \| `undefined` | -       |

### Result

| 参数    | 说明     | 类型      |
| ------- | -------- | --------- |
| state   | 状态值   | -         |
| actions | 操作集合 | `Actions` |

### Actions

| 参数     | 说明                                               | 类型                    |
| -------- | -------------------------------------------------- | ----------------------- |
| toggle   | 触发状态更改的函数，可以接受两个可选参数修改状态值 | `(state?: any) => void` |
| setLeft  | 设置为 defaultValue                                | `() => void`            |
| setRight | 设置为 reverseValue                                | `() => void`            |
