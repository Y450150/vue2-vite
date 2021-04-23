<template>
  <div id="app">
    <h1>hello world</h1>
    <div>
      {{ count }}
    </div>
    <button @click="count++">点击</button>
    <userLogin></userLogin>
  </div>
</template>
<script>
import userLogin from './view/login/render.vue'
export default {
  data() {
    return {
      count: 0,
    };
  },
  components:{userLogin}
};
</script>
<style lang="less">
</style>