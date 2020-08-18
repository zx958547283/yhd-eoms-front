<template>
  <div>
    <div style="margin:10px 0px 0px -30px;">
      <el-card class="operate-container" shadow="never" style="width:720px;margin:0px auto;">
        <i class="el-icon-tickets" style="margin-top: 5px"></i>
        <span style="margin-top: 5px">产品{{titleType}}维护</span>
        <!-- <el-button @click="backList()" class="btn-add" size="mini">返回【{{title}}】{{titleType}}列表</el-button> -->
      </el-card>
    </div>

    <el-card class="form-container" shadow="never">
      <el-form :model="productAttr" :rules="rules" label-width="150px" ref="productAttrFrom">
        <el-form-item label="属性名称：" prop="name">
          <el-input v-model="productAttr.name"></el-input>
        </el-form-item>
        <el-form-item label="商品类型：">
          <el-select placeholder="请选择" v-model="productAttr.product_attribute_category_id">
            <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in productAttrCateList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类筛选样式:">
          <el-radio-group v-model="productAttr.filter_type">
            <el-radio :label="0">普通</el-radio>
            <el-radio :label="1">颜色</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="能否进行检索:">
          <el-radio-group v-model="productAttr.search_type">
            <el-radio :label="0">不需要检索</el-radio>
            <el-radio :label="1">关键字检索</el-radio>
            <el-radio :label="2">范围检索</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品属性关联:">
          <el-radio-group v-model="productAttr.related_status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="属性是否可选:">
          <el-radio-group v-model="productAttr.select_type">
            <el-radio :label="0">唯一</el-radio>
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">复选</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="属性值的录入方式:">
          <el-radio-group @change="inputChange" v-model="productAttr.input_type">
            <el-radio :label="0">手工录入</el-radio>
            <el-radio :label="1">从下面列表中选择</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="属性值可选值列表:">
          <el-input :autosize="true" :disabled="attrListDisable" type="textarea" v-model="inputListFormat"></el-input>
        </el-form-item>
        <el-form-item label="是否支持手动新增:">
          <el-radio-group v-model="productAttr.hand_add_status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序属性：">
          <el-input v-model="productAttr.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit('productAttrFrom')" type="primary">提交</el-button>
          <el-button @click="resetForm('productAttrFrom')" v-if="!isEdit">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import pms from "@/api/pms"
import utility from '@/utils/utility';

const defaultProductAttr = {
  filter_type: 0,
  hand_add_status: 0,
  input_list: '',
  input_type: 0,
  name: '',
  product_attribute_category_id: '',
  related_status: 0,
  search_type: 0,
  select_type: 0,
  sort: 0,
  type: 0
};
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: utility.getpageparmas(this)[1],
      productAttr: {},
      rules: {
        name: [
          { required: true, message: '请输入属性名称', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ]
      },
      productAttrCateList: null,
      inputListFormat: null,
      cid: '',
      attrListDisable: true
    }
  },
  computed: {
    titleType() {
      if (utility.getpageparmas(this)[2] == 0) {
        return "规格";
      } else {
        return "参数";
      }
    }
  },
  created() {
    if (this.isEdit) {
      pms.getProductAttribute({ pk: utility.getpageparmas(this)[3] }).then(res => {
        this.productAttr = res;
        this.resetProductAttr();
        this.inputListFormat = this.productAttr.input_list.replace(/,/g, '\n');
        console.log('-----------------' + this.productAttr.input_type)
        if (this.productAttr.input_type === 0) {
          this.attrListDisable = true
        } else {
          this.attrListDisable = false
        }
      });
    } else {
      let localurl = window.location.href
      console.log('========= url : ' + localurl)
      let cid = utility.getpageparmas(this)[0]
      this.cid = cid
      console.log('=========== cid : ' + cid)
      this.productAttr = Object.assign({}, defaultProductAttr);
      this.resetProductAttr();
    }
    this.getCateList();
  },
  watch: {
    inputListFormat: function (newValue, oldValue) {
      newValue = newValue.replace(/\n/g, ',');
      this.productAttr.input_list = newValue;
    }
  },
  methods: {
    backList() {
      this.$router.push({
        path: '/pms/productAttrList',
        query: {
          cid: utility.getpageparmas(this)[0],
          cname: utility.getpageparmas(this)[1],
          type: utility.getpageparmas(this)[2]
        }
      });
    },
    getCateList() {
      pms.getAttributeCategoryListAll().then(res => {
        this.productAttrCateList = res;
        if (!this.isEdit) {
          this.productAttr.product_attribute_category_id = this.cid
        }

      });
    },
    resetProductAttr() {
      if (utility.getpageparmas(this)[2]) {
        this.productAttr.type = Number(utility.getpageparmas(this)[2]);
      } else {
        this.productAttr.type = Number(this.productAttr.type);
      }
      this.productAttr.select_type = Number(this.productAttr.select_type);
      this.productAttr.input_type = Number(this.productAttr.input_type);
      this.productAttr.filter_type = Number(this.productAttr.filter_type);
      this.productAttr.search_type = Number(this.productAttr.search_type);
      this.productAttr.related_status = Number(this.productAttr.related_status);
      this.productAttr.hand_add_status = Number(this.productAttr.hand_add_status);
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.isEdit) {
              pms.saveAttributeFull(this.productAttr).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              pms.saveAttributeFull(this.productAttr).then(response => {
                this.$message({
                  message: '提交成功',
                  type: 'success',
                  duration: 1000
                });
                this.resetForm('productAttrFrom');
                this.inputListFormat = null
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
      this.resetProductAttr();
    },
    inputChange(value) {
      console.log(value)
      if (value === 0) {
        this.attrListDisable = true
      } else {
        this.attrListDisable = false
      }
    }
  },
}
</script>

<style scoped>
</style>
