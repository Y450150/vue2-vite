<template>
  <div class="main-page">
    <div class="title">
      <div class="live-name">客服管理后台</div>
    </div>
    <div class="content">
      <div class="user-box">
        <div class="user-background"></div>
        <div class="user-box-cards">
          <userCard :user="obj"></userCard>
          <userCard :user="obj"></userCard>
          <userCard :user="obj"></userCard>
        </div>
        <div class="user-box-text">
          <p>请选择要登录的账号</p>
          <a href="">重新扫码</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import { mapState } from "vuex";
// import loginApi from "../../api/login.api";
import userCard from "./components/user-card.vue";

export default {
  components: { userCard },
  data() {
    return {
      obj: {
        miniProgramAvatar:
          "http://wx.qlogo.cn/mmhead/wzJhLVPsrd0u55Y36miaH3fCnibwkXADQ5S3B6iaLkcTSPOmI9HvyvGFA/0",
        miniProgramName: "好运来小程序",
        programType: "小程序",
        avatar:
          "http://wx.qlogo.cn/mmhead/wzJhLVPsrd0u55Y36miaH3fCnibwkXADQ5S3B6iaLkcTSPOmI9HvyvGFA/0",
        name: "路人甲",
      },
    };
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
