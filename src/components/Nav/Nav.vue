<template>
  <div class="Nav">
    <div class="menu">
      <el-menu class="el-menu" background-color="#2B3141" text-color="#A2A2A2">
        <template v-for="item in MenuList">
          <el-menu-item
            :index="item._id"
            :key="item._id"
            v-if="item.type == 1"
            @click="Callback(item)"
          >
            <span>
              <i
                v-if="
                  item.icon != undefined && item.icon != null && item.icon != ''
                "
                :class="item.icon"
              ></i>
              {{ item.title }}
            </span>
          </el-menu-item>
          <Submenu
            :key="item._id"
            v-if="item.type == 0"
            :SubmenuData="item"
            @ClickCallback="Callback"
          />
        </template>
        <!-- 
        <template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </template> 
        -->
        <!-- <Submenu /> -->
      </el-menu>
    </div>
    <ul class="nav-footer">
      <li @click="SetPlayList">
        <i class="el-icon-setting"></i>
        <span>节目单设置</span>
      </li>
      <li @click="ShowAbout">
        <i class="el-icon-setting"></i>
        <span>关于&说明</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Submenu from "./components/Submenu.vue";
export default {
  name: "Nav",
  props: {
    MenuList: Array,
  },
  components: {
    Submenu,
  },
  methods: {
    ShowAbout() {
      this.$store.dispatch("electron/NewWindows", {
        WindowsControlName: "About",
        WindowsName: "关于&说明",
        ruoter: "About",
        minHeight: 710,
        minWith: 850,
        height: 710,
        with: 850,
      });
    },
    SetPlayList() {
      this.$store.dispatch("electron/NewWindows", {
        WindowsControlName: "StorePlayList",
        WindowsName: "节目单配置",
        ruoter: "StorePlayList",
        minHeight: 800,
        heigth: 800,
        minWith: 1000,
        with: 1000,
      });
    },
    Callback(row) {
      this.$emit("ClickCallback", row);
    },
  },
};
</script>
<style scoped>
.el-menu {
  border: none !important;
  text-align: left;
}
</style>
