<template>
  <div class="app-container">
    <el-container>
      <el-header style="height:30px;">
        <el-button-group>
          <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button>
          <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button>
          <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">编辑</el-button>
          <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button>
          <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
          <el-button @click="exportExcel()" size="mini" type="primary">导出全部</el-button>
        </el-button-group>
        <cinputquery @query="doQuery()" placeholder="编码、名称" v-model="queryvalue"></cinputquery>
      </el-header>
      <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" @query="doQuery" v-model="queryvisible"></cquery>
      <el-main>
        <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
      </el-main>
    </el-container>
    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle" style="line-height:20px;">
        <cinput title="门店名称" v-model="mm.store_name"></cinput>
        <cinput title="省/直辖市" v-model="mm.province"></cinput>
        <cinput title="市" v-model="mm.city"></cinput>
        <cinput title="区" v-model="mm.region"></cinput>
        <cinput title="详细地址" v-model="mm.detail_address"></cinput>
        <div class="order_line" style="overflow: inherit">
          <el-button @click="openMap" size="mini" type="info">从高德地图获取</el-button>
        </div>
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <el-button @click="doSave" size="mini" type="primary">提交</el-button>
      </div>
    </cwindow>

    <cwindow :length="3" :title="wintitle" style="top: 100px;" v-model="locationVisible">
      <div class="page-controlstyle" style="line-height:20px;">
        <cinput :length="2" id="input_search" title="搜索" v-model="searchLocationName"></cinput>
        <el-button @click="poiSearch" size="mini" type="primary">搜索</el-button>
        <cinput :length="1.5" title="经度" v-model="selectedLon"></cinput>
        <cinput :length="1.5" title="维度" v-model="selectedLat"></cinput>
        <cinput :length="3" :readonly="true" title="详细地址" v-model="selectedDetail"></cinput>
      </div>
      <div :length="3" id="container" style="height: 500px;"></div>
      <div class="dialog-footer">
        <el-button @click="closeLoction" size="mini">取消</el-button>
        <el-button @click="confirmLoction" size="mini">确定</el-button>
        <!-- <el-button @click="selectedLocation" size="mini" type="primary">提交</el-button> -->
      </div>
    </cwindow>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import sys from "../../../api/sys";
import e from "../../../utils/excel";
import xcy from "../../../api/xcy";
import oms from '@/api/oms';

