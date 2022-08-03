<script setup>
import { ref } from 'vue';
import VTypical from 'vue-typical';
import MyButton from 'my-button';

const count = ref(0);
function onClick() {
  count.value++;
}
</script>

<template>
  <div>
    <v-typical
      :steps="['Hello', 1000, 'Hello World !', 500, 'Hello World ! 👋', 1000]"
      :loop="Infinity"
      :wrapper="'h2'"
    ></v-typical>

    <p>
      <span class="">点击次数:</span>
      <span>{{ count }}</span>
    </p>
    <MyButton @click="onClick">count++</MyButton>
  </div>
</template>

<style>
.text {
  font-size: 14px;
}
</style>
