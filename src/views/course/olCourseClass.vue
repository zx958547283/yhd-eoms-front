<template>
  <div class="app-container">
    <!-- <cqueryview :pk="params[0]" @query="btnquery"></cqueryview> -->
    <el-button-group>
      <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button>
      <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button>
      <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">编辑</el-button>
      <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button>
      <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
      <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
    </el-button-group>
    <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
    <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" :show="false" @query="doQuery" v-model="queryvisible"></cquery>

    <cwindow :length="3" :title="wintitle" style="height:500px; overflow: auto;" v-model="winvisible">
      <div class="page-controlstyle">
        <el-tabs type="border-card" v-model="inType">
          <el-tab-pane label="基础信息" name="base">
            <cinput :required="true" title="课时名称" v-model="mm.class_name"></cinput>
            <cinput :length="3" :required="true" title="课时介绍" v-model="mm.class_introduce"></cinput>
            
            <cselect :length="3" :required="true" title="媒体类型" :custOptions="mediatypes" v-model="mm.media_type"></cselect>
            <cradio :itemlists="watch_type" :length="2" :required="true" title="观看类型" v-model="mm.watch_type"></cradio>
            <csuploadWithPath :dataObj="updatePath" :length="3" :required="true" title="封面图片" v-model="mm.cover_path"></csuploadWithPath>
            <csuploadWithPath :dataObj="updatePath" :length="3" :required="true" title="分享图片" v-model="mm.share_img"></csuploadWithPath>
            <cinput :length="3" title="视频地址" v-model="mm.video_path"></cinput>
            <!-- <el-radio-group v-model="mm.media_type">
              <el-radio :label="1">音频</el-radio>
              <el-radio :label="2">视频</el-radio>
            </el-radio-group>-->

            <csuploadWithPath
              :dataObj="updatePath"
              :length="3"
              :required="true"
              @beforeUpload="beforeUpload"
              @handleOnProgress="handleOnProgress"
              @handleUploadSuccess="handleUploadSuccess"
              action="https://www.laohaowaner.com/qbeoms/common/uploadFileByWh"
              fileType="media"
              title="视频地址"
              v-model="mm.video_path"
            ></csuploadWithPath>
            <csuploadWithPath :dataObj="updatePath" :length="3" :required="true" fileType="media" title="音频地址" v-model="mm.audio_path"></csuploadWithPath>
            <!-- <cnumber title="课时价格（非会员）" v-model="mm.class_amount" :length="1.5"></cnumber> -->
            <cnumber :length="1.5" title="课时时长" v-model="mm.class_length"></cnumber>
            <cnumber :length="1.5" :required="true" title="排序" v-model="mm.sort"></cnumber>
            <cdate show_format="yyyy-MM-dd HH:mm:ss" title="开启时间" type="datetime" v-model="mm.start_time" value_format="yyyy-MM-dd HH:mm:ss"></cdate>
            <!-- <input @change="getSing" id="upload" type="file" /> -->
          </el-tab-pane>
          <el-tab-pane label="内容" name="second">
            <tinymce :height="300" :toolbar="toolbar" :width="825" v-model="mm.class_content"></tinymce>
          </el-tab-pane>
          <!-- <el-tab-pane label="课时详细" name="third"></el-tab-pane> -->
        </el-tabs>
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <el-button @click="doSave" size="mini" type="primary">提交</el-button>
      </div>
    </cwindow>
    <el-dialog :title="uploadTitle" :visible.sync="selectDialogVisible" width="50%">
      <el-progress :percentage="percentage" :stroke-width="26" :text-inside="true"></el-progress>
    </el-dialog>
  </div>
