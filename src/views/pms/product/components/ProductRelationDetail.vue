<template>
  <div style="margin-top: 50px">
    <el-form :model="value" label-width="120px" ref="productRelationForm" size="small" style="width: 680px">
      <el-form-item label="关联专题：">
        <el-transfer :data="subjectList" :filter-method="filterMethod" :props="{key:'id', label:'title'}" :titles="subjectTitles" filter-placeholder="请输入专题名称" filterable style="display: inline-block" v-model="selectSubject"></el-transfer>
      </el-form-item>
      <el-form-item label="关联优选：">
        <el-transfer :data="prefrenceAreaList" :filter-method="filterMethod" :props="{key:'id', label:'name'}" :titles="prefrenceAreaTitles" filter-placeholder="请输入优选名称" filterable style="display: inline-block" v-model="selectPrefrenceArea"></el-transfer>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button @click="handlePrev" size="medium">上一步，填写商品属性</el-button>
        <el-button @click="handleFinishCommit" size="medium" type="primary">完成，提交商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import cms from "@/api/cms";


export default {
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //所有专题列表
      subjectList: [],
      //专题左右标题
      subjectTitles: ['待选择', '已选择'],
      //所有专题列表
      prefrenceAreaList: [],
      //专题左右标题
      prefrenceAreaTitles: ['待选择', '已选择']
    };
  },
  created() {
    this.getSubjectList();
    this.getPrefrenceAreaList();
  },
  computed: {
    //选中的专题
    selectSubject: {
      get: function () {
        let subjects = [];
        if (this.value.subjectProductRelationList == null || this.value.subjectProductRelationList.length <= 0) {
          return subjects;
        }
        for (let i = 0; i < this.value.subjectProductRelationList.length; i++) {
          subjects.push(this.value.subjectProductRelationList[i].subjectId);
        }
        return subjects;
      },
      set: function (newValue) {
        this.value.subjectProductRelationList = [];
        for (let i = 0; i < newValue.length; i++) {
          this.value.subjectProductRelationList.push({ subjectId: newValue[i] });
        }
      }
    },
    //选中的优选
    selectPrefrenceArea: {
      get: function () {
        let prefrenceAreas = [];
        if (this.value.prefrenceAreaProductRelationList == null || this.value.prefrenceAreaProductRelationList.length <= 0) {
          return prefrenceAreas;
        }
        for (let i = 0; i < this.value.prefrenceAreaProductRelationList.length; i++) {
          prefrenceAreas.push(this.value.prefrenceAreaProductRelationList[i].prefrenceAreaId);
        }
        return prefrenceAreas;
      },
      set: function (newValue) {
        this.value.prefrenceAreaProductRelationList = [];
        for (let i = 0; i < newValue.length; i++) {
          this.value.prefrenceAreaProductRelationList.push({ prefrenceAreaId: newValue[i] });
        }
      }
    }
  },
  methods: {
    filterMethod(query, item) {
      return item.title.indexOf(query) > -1;
    },
    getSubjectList() {
      cms.getAllSubject().then(res => {
        this.subjectList = res;
      });
    },
    getPrefrenceAreaList() {
      cms.getAllPrefrenceArea().then(res => {
        this.prefrenceAreaList = res;
      })
    },
    handlePrev() {
      this.$emit('prevStep')
    },
    handleFinishCommit() {
      this.$emit('finishCommit', this.isEdit);
    }
  }
}
</script>

<style scoped>
</style>
