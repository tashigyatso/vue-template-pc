<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="sidebar-logo" />
    <el-menu
      :default-active="activeMenu"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem.vue';
import variables from '../../../styles/variables.scss';

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'addRouters',
    ]),
    routes() {
      // 基本路由 + 异步路由
      return this.$router.options.routes.concat(this.addRouters);
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return variables;
    },
  },
};
</script>