// import province from '../../../utils/province'
// import city from '../../../utils/city'
const defaultListQuery = {
  keyword: null,
  pageNum: 1,
  pageSize: 5,
  publishStatus: null,
  verifyStatus: null,
  productSn: null,
  productCategoryId: null,
  category: null,
  enterprise_abbr_name: null,
  province: null,
  city: null,
  contact: null,
  phone: null,
  status: null,
};
export default {
  data() {
    return {
      selectrows: [],                    //表格选中的对象
      wintitle: "新增门店信息",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      queryvisible: false,    //查询弹出窗
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: "",         //查询条件值
      querylist: [],           //查询条件模板
      listQuery: Object.assign({}, defaultListQuery),
      address: [],
      locationVisible: false,
      map: null,
      marker: null,
      searchLocationName: '',
      selectedProvince: '',
      selectedCity: '',
      selectedDistrict: '',
      selectedDetail: '',
      selectedLon: '',
      selectedLat: '',
      autoComplete: null
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
    // this.doQuery();
  },
  filters: {
  },
  methods: {
    btnqueryShow: function () {
      this.queryvisible = !this.queryvisible;
    },
    doQuery(querylist) {
      this.querylist = [];
      u.addwheres(this, "and", "(", "oms_store_address.store_name", "like", this.queryvalue, "");
      u.addwheres(this, "or", "", "oms_store_address.province", "like", this.queryvalue, "");
      u.addwheres(this, "or", "", "oms_store_address.city", "like", this.queryvalue, "");
      u.addwheres(this, "or", "", "oms_store_address.region", "like", this.queryvalue, ")");
      //查询条件
      this.dataLoad(1);
    },
    dataLoad(num) {
      if (num) {
        this.pagenum = num;
      }
      // if(!this.queryvalue) {
      //   this.querylist = [];
      // }
      u.querypage(this, this.params[0]);
    },
    showAdd() {
      this.mm = {};
      this.mm.status = "N";
      this.winvisible = true;
    },
    showEdit(row) {
      let that = this;
      u.openeditmodel(this, oms.getStoreAddress, row).then(res => {
        console.log(res)
        that.address = [res.province[0], res.city[0], res.region];
      });
    },
    doDelete() {
      u.deleteoperate(this, oms.deleteStoreAddress);
    },

    doExport() {
      u.queryAll(this.params[0], this.querylist).then(res => {
        e.exportxlsx(res);
      });
    },
    tableSelect(rows) {
      this.selectrows = rows;
    },
    doSave() {
      if (this.mm.exc_key) {
        u.doSave(this, oms.saveStoreAddress);//更新
      } else {
        u.doSave(this, oms.saveStoreAddress);//新增
      }
    },
    exportExcel() {
      xcy.exportEnterpriseList(this.listQuery).then(res => {
        e.exportxlsx(res)
      })
    },
    loadJs(src) {
      return new Promise((resolve, reject) => {
        let script = document.createElement('script')
        script.type = "text/javascript"
        script.onload = () => {
          resolve()
        }
        script.onerror = () => {
          reject()
        }
        script.src = src
        document.getElementsByTagName('body')[0].appendChild(script)
      })
    },
    openMap() {
      let that = this
      this.selectedDetail = this.mm.detail_address
      this.loadJs('https://webapi.amap.com/maps?v=1.4.15&key=17309de8c62cb6895d37f562620818ca').then(() => {

        this.map = new AMap.Map('container', {
          resizeEnable: true,
          zoom: 13
        });
        this.map.on('click', function (ev) {
          if (that.marker !== null) {
            that.map.remove(that.marker);
          }
          // 触发事件的对象
          var target = ev.target;
          // 触发事件的地理坐标，AMap.LngLat 类型
          var lnglat = ev.lnglat;
          // 触发事件的像素坐标，AMap.Pixel 类型
          var pixel = ev.pixel;
          // 触发事件类型
          var type = ev.type;
          console.log(lnglat)
          that.selectedLon = lnglat.lng
          that.selectedLat = lnglat.lat
          that.marker = new AMap.Marker({
            position: new AMap.LngLat(lnglat.lng, lnglat.lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: ''
          });
          that.map.add(that.marker)
          // 逆地理编码
          AMap.plugin('AMap.Geocoder', function () {
            var geocoder = new AMap.Geocoder({
              // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
              city: '025'
            })

            var lnglat1 = [lnglat.lng, lnglat.lat]

            geocoder.getAddress(lnglat1, function (status, result) {
              if (status === 'complete' && result.info === 'OK') {
                // result为对应的地理位置详细信息
                that.selectedDetail = result.regeocode.formattedAddress
                that.selectedProvince = result.regeocode.addressComponent.province
                that.selectedCity = result.regeocode.addressComponent.city
                that.selectedDistrict = result.regeocode.addressComponent.district

                console.log(result)
              }
            })
          })
        });
        AMap.plugin('AMap.Autocomplete', function () {
          // 实例化Autocomplete
          var autoOptions = {
            //city 限定城市，默认全国
            city: '025'
          }
          that.autoComplete = new AMap.Autocomplete(autoOptions);

        })
        that.locationVisible = true
      })
    },
    closeLoction() {
      this.locationVisible = false
      this.selectedDetail = ''
      this.selectedProvince = ''
      this.selectedCity = ''
      this.selectedDistrict = ''
      this.selectedLon = ''
      this.selectedLat = ''
      this.map.destroy();
    },
    confirmLoction() {
      this.locationVisible = false
      this.mm.detail_address = this.selectedDetail
      this.mm.province = this.selectedProvince
      this.mm.city = this.selectedCity
      this.mm.region = this.selectedDistrict
      this.mm.lon = this.selectedLon
      this.mm.lat = this.selectedLat
      console.log(this.mm)
      this.map.destroy();
    },
    poiSearch() {
      let that = this
      this.autoComplete.search(this.searchLocationName, function (status, result) {
        // 搜索成功时，result即是对应的匹配数据
        console.log(result)
        if (null !== result && result.info === 'OK' && undefined !== result.tips && 0 !== result.tips.length) {
          let lon = result.tips[0].location.lng
          let lat = result.tips[0].location.lat
          let district = result.tips[0].district
          let address = result.tips[0].address
          that.selectedLon = lon
          that.selectedLat = lat
          that.selectedDetail = district + ' ' + address
          var lnglat1 = [lon, lat]

          // 逆地理编码
          AMap.plugin('AMap.Geocoder', function () {
            var geocoder = new AMap.Geocoder({
              // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
              city: '025'
            })

            var lnglat1 = [lon, lat]
            that.map.panTo(lnglat1);
            if (that.marker !== null) {
              that.map.remove(that.marker);
            }
            that.marker = new AMap.Marker({
              position: new AMap.LngLat(lon, lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              title: ''
            });
            that.map.add(that.marker)


            geocoder.getAddress(lnglat1, function (status, result) {
              if (status === 'complete' && result.info === 'OK') {
                // result为对应的地理位置详细信息
                that.selectedDetail = result.regeocode.formattedAddress
                that.selectedProvince = result.regeocode.addressComponent.province
                that.selectedCity = result.regeocode.addressComponent.city
                that.selectedDistrict = result.regeocode.addressComponent.district

              }
            })
          })
        }
      })
    }
  }
}
</script>
<style>
</style>


