<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button>
            <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">编辑</el-button>
            <el-button @click="showMsgReplayConfig()" size="mini" type="primary" v-show="btnpower('btnmsgReplay')">消息回复</el-button>
            <el-button @click="showTemplateMessage()" size="mini" type="primary" v-show="btnpower('btnmsgReplay')">模板消息</el-button>
            <el-button @click="showSendGroupMsg()" size="mini" type="primary" v-show="btnpower('btnsendGroup')">消息群发</el-button>
            <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button>
            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
            <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
          </el-button-group>
        </el-header>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :length="3" :title="wintitle" style="top:80px;left:370px;height:800px; overflow:auto;" v-model="winvisible">
      <div class="page-controlstyle">
        <el-tabs @tab-click="tabSwitch" type="border-card" v-model="inType">
          <el-tab-pane label="基础信息" name="base">
            <cinput :required="true" title="公众号名称" v-model="mm.mp_name"></cinput>
            <cinput title="公众号帐号" v-model="mm.mp_account"></cinput>
            <cinput title="公众号密码" v-model="mm.mp_passwrod"></cinput>
            <cinput title="appid" v-model="mm.appid"></cinput>
            <cinput title="appSecret" v-model="mm.app_secret"></cinput>
            <cinput title="AESKey" v-model="mm.encoding_AESKey"></cinput>
            <cinput title="token" v-model="mm.mp_token"></cinput>
            <cinput title="管理员微信" v-model="mm.manager_wx"></cinput>
            <cinput title="管理员姓名" v-model="mm.manager_name"></cinput>
            <cinput title="管理员手机" v-model="mm.manager_mobille"></cinput>
            <cinput :length="2" title="认证地址" v-model="mm.wx_validate_url"></cinput>
            <div class="dialog-footer">
              <el-button @click="winvisible=false" size="mini">取消</el-button>
              <el-button @click="doSave" size="mini" type="primary">提交</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="菜单管理" name="second" v-if="this.mm.id">
            <el-card>
              <el-button @click="showCreateWXMPMenu" size="mini">创建菜单</el-button>
              <el-button @click="doDeleteMenu" size="mini">清空菜单</el-button>
              <el-button @click="doSynWXMenu" size="mini">同步公众号菜单</el-button>
            </el-card>
            <el-table :data="listMPMenu" border style="width: 100%" v-loading="mpMenuLoadding">
              <el-table-column label="类型" prop="menu_type" width="80"></el-table-column>
              <el-table-column label="名称" prop="name" width="80"></el-table-column>
              <el-table-column label="地址" prop="url" width="180"></el-table-column>
              <el-table-column label="同步状态" prop="syn_status" width="180"></el-table-column>
              <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                  <el-button @click="showEditMPMenu(scope.$index, scope.row)" size="mini">编辑</el-button>
                  <el-button @click="deleteMPMenu(scope.$index, scope.row)" size="mini" type="danger">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </cwindow>
    <cwindow title="创建微信公众号菜单" v-model="popCreateMPMenu">
      <div class="page-controlstyle" style="height: 300px;overflow: auto;">
        <cselect :required="true" pk="wxmenu_level" title="菜单级别" v-model="menu.menu_level"></cselect>
        <cselect :required="true" querypk="4bb97a14-ad0e-4b68-83d4-65d078dc463f" title="父菜单" v-model="menu.parent_id" v-show="menu.menu_level == '2'"></cselect>
        <cinput :required="true" title="菜单名称" v-model="menu.name"></cinput>
        <cselect :required="true" pk="wxmenu_type" title="菜单类型" v-model="menu.menu_type"></cselect>
        <cinput :required="true" title="链接地址" v-model="menu.url" v-show="menu.menu_type == 'view' || menu.menu_type == 'miniprogram'"></cinput>
        <cinput :required="true" title="素材id" v-model="menu.media_id" v-show="menu.menu_type == 'media_id' || menu.menu_type == 'view_limited'"></cinput>
        <cinput :required="true" title="小程序appid" v-model="menu.appid" v-show="menu.menu_type == 'miniprogram'"></cinput>
        <cinput :required="true" title="小程序路径" v-model="menu.pagepath" v-show="menu.menu_type == 'miniprogram'"></cinput>
      </div>
      <div class="dialog-footer">
        <el-button @click="popCreateMPMenu=false" size="mini">取消</el-button>
        <el-button @click="doCreateMPMenu" size="mini" type="primary">提交</el-button>
      </div>
    </cwindow>
    <cwindow title="公众号消息回复配置" v-model="popMsgReplay">
      <div class="page-controlstyle">
        <el-tabs type="border-card" v-model="msgConfigTab">
          <el-tab-pane label="被关注的回复" name="subscribe">
            <cselect @change="mm.subscribe_value = ''" pk="subscribeType" title="回复类型" v-model="mm.subscribe_type"></cselect>
            <ctextarea :length="2" title="回复内容" v-model="mm.subscribe_value" v-show="mm.subscribe_type=='0'"></ctextarea>
            <wxmpMaterial :appid="mm.appid" :materialType="mm.subscribe_type" title="素材选择" v-model="mm.subscribe_value" v-show="mm.subscribe_type=='1'"></wxmpMaterial>
            <div class="dialog-footer">
              <el-button @click="closeSubScribeReplay" size="mini">取消</el-button>
              <el-button @click="saveReplay()" size="mini" type="primary">提交</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="收到消息回复" name="recive">
            <cselect @change="mm.msg_replay_value = ''" pk="subscribeType" title="回复类型" v-model="mm.msg_replay_type"></cselect>
            <ctextarea :length="2" title="回复内容" v-model="mm.msg_replay_value" v-show="mm.msg_replay_type=='0'"></ctextarea>
            <wxmpMaterial :appid="mm.appid" :materialType="mm.msg_replay_type" title="素材选择" v-model="mm.msg_replay_value" v-show="mm.msg_replay_type=='1'"></wxmpMaterial>
            <div class="dialog-footer">
              <el-button @click="closeSubScribeReplay" size="mini">取消</el-button>
              <el-button @click="saveReplay()" size="mini" type="primary">提交</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="关键字回复" name="keyword"></el-tab-pane>
        </el-tabs>
      </div>
    </cwindow>
    <cwindow title="消息群发" v-model="popSendGroupMsg">
      <el-tabs @tab-click="groupMsgTabChange" type="border-card" v-model="msgGroupTab">
        <el-tab-pane label="历史群发消息" name="groupMsgHistory">
          <el-main>
            <el-table :data="groupMsgModule.groupMsgList.rows" max-height="300" size="mini" style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form class="table-expand" inline label-position="left">
                    <el-form-item label="消息类型">
                      <span>{{ props.row.消息类型 }}</span>
                    </el-form-item>
                    <el-form-item label="图文id">
                      <span>{{ props.row.图文id }}</span>
                    </el-form-item>
                    <el-form-item label="结果码">
                      <span>{{ props.row.结果码 }}</span>
                    </el-form-item>
                    <el-form-item label="发送结果">
                      <span>{{ props.row.发送结果 }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="公众号消息id" prop="公众号消息id" width="130"></el-table-column>
              <el-table-column align="center" label="发送成功" prop="发送成功" width="80"></el-table-column>
              <el-table-column label="发送时间" prop="发送时间">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 5px">{{ scope.row.发送时间 }}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination :current-page="groupMsgModule.pagenum" :page-size="groupMsgModule.pagesize" :total="groupMsgModule.groupMsgList.total" @current-change="searchGroupMsg" v-if="groupMsgModule.pagenum!==0"></el-pagination>
          </el-main>
        </el-tab-pane>
        <el-tab-pane label="群发消息" name="sendGroupMsg">
          <div class="page-controlstyle">
            <clable title="本月剩余发送条数：" v-model="groupMsg.surplusCount"></clable>
            <clable title="本月已发送条数：" v-model="groupMsg.sendCount"></clable>
            <cselect @change="groupMsg.msg_value = ''" pk="subscribeType" title="回复类型" v-model="groupMsg.msg_type"></cselect>
            <ctextarea :length="2" title="回复内容" v-model="groupMsg.msg_value" v-show="groupMsg.msg_type=='0'"></ctextarea>
            <wxmpMaterial :appid="groupMsg.appid" :materialType="groupMsg.msg_type" title="素材选择" v-model="groupMsg.msg_value" v-show="groupMsg.msg_type=='1'"></wxmpMaterial>
          </div>
          <div class="dialog-footer">
            <el-button @click="closeSendGroupMsg" size="mini">取消</el-button>
            <el-button @click="doSendGroupMsg()" size="mini" type="primary">提交</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </cwindow>
    <cwindow title="模板消息" v-model="sendMessageShow" style="width:1200px;">
      <div class="page-controlstyle">
        <cselect :required="true" :custOptions="wxTemplateList" @change="changeTemplate($event)" title="选择模板" v-model="msgData.template_id"></cselect>
        <div v-for="(v,i) in entryTemp" :key="i">
          <cinput :required="true" :title="v.name" v-if="v.name.indexOf('日期')==-1 &&v.name.indexOf('时间')==-1" v-model="msgData.templateData[v.keyword]"></cinput>
          <cdate :required="true" placeholder="请选择日期" v-if="v.name.indexOf('日期')!=-1" show_format="yyyy-MM-dd" size="small" :title="v.name" type="datetime" v-model="msgData.templateData[v.keyword]" value_format="yyyy-MM-dd" :key="i"></cdate>
          <cdate :required="true" placeholder="请选择时间" v-if="v.name.indexOf('时间')!=-1" show_format="yyyy-MM-dd HH:mm:ss" size="small" :title="v.name" v-model="msgData.templateData[v.keyword]" type="datetime" value_format="yyyy-MM-dd HH:mm:ss" :key="i"></cdate>
        </div>
        <cinput :required="true" title="跳转地址" v-model="msgData.url"></cinput>
        <cdate :required="true" placeholder="请选择时间" show_format="yyyy-MM-dd HH:mm:ss" size="small" title="任务时间" type="datetime" v-model="msgData.send_time" value_format="yyyy-MM-dd HH:mm:ss"></cdate>
        <!--
        <cinput :required="true" title="课程名称" v-model="msgData.templateData.keyword1"></cinput>
        <cinput :required="true" title="授课教师" v-model="msgData.templateData.keyword2"></cinput>
        <cdate :required="true" placeholder="请选择时间" show_format="yyyy-MM-dd HH:mm:ss" size="small" title="上课时间" type="datetime" v-model="msgData.templateData.keyword3" value_format="yyyy-MM-dd HH:mm:ss"></cdate>
        <cinput title="备注" v-model="msgData.templateData.remark"></cinput>
         -->
        <cinput title="发送用户" v-model="msgData.members" @focus="openUsers()" placeholder="请选择发送用户，默认全部" clearable v-if="false"></cinput>
      </div>
      <div class="dialog-footer">
        <el-button @click="sendMessageShow = false" size="mini">取消</el-button>
        <el-button @click="sendTemplateMessage('2')" size="mini" type="primary">发送</el-button>
        <el-button @click="sendTemplateMessage('1')" size="mini" type="primary">定时任务</el-button>
      </div>
      <!-- 左侧历史消息 -->
      <el-tabs type="border-card" style="margin-top:60px;width:50%;float:left;">
        <el-tab-pane label="历史消息">
          <el-table
          :data="historyTable"
          height="350"
          border
          size="mini"
          style="width: 100%;min-height:100px;">
         <el-table-column type="index" align="center" width="100" label="编号"></el-table-column>
          <el-table-column
            prop="create_time"
            label="发送时间"
            width="130">
          </el-table-column>
          <el-table-column
            prop="template_name"
            label="模板名称">
          </el-table-column>
          <el-table-column
            prop="create_user"
            label="发送人">
          </el-table-column>
        </el-table>
        <el-pagination :current-page="tempMsgModule.pagenum" :page-size="tempMsgModule.pagesize" :total="tempMsgModule.groupMsgList.total" @current-change="searchGroupMsgHistory" v-if="tempMsgModule.groupMsgList.total>=20"></el-pagination>
        </el-tab-pane>
      </el-tabs>
      <!-- 右侧任务列表 -->
      <el-tabs type="border-card" style="margin-top:22px;width:50%;float:right;">
        <el-tab-pane label="任务列表">
          <el-table
          :data="taskTable"
          border
          size="mini"
          height="350"
          style="width: 100%;min-height:100px;">
          <el-table-column type="index" align="center" width="100" label="编号"></el-table-column>
          <el-table-column
            prop="task_time"
            label="任务时间"
            width="130">
          </el-table-column>
          <el-table-column
            prop="template_name"
            label="模板名称">
          </el-table-column>
          <el-table-column
            prop="create_user"
            label="发送人">
          </el-table-column>
          <el-table-column
            prop="options"
            label="操作"
            width="150"
            >
            <template style="display:flex;" slot-scope="scope">
              <el-button size="mini" type="primary" @click="taskEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="taskDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="tempMsgModule_task.pagenum" :page-size="tempMsgModule_task.pagesize" :total="tempMsgModule_task.groupMsgList.total" @current-change="searchGroupMsgTask" v-if="tempMsgModule_task.groupMsgList.total>=20"></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </cwindow>
    <!-- 任务列表单个编辑 -->
    <cwindow title="任务编辑" v-model="task_edit" style="width:400px;">
      <!-- <cselect :custOptions="wxTemplateList" @change="mm.subscribe_value = ''" title="选择模板" v-model="msgDataEdit.template_id"></cselect>
      <cinput title="跳转地址" v-model="msgDataEdit.url"></cinput>
      <cinput title="课程名称" v-model="msgDataEdit.templateData.keyword1"></cinput>
      <cinput title="授课教师" v-model="msgDataEdit.templateData.keyword2"></cinput>
      <cdate placeholder="请选择时间" show_format="yyyy-MM-dd HH:mm:ss" size="small" title="上课时间" type="datetime" v-model="msgDataEdit.templateData.keyword3" value_format="yyyy-MM-dd HH:mm:ss"></cdate>
      <cinput title="备注" v-model="msgDataEdit.templateData.remark"></cinput>
      <cdate placeholder="请选择时间" show_format="yyyy-MM-dd HH:mm:ss" size="small" title="任务时间" type="datetime" v-model="msgDataEdit.send_time" value_format="yyyy-MM-dd HH:mm:ss"></cdate> -->
      <cselect :required="true" :custOptions="wxTemplateList" @change="changeTemplate($event)" title="选择模板" v-model="msgDataEdit.template_id"></cselect>
        <div v-for="(v,i) in entryTemp" :key="i">
          <cinput :required="true" :title="v.name" v-if="v.name.indexOf('日期')==-1 &&v.name.indexOf('时间')==-1" v-model="msgDataEdit.templateData[v.keyword]"></cinput>
          <cdate :required="true" placeholder="请选择日期" v-if="v.name.indexOf('日期')!=-1" show_format="yyyy-MM-dd" size="small" :title="v.name" type="datetime" v-model="msgDataEdit.templateData[v.keyword]" value_format="yyyy-MM-dd" :key="i"></cdate>
          <cdate :required="true" placeholder="请选择时间" v-if="v.name.indexOf('时间')!=-1" show_format="yyyy-MM-dd HH:mm:ss" size="small" :title="v.name" v-model="msgDataEdit.templateData[v.keyword]" type="datetime" value_format="yyyy-MM-dd HH:mm:ss" :key="i"></cdate>
        </div>
        <cinput :required="true" title="跳转地址" v-model="msgDataEdit.url"></cinput>
        <cdate :required="true" placeholder="请选择时间" show_format="yyyy-MM-dd HH:mm:ss" size="small" title="任务时间" type="datetime" v-model="msgDataEdit.send_time" value_format="yyyy-MM-dd HH:mm:ss"></cdate>
      <div class="dialog-footer">
        <el-button @click="task_edit = false" size="mini">取消</el-button>
        <el-button @click="taskEditSure()" size="mini" type="primary">确定</el-button>
      </div>
    </cwindow>
    <!-- @跳出层 -->
    <el-dialog :visible.sync="aite" title="选择用户" width="30%">
      <el-input placeholder="用户名称搜索" size="small" style="width: 250px;margin-bottom: 20px" v-model="dialogData.listQuery.keyword">
        <el-button @click="handleSelectSearch()" icon="el-icon-search" slot="append"></el-button>
      </el-input>
      <el-table :data="dialogData.list" border height="350" @selection-change="handleSelectionChange" ref="multipleTable">
        <el-table-column align="center" type="selection" width="60" checked="true"></el-table-column>
        <el-table-column align="center" label="用户名称">
          <template slot-scope="scope">{{scope.row.nickname}}</template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          @current-change="handleDialogCurrentChange"
          @size-change="handleDialogSizeChange" :current-page.sync="dialogData.listQuery.pageNum" :page-size="dialogData.listQuery.pageSize" :page-sizes="[5,10,15]" :total="dialogData.total" background layout="prev, pager, next"></el-pagination>
      </div>
      <div style="clear: both;"></div>
      <div slot="footer">
        <el-button @click="aite = false" size="small">取 消</el-button>
        <el-button @click="handleSelectDialogConfirm()" size="small" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import cont from "../../../api/cont";
import e from "../../../utils/excel";
import queryTemplate from "@/api/queryTemplate";
import wxapi from "../../../api/wxapi";
import sys from "../../../api/sys";

export default {
  data() {
    return {
      msgGroupTab: 'groupMsgHistory',
      groupMsgModule: {
        pagenum: 1,
        pagesize: u.querypagesize(),
        groupMsgList: {}
      },
      tempMsgModule: {
        pagenum: 1,
        pagesize: u.querypagesize(),
        groupMsgList: {}
      },
      tempMsgModule_task: {
        pagenum: 1,
        pagesize: u.querypagesize(),
        groupMsgList: {}
      },
      sendMessageShow: false,
      groupMsg: {},
      popSendGroupMsg: false,
      msgConfigTab: "subscribe",
      popMsgReplay: false,
      mpMenuLoadding: false,
      menu: {},
      popCreateMPMenu: false,
      inType: 'base',
      listMPMenu: [],
      selectrows: [],                    //表格选中的对象
      wintitle: "编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: "",         //查询条件值
      querylist: [],           //查询条件模板
      wxTemplateList: [],
      msgData: {
        subscribe_value: '',
        url: '',
        appid: '',
        templateData: {
        },
        template_id:'',
        template_name:'',
        send_time:'',
        members:'',
        accept:''
      },
      msgDataEdit: {
        subscribe_value: '',
        url: '',
        appid: '',
        templateData: {
          keyword1: '',
          keyword2: '',
          keyword3: '',
          keyword4: '',
          remark: ''
        },
        template_id:'',
        template_name:''
      },
      selectedAppId: '',
      historyTable:[],
      taskTable:[],
      selectedAppId: '',
      task_edit:false,
      singleTaskEdit:{},
      aite:false,
      dialogData: {
        list: null,
        total: null,
        multipleSelection: [],
        listQuery: {
          keyword: '',
          pageNum: 1,
          pageSize: 1000
        }
      },
      entryTemp:[],

    }
  },
  watch: {
    // entryTemp: {
    //   deep: true,
    //   handler: function() {

    //   }
    // }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
    this.doQuery();
  },
  filters: {
  },
  methods: {
    changeTemplate(e){
      // console.log(this.msgData);
      // Object.keys(this.msgData.templateData).forEach(key => obj[key] = '');
      this.msgData.templateData = {}
      let that = this;
      this.mm.subscribe_value = '';
      for(let i=0;i<this.wxTemplateList.length;i++){
        if(this.wxTemplateList[i].value==e[0]){
          this.wxTemplateList[i].entry.forEach(element => {
            this.msgData.templateData[element.keyword] = '';
          });
          that.entryTemp = this.wxTemplateList[i].entry;
        }
      }
    },
    doQuery(treeNode) {
      this.querylist = [];

      //查询条件
      this.dataLoad(1);
    },
    dataLoad(num) {
      if (num) {
        this.pagenum = num;
      }
      u.querypage(this, this.params[0]);
    },
    showAdd() {
      this.mm = {
        subscribe_type: "0"
      };
      this.inType = "base";
      this.winvisible = true;
    },
    showEdit(row) {
      let that = this;
      this.inType = "base";
      u.openeditmodel(this, cont.getWxmp, row);
    },
    doDelete() {
      u.deleteoperate(this, cont.deleteWxmp);
    },
    doExport() {
      u.queryExport(this.params[0], this.querylist).then(res => {
        e.exportxlsx(res);
      });
    },
    tabSwitch(itemTab) {

      if (itemTab && itemTab.name == "second") {
        this.mpMenuLoadding = true;
        let queryParams = {
          pk: '59e2a4cd-6a2b-4cf9-af36-48d95eb2eb93',
          lists: []
        }
        u.addwhere(queryParams, "wxmp_id", this.mm.id, "lists");
        queryTemplate.queryAll(queryParams).then(res => {
          this.listMPMenu = res;
          this.winvisible = true;
          this.mpMenuLoadding = false;
        }).catch(err => {
          this.mpMenuLoadding = false;
        });
      } else {
        this.mpMenuLoadding = false;
      }
    },
    tableSelect(rows) {
      this.selectrows = rows;
    },
    doSave() {
      //保存
      u.doSave(this, cont.saveWxmp);
    },
    doDeleteMenu() {
      this.$confirm('此操作将清空公众号上所有菜单, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cont.deleteWXMPMenu({
          id: this.mm.id
        }).then(res => {
          this.$message.success("清空菜单成功！");
          this.tabSwitch({
            name: "second"
          });
        }).catch(err => {
          this.$message.error(err);
          this.tabSwitch({
            name: "second"
          });
        });
      }).catch(() => {

      });
    },
    deleteMPMenu(index, menuRow) {
      cont.deleteWxmpMenu(menuRow.id).then(res => {
        this.$message.success("菜单删除成功！");
        this.tabSwitch({
          name: "second"
        });
      }).catch(err => {
        this.$message.error(err);
      });
    },
    showCreateWXMPMenu() {
      this.popCreateMPMenu = true;
      this.menu = {
        menu_level: "1"
      };
    },
    doCreateMPMenu() {
      this.menu.wxmp_id = this.mm.id;
      let syn_status = this.menu.syn_status
      if ('已同步' === syn_status) {
        this.menu.syn_status = 'Y'
      } else {
        this.menu.syn_status = 'N'
      }
      cont.saveWxmpMenu(this.menu).then(res => {
        this.$message.success("菜单创建成功！");
        this.popCreateMPMenu = false;
        this.tabSwitch({
          name: "second"
        });
      }).catch(err => {
        this.$message.error(err);
        this.popCreateMPMenu = false;
      });
    },
    showEditMPMenu(index, menuRow) {
      this.popCreateMPMenu = true;
      this.menu = menuRow;
    },
    doSynWXMenu() {
      cont.doSynWXMPMenu({ mpid: this.mm.id }).then(res => {
        this.$message.success("微信菜单同步成功!");
        this.tabSwitch({
          name: "second"
        });
      }).catch(err => {
        this.$message.error("微信菜单同步失败！");
        this.tabSwitch({
          name: "second"
        });
      });
    },
    showMsgReplayConfig(row) {
      row = u.dtselectvalue(this, row);
      if (row && row.pk) {
        cont.getWxmp(row.pk).then(res => {
          this.popMsgReplay = true;
          this.mm = res;
        }).catch(err => {

        });
      } else {
        this.$message.error("请选择行");
      }
    },
    saveReplay() {
      cont.saveWxmp(this.mm).then(res => {
        this.$message.success("保存成功");
        this.popMsgReplay = false;
      }).catch(err => {
        this.popMsgReplay = false;
      });
    },
    closeSubScribeReplay() {
      this.popMsgReplay = false;
    },
    showSendGroupMsg(row) {
      row = u.dtselectvalue(this, row);
      if (row && row.pk) {
        cont.getWXMPGroupMsg({ pk: row.pk }).then(res => {
          this.popSendGroupMsg = true;
          this.groupMsg = {
            appid: res.wxmp.appid,
            msg_type: "0",
            msg_value: "",
            sendCount: res.sendCount,
            surplusCount: res.surplusCount
          };
        }).catch(err => {
          this.popSendGroupMsg = false;
        });
        this.searchGroupMsg(1);
      } else {
        this.$message.error("请选择行");
      }
    },
    closeSendGroupMsg() {
      this.popSendGroupMsg = false;
    },
    doSendGroupMsg() {
      let surplusCount = Number(this.groupMsg.surplusCount);
      if (surplusCount <= 0) {
        this.$message.info("本月群发条数已用完！");
        return;
      }
      wxapi.sendGroupMsg(this.groupMsg).then(res => {
        this.$message.success("发送成功！");
        this.popSendGroupMsg = false;
      }).catch(err => { });
    },
    searchGroupMsg(num) {
      this.groupMsgModule.pagenum = num;
      u.querypage(this.groupMsgModule, 'cd3d1d6e-4b51-444c-99bb-1a899c6c65b2', "groupMsgList");
    },
    searchGroupMsgHistory(num){
        this.tempMsgModule.pagenum = num;
        cont.histories({"pagenum":this.tempMsgModule.pagenum,"pagesize":this.tempMsgModule.pagesize}).then(res => {
        this.historyTable = res.rows;
        this.tempMsgModule.groupMsgList.total = res.total;
      })
    },
    searchGroupMsgTask(num){
        this.tempMsgModule_task.pagenum = num;
        sys.listTask({"type": "1","pagenum":this.tempMsgModule_task.pagenum,"pagesize":this.tempMsgModule_task.pagesize}).then(res => {
        res.rows.map(data => {
          data.template_name = data.job_name.split('-')[0]
          return res;
        })
        this.taskTable = res.rows;
        this.tempMsgModule_task.groupMsgList.total = res.total;
      })
    },
    groupMsgTabChange(itemTab) {
      if (itemTab && itemTab.name == "groupMsgHistory") {
        this.searchGroupMsg(this.groupMsgModule.pagenum);
      }
    },
    showTemplateMessage(row) {
      this.msgData = {
        subscribe_value: '',
        url: '',
        appid: '',
        templateData: {
        },
        template_id:'',
        members:'',
        accept:''
      };
      this.entryTemp = []
      row = u.dtselectvalue(this, row);
      if (row['公众号类型'] == '订阅号') {
         this.$message.error("不支持订阅号发送模板消息");
         return;
      }
      if (row && row.pk) {
        this.selectedAppId = row.appid;
        wxapi.getTemplate({ appid: row.appid }).then(res => {
          this.wxTemplateList = res
            .filter(data => data.title != '订阅模板消息')
            .map(data => {
              return {
                entry: data.entry,
                value: data.templateId,
                text: data.title
              }
            })
          console.log(this.wxTemplateList)
          this.sendMessageShow = true;
        }).catch(err => { });

      this.getHistory();
      this.getTaskList();

      } else {
        this.$message.error("请选择行");
      }

    },
    sendTemplateMessage(type) {
      for(let i=0;i<this.wxTemplateList.length;i++){
        if(this.wxTemplateList[i].value==this.msgData.template_id){
          this.msgData.template_name = this.wxTemplateList[i].text;
        }
      }
      // if(type=='2'){
      //   if(this.msgData.template_id=='' ||
      //      this.msgData.url==''
      //   ){
      //     this.$message.error("请输入必填项");
      //     return;
      //   }else{
      //     for(let item of Object.keys(this.msgData.templateData)){
      //       debugger
      //       if(item!="first" && this.msgData.templateData.item!=""){
      //         this.$message.error("请输入必填项");
      //         return;
      //       }
      //     }
      //   }
      //   }else if(type=='1'){
      //     // if(this.msgData.template_id=='' ||
      //     //     this.msgData.url=='' ||
      //     //     this.msgData.templateData.keyword1==''||
      //     //     this.msgData.templateData.keyword2==''||
      //     //     this.msgData.templateData.keyword3==''||
      //     //     this.msgData.send_time==''
      //     // ){
      //     //   this.$message.error("请输入除备注的必填项");
      //     //   return;
      //     // }
      //     if(this.msgData.template_id=='' ||
      //       this.msgData.url=='' ||
      //       this.msgData.send_time==''
      //     ){
      //       this.$message.error("请输入必填项");
      //       return;
      //     }else{
      //       for(let item of Object.keys(this.msgData.templateData)){
      //         debugger
      //         if(item!="first" && this.msgData.templateData.item!=""){
      //           this.$message.error("请输入必填项");
      //           return;
      //         }
      //       }
      //     }
      // }
      this.msgData.appid = this.selectedAppId;
      wxapi.sendTemplateMessage({...this.msgData,type:type}).then(res => {
        if(type=='2'){
          this.$message.success("发送成功!");
        }else{
          this.$message.success("设定定时任务成功!");
        }
        this.msgData = {
          subscribe_value: '',
          url: '',
          appid: '',
          templateData: {
            keyword1: '',
            keyword2: '',
            keyword3: '',
            keyword4: '',
            remark: ''
          },
          template_id:'',
          members:'',
          accept:''
        }
        if(type==="2"){
          this.sendMessageShow = false;
          return;
        }
        this.getHistory();
        this.getTaskList();
      })
    },
    sendTimingTask(){
      console.log("定时任务方法");
    },
    taskEdit(row){
      this.task_edit = true;
      // this.singleTaskEdit = row;
      this.singleTaskEdit = Object.assign({}, row);
      sys.getOneTask({job_group_name:row.job_group_name,job_class_name:row.job_class_name}).then(res=>{
        this.msgDataEdit.url = res.url;
        this.msgDataEdit.appid = this.selectedAppId;
        this.msgDataEdit.send_time = res.send_time;
        this.msgDataEdit.templateData = JSON.parse(res.template_data);
        this.msgDataEdit.template_id = res.template_id;
        this.msgDataEdit.template_name = res.template_name;

        for(let i=0;i<this.wxTemplateList.length;i++){
          if(this.wxTemplateList[i].value==res.template_id){
            this.entryTemp = this.wxTemplateList[i].entry;
          }
        }
      })
    },
    taskEditSure(){
      sys.deleteTask({"job_group_name":this.singleTaskEdit.job_group_name,"job_class_name":this.singleTaskEdit.job_class_name}).then(res => {
        wxapi.sendTemplateMessage({...this.msgDataEdit,type:"1"}).then(res => {
          this.$message('更新成功');
          this.task_edit = false;
          this.getTaskList();
        })
      })
    },
    getTaskList(){
      sys.listTask({"type": "1","pagenum":this.tempMsgModule_task.pagenum,"pagesize":this.tempMsgModule_task.pagesize}).then(res => {
        if(res.rows===""){
          this.taskTable = [];
          return;
        }
        res.rows.map(data => {
          data.template_name = data.job_name.split('-')[0]
          return res;
        })
        this.taskTable = res.rows;
        this.tempMsgModule_task.groupMsgList.total = res.total;
      })
    },
    getHistory(){
      cont.histories({"pagenum":this.tempMsgModule.pagenum,"pagesize":this.tempMsgModule.pagesize}).then(res => {
        this.historyTable = res.rows;
        this.tempMsgModule.groupMsgList.total = res.total;
      })
    },
    taskDelete(row){
      sys.deleteTask({"job_class_name":row.job_class_name,"job_group_name":row.job_group_name}).then(res => {
        this.$message('删除成功');
        this.getTaskList();
      })
    },
    openUsers(){
      this.aite = true;
      this.dialogData.listQuery.keyword = '';
      this.getMembers();
    },
    getMembers(){
      let that = this;
      sys.getMembers({"startIndex":that.dialogData.listQuery.pageNum,"pagesize":that.dialogData.listQuery.pageSize,"nickname":that.dialogData.listQuery.keyword}).then(res=>{
        that.dialogData.list = res.rows;
        that.dialogData.total = res.total;
      }).then(()=>{
        if(that.msgData.accept.length==0){
          return;
        }
        for(let v of that.dialogData.list){
          for(let j of that.msgData.accept.split(",")){
            if(v.id == j){
              that.$refs.multipleTable.toggleRowSelection(v,true);
            }
          }
        }
      })
    },
    handleDialogCurrentChange(val) {
      this.dialogData.listQuery.pageNum = val;
      this.getMembers();
    },
    handleDialogSizeChange(val) {
      this.dialogData.listQuery.pageNum = 1;
      this.dialogData.listQuery.pageSize = val;
      this.getMembers();
    },
    handleSelectDialogConfirm(){
      let montageNames = this.msgData.members.split(",");
      let acceptMemberId = [];
      for(let item of this.dialogData.multipleSelection){
        montageNames.push(item.nickname);
        acceptMemberId.push(item.id);
      }
      this.msgData.accept = acceptMemberId.join(",");
      if(montageNames[0]==""){
        montageNames = montageNames.slice(1);
      }
      this.msgData.members = montageNames.join(",");
      this.aite = false;
    },
    handleSelectSearch(){
      this.getMembers();
    },
    handleSelectionChange(row){
      this.dialogData.multipleSelection=row;
    }
  }
}
</script>
<style>
.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>


