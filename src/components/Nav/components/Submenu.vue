<template>
  <el-submenu :index="SubmenuData._id">
    <template slot="title">
      <span>
        <i
          v-if="
            SubmenuData.icon != undefined &&
            SubmenuData.icon != null &&
            SubmenuData.icon != ''
          "
          :class="SubmenuData.icon"
        ></i>
        {{ SubmenuData.title }}
      </span>
    </template>
    <template v-for="item in SubmenuData.children">
      <el-menu-item
        :index="item._id"
        :key="item._id"
        v-if="item.type == 1"
        @click="ClickCallback(item)"
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
        @ClickCallback="ClickCallback"
      />
    </template>
  </el-submenu>
</template>

<script>
import Submenu from "./Submenu.vue";
export default {
  name: "Submenu",
  props: {
    SubmenuData: Object,
  },
  components: {
    Submenu,
  },
  methods: {
    ClickCallback(row) {
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
