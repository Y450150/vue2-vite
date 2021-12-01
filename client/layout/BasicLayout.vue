<template>
  <pro-layout
    :menus="menus"
    :collapsed="collapsed"
    :theme="theme"
    :layout="layout"
    :contentWidth="contentWidth"
    :auto-hide-header="autoHideHeader"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
  >
    <router-view />
  </pro-layout>
</template>

<script>
import routes from "../router/index.js";
export default {
  name: "BasicLayout",
  data() {
    return {
      menus: [],
      collapsed: false,
      autoHideHeader: false,
      query: {},
      layout: "sidemenu",
      contentWidth: "Fluid",
      theme: "dark",
      isMobile: false,
    };
  },
  created() {
    this.menus = routes
      .find((item) => item.path === "/")
      .children.filter((item) => item.name && item.path);
  },
  methods: {
    handleMediaQuery(query) {
      this.query = query;
      if (this.isMobile && !query["screen-xs"]) {
        this.isMobile = false;
        return;
      }
      if (!this.isMobile && query["screen-xs"]) {
        this.isMobile = true;
        this.collapsed = false;
      }
    },
    handleCollapse(collapsed) {
      this.collapsed = collapsed;
    },
  },
};
</script>