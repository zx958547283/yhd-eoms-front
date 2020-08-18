<template>
  <div class="moblie_wrap">
    <div class="oneLine">
      <div class="title">
        <span>导航页Banner：</span>
        <br />
        <span>（最多可上传三张）</span>
      </div>
      <el-upload :action="globalConfig.imgUploadAction" :class="{disabled:uploadDisabled}" :file-list="banner" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleAvatarSuccess" list-type="picture-card">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny"></el-dialog>
    </div>

    <div class="oneLine">
      <div class="title">
        <span>协会介绍Banner：</span>
        <br />
        <span>（最多可上传三张）</span>
      </div>
      <el-upload :action="globalConfig.imgUploadAction" :class="{disabled:uploadDisabledAss}" :file-list="aboutBanner" :on-preview="handlePictureCardPreview" :on-remove="handleRemoveAss" :on-success="handleAvatarSuccessAss" list-type="picture-card">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img :src="mm.media_path" alt width="100%" />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import sys from "../../../api/sys";
import e from "../../../utils/excel";
import xcy from "../../../api/xcy";
export default {
  data() {
    return {
      mm: {},
      aboutBanner: [],
      banner: [],
      dialogVisible: false,
      uploadDisabled: false,
      uploadDisabledAss: false,
    };
  },
  computed: {
  },
  created() {
    this.initData();
  },
  mounted() { },
  methods: {
    initData() {
      let that = this;
      this.aboutBanner = [];
      this.banner = [];
      xcy.getMySysParm().then((r) => {
        that.mm = r;
        if (that.mm.about_banner_img1) {
          that.aboutBanner.push({ url: that.mm.about_banner_img1 })
        }
        if (that.mm.about_banner_img2) {
          that.aboutBanner.push({ url: that.mm.about_banner_img2 })
        }
        if (that.mm.about_banner_img3) {
          that.aboutBanner.push({ url: that.mm.about_banner_img3 })
        }
        if (that.mm.about_banner_img1 != "" && that.mm.about_banner_img2 != "" && that.mm.about_banner_img3 != "") {
          this.uploadDisabledAss = true;
        }
        if (that.mm.banner_img1 != "" && that.mm.banner_img2 != "" && that.mm.banner_img3 != "") {
          this.uploadDisabled = true;
        }
        if (that.mm.banner_img1) {
          that.banner.push({ url: that.mm.banner_img1 })
        }
        if (that.mm.banner_img2) {
          that.banner.push({ url: that.mm.banner_img2 })
        }
        if (that.mm.banner_img3) {
          that.banner.push({ url: that.mm.banner_img3 })
        }
      });
    },
    handleRemove(file, img_list) {
      if (img_list.length < 3) {
        this.uploadDisabled = false;
      }
      if (img_list.length == 2) {
        let params = this.mm
        params.banner_img1 = img_list[0].response ? img_list[0].response.data.fileURL : img_list[0].url;
        params.banner_img2 = img_list[1].response ? img_list[1].response.data.fileURL : img_list[1].url;
        params.banner_img3 = "";
        xcy.saveSysParm(params).then(() => {
          this.initData();
        });
      } else if (img_list.length == 1) {
        let params = this.mm
        params.banner_img1 = img_list[0].response ? img_list[0].response.data.fileURL : img_list[0].url;
        params.banner_img2 = "";
        params.banner_img3 = "";
        xcy.saveSysParm(params).then(() => {
          this.initData();
        });
      } else if (img_list.length == 0) {
        let params = this.mm
        params.banner_img1 = "";
        params.banner_img2 = "";
        params.banner_img3 = "";
        xcy.saveSysParm(params).then(() => {
          this.initData();
        });
      }
    },
    handleRemoveAss(file, img_list) {
      if (img_list.length < 3) {
        this.uploadDisabledAss = false;
      }
      if (img_list.length == 2) {
        let params = this.mm
        params.about_banner_img1 = img_list[0].response ? img_list[0].response.data.fileURL : img_list[0].url;
        params.about_banner_img2 = img_list[1].response ? img_list[1].response.data.fileURL : img_list[1].url;
        params.about_banner_img3 = "";
        xcy.saveSysParm(params).then(() => {
          this.initData();
        });
      } else if (img_list.length == 1) {
        let params = this.mm
        params.about_banner_img1 = img_list[0].response ? img_list[0].response.data.fileURL : img_list[0].url;
        params.about_banner_img2 = "";
        params.about_banner_img3 = "";
        xcy.saveSysParm(params).then(() => {
          this.initData();
        });
      } else if (img_list.length == 0) {
        let params = this.mm
        params.about_banner_img1 = "";
        params.about_banner_img2 = "";
        params.about_banner_img3 = "";
        xcy.saveSysParm(params).then(() => {
          this.initData();
        });
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(response, file, img_list) {
      if (img_list.length >= 3) {
        this.uploadDisabled = true;
      }
      let params = this.mm;
      if (img_list.length == 2) {
        params.banner_img2 = img_list[1] ? img_list[1].response.data.fileURL : "";
        params.banner_img3 = "";
        xcy.saveSysParm(params).then(() => {
          this.initData();
        });
      } else if (img_list.length == 3) {
        params.banner_img3 = img_list[2] ? img_list[2].response.data.fileURL : "";
        xcy.saveSysParm(params).then(() => {
          this.initData();
        });
      } else {
        params.banner_img1 = img_list[0] ? img_list[0].response.data.fileURL : "";
        xcy.saveSysParm(params).then(() => {
          this.initData();
        });
      }
    },
    handleAvatarSuccessAss(response, file, img_list) {
      if (img_list.length >= 3) {
        this.uploadDisabledAss = true;
      }
      let params = this.mm;
      if (img_list.length == 2) {
        params.about_banner_img2 = img_list[1] ? img_list[1].response.data.fileURL : "";
        params.about_banner_img3 = "";
        xcy.saveSysParm(params).then(() => {
          this.initData();
        });
      } else if (img_list.length == 3) {
        params.about_banner_img3 = img_list[2] ? img_list[2].response.data.fileURL : "";
        xcy.saveSysParm(params).then(() => {
          this.initData();
        });
      } else {
        params.about_banner_img1 = img_list[0] ? img_list[0].response.data.fileURL : "";
        xcy.saveSysParm(params).then(() => {
          this.initData();
        });
      }
    }
  }
};
</script>
<style>
.moblie_wrap{
  margin-top:100px;
}
.disabled .el-upload--picture-card {
  display: none;
}
.title {
  padding: 10px 20px 0 0;
  line-height: 25px;
  min-width: 185px;
}
.title > span {
}
.title > span:nth-of-type(1) {
  font-size: 20px;
}
.title > span:nth-of-type(2) {
  color: red;
  font-size: 14px;
}
.oneLine {
  display: flex;
  margin: 50px 0 0 50px;
}

/*无法预览大图*/
.el-icon-zoom-in {
  display: none;
}
.el-upload-list--picture-card .el-upload-list__item-actions span + span {
  margin-left: 0;
}
</style>


