<template>
    <div class="pagecontent">
        <el-button-group>
            <el-button size="mini" type="primary" @click="btnadd()" v-show="btnpower('btnadd')">新增</el-button>
            <el-button size="mini" type="primary" @click="btnedit()" v-show="btnpower('btnedit')">编辑</el-button>
            <el-button size="mini" type="primary" @click="btndelete()" v-show="btnpower('btndelete')">删除</el-button>
            <el-button size="mini" type="primary" @click="btndataload(pagenum)">刷新</el-button>
        </el-button-group>
        <ctable :data="tabledata" @selection-change="btnselect" @row-dblclick="btnedit" @pagechange="btndataload" :pagenum="pagenum"></ctable>
        <cwindow v-model="winvisible" :title="wintitle">
            <div class="page-controlstyle">
                <cselect title="联系类型" v-model="mm.ConnType" pk="bda0f04a-f424-405e-a3d7-9a9c00ee079e"></cselect>
                <cdatepicker title="联系日期" v-model="mm.ConnTime"></cdatepicker>
                <cdatepicker title="下次联系" v-model="mm.NextTime"></cdatepicker>
                <cdept title="部门" v-model="mm.pk_Dept"></cdept>
                <cemployee title="员工" v-model="mm.pk_Employee" @change="employeechange"></cemployee>
                <ctextarea title="内容" v-model="mm.Memo" :length="2"></ctextarea>
            </div>
            <cui pk="635b5daa-2539-4808-a74c-a7a8009ef8db" v-model="mm"></cui>
            <div class="dialog-footer">
                <el-button size="mini" @click="winvisible=false">取消</el-button>
                <el-button size="mini" type="primary" @click="btnsave">提交</el-button>
            </div>
        </cwindow>
    </div>
</template>

<script>
import u from "../../js/utility";
export default {
  props: {
    pk: [String]
  },
  watch: {
    pk: function(val, oldValue) {
      if (val === this.oldValue) {
        return;
      }
      this.btnquery();
    }
  },
  data() {
    return {
      params: [],
      tabledata: {},
      loading: false,
      selectrows: [],
      pagenum: 1,
      mm: [],
      winvisible: false,
      wintitle: "",
      menudata: []
    };
  },
  created: function() {},
  mounted: function() {
    this.btnquery();
  },
  computed: {},
  methods: {
    employeechange(data) {
      if (u.isnullorwhitespace(this.mm.pk_Dept)) {
        this.mm.pk_Dept = data[0].pk_Dept;
      }
    },
    btnpower: function(btnid) {
      return u.buttonpower(this, btnid);
    },
    btnselect: function(rows) {
      this.selectrows = rows;
    },
    btndataload: function(num) {
      if (u.isnullorwhitespace(this.pk)) {
        return;
      }
      this.pagenum = num;
      u.querywhere(
        this,
        "d7183691-3028-4b69-8fcb-a7db0112e9ad",
        [
          {
            Field: "pk",
            Value: this.pk,
            Parm: "Y"
          }
        ],
        10,
        this.pagenum,
        "tabledata"
      );
    },
    btnquery: function() {
      this.btndataload(1);
    },
    btnadd: function() {
      u.openaddmodel(this);
    },
    btnedit: function(row) {
      u.openeditmodel(this, "Connect", row);
    },
    btnsave: function(row) {
      if (
        u.isnullorwhitespace(this.mm.ts) &&
        u.isnullorwhitespace(this.mm.pk_Customer)
      ) {
        this.mm.pk_Customer = this.pk;
      }
      u.saveoperate(this, "Connect");
      // u.getdata(that, 'Connect/Save', that.mm).then(function(r) {
      //     if (r.ok) {
      //         u.messagesuccess(that)
      //         that.winvisible = false
      //         that.btndataload(1)
      //     } else {
      //         u.messagenotify(that, r.message)
      //     }
      // })
    },
    btndelete: function() {
      u.deleteoperate(this, "Connect");
    }
  }
};
</script>

