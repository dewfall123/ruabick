# 在`.md`文件里展示 demo

```html
<demo src="../demo.vue" title="Demo block" desc="use demo"></demo>
```

<demo src="../demo.vue" title="Demo block" desc="use demo"></demo>

```vue:demo
<script lang="ts" setup>
const number = 1
</script>
<template>
  <span>The number is {{ number }}</span>
</template>
```
