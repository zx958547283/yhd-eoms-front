<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="homeAdvertise" :rules="rules" label-width="150px" ref="homeAdvertiseFrom" size="small">
      <el-form-item label="广告名称：" prop="name">
        <el-input class="input-width" v-model="homeAdvertise.name"></el-input>
      </el-form-item>
      <el-form-item label="广告位置：">
        <el-select v-model="homeAdvertise.type">
          <el-option :key="type.value" :label="type.label" :value="type.value" v-for="type in typeOptions"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间：" prop="start_time">
        <el-date-picker placeholder="选择日期" type="datetime" v-model="homeAdvertise.start_time" value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
      </el-form-item>
      <el-form-item label="到期时间：" prop="end_time">
        <el-date-picker placeholder="选择日期" type="datetime" v-model="homeAdvertise.end_time" value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
      </el-form-item>
      <el-form-item label="上线/下线：">
        <el-radio-group v-model="homeAdvertise.status">
          <el-radio :label="'0'">下线</el-radio>
          <el-radio :label="'1'">上线</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="广告图片：">
        <single-upload v-model="homeAdvertise.pic"></single-upload>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input class="input-width" v-model="homeAdvertise.sort"></el-input>
      </el-form-item>
      <el-form-item label="广告链接：" prop="url">
        <el-input class="input-width" v-model="homeAdvertise.url"></el-input>
      </el-form-item>
      <el-form-item label="广告备注：">
        <el-input :rows="5" class="input-width" placeholder="请输入内容" type="textarea" v-model="homeAdvertise.note"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit('homeAdvertiseFrom')" type="primary">提交</el-button>
        <el-button @click="resetForm('homeAdvertiseFrom')" v-if="!isEdit">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import SingleUpload from '@/components/Upload/singleUpload'
import sms from '@/api/sms';
import utility from '@/utils/utility';
const defaultTypeOptions = [
  {
    label: 'PC首页轮播',
    value: '0'
  },
  {
    label: '前贝APP首页轮播',
    value: '1'
  },
  {
    label: '乐龄唱响APP首页轮播',
    value: 2
  },
  {
    label: '前贝学堂小程序首页轮播',
    value: 3
  }
];
const defaultHomeAdvertise = {
  name: null,
  type: 1,
  pic: null,
  start_time: null,
  end_time: null,
  status: 0,
  url: null,
  note: null,
  sort: 0
};
export default {
  components: { SingleUpload },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      homeAdvertise: {},
      rules: {
        name: [
          { required: true, message: '请输入广告名称', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ],
        // url: [
        //   { required: true, message: '请输入广告链接', trigger: 'blur' }
        // ],
        start_time: [
          { required: true, message: '请选择开始时间', trigger: 'blur' }
        ],
        end_time: [
          { required: true, message: '请选择到期时间', trigger: 'blur' }
        ],
        pic: [
          { required: true, message: '请选择广告图片', trigger: 'blur' }
        ]
      },
      typeOptions: Object.assign({}, defaultTypeOptions)
    }
  },
  created() {
    // if (this.isEdit) {
    //   sms.getAdvertise({ pk: this.$route.query.id }).then(response => {
    //     this.homeAdvertise = response;
    //   });
    // } else {
    //   this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
    // }
  },
  mounted() {
    let id = utility.getpageparmas(this)[0];
    if (this.isEdit) {
      sms.getAdvertise({ pk: id }).then(response => {
        this.homeAdvertise = response;
      });
    } else {
      this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.isEdit) {
              sms.saveAdvertise(this.homeAdvertise).then(response => {
                this.$refs[formName].resetFields();
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              sms.saveAdvertise(this.homeAdvertise).then(response => {
                this.$refs[formName].resetFields();
                this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
                this.$message({
                  message: '提交成功',
                  type: 'success',
                  duration: 1000
                });
              });
            }
          });

        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
    }
  }
}
</script>
<style scoped>
.input-width {
  width: 70%;
}
</style>


