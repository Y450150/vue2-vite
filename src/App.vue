<template>
  <div id="app">
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