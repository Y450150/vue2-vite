<template>
  <div class="main-page">
    <div class="main">
      <div class="main-body">
        <div class="main-form">
          <a-checkbox v-model="isDir"> 文件夹上传 </a-checkbox>
        </div>
        <div class="main-upload">
          <a-upload-dragger
            name="file"
            :multiple="true"
            :directory="isDir"
            :supportServerRender="true"
            :beforeUpload="checkFileType"
            :showUploadList="false"
            action="http://localhost:8080/api/svg"
            @change="handleChange"
          >
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">拖拽或点击上传</p>
          </a-upload-dragger>
        </div>
        <div class="main-button">
          <a-button type="primary" @click="handleClear">清空表单</a-button>
        </div>
      </div>
      <ul class="icon-list">
        <li v-for="item in list" :key="item.svgName" class="icon-list-cell">
          <img :title="item.svgName" :src="item.svgEncode" />
          <button
            @click="copy"
            class="btn"
            :data-clipboard-text="item.svgEncode"
          >
            复制
          </button>
        </li>
      </ul>
    </div>
    <!-- <div id="toptips" :class="toptips">复制成功</div> -->
  </div>
</template>

<script>
// import { mapState } from "vuex";
// import loginApi from "../../api/login.api";
import userCard from "./components/user-card.vue";
import Clipboard from "clipboard";
export default {
  components: { userCard },
  mounted() {},
  data() {
    return {
      isDir: true,
      list: [],
    };
  },
  methods: {
    copy() {
      const clipboard = new Clipboard(".btn");
      clipboard.on("success", (e) => {
        this.$message.success("复制成功");
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        this.$message.success("该浏览器不支持该功能");
        clipboard.destroy();
      });
    },
    handleChange(info) {
      const {
        file: { response = {}, status = "" },
      } = info;
      if (status === "done") {
        const { svgEncode, svgName } = response;
        this.list.push({ svgEncode, svgName });
      }
    },
    checkFileType({ type }) {
      return type === "image/svg+xml";
    },
    handleClear() {
      this.list=[]
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
.main {
  padding-top: 30px;
  .main-body {
    display: flex;
    justify-content: space-between;
  }
  .main-upload {
    flex: 1;
  }
  .main-form {
    margin-left: 20px;
  }
  .main-button {
    margin-right: 20px;
  }
  .ant-upload-drag {
    width: 50% !important;
    margin: 0 auto;
  }
}
</style>
