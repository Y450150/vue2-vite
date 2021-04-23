<template>
  <div
    class="user-container"
    @mouseenter="showBtn = true"
    @mouseleave="showBtn = false"
  >
    <div class="user-desc">
      <img class="user-desc-avatar" :src="user.miniProgramAvatar" alt="" />
      <div class="user-desc-ident">
        <p class="user-desc-ident__name">{{ user.miniProgramName }}</p>
        <p class="user-desc-ident__source">{{ user.programType }}</p>
      </div>
    </div>
    <img class="user-avatar" :src="user.avatar" alt="" />
    <div class="user-name">{{ user.name }}</div>
    <mp-button v-show="showBtn" type="default" size="mini"> 登录 </mp-button>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      showBtn: false
    };
  },
  methods: {},
};
</script>

<style lang="less">
.user-container {
  width: 170px;
  height: 280px;
  text-align: center;
  background: rgba(0, 0, 0, 0.12);
  .user-desc {
    display: flex;
    padding: 20px;
    .user-desc-ident__name {
      font-size: 14px;
    }
    .user-desc-ident {
      margin-left: 10px;
      text-align: left;
      color: #fff;
      .user-desc-ident__source {
        font-size: 12px;
      }
    }
    .user-desc-avatar {
      border-radius: 50%;
      width: 28px;
      height: 28px;
      margin-top: 2px;
    }
  }
  .user-name {
    margin-top: 20px;
    color: #fff;
    font-size: 13px;
  }
  .user-avatar {
    width: 55px;
    height: 55px;
    margin-top: 10px;
  }
}
.weui-desktop-btn {
  margin-top: 20px;
  background: transparent;
  border: 0.5px solid #fff;
  border-radius: 1px;
  font-weight: normal;
  color: #fff;
  transform: scale(0.8);
}
.show {
}
</style>