<template>
  <div style="margin-top: 50px">
    <el-form :model="value" label-width="120px" ref="productAttrForm" size="small" style="width: 720px">
      <el-form-item label="属性类型：">
        <el-select @change="handleProductAttrChange" placeholder="请选择属性类型" v-model="value.productAttributeCategoryId">
          <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in productAttributeCategoryOptions"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品规格：">
        <el-card class="cardBg" shadow="never">
          <div v-for="(productAttr,idx) in selectProductAttr">
            {{productAttr.name}}：
            <el-checkbox-group v-if="productAttr.handAddStatus===0" v-model="selectProductAttr[idx].values">
              <el-checkbox :key="item" :label="item" class="littleMarginLeft" v-for="item in getInputListArr(productAttr.inputList)"></el-checkbox>
            </el-checkbox-group>
            <div v-else>
              <el-checkbox-group v-model="selectProductAttr[idx].values">
                <div class="littleMarginLeft" style="display: inline-block" v-for="(item,index) in selectProductAttr[idx].options">
                  <el-checkbox :key="item" :label="item"></el-checkbox>
                  <el-button @click="handleRemoveProductAttrValue(idx,index)" class="littleMarginLeft" type="text">删除</el-button>
                </div>
              </el-checkbox-group>
              <el-input clearable style="width: 160px;margin-left: 10px" v-model="addProductAttrValue"></el-input>
              <el-button @click="handleAddProductAttrValue(idx)" class="littleMarginLeft">增加</el-button>
            </div>
          </div>
        </el-card>
        <el-table :data="value.skuStockList" border style="width: 100%;margin-top: 20px">
          <el-table-column :key="item.id" :label="item.name" align="center" v-for="(item,index) in selectProductAttr">
            <template slot-scope="scope">{{getProductSkuSp(scope.row,index)}}</template>
          </el-table-column>
          <el-table-column align="center" label="销售价格" width="80">
            <template slot-scope="scope">
              <el-input v-model="scope.row.price"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品库存" width="80">
            <template slot-scope="scope">
              <el-input v-model="scope.row.stock"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="库存预警值" width="80">
            <template slot-scope="scope">
              <el-input v-model="scope.row.lowStock"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="SKU编号">
            <template slot-scope="scope">
              <el-input v-model="scope.row.skuCode"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="80">
            <template slot-scope="scope">
              <el-button @click="handleRemoveProductSku(scope.$index, scope.row)" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button @click="handleRefreshProductSkuList" style="margin-top: 20px" type="primary">刷新列表</el-button>
        <el-button @click="handleSyncProductSkuPrice" style="margin-top: 20px" type="primary">同步价格</el-button>
      </el-form-item>
      <el-form-item label="属性图片：" v-if="hasAttrPic">
        <el-card class="cardBg" shadow="never">
          <div v-for="(item,index) in selectProductAttrPics">
            <span>{{item.name}}:</span>
            <single-upload style="width: 300px;display: inline-block;margin-left: 10px" v-model="item.pic"></single-upload>
          </div>
        </el-card>
      </el-form-item>
      <el-form-item label="商品参数：">
        <el-card class="cardBg" shadow="never">
          <div :class="{littleMarginTop:index!==0}" v-for="(item,index) in selectProductParam">
            <div class="paramInputLabel">{{item.name}}:</div>
            <el-select class="paramInput" v-if="item.inputType===1" v-model="selectProductParam[index].value">
              <el-option :key="item" :label="item" :value="item" v-for="item in getParamInputList(item.inputList)"></el-option>
            </el-select>
            <el-input class="paramInput" v-else v-model="selectProductParam[index].value"></el-input>
          </div>
        </el-card>
      </el-form-item>
      <el-form-item label="商品相册：">
        <multi-upload v-model="selectProductPics"></multi-upload>
      </el-form-item>
      <el-form-item label="详情相册：">
        <multi-upload v-model="productDetailPics"></multi-upload>
      </el-form-item>
      <!-- <el-form-item label="规格参数：">
        <el-tabs type="card" v-model="activeHtmlName">
          <el-tab-pane label="移动端详情" name="mobile">
            <tinymce :height="300" :width="595" v-model="value.detailMobileHtml"></tinymce>
          </el-tab-pane>
          <!-- <el-tab-pane label="电脑端详情" name="pc">
            <tinymce :height="300" :width="595" v-model="value.detailHtml"></tinymce>
      </el-tab-pane>-->
      <!-- </el-tabs>
      </el-form-item>-->
      -->
      <el-form-item style="text-align: center">
        <el-button @click="handlePrev" size="medium">上一步，填写商品信息</el-button>
        <el-button @click="handleNext" size="medium" type="primary">下一步，填写商品促销</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SingleUpload from '@/components/Upload/singleUpload'
