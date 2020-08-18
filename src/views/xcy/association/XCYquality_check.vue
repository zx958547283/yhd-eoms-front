<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button>
            <!-- <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('showAdd')">新增</el-button> -->
            <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('showEdit')">上传报告</el-button>
            <!-- <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('doDelete')">删除</el-button> -->
            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
            <el-popover :v-model="downloadQR_show" placement="bottom" trigger="click" width="300">
              <div style="text-align: center">
                <img :src="mm.qr_code" />
                <el-button @click="downloadQR(mm)" size="mini" slot="reference" style="margin-top: 5px;" type="primary">下载</el-button>
              </div>
              <el-button :disabled="mm.qr_code == '' || mm.sealed == '1'|| mm.sealed == 'Y' || mm.status != '1'" size="mini" slot="reference" type="primary">查看二维码</el-button>
            </el-popover>
            <el-button @click="doCheck_byList(1)" size="mini" type="primary">审核</el-button>
            <el-button @click="doCheck_byList(0)" size="mini" type="primary">取消审核</el-button>
          </el-button-group>
          <cinputquery @query="doQuery()" placeholder="名称" v-model="queryvalue"></cinputquery>
        </el-header>
        <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" @query="doQuery" v-model="queryvisible"></cquery>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <!-- <cinput :disabled="true" title="报告编号" v-model="mm.report_code"></cinput> -->
        <cinput :disabled="true" title="产品名称" v-model="mm.product_name"></cinput>
        <!-- <cinput :disabled="true" title="型号规格" v-model="mm.product_attr"></cinput> -->
        <!-- <cinput :disabled="true" title="生产单位" v-model="mm.enterprise_abbr_name"></cinput> -->
        <!-- <cinput :disabled="true" title="受检单位" v-model="mm.org_name"></cinput> -->
        <cmupload :disabled="editType == 'check'" :drag="true" list_type="text" title="质检报告" v-model="mm.imgUrls"></cmupload>
        <!-- <cselect :required="true" pk="YN" title="封存" v-model="mm.sealed"></cselect> -->
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false; mm={}; imgUrls=''" size="mini">取消</el-button>
        <el-button @click="doSave" size="mini" type="primary">上传</el-button>
      </div>
    </cwindow>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import xcy from "../../../api/xcy";
