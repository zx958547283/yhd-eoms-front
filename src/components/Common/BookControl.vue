<template>
  <div style="padding-top: 50px;">
    <el-table style="width: 100%" :data="bookDetail">
      <el-table-column
        label="时间段"
        width="100">
        <template slot-scope="scope">
          <cselect :length="0.6" :required="true" @change="setBookDetail" pk="period" v-model="period"></cselect>
        </template>
      </el-table-column>
      <el-table-column
        label="开始时间"
        width="125">
        <template slot-scope="scope">
          <el-time-select size="mini" style="width: 110px"
                          v-model="book_detail.start_time"
                          @change="setBookDetail"
                          :picker-options="period_options" placeholder="开始时间">
          </el-time-select>
        </template>
      </el-table-column>
      <el-table-column
        label="结束时间"
        width="125">
        <template slot-scope="scope">
          <el-time-select size="mini" style="width: 110px"
                          v-model="book_detail.end_time"
                          @change="setBookDetail"
                          :picker-options="period_options"
                          placeholder="结束时间">
          </el-time-select>
        </template>
      </el-table-column>
      <el-table-column
        label="可预约次数"
        width="120">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-input-number size="mini" style="width: 100px" :min="0" @change="setBookDetail"
                             v-model="book_detail.bookable_times"></el-input-number>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="预约状态"
        width="100">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <cselect :required="true" :length="0.6" pk="book"  @change="setBookDetail" v-model="book_detail.status"></cselect>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>


export default {
  props:{
    book_detail:{
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      bookDetail: [{}],
      period: "1",
      period_options: {
        start: '08:30',
        step: '00:15',
        end: '12:00'
      },
    }
  },
  watch: {
    period(val) {
      if (val === "2") {
        this.period_options = {
          start: '13:00',
          step: '00:15',
          end: '18:00'
        }
      }
    }
  },
  methods: {


    setBookDetail(){
      this.book_detail.period = this.period
      this.$emit("set_booking", this.book_detail);
    }
    // handleEdit(index, row) {
    //   console.log(index, row);
    // },
    // handleDelete(index, row) {
    //   console.log(index, row);
    // }
  }
}
</script>
