<template>
  <div class="chat">
    <div class="chat-history">
      <div
        :class="item.type === type ? 'user-self' : 'user-else'"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="user-chat">
          <div class="user-chat_content">{{ item.msg }}</div>
          <img
            src="http://wx.qlogo.cn/mmhead/wzJhLVPsrd0u55Y36miaH3fCnibwkXADQ5S3B6iaLkcTSPOmI9HvyvGFA/0"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="chat-edit">
      <div
        class="chat-edit_content"
        contenteditable="true"
        ref="edit"
        @keydown.enter="test"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.initWebSocket();
  },
  data() {
    const type = this.$route.query.type;
    return {
      list: [],
      type,
    };
  },
  created() {},
  methods: {
    test() {
      const msg = this.$refs.edit.innerText;
      const data = JSON.stringify({ type: this.type, msg });
      this.ws.send(data);
      this.$refs.edit.innerText = "";
    },
    initWebSocket() {
      const { $message } = this;
      const ws = new WebSocket("ws://localhost:8888");
      ws.onopen = function (e) {
        $message.success("连接服务器成功");
      };
      ws.onclose = function (e) {
        $message.error("服务器关闭");
      };
      ws.onerror = function () {
        $message.error("连接出错");
      };
      ws.onmessage = (e) => {
        console.log(e.data);
        this.list = JSON.parse(e.data);
      };
      this.ws = ws;
    },
  },
};
</script>
<style lang="less">
@import "./index.less";
</style>
    