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
                {{ scope.row.type == 0 ? "目录" : "播放源" }}
              </template>
            </el-table-column>
            <el-table-column prop="source" :resizable="false" label="播放源">
              <template slot-scope="scope">
                {{ scope.row.source ? scope.row.source : "-" }}
              </template>
            </el-table-column>
            <el-table-column
              prop="addtime"
              :resizable="false"
              label="添加时间"
              width="180px"
            >
            </el-table-column>
            <el-table-column :resizable="false" label="操作" width="150px">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="Delete(scope.row)"
                  >删除</el-button
                >
                <el-button type="primary" size="mini" @click="Edit(scope.row)"
                  >编辑</el-button
                >
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
    },
    ShowAddDialog() {
      this.getCatalogue();
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
            console.log(Data);
            console.log(res);
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
          this.CloseLoading();
        })
        .catch((err) => {
          console.log(err);
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
