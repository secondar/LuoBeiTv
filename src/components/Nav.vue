<template>
  <div class="Nav">
    <div class="menu">
      <el-menu class="el-menu" background-color="#2B3141" text-color="#A2A2A2">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">
              <!-- 如果超过十个字,那需要这个,否则不需要 -->
              <el-tooltip
                class="item"
                effect="dark"
                content="选项211111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
                placement="left"
              >
                <div>
                  选项211111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                </div>
              </el-tooltip>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
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
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    ShowAbout() {
      this.$store.dispatch("electron/NewWindows", {
        WindowsControlName: "About",
        WindowsName: "关于&说明",
        ruoter: "About",
        minHeight: 300,
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
  },
};
</script>
<style scoped>
.el-menu {
  border: none !important;
  text-align: left;
}
</style>
