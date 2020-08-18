<template>
  <div class="order_line" style="overflow: inherit">
    <span class="controlspan" v-if="title">
      <span style="color:red;" v-if="required === true">*</span>
      {{title}}
    </span>
    <el-upload :action="action" :before-upload="beforeUpload" :data="dataObj" :file-list="fileList" :multiple="false" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleUploadSuccess" :show-file-list="showFileList" class="mydefinewidth" list-type="" style="z-index:199">
      <div style="float:left;">
        <el-button size="small" type="primary">点击上传</el-button>
      </div>
      <div style="float:left;margin:10px 0px 0px 10px;" v-show="fileType == 'img'">只能上传jpg/png文件，且不超过2MB</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :modal="false">
      <img :src="fileList[0].url" alt width="100%">
    </el-dialog>
  </div>
</template>

<script>
import u from "../../utils/utility";
import { policy } from '@/api/oss'
import oms from "@/api/oms";

export default {
  props: {
    value: String,
    title: [String],
    fileType: {
      type: String,
      default: "img"
    },
    length: {
      default: 1
    },
    readonly: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    required: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: process.env.IMG_UPLOAD_ACTION
    }
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
  created: function () {
    console.log('------created')
    console.log(this.globalConfig.imgUploadAction)
  },
  mounted() {
    let that = this;
    u.setcontrolwidth(that, "mydefinewidth");
    console.log('------mounted')
    console.log(this.globalConfig.imgUploadAction)
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
      console.log(this.fileType)
      if (this.fileType == "img") {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG或PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      } else if (this.fileType == 'media') {
        const isJPG = file.type === 'video/mp4' || file.type === 'application/ogg' || file.type === 'audio/mpeg';
        const isLtM = file.size / 1024 / 1024 < 50;
        if (!isJPG) {
          this.$message.error('上传媒体文件只能是 mp3,mp4,ogg 格式!');
        }
        if (!isLtM) {
          this.$message.error('上传媒体文件大小不能超过 50MB!');
        }
        return isJPG && isLtM;
      } else {
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
          this.$message.error('上传文件大小不能超过 10MB!');
        }
        return isLt10M;
      }
    },
    handleUploadSuccess(res, file) {
      if (res.ok) {
        this.showFileList = true;
        this.fileList.pop();
        this.fileList.push({ name: res.data.name, url: res.data.fileURL });
        this.emitInput(this.fileList[0].url);
      }

    }
  },
  beforeDestroy: function () {
    // console.log("destroy" + this.title);
  }
};
</script>
