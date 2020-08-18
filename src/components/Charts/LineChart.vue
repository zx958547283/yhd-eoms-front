<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "500px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    xyData: {
      type: Object,
      default: function() {
        return {
          xData: [],
          yData: [],
          title: ""
        };
      }
    }
  },
  data() {
    return {
      chart: null,
      x_line: [],
      y_line: [],
      title: ""
    };
  },
  computed: {
    yData: function() {
      return this.xyData.yData;
    },
    xData: function() {
      return this.xyData.xData;
    }
  },
  watch: {
    yData: {
      deep: true,
      handler(val) {
        this.y_line = val;
        this.setOptions();
      }
    },
    xData: {
      deep: true,
      handler(val) {
        this.x_line = val;
        this.setOptions();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.y_line = this.xyData.yData;
      this.x_line = this.xyData.xData;
      this.title = this.xyData.title;
      if (this.y_line && this.x_line) {
        this.setOptions();
      }
    },
    setOptions() {
      this.chart.setOption({
        title: {
          left: "center",
          text: this.title
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#57617B"
            }
          }
        },
        legend: {
          top: 20,
          icon: "rect",
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          right: "4%",
          textStyle: {
            fontSize: 12,
            color: "#F1F1F3"
          }
        },
        xAxis: {
          type: "category",
          data: this.x_line,
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#57617B"
            }
          }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.y_line,
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(137, 189, 27, 0.3)"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(137, 189, 27, 0)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: "rgb(137,189,27)",
                borderColor: "rgba(137,189,2,0.27)",
                borderWidth: 12
              }
            }
          }
        ]
      });
    }
  }
};
</script>
