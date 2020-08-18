<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="productCate" :rules="rules" label-width="150px" ref="productCateFrom">
      <el-form-item label="分类名称：" prop="name">
        <el-input v-model="productCate.name"></el-input>
      </el-form-item>
      <el-form-item label="上级分类：">
        <el-select placeholder="请选择分类" v-model="productCate.parent_id">
          <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in selectProductCateList"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量单位：">
        <el-input v-model="productCate.product_unit"></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="productCate.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="productCate.show_status">
          <el-radio :label="'1'">是</el-radio>
          <el-radio :label="'0'">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示在导航栏：">
        <el-radio-group v-model="productCate.nav_status">
          <el-radio :label="'1'">是</el-radio>
          <el-radio :label="'0'">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分类图标：">
        <single-upload v-model="productCate.icon"></single-upload>
      </el-form-item>
      <el-form-item :key="filterProductAttr.key" :label="index | filterLabelFilter" v-for="(filterProductAttr, index) in filterProductAttrList">
        <el-cascader :options="filterAttrs" :props="{value:'id', label:'name',children:'listAttr'}" clearable v-model="filterProductAttr.value"></el-cascader>
        <el-button @click.prevent="removeFilterAttr(filterProductAttr)" style="margin-left: 20px">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleAddFilterAttr()" size="small" type="primary">新增</el-button>
      </el-form-item>
      <el-form-item label="关键词：">
        <el-input v-model="productCate.keywords"></el-input>
      </el-form-item>
      <el-form-item label="分类描述：">
        <el-input :autosize="true" type="textarea" v-model="productCate.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit('productCateFrom')" type="primary">提交</el-button>
        <el-button @click="resetForm('productCateFrom')" v-if="!isEdit">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import pms from "@/api/pms";
import SingleUpload from '@/components/Upload/singleUpload';
import utility from '@/utils/utility';

const defaultProductCate = {
  description: '',
  icon: '',
  keywords: '',
  name: '',
  navStatus: 0,
  parentId: 0,
  productUnit: '',
  showStatus: 0,
  sort: 0,
  productAttributeIdList: []
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
      productCate: Object.assign({}, defaultProductCate),
      selectProductCateList: [],
      rules: {
        name: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ]
      },
      filterAttrs: [],
      filterProductAttrList: [{
        value: []
      }]
    }
  },
  mounted() {
    let id = utility.getpageparmas(this)[0]
    if (this.isEdit) {
      pms.getProductCategory({ pk: id }).then(res => {
        this.productCate = res;
      });
      pms.getProuctCatAttrRelationByPID({ pcid: id }).then(res => {
        if (res && res.length > 0) {
          console.log(res);
          this.filterProductAttrList = [];
          for (let i = 0; i < res.length; i++) {
            this.filterProductAttrList.push({
              key: Date.now() + i,
              value: [res[i].product_attribute_category_id, res[i].product_attribute_id]
            })
          }
        }
      });
    } else {
      this.productCate = Object.assign({}, defaultProductCate);
    }
    this.getSelectProductCateList();
    this.getProductAttrCateList();
  },
  methods: {
    getSelectProductCateList() {
      pms.getProductCatByParent({ parent_id: 0 }).then(res => {
        this.selectProductCateList = res;
        this.selectProductCateList.unshift({ id: 0, name: '无上级分类' });
      });
    },
    getProductAttrCateList() {
      pms.getProductAttrCatWithAttr().then(res => {
        this.filterAttrs = res;
      });
    },
    getProductAttributeIdList() {
      //获取选中的筛选商品属性
      let productAttributeIdList = [];
      for (let i = 0; i < this.filterProductAttrList.length; i++) {
        let item = this.filterProductAttrList[i];
        if (item.value && item.value.length === 2) {
          productAttributeIdList.push(item.value[1]);
        }
      }
      return productAttributeIdList;
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
              this.productCate.productAttributeIdList = this.getProductAttributeIdList();
              pms.updateProductCategoryFull(this.productCate).then(res => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              this.productCate.productAttributeIdList = this.getProductAttributeIdList();
              pms.createProductCategory(this.productCate).then(response => {
                this.$refs[formName].resetFields();
                this.resetForm(formName);
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
      this.productCate = Object.assign({}, defaultProductCate);
      this.getSelectProductCateList();
      this.filterProductAttrList = [{
        value: []
      }];
    },
    removeFilterAttr(productAttributeId) {
      if (this.filterProductAttrList.length === 1) {
        this.$message({
          message: '至少要留一个',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      var index = this.filterProductAttrList.indexOf(productAttributeId);
      if (index !== -1) {
        this.filterProductAttrList.splice(index, 1)
      }
    },
    handleAddFilterAttr() {
      if (this.filterProductAttrList.length === 3) {
        this.$message({
          message: '最多添加三个',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      this.filterProductAttrList.push({
        value: null,
        key: Date.now()
      });
    }
  },
  filters: {
    filterLabelFilter(index) {
      if (index === 0) {
        return '筛选属性：';
      } else {
        return '';
      }
    },
    convertNum(str) {
      return parseInt(str);
    }
  }
}
</script>

<style scoped>
</style>
