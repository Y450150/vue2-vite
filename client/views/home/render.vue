<template>
  <div>
    <h1>我是首页</h1>
    <a-button type="primary" @click="post">提交</a-button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    post() {
      this.$axios.post("http://127.0.0.1:8080/api/test", {
        name: "yvywang",
        age: "21",
      });
    },
  },
};
</script>
