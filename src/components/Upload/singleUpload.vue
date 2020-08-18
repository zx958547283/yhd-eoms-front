<template>
  <div>
    <el-upload :action="globalConfig.imgUploadAction" :before-upload="beforeUpload" :data="dataObj" :file-list="fileList" :multiple="false" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleUploadSuccess" :show-file-list="showFileList" list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10MB</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img :src="fileList[0].url" alt width="100%">
    </el-dialog>
  </div>
</template>
<script>
import { policy } from '@/api/oss'

export default {
  name: 'singleUpload',
  props: {
    value: String
  },
  computed: {
    imageUrl() {
      return this.value;
    },
    imageName() {
      if (this.value != null && this.value !== '') {
        return this.value.substr(this.value.lastIndexOf("/") + 1);
      } else {
        return null;
      }
    },
    fileList() {
      return [{
        name: this.imageName,
        url: this.imageUrl
      }]
    },
    showFileList: {
      get: function () {
        return this.value !== null && this.value !== '' && this.value !== undefined;
      },
      set: function (newValue) {
      }
    }
  },
  data() {
    return {
      dataObj: {
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        dir: '',
        host: ''
      },
      dialogVisible: false
    };
  },
  methods: {
    emitInput(val) {
      this.$emit('input', val)
    },
    handleRemove(file, fileList) {
      this.emitInput('');
    },
    handlePreview(file) {
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      // let _self = this;
      // return new Promise((resolve, reject) => {
      //   policy().then(response => {
      //     _self.dataObj.policy = response.data.policy;
      //     _self.dataObj.signature = response.data.signature;
      //     _self.dataObj.ossaccessKeyId = response.data.accessKeyId;
      //     _self.dataObj.key = response.data.dir + '/${filename}';
      //     _self.dataObj.dir = response.data.dir;
      //     _self.dataObj.host = response.data.host;
      //     resolve(true)
      //   }).catch(err => {
      //     console.log(err)
      //     reject(false)
      //   })
      // })
    },
    handleUploadSuccess(res, file) {
      if (res.ok) {
        this.showFileList = true;
        this.fileList.pop();
        this.fileList.push({ name: res.data.name, url: res.data.fileURL });
        this.emitInput(this.fileList[0].url);
      }

    }
  }
}
</script>
<style>
</style>


