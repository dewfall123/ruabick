<script lang="ts" setup>
import { useToggle } from 'ahooks-vue';

const { state, toggle } = useToggle();
</script>

<template>
  <div>
    <p>{{ state }}</p>
    <button @click="toggle()">点击</button>
  </div>
</template>