</template>
<script>
import u from "../../utils/utility";
import sys from "../../api/sys";
import course from "../../api/course";
import e from "../../utils/excel";
import request from "../../utils/request";
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
  data() {
    return {
      selectrows: [],                    //表格选中的对象
      wintitle: "编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: '',         //查询条件值
      querylist: [], //查询条件模板
      queryvisible: false,    //查询弹出窗
      updatePath: {
        path: process.env.REDIO_UPLOAD_PATH
      },
      courseId: '',
      inType: 'base',
      toolbar: [`bold italic underline strikethrough alignleft aligncenter
  alignright outdent indent  blockquote undo redo removeformat hr bullist numlist link image charmap	 preview anchor pagebreak`,
        `fullscreen insertdatetime media table forecolor backcolor`],
      media_type: [{
        label: '1',
        txt: '音频'
      },
      {
        label: '2',
        txt: '视频'
      }
      ],
      watch_type: [{
        label: '0',
        txt: '免费/试看'
      },
      {
        label: '1',
        txt: '收费'
      },
      {
        label: '2',
        txt: '分享后看'
      }
      ],
      sign: '',
      signed_at: '',
      app_key: '',
      selectDialogVisible: false,
      percentage: '0',
      uploadTitle: '上传至服务器中。。。',
      websocket: null,
      mediatypes: [
        {text: "文字", value :"0"},
        {text: "音频", value :"1"},
        {text: "视频", value :"2"}
      ]
    }
  },
  mounted() {
    console.log('================  mounted')
    this.params = u.getpageparmas(this);
    this.doQuery();

  },
  created() {
    let that = this
    this.websocket = new WebSocket('wss://www.laohaowaner.com:443/qbeoms/push/websocket')
    this.initWebSocket()
  },
  filters: {
  },
  methods: {
    btnqueryShow: function () {
      this.queryvisible = !this.queryvisible;
    },
    dataLoad(num) {
      if (num) {
        this.pagenum = num;
      }
      u.querypage(this, this.params[0]);
    },
    doQuery: function () {
      console.log(this.params)
      this.querylist = [];
      if (undefined !== this.params[1] && null !== this.params[1] && '' !== this.params[1]) {
        this.courseId = this.params[1]

        u.addwhere(this, "course_ol_course_class.course_id", this.params[1]);
      }
      this.dataLoad(1);
    },
    showAdd() {
      this.mm = {};
      this.mm.fix = "N";
      this.winvisible = true;
      this.mm.watch_type = '-1'
      this.timeValue = [];
    },
    showEdit(row) {
      let that = this;
      u.openeditmodel(this, course.getOlCourseClass, row).then(res => {
        console.log(res)
      });;
    },
    doDelete() {
      u.deleteoperate(this, course.deleteOlCourseClass);
    },
    doExport() {
      u.queryAll(this.params[0], this.querylist).then(res => {
        e.exportxlsx(res);
      });
    },
    tableSelect(rows) {
      this.selectrows = rows;
    },
    doSave() {
      if (this.mm.class_name === undefined || null === this.mm.class_name) {
        this.$message.error("请填写课时名称！");
        return;
      }
      if (this.mm.class_introduce === undefined || null === this.mm.class_introduce) {
        this.$message.error("请填写课时介绍！");
        return;
      }
      if (this.mm.cover_path === undefined || null === this.mm.cover_path) {
        this.$message.error("请上传封面！");
        return;
      }
      if (this.mm.media_type === undefined || null === this.mm.media_type) {
        this.$message.error("请选择媒体类型！");
        return;
      }
      if (this.mm.watch_type === undefined || null === this.mm.watch_type) {
        this.$message.error("请选择收费类型！");
        return;
      }
      if (this.mm.sort === undefined || null === this.mm.sort) {
        this.$message.error("请设置排序！");
        return;
      }
      this.mm.course_id = this.courseId
      this.mm.class_length = 0
      u.doSave(this, course.saveOlCourseClass);
    },
    btnquery: function (querylist) {
      console.log('================  btnquery')

      this.querylist = querylist;
      this.btndataload(1);
    },
    loadJs(src) {
      return new Promise((resolve, reject) => {
        let script = document.createElement('script')
        script.type = "text/javascript"
        script.onload = () => {
          resolve()
        }
        script.onerror = () => {
          reject()
        }
        script.src = src
        document.getElementsByTagName('body')[0].appendChild(script)
      })
    },
    beforeUpload(file) {
      console.log('before upload=======')
      this.selectDialogVisible = true;
    },
    handleUploadSuccess() {
      console.log('handleUploadSuccess=======')
      // this.selectDialogVisible = false;
      this.uploadTitle = "上传至微吼平台中。。。。。。 请稍后！！"
      this.percentage = 0

    },
    handleOnProgress(val) {
      this.percentage = val
    },
    initWebSocket() {
      // 连接错误
      this.websocket.onerror = this.setErrorMessage

      // 连接成功
      this.websocket.onopen = this.setOnopenMessage

      // 收到消息的回调
      this.websocket.onmessage = this.setOnmessageMessage

      // 连接关闭的回调
      this.websocket.onclose = this.setOncloseMessage

      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = this.onbeforeunload
    },
    setErrorMessage() {
      console.log('WebSocket连接发生错误   状态码：' + this.websocket.readyState)
    },
    setOnopenMessage() {
      console.log('WebSocket连接成功    状态码：' + this.websocket.readyState)
    },
    setOnmessageMessage(event) {
      // 根据服务器推送的消息做自己的业务处理
      console.log('服务端返回：' + event.data)
      this.percentage = Number(event.data)
    },
    setOncloseMessage() {
      console.log('WebSocket连接关闭    状态码：' + this.websocket.readyState)
    },
    onbeforeunload() {
      this.closeWebSocket()
    },
    closeWebSocket() {
      this.websocket.close()
    },
    getSing(event) {
      console.log('--------------  file chagne')
      let that = this
      // 获取sign  time
      // course.getWhSign({}).then(res => {
      //   console.log(res)
      //   that.sign = res.sign
      //   that.signed_at = res.signed_at
      //   that.app_key = res.app_key
      //   this.loadJs('https://cnstatic01.e.vhall.com/3rdlibs/jquery/1.11.2/jquery.min.js').then(() => {
      //     this.loadJs('http://cnstatic01.e.vhall.com/demand-upload-jssdk/dist/1.0.0/vhallDemandSDK.js').then(() => {
      //       vhallDemandSDK('#upload', {
      //         params: {
      //           sign: that.sign,  /**sign**/
      //           signed_at: that.signed_at, /**获取sign的时间戳**/
      //           app_key: that.app_key
      //         },
      //         ready: function () {
      //           /**
      //             * 初始化完成的回调函数
      //           **/
      //           console.log('---------------- ready-----------------')
      //         },
      //         beforeUpload: function () {
      //           /**
      //             * 准备中...（文件进行MD5转换过程）
      //           **/
      //           console.log('---------------- beforeUpload-----------------')
      //         },
      //         progress: function (percent, file) {
      //           /**
      //             * 上传中...'
      //             * 'percent 上传进度百分比'
      //             * 'file 上传文档具体信息
      //           **/
      //           console.log('---------------- progress-----------------')
      //         },
      //         uploadSuccess: function (res) {
      //           /**
      //             * 上传成功!'
      //             * 'res 成功返回的回放ID records_id 和 活动ID webinar_id
      //           **/
      //           console.log('---------------- uploadSuccess-----------------')
      //         },
      //         error: function (msg, file, e) {
      //           /**
      //             * 上传出错'
      //             * 'msg 错误返回的状态码信息'
      //           **/
      //           console.log('---------------- error-----------------' + msg)
      //         }
      //       })

      //     })
      //   })

      // });
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.datepick {
  float: left;
  margin-top: 20px;
  .datepick_txt {
    font-size: 13px;
    display: inline-block;
    color: #48576a;
    width: 75px;
    height: 28px;
    line-height: 28px;
  }
}
</style>


