<template>
  <div class="container StorePlayList" ref="container">
    <el-container>
      <el-header class="app-header">
        <Header WindowsControlName="StorePlayList" WindowsName="节目单配置" />
      </el-header>
      <el-container>
        <el-header class="header">
          <div class="table-list-from">
            <div class="item left"></div>
            <div class="item center"></div>
            <div class="item right">
              <el-button type="primary" @click="ShowAddDialog()"
                >新增</el-button
              >
            </div>
          </div>
        </el-header>
        <el-main>
          <el-table
            :data="tableData"
            class="table"
            row-key="_id"
            border
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column
              prop="title"
              :resizable="false"
              label="标题"
              width="300px"
            >
            </el-table-column>
            <el-table-column
              prop="type"
              :resizable="false"
              label="类型"
              width="100px"
            >
              <template slot-scope="scope">
                <div class="content">
                  {{ scope.row.type == 0 ? "目录" : "播放源" }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="source" :resizable="false" label="播放源">
              <template slot-scope="scope">
                <div class="content">
                  {{ scope.row.source ? scope.row.source : "-" }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="addtime"
              :resizable="false"
              label="添加时间"
              width="180px"
            >
              <template slot-scope="scope">
                <div class="content">
                  {{ scope.row.addtime ? scope.row.addtime : "-" }}
                </div>
              </template>
            </el-table-column>
            <el-table-column :resizable="false" label="操作" width="150px">
              <template slot-scope="scope">
                <div class="content">
                  <el-button
                    type="danger"
                    size="mini"
                    @click="Delete(scope.row)"
                    >删除</el-button
                  >
                  <el-button type="primary" size="mini" @click="Edit(scope.row)"
                    >编辑</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>

    <div class="dialog">
      <el-dialog title="新增配置" :visible.sync="dialogFormVisible">
        <el-form :model="form" class="form">
          <el-form-item label="目录" label-width="80px">
            <treeselect
              :options="CatalogueOptions"
              :show-count="true"
              v-model="form.pid"
              placeholder="Where are you from?"
            />
          </el-form-item>

          <el-form-item label="类型" label-width="80px">
            <el-select
              v-model="form.type"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in TypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="标题" label-width="80px">
            <el-input v-model="form.title" placeholder="请输入内容"></el-input>
          </el-form-item>

          <el-form-item label="图标" label-width="80px">
            <el-select
              v-model="form.icon"
              filterable
              placeholder="请选择,可搜索"
              style="width: 100%"
            >
              <el-option
                v-for="item in Data.Icon"
                :key="item"
                :label="item"
                :value="item"
              >
                <span style="float: left"><i :class="item" /></span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="播放源" label-width="80px" v-if="form.type == 1">
            <el-input v-model="form.source" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="Save">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"; //标题栏
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { ToTree } from "@/utils/common";
export default {
  name: "StorePlayList",
  components: {
    Header,
    Treeselect,
  },
  data() {
    return {
      objLoading: null,
      tableData: [],
      dialogFormVisible: false,
      isAdd: true,
      form: {
        _id: "",
        pid: "0",
        type: 0,
        title: "",
        source: "",
        icon: "",
        addtime: "",
      },
      CatalogueOptions: [
        {
          id: "0",
          label: "顶级",
        },
      ],
      TypeOptions: [
        {
          value: 0,
          label: "目录",
        },
        {
          value: 1,
          label: "播放源",
        },
      ],
      Data: {
        Icon: [
          "el-icon-platform-eleme",
          "el-icon-eleme",
          "el-icon-delete-solid",
          "el-icon-delete",
          "el-icon-s-tools",
          "el-icon-setting",
          "el-icon-user-solid",
          "el-icon-user",
          "el-icon-phone",
          "el-icon-phone-outline",
          "el-icon-more",
          "el-icon-more-outline",
          "el-icon-star-on",
          "el-icon-star-off",
          "el-icon-s-goods",
          "el-icon-goods",
          "el-icon-warning",
          "el-icon-warning-outline",
          "el-icon-question",
          "el-icon-info",
          "el-icon-remove",
          "el-icon-circle-plus",
          "el-icon-success",
          "el-icon-error",
          "el-icon-zoom-in",
          "el-icon-zoom-out",
          "el-icon-remove-outline",
          "el-icon-circle-plus-outline",
          "el-icon-circle-check",
          "el-icon-circle-close",
          "el-icon-s-help",
          "el-icon-help",
          "el-icon-minus",
          "el-icon-plus",
          "el-icon-check",
          "el-icon-close",
          "el-icon-picture",
          "el-icon-picture-outline",
          "el-icon-picture-outline-round",
          "el-icon-upload",
          "el-icon-upload2",
          "el-icon-download",
          "el-icon-camera-solid",
          "el-icon-camera",
          "el-icon-video-camera-solid",
          "el-icon-video-camera",
          "el-icon-message-solid",
          "el-icon-bell",
          "el-icon-s-cooperation",
          "el-icon-s-order",
          "el-icon-s-platform",
          "el-icon-s-fold",
          "el-icon-s-unfold",
          "el-icon-s-operation",
          "el-icon-s-promotion",
          "el-icon-s-home",
          "el-icon-s-release",
          "el-icon-s-ticket",
          "el-icon-s-management",
          "el-icon-s-open",
          "el-icon-s-shop",
          "el-icon-s-marketing",
          "el-icon-s-flag",
          "el-icon-s-comment",
          "el-icon-s-finance",
          "el-icon-s-claim",
          "el-icon-s-custom",
          "el-icon-s-opportunity",
          "el-icon-s-data",
          "el-icon-s-check",
          "el-icon-s-grid",
          "el-icon-menu",
          "el-icon-share",
          "el-icon-d-caret",
          "el-icon-caret-left",
          "el-icon-caret-right",
          "el-icon-caret-bottom",
          "el-icon-caret-top",
          "el-icon-bottom-left",
          "el-icon-bottom-right",
          "el-icon-back",
          "el-icon-right",
          "el-icon-bottom",
          "el-icon-top",
          "el-icon-top-left",
          "el-icon-top-right",
          "el-icon-arrow-left",
          "el-icon-arrow-right",
          "el-icon-arrow-down",
          "el-icon-arrow-up",
          "el-icon-d-arrow-left",
          "el-icon-d-arrow-right",
          "el-icon-video-pause",
          "el-icon-video-play",
          "el-icon-refresh",
          "el-icon-refresh-right",
          "el-icon-refresh-left",
          "el-icon-finished",
          "el-icon-sort",
          "el-icon-sort-up",
          "el-icon-sort-down",
          "el-icon-rank",
          "el-icon-loading",
          "el-icon-view",
          "el-icon-c-scale-to-original",
          "el-icon-date",
          "el-icon-edit",
          "el-icon-edit-outline",
          "el-icon-folder",
          "el-icon-folder-opened",
          "el-icon-folder-add",
          "el-icon-folder-remove",
          "el-icon-folder-delete",
          "el-icon-folder-checked",
          "el-icon-tickets",
          "el-icon-document-remove",
          "el-icon-document-delete",
          "el-icon-document-copy",
          "el-icon-document-checked",
          "el-icon-document",
          "el-icon-document-add",
          "el-icon-printer",
          "el-icon-paperclip",
          "el-icon-takeaway-box",
          "el-icon-search",
          "el-icon-monitor",
          "el-icon-attract",
          "el-icon-mobile",
          "el-icon-scissors",
          "el-icon-umbrella",
          "el-icon-headset",
          "el-icon-brush",
          "el-icon-mouse",
          "el-icon-coordinate",
          "el-icon-magic-stick",
          "el-icon-reading",
          "el-icon-data-line",
          "el-icon-data-board",
          "el-icon-pie-chart",
          "el-icon-data-analysis",
          "el-icon-collection-tag",
          "el-icon-film",
          "el-icon-suitcase",
          "el-icon-suitcase-1",
          "el-icon-receiving",
          "el-icon-collection",
          "el-icon-files",
          "el-icon-notebook-1",
          "el-icon-notebook-2",
          "el-icon-toilet-paper",
          "el-icon-office-building",
          "el-icon-school",
          "el-icon-table-lamp",
          "el-icon-house",
          "el-icon-no-smoking",
          "el-icon-smoking",
          "el-icon-shopping-cart-full",
          "el-icon-shopping-cart-1",
          "el-icon-shopping-cart-2",
          "el-icon-shopping-bag-1",
          "el-icon-shopping-bag-2",
          "el-icon-sold-out",
          "el-icon-sell",
          "el-icon-present",
          "el-icon-box",
          "el-icon-bank-card",
          "el-icon-money",
          "el-icon-coin",
          "el-icon-wallet",
          "el-icon-discount",
          "el-icon-price-tag",
          "el-icon-news",
          "el-icon-guide",
          "el-icon-male",
          "el-icon-female",
          "el-icon-thumb",
          "el-icon-cpu",
          "el-icon-link",
          "el-icon-connection",
          "el-icon-open",
          "el-icon-turn-off",
          "el-icon-set-up",
          "el-icon-chat-round",
          "el-icon-chat-line-round",
          "el-icon-chat-square",
          "el-icon-chat-dot-round",
          "el-icon-chat-dot-square",
          "el-icon-chat-line-square",
          "el-icon-message",
          "el-icon-postcard",
          "el-icon-position",
          "el-icon-turn-off-microphone",
          "el-icon-microphone",
          "el-icon-close-notification",
          "el-icon-bangzhu",
          "el-icon-time",
          "el-icon-odometer",
          "el-icon-crop",
          "el-icon-aim",
          "el-icon-switch-button",
          "el-icon-full-screen",
          "el-icon-copy-document",
          "el-icon-mic",
          "el-icon-stopwatch",
          "el-icon-medal-1",
          "el-icon-medal",
          "el-icon-trophy",
          "el-icon-trophy-1",
          "el-icon-first-aid-kit",
          "el-icon-discover",
          "el-icon-place",
          "el-icon-location",
          "el-icon-location-outline",
          "el-icon-location-information",
          "el-icon-add-location",
          "el-icon-delete-location",
          "el-icon-map-location",
          "el-icon-alarm-clock",
          "el-icon-timer",
          "el-icon-watch-1",
          "el-icon-watch",
          "el-icon-lock",
          "el-icon-unlock",
          "el-icon-key",
          "el-icon-service",
          "el-icon-mobile-phone",
          "el-icon-bicycle",
          "el-icon-truck",
          "el-icon-ship",
          "el-icon-basketball",
          "el-icon-football",
          "el-icon-soccer",
          "el-icon-baseball",
          "el-icon-wind-power",
          "el-icon-light-rain",
          "el-icon-lightning",
          "el-icon-heavy-rain",
          "el-icon-sunrise",
          "el-icon-sunrise-1",
          "el-icon-sunset",
          "el-icon-sunny",
          "el-icon-cloudy",
          "el-icon-partly-cloudy",
          "el-icon-cloudy-and-sunny",
          "el-icon-moon",
          "el-icon-moon-night",
          "el-icon-dish",
          "el-icon-dish-1",
          "el-icon-food",
          "el-icon-chicken",
          "el-icon-fork-spoon",
          "el-icon-knife-fork",
          "el-icon-burger",
          "el-icon-tableware",
          "el-icon-sugar",
          "el-icon-dessert",
          "el-icon-ice-cream",
          "el-icon-hot-water",
          "el-icon-water-cup",
          "el-icon-coffee-cup",
          "el-icon-cold-drink",
          "el-icon-goblet",
          "el-icon-goblet-full",
          "el-icon-goblet-square",
          "el-icon-goblet-square-full",
          "el-icon-refrigerator",
          "el-icon-grape",
          "el-icon-watermelon",
          "el-icon-cherry",
          "el-icon-apple",
          "el-icon-pear",
          "el-icon-orange",
          "el-icon-coffee",
          "el-icon-ice-tea",
          "el-icon-ice-drink",
          "el-icon-milk-tea",
          "el-icon-potato-strips",
          "el-icon-lollipop",
          "el-icon-ice-cream-square",
          "el-icon-ice-cream-round",
        ],
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    Edit(row) {
      this.getCatalogue();
      this.isAdd = false;
      let tmp = JSON.stringify(row);
      this.form = JSON.parse(tmp);
      this.dialogFormVisible = true;
    },
    Delete(row) {
      if (row.children != undefined || row.children != null) {
        this.$message({
          type: "error",
          message: "改是数据存在子集,不可删除!",
        });
        return;
      }
      this.$confirm(`即将删除"${row.title}", 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.ShowLoading();
          this.$store
            .dispatch("playlistModel/Delete", { _id: row._id })
            .then((res) => {
              this.CloseLoading();
              this.getList();
              this.$message({
                message: "删除成功",
                type: "success",
              });
            })
            .catch((err) => {
              this.CloseLoading();
              this.$message({
                message: "删除失败",
                type: "error",
              });
            });
        })
        .catch(() => {});
    },
    ShowAddDialog() {
      this.getCatalogue();
      this.form = {
        _id: "",
        pid: "0",
        type: 0,
        title: "",
        source: "",
        addtime: "",
      };
      this.form.pid = "0";
      this.isAdd = true;
      this.dialogFormVisible = true;
    },
    Save() {
      if (this.isAdd) {
        this.ShowLoading();
        this.form.addtime = this.getCurrentTime();
        delete this.form._id;
        this.$store
          .dispatch("playlistModel/Add", this.form)
          .then((res) => {
            this.CloseLoading();
            this.getList();
            this.dialogFormVisible = false;
            this.$message({
              message: "添加成功",
              type: "success",
            });
          })
          .catch((err) => {
            this.CloseLoading();
            this.$message({
              message: "添加失败",
              type: "error",
            });
          });
      } else {
        if (this.form._id == this.form.pid) {
          this.$message({
            message: "数据父级不能是它本身",
            type: "error",
          });
          return;
        }
        this.ShowLoading();
        let Data = { Where: { _id: this.form._id }, Data: this.form };
        this.$store
          .dispatch("playlistModel/Edit", Data)
          .then((res) => {
            this.CloseLoading();
            this.getList();
            this.dialogFormVisible = false;
            this.$message({
              message: "保存成功",
              type: "success",
            });
          })
          .catch((err) => {
            this.CloseLoading();
            this.$message({
              message: "保存失败",
              type: "error",
            });
          });
      }
    },
    getList() {
      this.ShowLoading();
      this.$store
        .dispatch("playlistModel/Select", {})
        .then((res) => {
          this.tableData = ToTree(res, "_id", "pid", "children");
          this.$store
            .dispatch("electron/CommunicationTransfer", {
              ToWindow: "MainWindows",
              Action: "ResetMenuList",
              MenuList: this.tableData,
            })
            .then((res) => {})
            .catch((err) => {
              this.$message({
                message: err,
                type: "error",
              });
            });
          this.CloseLoading();
        })
        .catch((err) => {
          this.CloseLoading();
          this.$message({
            message: "列表获取失败",
            type: "error",
          });
        });
    },
    getCatalogue() {
      this.ShowLoading();
      this.$store
        .dispatch("playlistModel/Select", { type: 0 })
        .then((res) => {
          let options = [];
          res.forEach((element) => {
            options.push({
              id: element._id,
              pid: element.pid + "",
              label: element.title,
            });
          });
          options = ToTree(options, "id", "pid", "children");

          this.CatalogueOptions = [
            {
              id: "0",
              label: "顶级",
            },
          ];
          options.forEach((element) => {
            this.CatalogueOptions.push(element);
          });
          // console.log(this.CatalogueOptions);
          this.CloseLoading();
        })
        .catch((err) => {
          this.CloseLoading();
          this.$message({
            message: "列表获取失败",
            type: "error",
          });
        });
    },
    getCurrentTime() {
      var date = new Date(); //当前时间
      var year = date.getFullYear(); //返回指定日期的年份
      var month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1); //月
      var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate(); //日
      var hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours(); //时
      var minute =
        date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes(); //分
      var second =
        date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds(); //秒
      //当前时间
      var curTime =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
      return curTime;
    },
    ShowLoading() {
      if (this.objLoading == null) {
        this.objLoading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
      }
    },
    CloseLoading() {
      if (this.objLoading != null) {
        this.objLoading.close();
        this.objLoading = null;
      }
    },
  },
};
</script>