const defaultListQuery = {
  name: null,
  product_type: null,
  status: null,
  enterpriseName: null,
  report_code: null,
  timeRange: [],
  edit_time_start: null,
  edit_time_end: null,
  pageNum: 1,
  pageSize: 5
};
export default {
  data() {
    return {
      selectrows: [], //表格选中的对象
      wintitle: "新增产品信息", //编辑窗口标题
      winvisible: false, //编辑窗口是否显示
      queryvisible: false,    //查询弹出窗
      mm: {}, //编辑对象
      // imgUrls: [],
      imgUrls: '',
      params: [], //页面参数
      pagenum: 1, //当前页
      tabledata: {},   //表格数据
      queryvalue: "", //查询条件值
      querylist: [], //查询条件模板
      listQuery: Object.assign({}, defaultListQuery),
      list: [],
      listLoading: false,
      selectDialogVisible: false, // 生产企业受检机构可见
      dialogData: {
        // 生产企业受检机构查询条件
        list: null,
        total: null,
        queryTitle: "",
        currentRow: null,
        listQuery: {
          keyword: null,
          pageNum: 1,
          pageSize: 5
        }
      },

      queryKey: "", // 生产单位受检单位查询键
      checked: true, // ???
      list: ["", ""],
      productTypeList: [], // 获取所有可选择的产品类别
      downloadQR_show: false,
      editType: "",
    };
  },
  watch: {
    selectrows(val) {
      let that = this
      if (val.length == 1) {// 选中的时候塞入mm，取消不选中
        let that = this
        xcy.getXcyProduct(this.selectrows[0].pk).then(res => {
          that.mm = res
        })
      } else {
        that.mm = {}
      }
    }
  },
  created() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
    //this.doQuery();
  },
  filters: {},
  methods: {
    // doQuery(treeNode) {
    //   this.querylist = [];
    //   u.addwheres(this, "and", "(", "xcy_xcy_product.report_code", "like", this.queryvalue, "");
    //   u.addwheres(this, "or", "", "xcy_xcy_product.product_name", "like", this.queryvalue, ")");
    //   console.log(this.querylist);
    //   //查询条件
    //   this.dataLoad(1);
    // },
    btnqueryShow: function () {
      this.queryvisible = !this.queryvisible;
    },
    doQuery(querylist) {
      console.log(querylist)
      if (querylist === undefined) {
        console.log('111111111111111111111111')
        if (u.isnullorwhitespace(this.queryvalue)) {
          u.messagenotify(this, "请输入查询内容");
          return;
        } else {
          this.querylist = [];
          if (u.isnum(this.queryvalue)) {
            // u.addWheres(this, "and", "(", "Customer.Mobile", "like", this.queryvalue, "");
            // u.addWheres(this, "or", "", "Customer.Tel", "like", this.queryvalue, "");
            // u.addWheres(this, "or", "", "Customer.OtherTel", "like", this.queryvalue, "");
            // u.addWheres(this, "or", "", "Customer.CardNo", "like", this.queryvalue, ")");
          }
          else {
            // u.addWheres(this, "and", "(", "Customer.Name", "like", this.queryvalue, "");
            // u.addWheres(this, "or", "", "Customer.Address", "like", this.queryvalue, ")");
          }
        }
      } else {
        console.log("ddddddddddd")
        this.querylist = querylist;
        console.log(querylist)
      }
      //查询条件
      this.dataLoad(1);
    },
    dataLoad(num) {
      if (num) {
        this.pagenum = num;
      }
      // if (!this.queryvalue) {
      //   this.querylist = [];
      // }
      u.querypage(this, this.params[0]);
    },
    getList() {
      let that = this;
      this.listLoading = true;
      // 针对时间选择器是否有值做一些适配
      if (this.listQuery.timeRange) {
        [
          this.listQuery.edit_time_start,
          this.listQuery.edit_time_end
        ] = this.listQuery.timeRange;
      } else {
        [this.listQuery.edit_time_start, this.listQuery.edit_time_end] = [
          "",
          ""
        ];
      }
      xcy.getProductList(this.listQuery).then(res => {
        that.listLoading = false;
        that.list = res.rows; // 全量覆盖
        that.listQuery.total = res.total;
      });
    },
    showEdit(row, type) {
      let that = this
      this.editType = type
      u.openeditmodel(this, xcy.getXcyProduct, row).then(res => {
        console.log(that.mm)
        return xcy.getImgs({ product_id: res.id, type: 1 })

        // 产品详情图片需要单独调接口获得type=1表示质检附件图
        // xcy.getImgs({ product_id: res.id, type: 1 }).then(res2 => {

        // if (res2.imgList && res2.imgList.length > 0) {
        //   res.imgUrls = res2.imgList[0].attachment_path;
        //   for (let i = 1, length = res2.imgList.length; i < length; i++) {
        //     res.imgUrls += "," + res2.imgList[i].attachment_path;
        //   }
        // } else {
        //   res.imgUrls = "";
        // }
        // that.mm = res

        //   that.imgUrls = ''
        //   if (res2.imgList && res2.imgList.length > 0) {
        //     that.imgUrls = res2.imgList[0].attachment_path
        //     for (let i = 1, length = res2.imgList.length; i < length; i++) {
        //       that.imgUrls += "," + res2.imgList[i].attachment_path;
        //     }
        //   } else {
        //     that.imgUrls = "";
        //   }

        // });
      })
        .then(res => {
          let temp_mm = Object.assign({}, that.mm)
          if (res.imgList && res.imgList.length > 0) {
            temp_mm.imgUrls = res.imgList[0].attachment_path;
            for (let i = 1, length = res.imgList.length; i < length; i++) {
              temp_mm.imgUrls += "," + res.imgList[i].attachment_path;
            }
          } else {
            temp_mm.imgUrls = "";
          }
          that.mm = temp_mm
        })
    },
    doSave() {
      this.mm.imgType = 1;
      // this.mm.imgUrls = this.imgUrls
      u.doSave(this, xcy.saveXcyProductInfo);
    },
    doCheck_byList(type) {
      // 0:未审核 1:审核
      let that = this;
      let ids = "";
      if (this.selectrows.length >= 1) {
        ids = this.selectrows[0].pk;
      }
      for (let i = 1, length = this.selectrows.length; i < length; i++) {
        ids += "," + this.selectrows[i].pk;
      }
      if (ids == '') {
        u.messagenotify(this, '请至少勾选一条数据')
      } else {
        xcy.saveProductStatus({ ids: ids, status: type }).then(res => {
          u.messagenotify(that, "审核通过");
          that.dataLoad();
        })
      }

    },
    tableSelect(rows) {
      this.selectrows = rows;
    },
    handleSelectProduct(val) {
      this.queryKey = val;
      // 按照查询条件不同修改弹出框的title
      if (val === "enter") {
        this.dialogData.queryTitle = "选择生产单位";
      } else {
        this.dialogData.queryTitle = "选择受检单位";
      }
      this.selectDialogVisible = true;
      this.getDialogList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    downloadQR(row) {
      this.downloadIamge(row.qr_code, row.report_code + row.product_name);
    },
    downloadIamge(imgsrc, name) {
      let image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function () {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
        let a = document.createElement("a"); // 生成一个a元素
        let event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = imgsrc;
    }
  }
};
</script>
<style scoped>
.uploadarea {
  position: relative;
  display: inline-block;
}
.checkClass {
  width: 14px;
  height: 14px;
}
.page-controlstyle .el-checkbox {
  text-align: left;
}
</style>


