<template>
  <div class="order_line" style="overflow: inherit">
    <span class="controlspan" v-if="title">
      <span style="color:red;" v-if="required === true">*</span>
      {{title}}
    </span>
    <el-upload :action="globalConfig.imgUploadAction" :before-upload="beforeUpload" :data="dataObj" :disabled="disabled" :drag="drag" :file-list="fileList" :limit="maxCount" :list-type="list_type" :on-exceed="handleExceed" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleUploadSuccess" style="display: inline-block">
      <div v-if="drag">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </div>
      <div v-else>
        <i class="el-icon-plus"></i>
      </div>
    </el-upload>
    <!-- <el-dialog :visible.sync="dialogVisible">
      <img :src="dialogImageUrl" alt width="100%">
    </el-dialog>-->
  </div>
</template>
<script>
import { policy } from "@/api/oss";

export default {
  props: {
    title: [String],
    required: {
      type: Boolean,
      default: false
    },
    //图片属性数组
    // value: {
    //   type: Array,
    //   default: []
    // },
    value: String,
    //最大上传图片数量
    maxCount: {
      type: Number,
      default: 5
    },
    drag: {
      type: Boolean,
      default: false
    },
    list_type: {
      type: String,
      default: "picture-card"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dataObj: {
        policy: "",
        signature: "",
        key: "",
        ossaccessKeyId: "",
        dir: "",
        host: ""
      },
      dialogVisible: false,
      dialogImageUrl: null,
      // fileList: this.value
      fileList: []
    };
  },
  watch: {
    value(val) {
      console.log('初始化value')
      console.log(val)
      // 每次打开编辑传入新的value到组件就初始化this.fileList
      if (this.value) {
        let file_list = []
        let tempValue = this.value.split(",");
        for (let i = 0, length = tempValue.length; i < length; i++) {
          let str = "";
          if (tempValue[i].length > 30) {
            str = tempValue[i].slice(tempValue[i].length - 15);
          } else {
            str = tempValue[i];
          }
          file_list.push({ url: tempValue[i], name: str });
        }
        this.fileList = file_list
        console.log(this.fileList)
      } else {
        this.fileList = [] // 这边是关闭这个页面编辑页面的时候监听到value变为undefined，此时应该置为空，防止下一次进页面的时候还有上一次的遗留数据
      }
    }
    // value: function(val, oldValue) {
    //   console.log(val)
    //   console.log(oldValue)
    //   if (val === this.fileList) {
    //     return;
    //   }
    //   this.fileList = val;
    // }
  },
  computed: {},
  methods: {
    emitInput() {
      let value = "";
      for (let i = 0; i < this.fileList.length; i++) {
        if (i === 0) {
          value = this.fileList[0].url;
        } else {
          value += "," + this.fileList[i].url;
        }
      }
      console.log(value);
      this.$emit("input", value);
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
      this.emitInput();
    },
    handlePreview(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    beforeUpload(file) { },
    handleUploadSuccess(res, file) {
      if (res.ok) {
        this.fileList.push({ name: res.data.name, url: res.data.fileURL });
        this.emitInput();
      }
    },
    handleExceed(files, fileList) {
      this.$message({
        message: "最多只能上传" + this.maxCount + "张图片",
        type: "warning",
        duration: 1000
      });
    }
  }
};
</script>
<style>
</style>


