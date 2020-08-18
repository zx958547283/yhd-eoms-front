<template>
  <div class="upload-container">
    <el-button
      :style="{background:color,borderColor:color}"
      @click=" dialogVisible=true"
      icon="el-icon-upload"
      size="mini"
      type="primary"
    >上传图片</el-button>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <el-upload
        :action="globalConfig.imgUploadAction"
        :before-upload="beforeUpload"
        :data="dataObj"
        :file-list="fileList"
        :multiple="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :show-file-list="true"
        class="editor-slide-upload"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button @click="handleSubmit" type="primary">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { policy } from '@/api/oss'

export default {
  name: 'editorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      dataObj: {
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        dir: '',
        host: ''
      }
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      console.log(arr);
      this.$emit('successCBK', arr);
      this.listObj = {};
      this.fileList = [];
      this.dialogVisible = false;
    },
    handleSuccess(res, file) {
      console.log(res);
      if (res.ok) {
        const uid = file.uid;
        const objKeyArr = Object.keys(this.listObj)
        console.log(objKeyArr);
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
          if (this.listObj[objKeyArr[i]].uid === uid) {
            this.listObj[objKeyArr[i]].url = res.data.fileURL;
            this.listObj[objKeyArr[i]].hasSuccess = true;
            return
          }
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid;
      const objKeyArr = Object.keys(this.listObj);
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]];
          return
        }
      }
    },
    beforeUpload(file) {
      const _self = this
      const fileName = file.uid;
      this.listObj[fileName] = {};
      this.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height };
      // return new Promise((resolve, reject) => {
      //   policy().then(response => {
      //     _self.dataObj.policy = response.data.policy;
      //     _self.dataObj.signature = response.data.signature;
      //     _self.dataObj.ossaccessKeyId = response.data.accessKeyId;
      //     _self.dataObj.key = response.data.dir + '/${filename}';
      //     _self.dataObj.dir = response.data.dir;
      //     _self.dataObj.host = response.data.host;
      //     _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height };
      //     resolve(true)
      //   }).catch(err => {
      //     console.log(err)
      //     reject(false)
      //   })
      // })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-container .editor-slide-upload {
  margin-bottom: 20px;
}
</style>