import MultiUpload from '@/components/Upload/multiUpload'
import Tinymce from '@/components/Tinymce'
import pms from "@/api/pms"


export default {
  components: { SingleUpload, MultiUpload, Tinymce },
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //编辑模式时是否初始化成功
      hasEditCreated: false,
      //商品属性分类下拉选项
      productAttributeCategoryOptions: [],
      //选中的商品属性
      selectProductAttr: [],
      //选中的商品参数
      selectProductParam: [],
      //选中的商品属性图片
      selectProductAttrPics: [],
      //可手动添加的商品属性
      addProductAttrValue: '',
      //商品富文本详情激活类型
      activeHtmlName: 'pc'
    }
  },
  computed: {
    //是否有商品属性图片
    hasAttrPic() {
      if (this.selectProductAttrPics.length < 1) {
        return false;
      }
      return true;
    },
    //商品的编号
    productId() {
      return this.value.id;
    },
    //商品的主图和画册图片
    selectProductPics: {
      get: function () {
        let pics = [];
        if (this.value.pic === undefined || this.value.pic == null || this.value.pic === '') {
          return pics;
        }
        pics.push(this.value.pic);
        if (this.value.albumPics === undefined || this.value.albumPics == null || this.value.albumPics === '') {
          return pics;
        }
        let albumPics = this.value.albumPics.split(',');
        for (let i = 0; i < albumPics.length; i++) {
          pics.push(albumPics[i]);
        }
        return pics;
      },
      set: function (newValue) {
        if (newValue == null || newValue.length === 0) {
          this.value.pic = null;
          this.value.albumPics = null;
        } else {
          this.value.pic = newValue[0];
          this.value.albumPics = '';
          if (newValue.length > 1) {
            for (let i = 1; i < newValue.length; i++) {
              this.value.albumPics += newValue[i];
              if (i !== newValue.length - 1) {
                this.value.albumPics += ',';
              }
            }
          }
        }
      }
    },
    productDetailPics: {
      get: function () {
        let pics = [];
        if (this.value.detailMobileHtml === undefined || this.value.detailMobileHtml == null || this.value.detailMobileHtml === '') {
          return pics;
        }
        let albumPics = this.value.detailMobileHtml.split(',');
        for (let i = 0; i < albumPics.length; i++) {
          pics.push(albumPics[i]);
        }
        return pics;
      },
      set: function (newValue) {
        console.log(newValue)
        if (newValue == null || newValue.length === 0) {
          this.value.detailMobileHtml = null;
        } else {
          this.value.detailMobileHtml = '';
          if (newValue.length > 0) {
            console.log('3333333333333333333')
            for (let i = 0; i < newValue.length; i++) {
              this.value.detailMobileHtml += newValue[i];
              if (i !== newValue.length - 1) {
                this.value.detailMobileHtml += ',';
              }
            }
            console.log(this.value.detailMobileHtml)
          }
        }
      }
    }
  },
  created() {
    this.getProductAttrCateList();
  },
  watch: {
    productId: function (newValue) {
      if (!this.isEdit) return;
      if (this.hasEditCreated) return;
      if (newValue === undefined || newValue == null || newValue === 0) return;
      this.handleEditCreated();
    },
    value: {
      deep: true,
      handler: function (val) {
        console.log('asdfasdfffffffffffffffffffff')
        console.log(val)
        if (!this.isEdit) {
          if (val.productAttributeCategoryId === 'fd9b5ac6-4912-4b13-bfc5-69d6585023e2') {
            let attrList = val.productAttributeValueList[0]
            if (this.selectProductAttr === null || this.selectProductAttr.length === 0) {
              this.selectProductAttr.push({
                id: 'aae75ea5-5c1a-4210-8546-1ff488414f96',
                name: '默认规格',
                handAddStatus: '1',
                inputList: "",
                values: ['默认规格'],
                options: ['默认规格']
              });
            }

          }
        }
      }
    }
  },
  methods: {
    handleEditCreated() {
      //根据商品属性分类id获取属性和参数
      if (this.value.productAttributeCategoryId != null) {
        this.handleProductAttrChange(this.value.productAttributeCategoryId);
      }
      this.hasEditCreated = true;
    },
    getProductAttrCateList() {
      let param = { pageNum: 1, pageSize: 100 };
      let that = this;
      pms.productAttrCatWithAll().then(res => {
        that.productAttributeCategoryOptions = res;
      });
    },
    getProductAttrList(type, cid) {
      let param = { pageNum: 1, pageSize: 100, type: type };
      pms.getProductAttributeByCatgory({ type: type, catgory_id: cid }).then(res => {
        let list = res;
        if (type === 0) {
          this.selectProductAttr = [];
          for (let i = 0; i < list.length; i++) {
            let options = [];
            let values = [];
            if (this.isEdit) {
              if (list[i].hand_add_status === 1) {
                //编辑状态下获取手动添加编辑属性
                options = this.getEditAttrOptions(list[i].id);
              }
              //编辑状态下获取选中属性
              values = this.getEditAttrValues(i);
            }
            this.selectProductAttr.push({
              id: list[i].id,
              name: list[i].name,
              handAddStatus: list[i].hand_add_status,
              inputList: list[i].input_list,
              values: values,
              options: options
            });
          }
          console.log('ffffffffffffffffffffffff')
          console.log(this.selectProductAttr)
          if (this.isEdit) {
            //编辑模式下刷新商品属性图片
            this.refreshProductAttrPics();
          }
        } else {
          this.selectProductParam = [];
          for (let i = 0; i < list.length; i++) {
            let value = null;
            if (this.isEdit) {
              //编辑模式下获取参数属性
              value = this.getEditParamValue(list[i].id);
            }
            this.selectProductParam.push({
              id: list[i].id,
              name: list[i].name,
              value: value,
              inputType: list[i].input_type,
              inputList: list[i].input_list
            });
          }
        }
      });
    },
    //获取设置的可手动添加属性值
    getEditAttrOptions(id) {
      let options = [];
      for (let i = 0; i < this.value.productAttributeValueList.length; i++) {
        let attrValue = this.value.productAttributeValueList[i];
        if (attrValue.productAttributeId === id) {
          let strArr = attrValue.value.split(',');
          for (let j = 0; j < strArr.length; j++) {
            options.push(strArr[j]);
          }
          break;
        }
      }
      return options;
    },
    //获取选中的属性值
    getEditAttrValues(index) {
      let values = [];
      if (index === 0) {
        for (let i = 0; i < this.value.skuStockList.length; i++) {
          let sku = this.value.skuStockList[i];
          if (sku.sp1 && values.indexOf(sku.sp1) === -1) {
            values.push(sku.sp1);
          }
        }
      } else if (index === 1) {
        for (let i = 0; i < this.value.skuStockList.length; i++) {
          let sku = this.value.skuStockList[i];
          if (sku.sp2 && values.indexOf(sku.sp2) === -1) {
            values.push(sku.sp2);
          }
        }
      } else {
        for (let i = 0; i < this.value.skuStockList.length; i++) {
          let sku = this.value.skuStockList[i];
          if (sku.sp3 && values.indexOf(sku.sp3) === -1) {
            values.push(sku.sp3);
          }
        }
      }
      return values;
    },
    //获取属性的值
    getEditParamValue(id) {
      for (let i = 0; i < this.value.productAttributeValueList.length; i++) {
        if (id === this.value.productAttributeValueList[i].productAttributeId) {
          return this.value.productAttributeValueList[i].value;
        }
      }
    },
    handleProductAttrChange(value) {
      console.log(this.value.productAttributeValueList)
      this.getProductAttrList(0, value);
      this.getProductAttrList(1, value);
    },
    getInputListArr(inputList) {
      return inputList.split(',');
    },
    handleAddProductAttrValue(idx) {
      let options = this.selectProductAttr[idx].options;
      if (this.addProductAttrValue == null || this.addProductAttrValue == '') {
        this.$message({
          message: '属性值不能为空',
          type: 'warning',
          duration: 1000
        });
        return
      }
      if (options.indexOf(this.addProductAttrValue) !== -1) {
        this.$message({
          message: '属性值不能重复',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      this.selectProductAttr[idx].options.push(this.addProductAttrValue);
      this.addProductAttrValue = null;
    },
    handleRemoveProductAttrValue(idx, index) {
      this.selectProductAttr[idx].options.splice(index, 1);
    },
    getProductSkuSp(row, index) {
      if (index === 0) {
        return row.sp1;
      } else if (index === 1) {
        return row.sp2;
      } else {
        return row.sp3;
      }
    },
    handleRefreshProductSkuList() {
      this.$confirm('刷新列表将导致sku信息重新生成，是否要刷新', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.refreshProductAttrPics();
        this.refreshProductSkuList();
      });
    },
    handleSyncProductSkuPrice() {
      this.$confirm('将同步第一个sku的价格到所有sku,是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.value.skuStockList !== null && this.value.skuStockList.length > 0) {
          let price = this.value.skuStockList[0].price;
          for (let i = 0; i < this.value.skuStockList.length; i++) {
            this.value.skuStockList[i].price = price;
          }
        }
      });
    },
    refreshProductSkuList() {
      this.value.skuStockList = [];
      let skuList = this.value.skuStockList;
      //只有一个属性时
      if (this.selectProductAttr.length === 1) {
        let values = this.selectProductAttr[0].values;
        for (let i = 0; i < values.length; i++) {
          skuList.push({
            sp1: values[i],
            sp1_attribute_id: this.selectProductAttr[0].id
          });
        }
      } else if (this.selectProductAttr.length === 2) {
        let values0 = this.selectProductAttr[0].values;
        let values1 = this.selectProductAttr[1].values;
        for (let i = 0; i < values0.length; i++) {
          if (values1.length === 0) {
            skuList.push({
              sp1: values0[i],
              sp1_attribute_id: this.selectProductAttr[0].id
            });
            continue;
          }
          for (let j = 0; j < values1.length; j++) {
            skuList.push({
              sp1: values0[i],
              sp2: values1[j],
              sp1_attribute_id: this.selectProductAttr[0].id,
              sp2_attribute_id: this.selectProductAttr[1].id
            });
          }
        }
      } else {
        let values0 = this.selectProductAttr[0].values;
        let values1 = this.selectProductAttr[1].values;
        let values2 = this.selectProductAttr[2].values;
        for (let i = 0; i < values0.length; i++) {
          if (values1.length === 0) {
            skuList.push({
              sp1: values0[i],
              sp1_attribute_id: this.selectProductAttr[0].id
            });
            continue;
          }
          for (let j = 0; j < values1.length; j++) {
            if (values2.length === 0) {
              skuList.push({
                sp1: values0[i],
                sp2: values1[j],
                sp1_attribute_id: this.selectProductAttr[0].id,
                sp2_attribute_id: this.selectProductAttr[1].id
              });
              continue;
            }
            for (let k = 0; k < values2.length; k++) {
              skuList.push({
                sp1: values0[i],
                sp2: values1[j],
                sp3: values2[k],
                sp1_attribute_id: this.selectProductAttr[0].id,
                sp2_attribute_id: this.selectProductAttr[1].id,
                sp3_attribute_id: this.selectProductAttr[2].id
              });
            }
          }
        }
      }
      console.log(this.value.skuStockList);
    },
    refreshProductAttrPics() {
      this.selectProductAttrPics = [];
      if (this.selectProductAttr.length >= 1) {
        let values = this.selectProductAttr[0].values;
        for (let i = 0; i < values.length; i++) {
          let pic = null;
          if (this.isEdit) {
            //编辑状态下获取图片
            pic = this.getProductSkuPic(values[i]);
          }
          this.selectProductAttrPics.push({ name: values[i], pic: pic })
        }
      }
    },
    //获取商品相关属性的图片
    getProductSkuPic(name) {
      for (let i = 0; i < this.value.skuStockList.length; i++) {
        if (name === this.value.skuStockList[i].sp1) {
          return this.value.skuStockList[i].pic;
        }
      }
      return null;
    },
    //合并商品属性
    mergeProductAttrValue() {
      this.value.productAttributeValueList = [];
      for (let i = 0; i < this.selectProductAttr.length; i++) {
        let attr = this.selectProductAttr[i];
        if (attr.handAddStatus === 1 && attr.options != null && attr.options.length > 0) {
          this.value.productAttributeValueList.push({
            productAttributeId: attr.id,
            value: this.getOptionStr(attr.options)
          });
        }
      }
      for (let i = 0; i < this.selectProductParam.length; i++) {
        let param = this.selectProductParam[i];
        this.value.productAttributeValueList.push({
          productAttributeId: param.id,
          value: param.value
        });
      }
    },
    //合并商品属性图片
    mergeProductAttrPics() {
      for (let i = 0; i < this.selectProductAttrPics.length; i++) {
        for (let j = 0; j < this.value.skuStockList.length; j++) {
          if (this.value.skuStockList[j].sp1 === this.selectProductAttrPics[i].name) {
            this.value.skuStockList[j].pic = this.selectProductAttrPics[i].pic;
          }
        }
      }
    },
    getOptionStr(arr) {
      let str = '';
      for (let i = 0; i < arr.length; i++) {
        str += arr[i];
        if (i != arr.length - 1) {
          str += ',';
        }
      }
      return str;
    },
    handleRemoveProductSku(index, row) {
      let list = this.value.skuStockList;
      if (list.length === 1) {
        list.pop();
      } else {
        list.splice(index, 1);
      }
    },
    getParamInputList(inputList) {
      return inputList.split(',');
    },
    handlePrev() {
      this.$emit('prevStep')
    },
    handleNext() {
      this.mergeProductAttrValue();
      this.mergeProductAttrPics();
      this.$emit('nextStep')
    }
  }
}
</script>

<style scoped>
.littleMarginLeft {
  margin-left: 10px;
}

.littleMarginTop {
  margin-top: 10px;
}

.paramInput {
  width: 250px;
}

.paramInputLabel {
  display: inline-block;
  width: 100px;
  text-align: right;
  padding-right: 10px;
}

.cardBg {
  background: #f8f9fc;
}
</style>
