var gr = {}, DEBUG = 0;
!function () {
  "use strict";
  gr.const_ = {
    REPORT_STYLE_ID: "-gr-style-id",
    VERSION: "6.6.18.0808",
    BIG_AMT_NUMBER: "零壹贰叁肆伍陆柒捌玖",
    HZ_NUMBER: "一二三四五六七八九十零",
    HZ_NEGATIVE: "负",
    HZ_ZERO_YUAN: "零元整",
    HZ_AMT_STEP: "元拾佰仟万拾佰仟亿拾佰仟",
    HZ_AMT_UNIT: "整角分",
    HZ_DATETIME_UNIT: "周日星期天",
    MILLISECONDS_DAY: 864e5,
    TIMEZONE_OFFSET: 6e4 * (new Date).getTimezoneOffset()
  }, gr.enum_ = {
    PenStyle: {Solid: 0, Dash: 1, Dot: 2, DashDot: 3, DashDotDot: 4},
    BorderStyle: {DrawLeft: 1, DrawTop: 2, DrawRight: 4, DrawBottom: 8},
    BackStyle: {Normal: 1, Transparent: 2},
    TextAlign: {
      TopLeft: 17,
      TopCenter: 18,
      TopRight: 20,
      TopJustiy: 144,
      BottomLeft: 65,
      BottomCenter: 66,
      BottomRight: 68,
      BottomJustiy: 192,
      MiddleLeft: 33,
      MiddleCenter: 34,
      MiddleRight: 36,
      MiddleJustiy: 160
    },
    TextOrientation: {
      Default: 0,
      U2DL2R0: 5,
      D2UL2R1: 22,
      U2DR2L0: 9,
      U2DR2L1: 25,
      Invert: 58,
      L2RD2U0: 38,
      L2RD2U1: 54
    },
    ParameterDataType: {String: 1, Integer: 2, Float: 3, Boolean: 5, DateTime: 6},
    FieldType: {String: 1, Integer: 2, Float: 3, Currency: 4, Boolean: 5, DateTime: 6, Binary: 7},
    ControlType: {
      StaticBox: 1,
      ShapeBox: 2,
      SystemVarBox: 3,
      FieldBox: 4,
      SummaryBox: 5,
      RichTextBox: 6,
      PictureBox: 7,
      MemoBox: 8,
      SubReport: 9,
      Line: 10,
      Chart: 11,
      Barcode: 12,
      FreeGrid: 13
    },
    SummaryFun: {
      Sum: 1,
      Avg: 2,
      Count: 3,
      Min: 4,
      Max: 5,
      Var: 6,
      VarP: 7,
      StdDev: 8,
      StdDevP: 9,
      AveDev: 10,
      DevSq: 11,
      CountBlank: 12,
      CountA: 13,
      Distinct: 14,
      AvgA: 15,
      MinN: 16,
      MaxN: 17,
      StrMin: 18,
      StrMax: 19,
      VarA: 20,
      VarPA: 21,
      StdDevA: 22,
      StdDevPA: 23,
      AveDevA: 24,
      DevSqA: 25,
      SumAbs: 26,
      SumAcc: 27,
      GroupSumAcc: 28
    },
    SystemVarType: {
      CurrentDateTime: 1,
      RecordNo: 4,
      RowNo: 8,
      RecordCount: 19,
      GroupNo: 20,
      GroupCount: 21,
      GroupRowNo: 22,
      GroupRowCount: 23
    },
    AnchorStyle: {Left: 1, Top: 2, Right: 4, Bottom: 8},
    AlignColumnSideStyle: {Left: 1, Right: 2, Both: 3},
    DockStyle: {None: 0, Left: 1, Top: 2, Right: 3, Bottom: 4, Fill: 5},
    CenterStyle: {None: 0, Horizontal: 1, Vertical: 2, Both: 3},
    ShiftMode: {Never: 0, Always: 1, WhenOverLapped: 2},
    Unit: {Cm: 1, Inch: 2},
    ShapeBoxType: {Circle: 1, Ellipse: 2, Rectangle: 3, RoundRect: 4, RoundSquare: 5, Square: 6, Line: 7},
    PictureAlignment: {TopLeft: 1, TopRight: 2, Center: 3, BottomLeft: 4, BottomRight: 5},
    PictureSizeMode: {Clip: 1, Stretch: 2, Zoom: 3, EnsureFullView: 4, Tile: 5},
    PictureTransparentMode: {None: 0, Overlying: 1, Background: 2},
    PictureRotateMode: {None: 0, Left: 1, Right: 2, Flip: 3, Mirror: 4},
    ChartType: {
      BarChart: 1,
      PieChart: 2,
      LineChart: 3,
      StackedBarChart: 4,
      XYScatterChart: 5,
      XYLineChart: 6,
      CurveLineChart: 7,
      XYCurveLineChart: 8,
      Bubble: 9,
      StackedBar100Chart: 10,
      ColumnChart: 11,
      StackedColumnChart: 12,
      StackedColumn100Chart: 13
    },
    ChartVarType: {
      XVal: 1,
      YVal: 2,
      ZVal: 3,
      YVal100ByGroup: 4,
      YVal100BySeries: 5,
      YValTotalByGroup: 6,
      YValTotalBySeries: 7,
      SeriesLabel: 8,
      GroupLabel: 9
    },
    PointMarkerStyle: {
      None: -1,
      Square: 0,
      SquareCheck: 1,
      SquareCross: 2,
      Circle: 3,
      CirclePoint: 4,
      CircleCross: 5,
      Dimond: 6,
      Triangle: 7,
      Cross: 8,
      Cross4: 9,
      Star4: 10,
      Star5: 11,
      Star6: 12,
      Star10: 13
    },
    BarcodeType: {
      Code25Intlv: 1,
      Code25Ind: 2,
      Code25Matrix: 3,
      Code39: 4,
      Code39X: 5,
      Code128A: 6,
      Code128B: 7,
      Code128C: 8,
      Code93: 9,
      Code93X: 10,
      CodeMSI: 11,
      CodePostNet: 12,
      CodeCodabar: 13,
      CodeEAN8: 14,
      CodeEAN13: 15,
      CodeUPC_A: 16,
      CodeUPC_E0: 17,
      CodeUPC_E1: 18,
      CodeUPC_Supp2: 19,
      CodeUPC_Supp5: 20,
      CodeEAN128A: 21,
      CodeEAN128B: 22,
      CodeEAN128C: 23,
      Code128Auto: 24,
      PDF417: 50,
      QRCode: 51,
      DataMatrix: 52
    },
    BarcodeCaptionPosition: {None: 1, Above: 2, Below: 3},
    BarcodeDirection: {LeftToRight: 1, RightToLeft: 2, TopToBottom: 3, BottomToTop: 4},
    DtmxEncoding: {Auto: 2, Ascii: 3, C40: 4, Text: 5, X12: 6, Edifact: 7, Base256: 8},
    DtmxMatrixSize: {
      Auto: 2,
      "10x10": 4,
      "12x12": 5,
      "14x14": 6,
      "16x16": 7,
      "18x18": 8,
      "20x20": 9,
      "22x22": 10,
      "24x24": 11,
      "26x26": 12,
      "32x32": 13,
      "36x36": 14,
      "40x40": 15,
      "44x44": 16,
      "48x48": 17,
      "52x52": 18,
      "64x64": 19,
      "72x72": 20,
      "80x80": 21,
      "88x88": 22,
      "96x96": 23,
      "104x104": 24,
      "120x120": 25,
      "132x132": 26,
      "144x144": 27,
      "8x18": 28,
      "8x32": 29,
      "12x26": 30,
      "12x36": 31,
      "16x36": 32,
      "16x48": 33
    },
    StringAlignment: {Near: 1, Center: 2, Far: 3},
    PeriodType: {
      None: 0,
      Day: 1,
      Week: 2,
      ThirdMonth: 3,
      HalfMonth: 4,
      Month: 5,
      Quarter: 6,
      HalfYear: 7,
      Year: 8,
      Calendar: 9
    },
    OCGroupHeaderVAlign: {Top: 1, Bottom: 2, Middle: 3},
    controlLayout: {auto: 0, table: 1, absolute: 2},
    detailgridResize: {asDesign: 0, fitWidth: 1, onlyGrow: 2}
  }, gr.locale = {
    supportIntl: !!window.Intl,
    decimalSep: ".",
    thousandSep: ",",
    dateSep: "-",
    timeSep: ":",
    textAM: "上午",
    textPM: "下午",
    currencySymbol: "￥"
  }, gr.script = {
    calcExp: function (expText) {
      var result = NaN;
      expText = "result=" + expText;
      try {
        eval(expText)
      } catch (e) {
        result = NaN
      }
      return result
    }, execEvent: function (scriptText, scriptName, Sender, Report) {
      try {
        eval(scriptText)
      } catch (e) {
        alert("执行报表脚本 '" + scriptName + "' 失败" + (Sender.Name ? "\n对象名称: " + Sender.Name : "") + "\n错误信息: " + e.toString() + "\n脚本代码:\n" + scriptText)
      }
    }
  }
}(), function (e) {
  "use strict";
  var t = gr.enum_, r = gr.const_, o = gr.helper = {}, n = gr.common = {}, a = r.MILLISECONDS_DAY,
    i = r.TIMEZONE_OFFSET, l = o.assignJSONMembers = function (e, t) {
      var r, o;
      for (o in t) r = t[o], "object" != typeof r && e.hasOwnProperty(o) && (e[o] = r)
    }, s = o.enumMemberValid = function (e, t, r) {
      "number" != typeof e[t] && (e[t] = b(r, e[t]))
    }, u = o.enumBitMemberValid = function (e, t, r) {
      "number" != typeof e[t] && (e[t] = x(r, e[t]))
    }, c = o.colorMemberValid = function (e, t, r) {
      "number" != typeof e[t] && (e[t] = parseInt("0x" + e[t], 16) | Math.max(0, Math.min(Math.round(255 * r))) << 24)
    }, d = o.penStyleText = function (e) {
      var r = {Solid: "solid", Dash: "dashed", Dot: "dotted", DashDot: "dashed", DashDotDot: "dotted"};
      return g(e.Width) + " " + r[v(t.PenStyle, e.Style)] + " " + w(e.Color)
    }, h = o.fontHeight = function (e) {
      return 4 * e.Size / 3e4
    }, f = (o.fontString = function (e, t, r) {
      return t + " " + g(e) + " " + r
    }, o.fontCSSText = function (e) {
      var t = "", r = [];
      return e.Italic && r.push("italic"), e.Bold && r.push("bold"), r.push(g(h(e)), e.Name), r.forEach(function (e) {
        t && (t += " "), t += e
      }), t
    }), p = (o.intFixed = function (e, t) {
      var r, o = e + "";
      if (t > 0) if (r = t - o.length, 0 > r) o = o.substr(-r); else for (; r-- > 0;) o = "0" + o;
      return o
    }, function (e) {
      var t = e.toFixed(2), r = t.length - 1;
      return "0" === t.charAt(r) && ("0" === t.charAt(r - 1) && (r -= 2), t = t.substr(0, r)), t
    }), g = o.pixelsToHtml = function (e) {
      return p(e) + "px"
    }, m = (o.percentToHtml = function (e) {
      return p(e) + "%"
    }, o.cloneDate = function (e) {
      return new Date(e)
    }), C = o.confirmDateValue = function (e) {
      function t() {
        function t() {
          var t = e.indexOf(":"), o = t > 0 && 8 > t, n = e.split(/[\:\-\/ ]/g), a = n.length, i = a > 0 ? +n[0] : 0,
            l = a > 1 ? +n[1] : 0, s = a > 2 ? +n[2] : 0, u = a > 3 ? +n[3] : 0, c = a > 4 ? +n[4] : 0,
            d = a > 5 ? +n[5] : 0;
          return isNaN(l) && (t = n[1], l = r.HZ_NUMBER.indexOf(t.charAt(0)) + 1, t.length >= 3 && (l += r.HZ_NUMBER.indexOf(t.charAt(1)) + 1)), o && (t = i, i = u, u = t, t = l, l = c, c = t, t = s, s = d, d = t), s > 31 && (t = i, i = s, s = t, t = l, l = s, s = t), l > 12 && (t = l, l = s, s = t), new Date(i, --l, s, u, c, d)
        }

        var o;
        return "string" != typeof e ? (o = new V, o.AsFloat = +e, e = o.value) : (o = Date.parse(e), e = isNaN(o) ? t() : new Date(o)), e
      }

      return Date.prototype.isPrototypeOf(e) ? e : t()
    }, b = (o.confirmCloneDateValue = function (e) {
      return Date.prototype.isPrototypeOf(e) ? m(e) : C(e)
    }, o.strimDate = function (e) {
      var t = e.getTime();
      e.setTime(t - (t - 6e4 * e.getTimezoneOffset()) % a)
    }, o.incDate = function (e) {
      e.setTime(e.getTime() + a)
    }, o.incDate2 = function (e, t) {
      e.setTime(e.getTime() + t * a)
    }, o.confirmBooleanValue = function (e) {
      if (e.constructor === Boolean.prototype.constructor) return e;
      if ("string" == typeof e) {
        if (e.toLowerCase(), "TRUE" === e || "true" === e) return !0;
        e = parseInt(e)
      }
      return !!e
    }, o.ensureNameText = function (e) {
      return /^[A-Za-z_\u0100-\uffff][\w\u0100-\uffff]*$/.test(e) || (e = "[" + e + "]"), e
    }, o.enumName2Value = function (t, r) {
      var o = t[r];
      return o !== e ? o : -1
    }), v = o.enumValue2Name = function (e, t) {
      for (var r in e) if (e[r] === t) return r;
      return ""
    }, x = function (e, t) {
      var r, o, n, a = 0;
      for (t = t.substring(1, t.length - 1), r = t.split("|"), n = r.length, o = 0; n > o; o++) a += e[r[o]] || 0;
      return a
    }, T = o.rgba2color = function (e, t, r, o) {
      return y(e | t << 8 | r << 16, o)
    }, y = o.colorAlpha = function (e, t) {
      return e | Math.max(0, Math.min(Math.round(255 * t))) << 24
    }, S = o.color2rgba = function (e) {
      return {r: 255 & e, g: e >> 8 & 255, b: e >> 16 & 255, a: 4278190080 & e ? (e >> 24 & 255) / 255 : 1}
    }, w = o.colorValue2Html = function (e) {
      function t(e) {
        return (16 > e ? "0" : "") + e.toString(16)
      }

      var r = S(e);
      return 1 === r.a ? "#" + t(r.r) + t(r.g) + t(r.b) : "rgba(" + r.r + "," + r.g + "," + r.b + "," + p(r.a) + ")"
    }, F = (o.decodeTextColor = function (e) {
      var t, r, o, n, a, i = 4;
      return "rgb(" === e.substr(0, 4) && (t = e.indexOf(")", i), -1 !== t && (e = e.substring(4, t), r = e.split(","), 3 === r.length && (o = parseInt(r[0]), n = parseInt(r[1]), a = parseInt(r[2]), o >= 0 && 255 >= o && n >= 0 && 255 >= n && a >= 0 && 255 >= a))) ? {
        color: rgb(o, n, a),
        index: t + 1
      } : !1
    }, o.colorGradientLight = function (e) {
      var t = S(e), r = 120 / 255;
      return t.r += (255 - t.r) * r, t.g += (255 - t.g) * r, t.b += (255 - t.b) * r, t.r > 255 && (t.r = 255), t.g > 255 && (t.g = 255), t.b > 255 && (t.b = 255), T(t.r, t.g, t.b, t.a)
    }, o.colorGradientDark = function (e) {
      var t = S(e), r = 30 / 255;
      return t.r -= t.r * r, t.g -= t.g * r, t.b -= t.b * r, t.r < 0 && (t.r = 0), t.g < 0 && (t.g = 0), t.b < 0 && (t.b = 0), T(t.r, t.g, t.b, t.a)
    }, o.prototypeLinkExtend = function (e, t) {
      function r() {
      }

      var o, n = e.prototype;
      r.prototype = t.prototype, o = new r;
      for (var a in n) o[a] = n[a];
      e.prototype = o, e.prototype.constructor = e
    }, o.prototypeCopyExtend = function (e, t) {
      var r = t.prototype, o = e.prototype;
      for (var n in r) o.hasOwnProperty(n) || (o[n] = r[n])
    }, o.createArray = function (e, t) {
      for (var r = [], o = 0; o++ < e;) r.push(t);
      return r
    }, o.assignObjectEx = function (e, t, r) {
      var o, n;
      for (var a in t) t.hasOwnProperty(a) && (o = t[a], n = typeof o, r && "object" === n ? (e[a] || (e[a] = {}), D(e[a], o)) : e[a] = o);
      return e
    }), D = o.assignObject = function (e, t) {
      F(e, t, 1)
    }, P = (o.assignObjectAtom = function (e, t) {
      var r;
      for (var o in t) t.hasOwnProperty(o) && (r = t[o], "object" != typeof r && (e[o] = r));
      return e
    }, o.compareObject = function (e, t) {
      var r;
      for (var o in e) if (r = typeof e[o], "object" === r) {
        if (!P(e[o], t[o])) return !1
      } else if ("function" !== r && e[o] !== t[o]) return !1;
      return !0
    }), B = (o.parseXML = function (t) {
      function r() {
        for (var e, r = 0, o = t.indexOf("<", r), n = []; o >= 0;) o > r && (e = t.substring(r, o), /\S/g.test(e) && n.push(e)), r = o, o = t.indexOf(">", r + 1), n.push(t.substring(r, ++o)), r = o, o = t.indexOf("<", r);
        return n
      }

      var o;
      /\s/g.test(t) && (t = r().join(""));
      try {
        o = (new DOMParser).parseFromString(t, "text/xml")
      } catch (n) {
        o = e
      }
      return o
    }, o.xmlToReportDataJSON = function (e) {
      var t, r, o, n, a = "", i = {};
      for (o = e.childNodes[0].firstChild; o;) {
        for (o.nodeName !== a && (a = o.nodeName, r = [], i[o.nodeName] = r), t = {}, n = o.firstChild; n;) t[n.nodeName] = n.hasOwnProperty("text") ? n.text : n.textContent, n = n.nextSibling;
        r.push(t), o = o.nextSibling
      }
      return i
    }, o.getRelativePosition = function (e) {
      var t, r, o = e.originalEvent || e, n = e.currentTarget || e.srcElement, a = n.getBoundingClientRect();
      return o.touches ? (t = o.touches[0].clientX - a.left, r = o.touches[0].clientY - a.top) : (t = o.clientX - a.left, r = o.clientY - a.top), {
        x: t,
        y: r
      }
    }, o.addEvent = function (e, t, r) {
      e.addEventListener ? e.addEventListener(t, r) : e.attachEvent ? e.attachEvent("on" + t, r) : e["on" + t] = r
    }), R = o.removeEvent = function (e, t, r) {
      e.removeEventListener ? e.removeEventListener(t, r, !1) : e.detachEvent ? e.detachEvent("on" + t, r) : e["on" + t] = noop
    }, A = (o.bindEvents = function (e, t, r) {
      e.events || (e.events = {}), t.forEach(function (t) {
        e.events[t] = function () {
          r.apply(e, arguments)
        }, B(e.canvas, t, e.events[t])
      })
    }, o.unbindEvents = function (e, t) {
      t.forEach(function (t, r) {
        R(e.canvas, r, t)
      })
    }, o.toRadians = function (e) {
      return e * (Math.PI / 180)
    });
  o.toDegree = function (e) {
    return 180 * e / Math.PI
  };
  n.DateTime = function () {
    this.value = new Date
  }, n.DateTime.prototype = {
    get Year() {
      return this.value.getFullYear()
    }, get Month() {
      return this.value.getMonth() + 1
    }, get Day() {
      return this.value.getDate()
    }, get Hour() {
      return this.value.getHours()
    }, get Minute() {
      return this.value.getMinutes()
    }, get Second() {
      return this.value.getSeconds()
    }, get DayOfWeek() {
      return this.value.getDay()
    }, get DayOfYear() {
      var e = this.value, t = e.getFullYear();
      return (new Date(t, e.getMonth(), e.getDate()).getTime() - new Date(t, 0, 1).getTime()) / a + 1
    }, get AsFloat() {
      return (this.value.getTime() + new Date(1970, 0, 1).getTime() - new Date(1899, 11, 30).getTime() - i) / a
    }, set AsFloat(e) {
      this.value.setTime(e * a + new Date(1899, 11, 30).getTime() - new Date(1970, 0, 1).getTime() + i)
    }, ValueFromDate: function (e, t, r) {
      this.value = new Date(e, t - 1, r)
    }, ValueFromDateTime: function (e, t, r, o, n, a) {
      this.value = new Date(e, t - 1, r, o, n, a)
    }, Format: function (e) {
      return new gr.format.DateTimeFormatter(e).format(this.value)
    }
  };
  var V = n.DateTime;
  n.Rect = function (e, t, r, o) {
    var n = this;
    n.left = e, n.top = t, n.right = r, n.bottom = o
  }, n.Rect.prototype = {
    clone: function () {
      var e = this;
      return new n.Rect(e.left, e.top, e.right, e.bottom)
    }, IsRectEmpty: function () {
      var e = this;
      return e.left >= e.right || e.top >= e.bottom
    }, PtInRect: function (e, t) {
      var r = this;
      return r.left <= e && e < r.right && r.top <= t && t < r.bottom
    }, Width: function () {
      var e = this;
      return e.right - e.left
    }, Height: function () {
      var e = this;
      return e.bottom - e.top
    }, SetRect: function (e, t, r, o) {
      var n = this;
      n.left = e, n.top = t, n.right = r, n.bottom = o
    }, InflateRect: function (e, t) {
      var r = this;
      r.left -= e, r.top -= t, r.right += e, r.bottom += t
    }, OffsetRect: function (e, t) {
      var r = this;
      r.left += e, r.top += t, r.right += e, r.bottom += t
    }
  };
  var N = n.Pen = function () {
    var e = this;
    e.Width = 1, e.Style = 0, e.Color = y(0, 1)
  };
  N.prototype = {
    clone: function () {
      var e = this, t = new N;
      return t.Width = e.Width, t.Style = e.Style, t.Color = e.Color, t
    }, loadFromJSON: function (e, r) {
      e && (l(this, e), s(this, "Style", t.PenStyle), c(this, "Color", r))
    }, getDashStyle: function () {
      var e;
      switch (this.Style) {
        case 1:
          e = [2, 2];
          break;
        case 2:
          e = [1, 1];
          break;
        case 3:
          e = [2, 1, 1, 1];
          break;
        case 4:
          e = [2, 1, 1, 1, 1, 1];
          break;
        default:
          e = []
      }
      return e
    }
  }, n.Border = function (e) {
    var t = this;
    t.Styles = e, t.Shadow = !1, t.ShadowWidth = 4, t.ShadowColor = 0, t.Pen = new N
  }, n.Border.prototype = {
    loadFromJSON: function (e, r) {
      var o = this;
      e && (l(this, e), u(this, "Styles", t.BorderStyle), c(this, "ShadowColor"), e.Pen && o.Pen.loadFromJSON(e.Pen, r))
    }, getLeftWidth: function () {
      var e = this;
      return 1 & e.Styles ? e.Pen.Width : 0
    }, getRightWidth: function () {
      var e = this;
      return (4 & e.Styles ? e.Pen.Width : 0) + (e.Shadow ? e.ShadowWidth : 0)
    }, getTopWidth: function () {
      var e = this;
      return 2 & e.Styles ? e.Pen.Width : 0
    }, getBottomWidth: function () {
      var e = this;
      return (8 & e.Styles ? e.Pen.Width : 0) + (e.Shadow ? e.ShadowWidth : 0)
    }
  }, n.Font = function () {
    var e = this;
    e.Size = 97500, e.Bold = !1, e.Italic = !1, e.Underline = !1, e.Strikethrough = !1, e.Name = ""
  }, n.Font.prototype = {
    loadFromJSON: function (e) {
      e && l(this, e)
    }, clone: function () {
      var e = this, t = new n.Font;
      return t.Size = e.Size, t.Bold = e.Bold, t.Italic = e.Italic, t.Underline = e.Underline, t.Strikethrough = e.Strikethrough, t.Name = e.Name, t
    }
  }, n.FontWrapper = function (e) {
    this.parentFont = e
  }, n.FontWrapper.prototype = {
    loadFromJSON: function (e) {
      var t = this;
      e && (t.prepareModify(), t.font.loadFromJSON(e))
    }, assign: function (e) {
      var t = this;
      e.font ? t.font = e.font.clone() : delete t.font
    }, prepareModify: function () {
      var e = this;
      e.font || (e.font = e.parentFont.UsingFont().clone())
    }, Clone: function () {
      var e = this, t = new n.FontWrapper(e.parentFont);
      return t.font = e.UsingFont().clone(), t
    }, UsingFont: function () {
      var e = this;
      return e.font ? e.font : e.parentFont.UsingFont()
    }, get Name() {
      return this.UsingFont().Name
    }, set Name(e) {
      var t = this;
      t.prepareModify(), t.font.Name = e
    }, get Point() {
      return this.UsingFont().Size / 1e4
    }, set Point(e) {
      var t = this;
      t.prepareModify(), t.font.Size = 1e4 * e
    }, get Bold() {
      return this.UsingFont().Bold
    }, set Bold(e) {
      var t = this;
      t.prepareModify(), t.font.Bold = e
    }, get Italic() {
      return this.UsingFont().Italic
    }, set Italic(e) {
      var t = this;
      t.prepareModify(), t.font.Italic = e
    }, get Underline() {
      return this.UsingFont().Underline
    }, set Underline(e) {
      var t = this;
      t.prepareModify(), t.font.Underline = e
    }, get Strikethrough() {
      return this.UsingFont().Strikethrough
    }, set Strikethrough(e) {
      var t = this;
      t.prepareModify(), t.font.Strikethrough = e
    }
  }, n.TextFormat = function () {
    var e = this;
    e.WordWrap = !1, e.EndEllipsis = !1, e.TextAlign = 33, e.CharacterSpacing = 0, e.LineSpacing = 0, e.FirstCharIndent = 0
  }, n.TextFormat.prototype = {
    loadFromJSON: function (e) {
      var r = this;
      e && (l(this, e), e.CharSpacing && (r.CharacterSpacing = e.CharSpacing), s(this, "TextAlign", t.TextAlign), s(this, "TextOrientation", t.TextOrientation))
    }
  }, n.Context = function (e) {
    var t = this;
    t.ctx = e, e.textBaseline = "top", t.pens = [new N], t.defaultFillStyles = e.fillStyle, t.fonts = []
  }, n.Context.prototype = {
    get usingFont() {
      var e = this.fonts, t = e.length;
      return e[t - 1]
    }, setDefaultFillColor: function (e) {
      var t = this;
      t.defaultFillStyles = w(e), t.ctx.fillStyle = t.defaultFillStyles
    }, setFillStyle: function (e) {
      this.ctx.fillStyle = e
    }, setFillColor: function (e) {
      this.ctx.fillStyle = w(e)
    }, resetFillStyle: function () {
      var e = this;
      e.ctx.fillStyle = e.defaultFillStyles
    }, SelectPen: function (e) {
      var t = this;
      t.pens.push(e), t._applyPen()
    }, RestorePen: function () {
      var e = this;
      e.pens.pop(), e._applyPen()
    }, SelectFont: function (e) {
      var t = this, r = t.fonts, o = r[r.length - 1];
      e !== o && (t.ctx.font = f(e)), r.push(e)
    }, RestoreFont: function () {
      var e = this, t = e.fonts, r = t.pop(), o = t[t.length - 1];
      t.length > 0 ? o !== r && (e.ctx.font = f(o)) : e.ctx.font = ""
    }, FontSizeChangeTo: function (e) {
      var t = this, r = t.usingFont.clone();
      r.Size = e, t.SelectFont(r)
    }, FontPointRestore: function () {
      this.RestoreFont()
    }, measureTextWidth: function (e) {
      return this.ctx.measureText(e).width
    }, drawText: function (e, t, r) {
      this.ctx.fillText(e, t, r)
    }, drawTextCenter: function (e, t, r) {
      var o = this.ctx;
      o.textAlign = "center", o.fillText(e, t, r), o.textAlign = "start"
    }, drawText2: function (e, t, r) {
      var o, n = this, a = h(n.usingFont), i = t.left, l = (t.top + t.bottom - a) / 2;
      33 !== r && (o = n.measureTextWidth(e), 34 === r ? (i += t.right - o, i /= 2) : i = t.right - o), n.drawText(e, i, l)
    }, drawTextRotate: function (e, t, r, o) {
      var n = this.ctx;
      n.translate(t, r), n.rotate(A(-o)), this.ctx.fillText(e, 0, 0), n.setTransform(1, 0, 0, 1, 0, 0)
    }, drawEqualSpaceText: function (e, t, r, o) {
      for (var n, a, i = this, l = t, s = e.length, u = 0, c = (r - t) / s; s > u;) n = t + c * (u + 1), a = e.substr(u++, 1), i.drawText(a, (n + l - i.measureTextWidth(a)) / 2, o), l = n
    }, fillRect: function (e, t) {
      var r = this;
      r.setFillColor(t), r.ctx.fillRect(e.left, e.top, e.Width(), e.Height()), r.resetFillStyle(t)
    }, drawLine: function (e, t, r, o) {
      var n = this.ctx;
      n.beginPath(), n.moveTo(e, t), n.lineTo(r, o), n.stroke()
    }, drawPolyLine: function (e, t, r) {
      var o = this.ctx, n = 0, a = e.length;
      for (o.beginPath(), o.moveTo(e[n++], e[n++]); a > n;) o.lineTo(e[n++], e[n++]);
      r && o.closePath(), o.stroke(), t && o.fill()
    }, polyBezier: function (e) {
      var t, r = this.ctx, o = e.length;
      for (r.beginPath(), r.moveTo(e[0].x, e[0].y), t = 1; o > t; t++) r.bezierCurveTo(e[t].x, e[t++].y, e[t].x, e[t++].y, e[t].x, e[t].y);
      r.stroke()
    }, circle: function (e, t, r, o, n) {
      var a = this.ctx, i = (o > r ? r : o) / 2;
      e += r / 2, t += o / 2, a.beginPath(), a.arc(e, t, i, 0, 2 * Math.PI), a.stroke(), n && a.fill()
    }, ellipse: function (e, t, r, o, n) {
      var a = this.ctx, i = r > o ? r : o, l = r / i, s = o / i;
      e += r / 2, t += o / 2, i /= 2, a.beginPath(), a.save(), a.scale(l, s), a.arc(e / l, t / s, i, 0, 2 * Math.PI), a.restore(), a.stroke(), n && a.fill()
    }, rectangle: function (e, t, r, o, n) {
      var a = this;
      a.ctx.strokeRect(e, t, r, o), n && a.ctx.fillRect(e, t, r, o)
    }, rectangle2: function (e, t) {
      this.rectangle(e.left, e.top, e.Width(), e.Height(), t)
    }, square: function (e, t, r, o, n) {
      var a = o > r ? r : o;
      e += (r - a) / 2, t += (o - a) / 2, this.rectangle(e, t, a, a, n)
    }, roundRectangle: function (e, t, r, o, n, a, i) {
      var l = this.ctx;
      l.beginPath(), l.moveTo(e + n, t), l.lineTo(e + r - n, t), l.quadraticCurveTo(e + r, t, e + r, t + a), l.lineTo(e + r, t + o - a), l.quadraticCurveTo(e + r, t + o, e + r - n, t + o), l.lineTo(e + n, t + o), l.quadraticCurveTo(e, t + o, e, t + o - a), l.lineTo(e, t + a), l.quadraticCurveTo(e, t, e + n, t), l.stroke(), i && l.fill()
    }, roundSquare: function (e, t, r, o, n, a, i) {
      var l = o > r ? r : o;
      e += (r - l) / 2, t += (o - l) / 2, this.roundRectangle(e, t, l, l, n, a, i)
    }, pie: function (e, t, r, o, n) {
      var a = this, i = a.ctx;
      o = A(o), n = A(n), i.beginPath(), i.moveTo(e, t), i.arc(e, t, r, -o, -n, 1), i.closePath(), i.stroke(), i.fill()
    }, drawBar: function (e, t, r, o) {
      var n, a = this, i = a.ctx,
        l = [{x: e.left, y: e.bottom}, {x: e.left, y: e.top}, {x: e.right, y: e.top}, {x: e.right, y: e.bottom}];
      a.setFillColor(r), a.SelectPen(t), i.fillRect(e.left, e.top, e.Width(), e.Height()), i.beginPath(), n = l[o], i.moveTo(n.x, n.y), n = l[++o % 4], i.lineTo(n.x, n.y), n = l[++o % 4], i.lineTo(n.x, n.y), n = l[++o % 4], i.lineTo(n.x, n.y), i.stroke(), a.RestorePen(), a.resetFillStyle()
    }, DrawHorzLine: function (e, t, r) {
      this.drawLine(t, e, r, e)
    }, DrawVertLine: function (e, t, r) {
      this.drawLine(e, t, e, r)
    }, DrawPointMarker: function (e, t, r, o) {
      function n() {
        var r, o = 10 === t ? 4 : 11 === t ? 5 : 12 === t ? 6 : 10, n = 2 * Math.PI / o, a = n / 2, i = e.Width() / 2,
          l = i / 2, u = e.left + i, c = e.top + i, d = Math.PI / 2, h = [];
        for (r = 0; o > r; r++) h.push(u + Math.cos(d) * i, c - Math.sin(d) * i), d += a, h.push(u + Math.cos(d) * l, c - Math.sin(d) * l), d += a;
        s.drawPolyLine(h, 1, 1)
      }

      function a() {
        var n = r.clone();
        n.Color = o, s.SelectPen(n), s.drawLine(e.left, e.top, e.right, e.bottom), s.drawLine(e.left, e.bottom, e.right, e.top), 9 === t && (i = (e.left + e.right) / 2, s.drawLine(i, e.top, i, e.bottom), l = (e.top + e.bottom) / 2, s.drawLine(e.left, l, e.right, l)), s.RestorePen()
      }

      var i, l, s = this, u = e.Width(), c = Math.min(4, (u - 4) / 2);
      switch (s.setFillColor(o), s.SelectPen(r), t) {
        case 3:
        case 4:
        case 5:
          s.ellipse(e.left, e.top, e.Width(), e.Height(), 1), 4 === t ? s.circle((e.left + e.right) / 2 - 1, (e.top + e.bottom) / 2 - 1, 2, 2, 0) : 5 === t && (u = Math.min(4, u / 3), s.drawLine(e.left + u, e.top + u, e.right - u, e.bottom - u), s.drawLine(e.right - u, e.top + u, e.left + u, e.bottom - u));
          break;
        case 0:
        case 1:
        case 2:
          s.rectangle(e.left, e.top, e.Width(), e.Height(), 1), 1 === t ? s.drawPolyLine([e.left + c, e.top + u / 2, e.left + u / 2, e.bottom - c, e.right - c, e.top + c]) : 2 === t && (s.drawLine(e.left + c, e.top + c, e.right - c, e.bottom - c), s.drawLine(e.right - c, e.top + c, e.left + c, e.bottom - c));
          break;
        case 8:
        case 9:
          a();
          break;
        case 6:
          s.drawPolyLine([(e.left + e.right) / 2, e.top, e.left, (e.top + e.bottom) / 2, (e.left + e.right) / 2, e.bottom, e.right, (e.top + e.bottom) / 2], 1, 1);
          break;
        case 7:
          s.drawPolyLine([(e.left + e.right) / 2, e.top, e.left, e.bottom, e.right, e.bottom], 1, 1);
          break;
        case 10:
        case 11:
        case 12:
        case 13:
          n()
      }
      s.RestorePen(), s.resetFillStyle()
    }, _applyPen: function () {
      var e = this, t = e.pens[e.pens.length - 1];
      e.ctx.lineWidth = t.Width, e.ctx.strokeStyle = w(t.Color), e.ctx.setLineDash(t.getDashStyle())
    }
  }, n.HtmlStyles = function () {
    this.items = []
  }, n.HtmlStyles.prototype = {
    add: function (e, t) {
      this.items.push({name: e, value: t})
    }, addBackColor: function (e) {
      this.add("background-color", w(e))
    }, addCellBorder: function (e) {
      var t = this;
      e.ShowColLine && e.ShowRowLine && P(e.ColLinePen, e.RowLinePen) ? t.add("border", d(e.ColLinePen)) : (e.ShowRowLine && t.add("border-bottom", d(e.ColLinePen)), e.ShowColLine && t.add("border-right", d(e.RowLinePen)))
    }, addObjectPadding: function (e) {
      var t = "";
      return e.PaddingRight === e.PaddingLeft && e.PaddingTop === e.PaddingBottom ? (e.PaddingRight !== e.PaddingTop && (t = g(e.PaddingTop) + " "), t += g(e.PaddingRight)) : t = g(e.PaddingTop) + " " + g(e.PaddingRight) + " " + g(e.PaddingBottom) + " " + g(e.PaddingLeft), this.add("padding", t)
    }, addBorder: function (e) {
      var t, r = this;
      e.Styles && (t = d(e.Pen), 15 === e.Styles ? r.add("border", t) : (1 & e.Styles && r.add("border-left", t), 4 & e.Styles && r.add("border-right", t), 2 & e.Styles && r.add("border-top", t), 8 & e.Styles && r.add("border-bottom", t))), e.Shadow && (t = g(e.ShadowWidth) + " ", r.add("box-shadow", t + t + w(e.ShadowColor)))
    }, addTextFormat: function (e, t) {
      var r = this, o = "text-align", n = e.WordWrap;
      1 & e.TextAlign ? r.add(o, "left") : 2 & e.TextAlign ? r.add(o, "center") : 4 & e.TextAlign ? r.add(o, "right") : r.add(o, "justify"), t && (o = "vertical-align", 16 & e.TextAlign ? r.add(o, "top") : 32 & e.TextAlign ? r.add(o, "middle") : r.add(o, "bottom")), e.EndEllipsis && (r.add("text-overflow", "ellipsis"), n = !1), n ? r.add("white-space", "normal") : (r.add("overflow", "hidden"), r.add("white-space", "nowrap")), e.CharacterSpacing && r.add("letter-spacing", g(e.CharacterSpacing)), e.FirstCharIndent && r.add("text-indent", g(e.FirstCharIndent)), e.ForeColor && r.add("color", w(e.ForeColor))
    }, getText: function () {
      var e = "";
      return this.items.forEach(function (t) {
        e += t.name + ":" + t.value + ";"
      }), e
    }, clear: function () {
      this.items = []
    }
  };
  var M = n.HtmlStyles;
  n.HtmlElement = function (e, t) {
    var r = this;
    r.tag = e, r.classes = [], t.addChild(this)
  }, n.HtmlElement.prototype = {
    getStyles: function () {
      var e = this;
      return e._styles || (e._styles = new M), e._styles
    }, addClass: function (e) {
      this.classes.push(e)
    }, addStyle: function (e, t) {
      var r = this;
      r._styles || (r._styles = new M), r._styles.add(e, t)
    }, addBackColorStyle: function (e) {
      this.addStyle("background-color", w(e))
    }, addAttribute: function (e, t) {
      var r = this;
      r._attributes || (r._attributes = []), r._attributes.push({name: e, value: t})
    }, addChild: function (e) {
      var t = this;
      t.children || (t.children = []), t.children.push(e)
    }, beginText: function () {
      var e = this, t = "\r\n<" + e.tag;
      return e.classes.length > 0 && (t += ' class="', e.classes.forEach(function (e, r) {
        r > 0 && (t += " "), t += e
      }), t += '"'), e._styles && (t += ' style="' + e._styles.getText() + '"'), e._attributes && e._attributes.forEach(function (e) {
        t += " " + e.name + '="' + e.value + '"'
      }), e.skipend && (t += "/"), t += ">"
    }, endText: function () {
      var e = this;
      return e.skipend ? "" : "</" + e.tag + ">"
    }
  }
}(), function (e) {
  "use strict";
  var t = (gr.enum_, gr.const_), r = gr.common, o = gr.locale, n = gr.helper, a = r.DateTime, i = n.intFixed,
    l = n.confirmDateValue, s = n.confirmBooleanValue, u = n.rgba2color, c = n.color2rgba, d = n.decodeTextColor,
    h = gr.format = {};
  h.BooleanFormatter = function (e) {
    this.parse(e)
  }, h.BooleanFormatter.prototype = {
    parse: function (e) {
      var t, r = this;
      e ? (t = e.indexOf(":"), -1 === t ? (r.trueValueText = e, r.falseValueText = "") : (r.trueValueText = e.substr(0, t), r.falseValueText = e.substr(t + 1))) : (r.trueValueText = "true", r.falseValueText = "false")
    }, format: function (e) {
      var t = this;
      return e = s(e), e ? t.trueValueText : t.falseValueText
    }
  };
  var f = function () {
    this.defaultMe()
  };
  f.prototype = {
    defaultMe: function () {
      var e = this;
      e.precision = 9, e.leastPrecision = 0, e.leastIntegerWidth = 1, e.showPositive = !1, e.showNegative = !0, e.showSymbolAtHead = !0, e.negativeBracket = !1, e.intSepStep = 0, e.asPercent = !1, e.asCurrency = !1, e.blankSepSymbol = !1, e.firstCurrencySymbol = !0, e.exponent = !1, e.textColor = 0, e.prefix = "", e.suffix = ""
    }, isCustomTextColor: function () {
      return 0 !== this.textColor
    }, parse: function (e) {
      function t(e) {
        return -1 !== "0#.,+-()$%".indexOf(e)
      }

      var r, o, n, a, i, l = this;
      if (l.defaultMe(), e) {
        if (r = d(e), r && (e = e.substr(r.index), l.textColor = r.color), i = e.length, l.exponent = "e" === e.charAt(0), !l.exponent) {
          for (o = 0; i > o && !t(e.charAt(o));) ++o;
          if (o > 0 && (l.prefix = e.substr(0, o), e = e.substr(o), i = e.length), i > o) {
            for (o = i - 1; !t(e.charAt(o)) && o > 0;) --o;
            i - 1 > o && (l.suffix = e.substr(o + 1), e = e.substr(0, o + 1), i = e.length)
          }
        }
        for (a = e.indexOf("."), -1 === a && (a = i), o = e.indexOf(","), o >= 0 && (l.intSepStep = a - o - 1, l.intSepStep < 0 && (l.intSepStep = 3)), l.negativeBracket = e.indexOf("(") >= 0 && e.indexOf(")") >= 0, l.asPercent = e.indexOf("%") >= 0, l.blankSepSymbol = e.indexOf(" ") >= 0, o = e.indexOf("+"), l.showPositive = o >= 0, n = e.indexOf("-"), l.showNegative = n >= 0 || !l.negativeBracket && !l.isCustomTextColor(), n > o && (o = n), n = e.indexOf("$"), l.asCurrency = n >= 0, n > o && (o = n), l.showSymbolAtHead = -1 === o || a > o, l.asCurrency && (l.negativeBracket ? (o = e.indexOf(l.showSymbolAtHead ? "(" : ")"), l.firstCurrencySymbol = o > n) : l.firstCurrencySymbol = o >= n), l.leastIntegerWidth = 0, o = 0; a > o; ++o) "0" === e.charAt(o) && ++l.leastIntegerWidth;
        for (l.leastPrecision = 0, l.precision = 0, o = a + 1; i > o; ++o) "0" === e.charAt(o) ? (++l.leastPrecision, ++l.precision) : "#" === e.charAt(o) && ++l.precision
      }
    }, format: function (e) {
      var t, r, n, a, i, l, s, u, d, h, f, p = this, g = "";
      if (e = +e, p.isCustomTextColor() && (t = c(p.textColor), g = "[_color#=rgb(" + t.r + "," + t.g + "," + t.b + ")]"), p.asPercent && (e *= 100), p.exponent) {
        if (r = e, 0 > r && (r = -r), n = 0, 0 !== r) {
          for (; r >= 10;) r /= 10, ++n;
          for (; 1 > r;) r *= 10, --n
        }
        return p.exponent = !1, 0 > e && (r = -r), g += p.format(r), g += "e", n >= 0 ? g += "+" : (g += "-", n = -n), g += n, p.exponent = !0, g
      }
      if (f = e.toFixed(p.precision), h = f.length, p.precision > p.leastPrecision) {
        for (a = h - 1, i = a - p.precision + p.leastPrecision; a > i && "0" === f.charAt(a); a--) ;
        "." !== f.charAt(a) && a++, a < f.length && (f = f.substr(0, a), h = a)
      }
      if (l = f.indexOf("."), 0 > l && (l = h), g += p.prefix, p.showSymbolAtHead ? (p.asCurrency && p.firstCurrencySymbol && (g += o.currencySymbol), 0 > e ? p.negativeBracket && (g += "(") : p.showPositive && e > 0 && (g += "+"), p.asCurrency && !p.firstCurrencySymbol && (g += o.currencySymbol), p.blankSepSymbol && (g += " ")) : p.negativeBracket && 0 > e && (g += "("), a = 0, s = l, u = p.leastIntegerWidth - s, 0 > e && (--s, ++a, p.showNegative && (g += "-")), d = s, u > 0) for (d += u; d > s;) g += "0", d--, p.intSepStep > 0 && d % p.intSepStep === 0 && (g += o.thousandSep); else for (; u-- < 0 && "0" === f.charAt(a);) a++;
      if (p.intSepStep > 0) for (; d > 0;) g += f.charAt(a++), --d % p.intSepStep === 0 && 0 !== d && (g += o.thousandSep); else g += f.substring(a, l);
      return h > l && (g += f.substr(l)), p.showSymbolAtHead ? p.negativeBracket && 0 > e && (g += ")") : (p.blankSepSymbol && (g += " "), p.asCurrency && p.firstCurrencySymbol && (g += o.currencySymbol), 0 > e ? g += p.negativeBracket ? ")" : "-" : p.showPositive && e > 0 && (g += "+"), p.asCurrency && !p.firstCurrencySymbol && (g += o.currencySymbol)), p.asPercent && (g += "%"), g += p.suffix
    }
  };
  var p = function (e) {
    e = e.substring(1, e.length - 1);
    for (var t = e.split(","), r = 0; r < t.length; r++) {
      var o = t[r], n = o.indexOf("=");
      this[o.substr(0, n)] = o.substr(n + 1)
    }
  };
  p.prototype = {
    format: function (t) {
      var r = this[t];
      return r === e && (r = ""), r
    }
  };
  var g = "$$", m = "$$$";
  h.NumericFormatter = function (e) {
    this.parse(e)
  }, h.NumericFormatter.prototype = {
    defaultMe: function () {
      var t = this;
      t.formatType = 0, t.positiveAnalyser = new f, t.negativeAnalyser && (t.negativeAnalyser = e), t.zeroAnalyser && (t.zeroAnalyser = e), t.intEnumAnalyser && (t.intEnumAnalyser = e)
    }, parse: function (e) {
      function t(e) {
        var t, r;
        t = e.split(";"), r = t.length, o.positiveAnalyser.parse(t[0]), r > 1 && "" !== t[1] && (o.negativeAnalyser = new f, o.negativeAnalyser.parse(t[1])), r > 2 && "" !== t[2] && (o.zeroAnalyser = new f, o.zeroAnalyser.parse(t[2]))
      }

      var r, o = this;
      if (o.defaultMe(), e) {
        var n = e.length;
        e && (r = e.indexOf(m), -1 !== r ? (o.formatType = 1, e = e.substr(0, r) + e.substr(r + m.length), "" !== e && t(e)) : n >= 2 && e.substr(0, 2) === g ? 2 === n ? o.formatType = 2 : (o.formatType = 3, t(e.substr(2))) : "{" === e.charAt(0) && "}" === e.charAt(n - 1) ? (o.formatType = 4, o.intEnumAnalyser = new p(e)) : t(e))
      }
    }, format: function (r) {
      function o(e, r) {
        var o, n, a = !1, i = !1, l = 0, s = "";
        for (o = r - 1; o >= 0; o--, l++) n = parseInt(e.charAt(o)), l % 4 === 0 && l > 0 && (a = !0), 0 === n ? i = !0 : (i && ("" !== s && (s = t.BIG_AMT_NUMBER.charAt(0) + s), i = !1), l > 0 && (a && l % 4 !== 0 && (s = t.HZ_AMT_STEP.charAt(l - l % 4) + s), a = !1, s = t.HZ_AMT_STEP.charAt(l) + s), s = t.BIG_AMT_NUMBER.charAt(n) + s);
        return s
      }

      function n(e) {
        var r, o, n = "", a = e.length;
        for (o = 0; a > o; o++) r = parseInt(e.charAt(o)), isNaN(r) || (n += t.BIG_AMT_NUMBER.charAt(r));
        return n
      }

      function a(e) {
        var r, n, a, i, l, s = 0 >= e;
        return e > -.005 && .005 > e ? t.HZ_ZERO_YUAN : (s && (e = -e), i = e.toFixed(2), r = i.indexOf("."), l = o(i, r), "" !== l && (l += t.HZ_AMT_STEP.charAt(0)), n = parseInt(i.charAt(r + 1)), a = parseInt(i.charAt(r + 2)), 0 === n && 0 === a ? l += t.HZ_AMT_UNIT[0] : (0 === n && "" === l || (l += t.BIG_AMT_NUMBER.charAt(n)), 0 !== n && (l += t.HZ_AMT_UNIT.charAt(1)), 0 !== a ? (l += t.BIG_AMT_NUMBER.charAt(a), l += t.HZ_AMT_UNIT.charAt(2)) : l += t.HZ_AMT_UNIT.charAt(0)), s && (l = t.HZ_NEGATIVE + l), l)
      }

      function i(e, r) {
        var n, a, i, l, s = Math.max(0, r.precision), u = Math.min(s, r.leastPrecision), c = -.5 * Math.pow(.1, s),
          d = c >= e;
        for (0 > e && (e = -e), i = e.toFixed(s), n = i.length, a = i.indexOf("."), -1 === a && (a = n), l = o(i, a), "" === l && (l = t.BIG_AMT_NUMBER.charAt(0)), n--; n > a + u && "0" === i.charAt(n); n--) ;
        if (n > a) for (l += "点", a++; n >= a; a++) l += t.BIG_AMT_NUMBER.charAt(parseInt(i.charAt(a)));
        return d && (l = t.HZ_NEGATIVE + l), "" !== r.prefix && (l = r.prefix + l), "" !== r.suffix && (l += r.suffix), l
      }

      var l, s = this;
      if (r = +r, isNaN(r)) l = ""; else if (s.formatType <= 1) {
        if (s.zeroAnalyser && r > -.5 && .5 > r) {
          var u = s.positiveAnalyser.precision;
          s.positiveAnalyser.asPercent && (u += 2);
          var c = u;
          s.negativeAnalyser && (c = s.negativeAnalyser.precision, s.negativeAnalyser.asPercent && (c += 2));
          var d = Math.pow(.1, c) * -.5, h = .5 * Math.pow(.1, u);
          r > d && h > r && (l = s.zeroAnalyser.format(0))
        }
        l === e && (l = s.negativeAnalyser && 0 > r ? s.negativeAnalyser.format(r) : s.positiveAnalyser.format(r)), 1 === s.formatType && (l = n(l))
      } else l = 4 === s.formatType ? s.intEnumAnalyser.format(r) : 2 === s.formatType ? a(r) : i(r, s.positiveAnalyser);
      return l
    }
  }, h.DateTimeFormatter = function (e) {
    this.parse(e)
  }, h.DateTimeFormatter.prototype = {
    parse: function (r) {
      function n() {
        for (F = 1; D[w + 1] === P;) w++, F++
      }

      function a() {
        var e = F;
        F %= 2, e = (e - F) / 2, e > 0 && l(e)
      }

      function l(e) {
        var t = "", r = A.length;
        do t += P; while (--e > 0);
        r > 0 && 15 === A[r - 1].type ? A[r - 1].data += t : A.push({type: 15, data: t, funDisplayText: v})
      }

      function s(e, t) {
        return i(e.getFullYear(), t.subtype)
      }

      function u(r, n) {
        var a = r.getMonth();
        return n.subtype <= 4 ? i(a + 1, n.subtype) : o.supportIntl ? 5 === n.subtype ? new Intl.DateTimeFormat(e, {month: "short"}).format(r) : new Intl.DateTimeFormat(e, {month: "long"}).format(r) : 10 > a ? t.HZ_NUMBER.charAt(a) : t.HZ_NUMBER.charAt(9) + t.HZ_NUMBER.charAt(a - 10) + t.HZ_DATETIME_UNIT.charAt(5)
      }

      function c(e, t) {
        return i(e.getDate(), t.subtype)
      }

      function d(r, n) {
        var a;
        return o.supportIntl ? 5 === n.subtype ? new Intl.DateTimeFormat(e, {weekday: "short"}).format(r) : new Intl.DateTimeFormat(e, {weekday: "long"}).format(r) : (a = r.getDay(), (5 === n.subtype ? t.HZ_DATETIME_UNIT.substr(0, 1) : t.HZ_DATETIME_UNIT.substring(2, 4)) + (a > 0 ? t.HZ_NUMBER.charAt(a - 1) : t.HZ_DATETIME_UNIT.charAt(1)))
      }

      function h(e, t) {
        var r = e.getHours() % 12;
        return r || (r = 12), i(r, t.subtype)
      }

      function f(e, t) {
        return i(e.getHours(), t.subtype)
      }

      function p(e, t) {
        return i(e.getMinutes(), t.subtype)
      }

      function g(e, t) {
        return i(e.getSeconds(), t.subtype)
      }

      function m(e, t) {
        return e.toLocaleDateString()
      }

      function C(e, t) {
        return e.toLocaleTimeString()
      }

      function b(e, t) {
        return e.toLocaleString()
      }

      function v(e, t) {
        return t.data
      }

      function x(e, t) {
        return e.getHours() < 12 ? o.textAM : o.textPM
      }

      function T(e, t) {
        return o.dateSep
      }

      function y(e, t) {
        return o.timeSep
      }

      var S, w, F, D, P, B, R, A = this.items = [];
      if (r) {
        D = r.split(""), S = D.length, w = 0;
        do {
          switch (P = D[w], n(), R = {}, P) {
            case"d":
              3 > F ? (R.type = 3, R.funDisplayText = c, R.subtype = 1 === F ? 0 : 2) : (R.type = 4, R.funDisplayText = d, R.subtype = 3 === F ? 5 : 6);
              break;
            case"M":
              R.type = 2, R.funDisplayText = u, 1 === F ? R.subtype = 0 : 2 === F ? R.subtype = 2 : 3 === F ? R.subtype = 5 : R.subtype = 6;
              break;
            case"y":
              R.type = 1, R.funDisplayText = s, R.subtype = 3 > F ? 2 : 0;
              break;
            case"h":
              R.type = 5, R.funDisplayText = h, R.subtype = 1 === F ? 0 : 2;
              break;
            case"H":
              R.type = 6, R.funDisplayText = f, R.subtype = 1 === F ? 0 : 2;
              break;
            case"m":
              R.type = 7, R.funDisplayText = p, R.subtype = 1 === F ? 0 : 2;
              break;
            case"s":
              R.type = 8, R.funDisplayText = g,
                R.subtype = 1 === F ? 0 : 2;
              break;
            case"t":
              2 === F && (R.type = 20, R.funDisplayText = x);
              break;
            case"%":
              a(), F && (B = D[w + 1], ++w, "d" === B ? (R.type = 10, R.funDisplayText = m) : "t" === B ? (R.type = 11, R.funDisplayText = C) : "g" === B ? (R.type = 12, R.funDisplayText = b) : w--);
              break;
            case":":
              a(), F && (R.type = 22, R.funDisplayText = y);
              break;
            case"/":
              a(), F && (R.type = 21, R.funDisplayText = T);
              break;
            default:
              l(F)
          }
          R.type && 15 !== R.type && A.push(R)
        } while (++w < S)
      } else A.push({type: 12, funDisplayText: b})
    }, format: function (t) {
      var r = "";
      return t !== e && (t = l(t), this.items.forEach(function (e) {
        r += e.funDisplayText(t, e)
      })), r
    }
  };
  var C = gr.utility = {
    CreateDateTime: function () {
      return new a
    }, DateTimeFormat: function (e, t) {
      return new h.DateTimeFormatter(t).format(l(e))
    }, NumberFormat: function (e, t) {
      return new h.NumericFormatter(t).format(e)
    }, NumberFormatToBigHZ: function (e, t) {
      var r, o = "$$0";
      if (t > 0) for (o += ".", r = 0; t > r; r++) o += "0";
      return C.NumberFormat(e, o)
    }, NumberFormatToBigHZAmount: function (e) {
      return C.NumberFormat(e, "$$")
    }, NumberRound45: function (e, t) {
      var r = Math.pow(10, t);
      return Math.round(e * r) / r
    }, NumberRound465: function (e, t) {
      var r, o, n, a = Math.pow(10, t + 2);
      return e = Math.floor(e * a), r = e % 10, o = e % 100 - r, e -= o + r, o >= 60 ? e += 100 : 50 === o && (r > 0 ? e += 100 : (n = e % 1e3 / 100, n % 2 && (e += 100))), e / a
    }, ColorFromRGB: function (t, r, o, n) {
      return n === e && (n = 1), u(t, r, o, n)
    }
  }
}(), function (e) {
  "use strict";
  var t = gr.enum_, r = gr.helper, o = gr.format, n = gr.utility, a = r.ensureNameText, i = r.enumName2Value,
    l = r.enumValue2Name, s = r.prototypeCopyExtend, u = gr.exp = {}, c = "[#", d = "#]", h = 2,
    f = u.Summary = function () {
    };
  f.prototype = {
    init: function (e, t) {
      var r = this;
      switch (e && (r.paramExp = new T(r.report, e)), t && (r.displayField = r.report.RunningFieldByName(t)), r.SummaryFun) {
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 15:
        case 16:
        case 17:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
        case 25:
        case 14:
        case 18:
        case 19:
          r.values = []
      }
    }, getAsFloat: function () {
      var e = this;
      return e.valueField ? e.valueField.AsFloat : e.value
    }, getValue: function () {
      return this.getAsFloat()
    }, setValue: function (e) {
      var t = this;
      t.valueField ? t.valueField.AsFloat = e : t.value = e
    }, getDisplayText: function () {
      return this.getValue() + ""
    }, isDateTimeValue: function () {
      var e = this;
      return e.argExp && e.argExp.isSingleVariable() && e.argExp.varItems[0].varField.isDateTimeValue()
    }, beginSummaryValue: function () {
      var t = this;
      t.recordCount = 0, 4 === t.SummaryFun || 5 === t.SummaryFun ? t.value = e : 27 !== t.SummaryFun && 28 !== t.SummaryFun && (t.value = 0), t.values && (t.values = [])
    }, summaryCurRecord: function () {
      var t = this, r = t.values, o = t.SummaryFun, n = t.paramExp, a = n ? n.calculate() : 0;
      switch (++t.recordCount, o) {
        case 1:
        case 2:
        case 27:
        case 28:
          isNaN(a) || (t.value += a);
          break;
        case 4:
        case 5:
          n && !n.isNull() && (t.value === e ? t.value = a : (5 === o && t.value < a || 4 === o && t.value > a) && (t.value = a, t.displayField && (t.stringValue = t.displayField.DisplayText)));
          break;
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
          r.push_back(a);
          break;
        case 12:
        case 13:
          n && n.isNull() && (t.value += 1);
          break;
        case 16:
        case 17:
        case 15:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
        case 25:
          n && !n.isNull() && r.push(a);
          break;
        case 14:
          n && r.push(n.getTextForDistinct());
          break;
        case 19:
        case 18:
          n && (a = n.getTextForDistinct(), 0 === t.value ? t.value = a : (19 === o && t.value.localeCompare(a) < 0 || 18 === o && t.value.localeCompare(a) > 0) && (t.value = a));
          break;
        case 26:
          t.value += Math.abs(t.Calculate())
      }
    }, endSummaryValue: function () {
      var t = this, r = t.values ? t.values.length : 0;
      switch (t.SummaryFun) {
        case 2:
          t.recordCount > 0 ? t.value /= t.recordCount : t.value = e;
          break;
        case 3:
          t.value = t.recordCount;
          break;
        case 6:
        case 20:
          t.value = r > 1 ? t.devSq() / (r - 1) : e;
          break;
        case 7:
        case 21:
          t.value = r > 1 ? t.devSq() / r : e;
          break;
        case 8:
        case 22:
          t.value = r > 1 ? Math.sqrt(t.devSq() / (r - 1)) : e;
          break;
        case 9:
        case 23:
          t.value = r > 1 ? Math.sqrt(t.devSq() / r) : e;
          break;
        case 10:
        case 24:
          t.value = t.aveDev();
          break;
        case 11:
        case 25:
          t.value = t.devSq();
          break;
        case 16:
        case 17:
          if (t.values.sort(function (e, t) {
              return e - t
            }), r < t.rankNo) return e;
          t.value = t.values[17 === t.SummaryFun ? r - t.rankNo : t.rankNo];
          break;
        case 13:
          t.value = t.recordCount - t.value;
          break;
        case 15:
          t.value = t.average();
          break;
        case 14:
          t.value = t.distinct()
      }
    }, average: function () {
      var t = this, r = t.values.length, o = 0;
      return t.values.forEach(function (e) {
        o += e
      }), r ? o / r : e
    }, aveDev: function () {
      var t = this, r = t.values.length, o = average(), n = 0;
      return t.values.forEach(function (e) {
        n += Math.abs(e - o)
      }), r ? n / r : e
    }, devSq: function () {
      var e = (average(), 0);
      return this.values.forEach(function (t) {
        var r = t - ave;
        e += r * r
      }), e
    }, distinct: function () {
      var e, t, r = 1, o = self.values.length, n = o;
      for (self.values.sort(function (e, t) {
        return e.localeCompare(t)
      }), e = self.values[0]; o > r;) t = self.values[r++], e === t ? n-- : e = t;
      return n
    }
  };
  var p = function (e, r, o) {
    var n, a = this, l = o.split(",");
    a.report = e, a.SummaryFun = i(t.SummaryFun, r), l.length > 0 && (n = l[0]), l.length > 1 && (a.RankNo = parseInt(l[1])), a.init(n)
  };
  p.prototype = {
    type: 4, getExpText: function () {
      var e = this;
      return l(t.SummaryFun, e.SummaryFun) + "(" + e.paramExp ? e.paramExp.getExpText() : "" + e.RankNo ? "," + e.RankNo : ")"
    }
  }, s(p, f);
  var g = function (e, r) {
    var o = this, n = r.split(",");
    o["var"] = i(t.SystemVarType, n[0]), n.length > 1 && (o.groupIndex = parseInt(n[1])), o.report = e
  };
  g.prototype = {
    type: 3, getAsFloat: function () {
      var e = this;
      return e.report.SystemVarValue2(e["var"], e.groupIndex)
    }, getValue: function () {
      return this.getAsFloat()
    }, getDisplayText: function () {
      return this.getAsFloat() + ""
    }, getExpText: function () {
      var e = this;
      return "SystemVar(" + l(t.SystemVarType, e["var"]) + e.groupIndex ? "," + e.groupIndex : ")"
    }, isDateTimeValue: function () {
      return 1 === this["var"]
    }
  };
  var m = function (e) {
    this.oParameter = e
  };
  m.prototype = {
    type: 2, getAsFloat: function () {
      return this.oParameter.AsFloat
    }, getValue: function () {
      return this.oParameter.Value
    }, getDisplayText: function () {
      var e = this;
      return e.valueField ? e.valueField.DisplayText : e.oParameter.DisplayText
    }, getExpText: function () {
      return a(this.oParameter.Name)
    }, isDateTimeValue: function () {
      return 6 === this.oParameter.DataType
    }
  };
  var C = function (e) {
    this.object = e
  };
  C.prototype = {
    type: 1, getAsFloat: function () {
      return this.object.AsFloat
    }, getValue: function () {
      return this.object.Value
    }, getDisplayText: function () {
      return this.object.DisplayText
    }, getExpText: function () {
      return a(this.object.Name)
    }, isDateTimeValue: function () {
      return 6 === this.object.FieldType
    }
  };
  var b = function (e) {
    this.object = e
  };
  b.prototype = {
    type: 5, getAsFloat: function () {
      return parseFloat(this.object.DisplayText)
    }, getValue: function () {
      return this.getDisplayText()
    }, getDisplayText: function () {
      return this.object.DisplayText
    }, getExpText: function () {
      return a(this.object.Name)
    }, isDateTimeValue: function () {
      return t0
    }
  };
  var v = function (e, t, r) {
    var o = this;
    o.varField = e, o.beginIndex = t, o.endIndex = r
  }, x = function (e, t) {
    function r() {
      for (u = c[n]; C.test(u);) u = c[++n]
    }

    function o(e, r) {
      var o = u === e;
      return o && (n = t.indexOf(r, a), -1 === n ? m = !1 : (d = t.substring(a + 1, n), i = ++n)), o
    }

    var n, a, i, l, s, u, c, d, h, f, p, g = this, m = !0, C = /\s/, b = /[\d.]/, x = /[()+-\/%*]/, T = /[()+-\/%*\s]/;
    for (c = t.split(""), s = c.length, g.expText = t, g.varItems = [], n = 0; s > n && m;) if (r(), x.test(u) || b.test(u)) n++; else {
      if (a = n, o("{", "}")) f = g.decodeVariable(e, d, 1); else {
        if (!o("[", "]")) {
          for (; s > n && !T.test(c[n]);) n++;
          i = n, d = t.substring(a, i)
        }
        if (r(), "(" === u) {
          for (l = ++n, p = 1; s > n;) if (u = c[n++], ")" === u) {
            if (p--, 0 >= p) break
          } else "(" === u && p++;
          h = t.substring(l, n - 1), i = n, f = g.decodeFunction(e, d, h)
        } else f = g.decodeVariable(e, d, 0)
      }
      f ? g.varItems.push(new v(f, a, i)) : m = !1
    }
    g.valid = m
  };
  x.prototype = {
    calculate: function () {
      var e = this, t = 0, r = "", o = NaN;
      return e.valid && (e.varItems.forEach(function (o) {
        t < o.beginIndex && (r += e.expText.substring(t, o.beginIndex)), t = o.endIndex, r += o.varField.getAsFloat() + ""
      }), r += e.expText.substr(t), o = gr.script.calcExp(r), (o >= Number.POSITIVE_INFINITY || o <= Number.NEGATIVE_INFINITY) && (o = NaN)), o
    }, isSingleVariable: function () {
      var e = this;
      return 1 === e.varItems.length && 0 === e.varItems[0].beginIndex && e.varItems[0].endIndex === e.expText.length
    }
  };
  var T = u.Expression = function (e, t) {
    x.call(this, e, t)
  };
  T.prototype = {
    decodeVariable: function (t, r, o) {
      var n, a = e;
      return o ? (n = t.ParameterByName(r)) && (a = new m(n)) : (n = t.RunningFieldByName(r)) ? a = new C(n) : (n = t.ParameterByName(r)) ? a = new m(n) : (n = t.ControlByName(r)) && (a = new b(n)), a
    }, decodeFunction: function (t, r, o) {
      var n = new p(t, r, o);
      return n.SummaryFun < 0 && ("SystemVar" === r ? (n = new g(t, o), n["var"] < 0 && (n = e)) : n = e), n
    }, getExpText: function () {
      var e = this, t = 0, r = "";
      return e.varItems.forEach(function (o) {
        t < o.beginIndex && (r += e.expText.substring(t, o.beginIndex)), t = o.endIndex, r += o.varField.getExpText()
      }), r += e.expText.substr(t)
    }, getTextForDistinct: function () {
      var e = this;
      return e.isSingleVariable() ? e.varItems[0].varField.getDisplayText() : e.calculate() + ""
    }, isNull: function () {
      return this.varItems.some(function (e) {
        return e.IsNull
      })
    }
  }, s(T, x);
  var y = function (e, t) {
    var r, n, a, i = this, l = 0, s = "";
    for (r = t.indexOf(":"); r >= 0 && (n = t.indexOf("[", l), !(-1 === n || n > r)) && (n = t.indexOf("]", r), -1 !== n);) l = n + 1, r = t.indexOf(":", l);
    r >= 0 && (s = t.substr(r + 1), t = t.substr(0, r)), x.call(i, e, t), !s && i.isSingleVariable() || (a = i.isSingleVariable() && i.varItems[0].varField.isDateTimeValue(), !a && s && (a = /[yMdthHms]/.test(s) && !/[0#e$]/.test(s)), i.formater = a ? new o.DateTimeFormatter(s) : new o.NumericFormatter(s))
  };
  y.prototype = {
    getDisplayText: function () {
      function e(e) {
        return '"' + e.expText + '" 不是有效的运算表达式'
      }

      var t, r = this;
      return r.valid ? r.formater ? (t = r.isSingleVariable() ? r.varItems[0].varField.getValue() : r.calculate(), r.formater.format(t)) : r.varItems[0].varField.getDisplayText() : e(this)
    }
  }, s(y, x);
  var S = function (e, t) {
    y.call(this, e, t)
  };
  S.prototype = {
    decodeVariable: T.prototype.decodeVariable,
    decodeFunction: T.prototype.decodeFunction,
    isPureNumeric: function () {
      var e = this;
      return o.NumericFormatter.prototype.isPrototypeOf(e.formater) || e.isSingleVariable() && !e.varItems[0].varField.isDateTimeValue()
    }
  }, s(S, y);
  var w = function (e) {
    this.oParameter = e
  };
  w.prototype = {
    getAsFloat: function () {
      return this.oParameter.AsFloat
    }, getValue: function () {
      return this.oParameter.Value
    }, getDisplayText: function () {
      return this.oParameter.DisplayText
    }, isDateTimeValue: function () {
      return 6 === this.oParameter.DataType
    }
  };
  var F = function (e, t) {
    var r = this;
    r.textBuilder = e, r.varType = t
  };
  F.prototype = {
    getAsFloat: function () {
      function e() {
        var e, t, r = n.graphs, o = r.length;
        for (e = 0; o > e && (t = r[e], !t.some(function (e) {
          return e === a
        })); e++) ;
        return t
      }

      var t, r = this, o = r.textBuilder, n = o.chart, a = o.seriesIndex, i = o.groupIndex;
      if (n.IsScatterGraph()) switch (t = n.Value(a, i), r.varType) {
        case 1:
          t = t.x;
          break;
        case 2:
          t = t.y;
          break;
        case 3:
          t = t.z;
          break;
        case 5:
          t = t.z / n.GetSeriesTotalValue(a);
          break;
        case 7:
          t = n.GetSeriesTotalValue(a)
      } else switch (t = n.Value(a, i), r.varType) {
        case 4:
          t /= n.GetGroupTotalValue(e(), i);
          break;
        case 6:
          t = n.GetGroupTotalValue(e(), i);
          break;
        case 5:
          t /= n.GetSeriesTotalValue(a);
          break;
        case 7:
          Val = n.GetSeriesTotalValue(a)
      }
      return t
    }, getValue: function () {
      return this.getAsFloat()
    }, getDisplayText: function () {
      var e = this, t = e.varType, r = e.textBuilder, o = r.seriesIndex, a = r.groupIndex, i = r.chart,
        l = i.IsScatterGraph(), s = i.graphSerieses[o], u = e.getAsFloat(), c = 0;
      if (l) switch (t) {
        case 1:
          c = 1;
          break;
        case 2:
          c = 2;
          break;
        case 3:
        case 7:
          c = 3;
          break;
        case 5:
          c = 5;
          break;
        case 8:
          c = 4
      } else switch (t) {
        case 1:
        case 8:
        case 9:
          c = 4;
          break;
        case 2:
        case 6:
        case 7:
          c = 2;
          break;
        case 4:
        case 5:
          c = 5
      }
      switch (c) {
        case 1:
          u = i.XAxis.ScaleFormatParser.format(u);
        case 2:
          u = l ? i.YAxisOfSeries(s).ScaleFormatParser.format(u) : s.ValueFormatParser.format(u);
          break;
        case 3:
          u = s.ValueFormatParser.format(u);
          break;
        case 4:
          u = 8 === t ? i.SeriesLabel(o) : i.GroupLabel(a);
          break;
        case 5:
          u = n.NumberFormat(u, "0.00%")
      }
      return u
    }, isDateTimeValue: function () {
      return 0
    }
  };
  var D = u.ChartTextExpression = function (e, t) {
    y.call(this, e, t)
  };
  D.prototype = {
    decodeVariable: function (t, r, o) {
      var n = t.chart.report.ParameterByName(r);
      return n ? new w(n) : e
    }, decodeFunction: function (e, r, o) {
      var n;
      return "chartvar" === r.toLowerCase() && (o = i(t.ChartVarType, o), o > 0 && (n = new F(e, o))), n
    }
  }, s(D, y);
  var P = function (e) {
    this.text = e
  };
  P.prototype = {
    getDisplayText: function () {
      return this.text
    }
  };
  var B = u.TextBuilder = function (e, t) {
    var r, o = this, n = e.XAxis ? D : S, a = 0, i = 0, l = 0;
    for (o.items = [], e.XAxis && (o.chart = e, e = this); (i = t.indexOf(c, l)) >= 0;) l = t.indexOf(d, i + h), l >= 0 && (r = new n(e, t.substring(i + h, l)), l += h, r.valid && (i > a && o.items.push(new P(t.substring(a, i))), a = l, o.items.push(r)), i = l);
    a < t.length && o.items.push(new P(t.substr(a)))
  };
  B.prototype = {
    forEach: function (e) {
      this.items.forEach(e)
    }, generateDisplayText: function () {
      var e = "";
      return this.forEach(function (t) {
        e += t.getDisplayText()
      }), e
    }, generateChartDisplayText: function (e, t) {
      var r = this;
      return r.seriesIndex = e, r.groupIndex = t, r.generateDisplayText()
    }, isStaticText: function () {
      var e = this;
      return 1 == e.items.length && P.prototype.isPrototypeOf(e.items[0])
    }
  }
}(), function (e) {
  "use strict";

  function t(t) {
    return t === tt ? 4 : t === e ? 1 : "_S" === t.substr(0, 2) ? 3 : 2
  }

  function r(e) {
    switch (e) {
      case 2:
        return rt;
      case 15:
        return ot;
      case 3:
        return nt;
      case 13:
        return at;
      case 4:
        return it;
      case 5:
        return lt
    }
    return ""
  }

  function n(e, t, r) {
    return new X(e - r, t - r, e + r, t + r)
  }

  gr.dom = {};
  var a = gr.enum_, i = gr.const_, l = gr.helper, s = gr.format, u = gr.exp, c = l.assignJSONMembers,
    d = l.enumMemberValid, h = l.enumBitMemberValid, f = l.colorMemberValid, p = l.fontString, g = l.fontHeight,
    m = l.intFixed, C = l.pixelsToHtml, b = l.percentToHtml, v = l.cloneDate, x = l.confirmDateValue,
    T = l.confirmCloneDateValue, y = l.strimDate, S = l.incDate, w = l.incDate2, F = l.confirmBooleanValue,
    D = l.ensureNameText, P = l.enumName2Value, B = l.enumValue2Name, R = l.rgba2color, A = l.colorAlpha,
    V = l.color2rgba, N = l.colorGradientLight, M = l.colorGradientDark, L = (l.colorValue2Html, l.prototypeLinkExtend),
    E = l.prototypeCopyExtend, I = l.createArray, O = l.assignObjectEx, G = l.assignObject, H = l.assignObjectAtom,
    k = l.parseXML, j = l.getRelativePosition, _ = (l.addEvent, l.bindEvents), W = l.toDegree, U = l.toRadians,
    z = gr.common, Y = u.Summary, J = z.DateTime, X = z.Rect, Z = z.Pen, q = z.Border, $ = z.Font, Q = z.FontWrapper,
    K = z.TextFormat, ee = z.Context, te = z.HtmlStyles, re = z.HtmlElement, oe = function () {
      var e = 0;
      return function () {
        return "-gr-canvas-" + e++
      }
    }(), ne = function (e) {
      var t = 0, r = 0;
      e.length && (e.forEach(function (e) {
        t += e.pxHeight
      }), e.forEach(function (e) {
        e.pctHeight = Math.round(100 * e.pxHeight / t), r += e.pctHeight
      }), e[0].pctHeight += 100 - r)
    }, ae = function (e) {
      var t = this;
      t.owner = e, t.items = []
    };
  ae.prototype = {
    loadFromJSON: function (e) {
      var t, r = 0;
      if (e) for (t = e.length; t > r;) this._doloadItem(e[r++])
    }, assign: function (e) {
      var t = this;
      t.RemoveAll(), e.forEach(function (e) {
        t.Add().assign(e)
      })
    }, attachData: function () {
      for (var e = this.items, t = e.length; t--;) e[t].attachData()
    }, prepare: function () {
      for (var e = this.items, t = 0, r = e.length; r > t;) e[t++].prepare()
    }, unprepare: function () {
      for (var e = this.items, t = e.length; t--;) e[t].unprepare()
    }, generate: function (e) {
      for (var t = this.items, r = 0, o = t.length; o > r;) t[r++].generate(e)
    }, itemByName: function (t) {
      var r, o = this.items, n = o.length;
      if (t) for (t = t.toUpperCase(); n--;) if (r = o[n], r.Name.toUpperCase() === t) return r;
      return e
    }, indexOfCOMIndex: function (e) {
      return e ? ("number" != typeof e && (e = this.IndexByName(e || "")), --e) : e = -1, e
    }, indexOf: function (e) {
      for (var t = this.items, r = t.length; r--;) if (e === t[r]) return r;
      return -1
    }, decodeItems: function (e) {
      var t, r = this, o = [];
      return e && (t = e.split(";"), t.forEach(function (e) {
        var t;
        e = e.trim(), t = r.itemByName(e), t && o.push(t)
      })), o
    }, forEach: function (e) {
      this.items.forEach(e)
    }, _doloadItem: function (e) {
      this.Add().loadFromJSON(e)
    }, get Count() {
      return this.items.length
    }, Item: function (e) {
      var t = this;
      return t.items[t.indexOfCOMIndex(e)]
    }, Add: function () {
      var e = this, t = e._createItem();
      return e.items.push(t), t
    }, Remove: function (e) {
      var t = this;
      e = t.indexOfCOMIndex(e), e >= 0 && t.items.splice(e, 1)
    }, RemoveAll: function () {
      this.items = []
    }, IndexByName: function (e) {
      var t = this.items, r = t.length;
      if (e) for (; r--;) if (t[r].Name === e) return r + 1;
      return -1
    }, ItemAt: function (t) {
      var r = this.items;
      return t--, t >= 0 && t < r.length ? r[t] : e
    }, ChangeItemOrder: function (e, t) {
      var r = this.items;
      if (o, len = r.length, t = Math.max(1, Math.min(len, t)) - 1, e != t && e > 0 && e-- <= len) if (o = r[e], t > e) {
        do r[e] = r[e + 1]; while (++e < t)
      } else {
        do r[e] = r[e - 1]; while (--e > t);
        r[t] = o
      }
    }
  };
  var ie = function (e) {
    ae.call(this, e)
  };
  ie.prototype = {
    _doloadItem: function (e) {
      var t = this.Add(P(a.ControlType, e.Type));
      t && t.loadFromJSON(e)
    }, assign: function (e) {
      var t = this;
      t.RemoveAll(), e.forEach(function (e) {
        t.Add(e.ControlType).assign(e)
      })
    }, layout: function () {
      var e = this, t = e.owner, r = e.items, o = t.isSingleDockControl && t.isSingleDockControl() ? 0 : t.getRect(),
        n = 0, a = r.length;
      if (o) for (; a > n;) r[n++].layout(o); else 13 === r[0].ControlType && r[0].layout(t.getRect())
    }, generate: function (e) {
      for (var t, r = this.items, o = r.length; o--;) t = r[o], t.Visible && t.generate(e)
    }, Add: function (t) {
      function r(t, r) {
        var o = e;
        switch (t) {
          case 1:
            o = new Se(r);
            break;
          case 2:
            o = new Ae(r);
            break;
          case 10:
            o = new Re(r);
            break;
          case 3:
            o = new Pe(r);
            break;
          case 4:
            o = new Fe(r);
            break;
          case 5:
            o = new De(r);
            break;
          case 7:
            o = new Ne(r);
            break;
          case 8:
            o = new we(r);
            break;
          case 9:
            o = new Le(r);
            break;
          case 11:
            o = new Nt(r);
            break;
          case 12:
            o = new Ve(r);
            break;
          case 13:
            o = new Oe(r);
            break;
          case 6:
            o = new Me(r)
        }
        return o
      }

      var o = this, n = r(t, o.owner);
      return n && o.items.push(n), n
    }
  }, L(ie, ae);
  var le = function (e) {
    ae.call(this, e)
  };
  le.prototype = {
    _doloadItem: function (e) {
      var t = this;
      t.items.push(new qe(t.owner).loadFromJSON(e))
    }, addTo: function (e) {
      var t, r, o = this, n = o.owner.ColumnContent.ContentCells, a = new qe(o.owner);
      return o.items.push(a), t = new xe(e, !1), e.items.push(t), a.TitleCell = t, t.Column = a, r = new ve(n), n.items.push(r), a.ContentCell = r, r.Column = a, a
    }, Add: function () {
      var e = this;
      return e.addTo(e.owner.ColumnTitle.TitleCells)
    }, Remove: function (e) {
      function t(e, r) {
        var o, n, a = e.indexOf(e);
        if (a >= 0) return e.splice(a, 1), 1;
        for (a = e.length, n = 0; a > n; n++) if (o = e[n], o.GroupTitle && t(o.SubTitles.items, r)) return 1;
        return 0
      }

      var r, o = this, n = o.owner, a = n.ColumnContent.ContentCells.items;
      e = o.indexOfCOMIndex(e), e >= 0 && (r = o.items[e], a.splice(a.indexOf(r.ContentCell), 1), t(n.ColumnTitle.TitleCells.items, r.TitleCell), o.items.splice(e, 1))
    }, RemoveAll: function () {
      var e = this, t = e.owner;
      e.items = [], t.ColumnContent.ContentCells.items = [], t.ColumnTitle.TitleCells.items = []
    }
  }, L(le, ae);
  var se = function (e, t) {
    var r = this;
    ae.call(r, e), r.supcell = t
  };
  se.prototype = {
    _doloadItem: function (e) {
      var t = this;
      t.items.push(new xe(t, e.GroupTitle).loadFromJSON(e))
    }, assign: function (e) {
      var t = this;
      t.items = [], e.forEach(function (e) {
        var r = new xe(t, e.GroupTitle);
        t.items.push(r), r.assign(e), e.GroupTitle && r.SubTitles.assign(e.SubTitles)
      })
    }, AddGroup: function (e, t) {
      var r = this, o = new xe(r, !0);
      return o.Name = e, o.Text = t, r.items.push(o), o
    }, RemoveGroup: function (e) {
      var t = this, r = t.Item(e);
      r && r.GroupTitle && (ae.prototype.Remove.call(t, e), t.items = t.items.concat(r.SubTitles.items))
    }, Add: function () {
    }, Remove: function (e) {
    }, RemoveAll: function () {
    }
  }, L(se, ae);
  var ue = function (e) {
    ae.call(this, e)
  };
  ue.prototype = {
    _doloadItem: function (e) {
      var t = this;
      t.items.push(new ve(t).loadFromJSON(e))
    }, assign: function (e) {
      var t = this;
      t.items = [], e.forEach(function (e) {
        var r = new ve(t);
        t.items.push(r), r.assign(e)
      })
    }, Add: function () {
    }, ChangeItemOrder: function (e, t) {
    }, Remove: function (e) {
    }, RemoveAll: function () {
    }
  }, L(ue, ae);
  var ce = function (e) {
    ae.call(this, e)
  };
  ce.prototype._createItem = function () {
    return new Xe(this.owner)
  }, L(ce, ae);
  var de = function (e) {
    ae.call(this, e)
  };
  de.prototype = {
    _createItem: function () {
      return new $e(this.owner)
    }, _doloadItem: function (e) {
      !e.PageGroup && this.Add().loadFromJSON(e)
    }
  }, L(de, ae);
  var he = function (e) {
    ae.call(this, e)
  };
  he.prototype._createItem = function () {
    return new ke(this.owner)
  }, L(he, ae);
  var fe = function (e) {
    ae.call(this, e)
  };
  fe.prototype._createItem = function () {
    return new je(this.owner)
  }, L(fe, ae);
  var pe = function (e) {
    ae.call(this, e)
  };
  pe.prototype._createItem = function () {
    return new Ke(this.owner)
  }, L(pe, ae);
  var ge = function (e) {
    var t = this;
    t.owner = e, t.report = e.report, t.Tag = ""
  };
  ge.prototype = {
    afterLoad: function (e) {
    }, loadFromJSON: function (e) {
      var t = this;
      return e && (c(t, e), t.afterLoad(e)), t
    }, assign: function (e) {
      var t, r, o = this;
      for (var n in e) o.hasOwnProperty(n) && (t = e[n], r = typeof t, "object" !== r && "array" !== r && (o[n] = t));
      o.Font && o.Font.assign(e.Font), o.children && o.children.forEach(function (t) {
        var r = e[t];
        r && (r.owner ? o[t].assign(r) : G(o[t], r))
      })
    }, getUsingFont: function () {
      return this.Font.UsingFont()
    }, toFillBack: function () {
      var e = this;
      return e.BackColor !== e.owner.BackColor
    }
  };
  var me = function (e) {
    var t = this;
    ge.call(t, e), t._borderCustom = !1, t.BackColor = e.BackColor, t.CanGrow = !1, t.CanShrink = !1, t.Font = new Q(e.Font), t._freeCell = !0, t.setFreeCell(!1)
  };
  me.prototype = {
    loadFromJSON: function (e) {
      var t = this;
      return e && (t.setFreeCell(!!e.FreeCell), c(t, e), t.afterLoad(e)), t
    }, afterLoad: function (e) {
      var t = this;
      f(t, "BackColor", t.report.viewer.alpha.background), f(t, "ForeColor", t.report.viewer.alpha.text), t.Font.loadFromJSON(e.Font), t.setBorderCustom(e.BorderCustom), t._borderCustom && t.Border.loadFromJSON(e.Border, t.report.viewer.alpha.border), e.FreeCell ? t.Controls.loadFromJSON(e.Control) : t.TextFormat.loadFromJSON(e)
    }, assign: function (e) {
      var t = this;
      t.setFreeCell(e.FreeCell), t.setBorderCustom(e.BorderCustom), ge.prototype.assign.call(t, e), t.Font.assign(e.Font), e.Border && G(t.Border, e.Border), e.FreeCell ? t.Controls.assign(e.Controls) : G(t.TextFormat, e.TextFormat)
    }, attachData: function () {
      var e = this;
      e.FreeCell ? e.Controls.attachData() : e._getWrapperClass().attachData.call(e)
    }, prepare: function () {
      var e, t = this, r = t.report.viewer, o = t.Controls, n = t.Font.font;
      t.FreeCell && (o.layout(), t.isSingleDockControl() || 2 === r.options.controlPosition || (e = t.getRect(), He.prototype.buildTableLayout.call(t, e.Width(), e.Height())), o.prepare()), n && (t.defaultFontStyle = r.selectFontItem(n)), t.tableRows && t.tableRows.forEach(function (e) {
        e.defaultStyle = r.selectSectionItem(e)
      }), t.defaultStyle = r.selectCellItem(t)
    }, unprepare: function () {
      var e = this;
      e.FreeCell ? e.Controls.unprepare() : e._getWrapperClass().unprepare.call(e), delete e.defaultFontStyle, delete e.defaultStyle
    }, generate: function (e) {
      var t = this;
      e = new re(t.htmlTag, e), t.generateContent(e)
    }, generateContent: function (e) {
      var t = this, r = t.report.viewer, o = t.Font.font;
      e.addClass(r.selectCell(t)), o && e.addClass(r.selectFont(o, t.defaultFontStyle)), t.addStyles && t.addStyles(e), t.FreeCell ? t.isSingleDockControl() ? t.Controls.items[0].generateInCell(e) : t.tableRows ? (e.addStyle("padding", "0px"), e = new re("table", e), e.addStyle("border-collapse", "collapse"), He.prototype.generateTableRows.call(t, e)) : (e.addStyle("position", "relative"), t.Controls.generate(e)) : t._getWrapperClass().generateInCell.call(t, e)
    }, setFreeCell: function (e) {
      var t, r = this;
      r._freeCell !== e && (r._freeCell = e, e ? (r.Controls = new ie(r), delete r.ControlType) : (t = r._getWrapperClass(), t.createWrapper.call(r), r.ControlType = t.ControlType, delete r.Controls))
    }, setBorderCustom: function (e) {
      var t = this;
      t._borderCustom !== e && (t._borderCustom = e, e ? t.Border = new q(12) : delete t.Border)
    }, setForeColor: function (e) {
      var t = this;
      t.FreeCell ? t.Controls.forEach(function (t) {
        t.ForeColor = e
      }) : t.ForeColor = e
    }, getDisplayText: function () {
      var e = this;
      return e._getWrapperClass().getDisplayText.call(e)
    }, getControls: function () {
      var e = this;
      return e.FreeCell ? e.Controls.items : [e]
    }, isSingleDockControl: function () {
      var e = this.Controls.items;
      return 1 === e.length && 5 === e[0].Dock
    }, isControlPositionClass: function () {
      return 0
    }, inDynamicRow: function () {
      return 0
    }, _getDisplayText: function () {
      var e = this;
      return e._getWrapperClass()._getDisplayText.call(e)
    }
  }, E(me, ge);
  var Ce = function (e, t, r) {
    var o = this;
    me.call(o, e), o.row = t, o.col = r, o.ColSpan = 1, o.RowSpan = 1, o.Text = "", o.DataName = ""
  };
  Ce.prototype = {
    generate: function (e) {
      var t = this;
      e = new re("td", e), t.ColSpan > 1 && e.addAttribute("colspan", t.ColSpan + ""), t.RowSpan > 1 && e.addAttribute("rowspan", t.RowSpan + ""), t.generateContent(e)
    }, getOwnerGrid: function () {
      return this.owner
    }, _getWrapperClass: function () {
      return we.prototype
    }, getRect: function () {
      for (var e = this, t = e.owner, r = e.col, o = e.row, n = r + e.ColSpan, a = o + e.RowSpan, i = 0, l = 0; n > r;) i += t.columns[r++].pxWidth;
      for (; a > o;) l += t.rows[o++].pxHeight;
      return new X(0, 0, i, l)
    }, inDynamicRow: function () {
      return this.owner.owner.inDynamicRow()
    }, get FreeCell() {
      return !!this._freeCell
    }, set FreeCell(e) {
      this.setFreeCell(e)
    }, get BorderCustom() {
      return !!this._borderCustom
    }, set BorderCustom(e) {
      this.setBorderCustom(e)
    }
  }, E(Ce, me);
  var be = function (e) {
    var t = this;
    me.call(t, e), t.Column = ""
  };
  be.prototype = {
    afterLoad: function (e) {
      var t = this;
      me.prototype.afterLoad.call(t, e), t.Column = t.owner.owner.Columns.itemByName(t.Column)
    }, getOwnerGrid: function () {
      return this.owner.owner
    }
  }, E(be, me);
  var ve = function (e) {
    var t = this;
    be.call(t, e.owner), t.DataField = ""
  };
  ve.prototype = {
    htmlTag: "td", _getWrapperClass: function () {
      return Fe.prototype
    }, afterLoad: function (e) {
      var t = this;
      be.prototype.afterLoad.call(t, e), t.Column.ContentCell = t
    }, isControlPositionClass: function () {
      return this.FreeCell
    }, get Name() {
      return this.Column.Name
    }, set Name(e) {
      this.Column.Name = e
    }, get FreeCell() {
      return !!this._freeCell
    }, set FreeCell(e) {
      this.setFreeCell(e)
    }, get BorderCustom() {
      return !!this._borderCustom
    }, set BorderCustom(e) {
      this.setBorderCustom(e)
    }, getRect: function () {
      var e = this;
      return new X(0, 0, e.Column.pxWidth, e.owner.pxHeight)
    }, inDynamicRow: function () {
      return 1
    }
  }, E(ve, be);
  var xe = function (e, t) {
    var r = this;
    be.call(r, e.owner), r.SupCell = e.supcell, r.Visible = !0, r.GroupTitle = t, r.Text = "", r.Height = 0, t && (r._name = "", r.SubTitles = new se(r.owner, r))
  };
  xe.prototype = {
    htmlTag: "th", _getWrapperClass: function () {
      return we.prototype
    }, afterLoad: function (e) {
      var t = this;
      be.prototype.afterLoad.call(t, e), t.GroupTitle ? (t._name = e.Name, t.SubTitles.loadFromJSON(e.ColumnTitleCell)) : t.Column.TitleCell = t
    }, assign: function (e) {
      var t = this;
      be.prototype.assign.call(t, e), t.GroupTitle && t.SubTitles.assign(e.SubTitles)
    }, prepare: function () {
      var e = this;
      be.prototype.prepare.call(e), e.SubTitles && e.SubTitles.prepare()
    }, addStyles: function (e) {
      var t = this, r = t.GroupTitle ? 1 : t.owner.layerCount - t.owner.generatingLayer;
      t.colspan > 1 && e.addAttribute("colspan", t.colspan + ""), r > 1 && e.addAttribute("rowspan", r + "")
    }, getRect: function () {
      var e = this, t = e.GroupTitle ? 1 : e.owner.layerCount - e.layer,
        r = e.GroupTitle ? e.Column.pxWidth : e.findLastColumn().pxRight - e.findFirstColumn().pxLeft;
      return new X(0, 0, r, e.owner.pxHeight * t)
    }, findFirstColumn: function () {
      var e = this;
      return e.GroupTitle ? e.SubTitles.items[0].findFirstColumn() : e.Column
    }, findLastColumn: function () {
      var e, t = this, r = t.Column;
      return t.GroupTitle && (e = t.SubTitles.items, r = e[e.length - 1].findLastColumn()), r
    }, encloseColumnObject: function (e) {
      var t = this;
      t.owner.owner._ColumnMoveTo(e, t)
    }, get FreeCell() {
      return !!this._freeCell
    }, set FreeCell(e) {
      this.setFreeCell(e)
    }, get BorderCustom() {
      return !!this._borderCustom
    }, set BorderCustom(e) {
      this.setBorderCustom(e)
    }, get Name() {
      var e = this;
      return e.GroupTitle ? e._name : e.Column.Name
    }, set Name(e) {
      var t = this;
      t.GroupTitle ? t._name = e : t.Column.Name = e
    }, EncloseColumn: function (e) {
      var t = this, r = t.owner.owner, o = r.Columns.Item(e);
      o && r._ColumnMoveTo(o, t)
    }, AddSubGroupTitle: function (e, t) {
      return this.SubTitles.AddGroup(e, t)
    }
  }, E(xe, be);
  var Te = function (e) {
    var t = this;
    ge.call(t, e), t.Left = 0, t.Top = 0, t.Width = 0, t.Height = 0, t.Anchor = 3, t.Dock = 0, t.Center = 0, t.AlignColumnSide = 3, t.AlignColumn = "", t.AlignColumnEx = "", t.Locked = !1, t.ShiftMode = 1, t.PaddingLeft = 0, t.PaddingRight = 0, t.PaddingTop = 0, t.PaddingBottom = 0, t.BackColor = e.BackColor, t.BackStyle = 2, t.ForeColor = e.ForeColor ? e.ForeColor : A(0, t.report.viewer.alpha.text), t.Visible = !0, t.CustomDraw = !1, t.Border = new q(0), t.Font = new Q(e.Font), t.Name = "", t.CustomDrawScript = ""
  };
  Te.prototype = {
    children: ["Border"], attachData: function () {
    }, afterLoad: function (e) {
      var t = this;
      d(t, "Dock", a.DockStyle), d(t, "Center", a.CenterStyle), d(t, "AlignColumnSide", a.AlignColumnSideStyle), d(t, "ShiftMode", a.ShiftMode), d(t, "BackStyle", a.BackStyle), h(t, "Anchor", a.AnchorStyle), f(t, "BackColor", t.report.viewer.alpha.background), f(t, "ForeColor", t.report.viewer.alpha.text), t.Font.loadFromJSON(e.Font), t.Border.loadFromJSON(e.Border, t.report.viewer.alpha.border)
    }, layout: function (t) {
      var r, o = this, n = o.report, a = n.size2Pixel(o.Width), i = n.size2Pixel(o.Height),
        l = new X(n.size2Pixel(o.Left), n.size2Pixel(o.Top), a, i), s = n.getRunningColumnByName(o.AlignColumn),
        u = n.getRunningColumnByName(o.AlignColumnEx);
      if (l.right += l.left, l.bottom += l.top, s && !s.Visible && (s = e), u && !u.Visible && (u = e), s || u) switch (s && u ? u.pxLeft < s.pxLeft && (r = u, u = s, s = r) : u ? s = u : u = s, o.AlignColumnSide) {
        case 1:
          l.left = s.pxLeft, l.right = l.left + a;
          break;
        case 2:
          l.right = u.pxRight, l.left = l.right - a;
          break;
        default:
          l.left = s.pxLeft, l.right = u.pxRight
      } else {
        if (0 !== o.Dock) switch (l = t.clone(), o.Dock) {
          case 5:
            t.left = t.right, t.top = t.bottom;
            break;
          case 1:
            l.right = Math.min(t.right, t.left + a), t.left = l.right;
            break;
          case 2:
            l.bottom = Math.min(t.bottom, t.top + i), t.top = l.bottom;
            break;
          case 3:
            l.left = Math.max(t.left, t.right - a), t.right = l.left;
            break;
          case 4:
            l.top = Math.max(t.top, t.bottom - i), t.bottom = l.top
        }
        0 !== o.Center && 5 !== o.Dock && (1 !== o.Center && 3 !== o.Center || (a = l.Width(), l.left = (t.left + t.right - a) / 2, l.right = l.left + a), 2 !== o.Center && 3 !== o.Center || (i = l.Height(), l.top = (t.top + t.bottom - i) / 2, l.bottom = l.top + i))
      }
      o.pxRect = l
    }, prepare: function () {
      var e = this, t = e.report.viewer, r = !e.owner.isSingleDockControl && e.owner.isControlPositionClass();
      e.defaultStyle = t.selectControlItem(e), e.Font.font && (e.defaultFontStyle = t.selectFontItem(e.Font.font)), r && (e.defaultPositionStyle = t.selectPositionItem(e))
    }, unprepare: function () {
      var e = this;
      delete e.defaultStyle, delete e.defaultFontStyle, delete e.defaultPositionStyle
    }, generate: function (e) {
      var t, r = this, o = r.report.viewer, n = r.pxRect;
      t = new re("span", e), t.addClass(o.selectControl(r)), r.Font.font && t.addClass(o.selectFont(r.Font.font, r.defaultFontStyle)), r.defaultPositionStyle ? t.addClass(o.selectPosition(r)) : (t.addStyle("left", C(n.left)), t.addStyle("top", C(n.top)), t.addStyle("width", C(r.getContentWidth())), t.addStyle("height", C(r.getContentHeight()))), r.generateContent(t)
    }, generateInCell: function (e) {
      this.generateContent(e)
    }, toFillBack: function () {
      var e = this;
      return 1 === e.BackStyle && e.BackColor !== e.owner.BackColor
    }, getContentWidth: function () {
      var e = this, t = e.Border;
      return e.pxRect.Width() - e.PaddingLeft - e.PaddingRight - t.getLeftWidth() - t.getRightWidth()
    }, getContentHeight: function () {
      var e = this, t = e.Border;
      return e.pxRect.Height() - e.PaddingTop - e.PaddingBottom - t.getTopWidth() - t.getBottomWidth()
    }, SetBounds: function (e, t, r, o) {
      var n = this;
      n.Left = e, n.Top = t, n.Width = r - e, n.Height = o - t
    }, BringToFront: function () {
      var e = this, t = e.owner.Controls;
      t.ChangeItemOrder(t.indexOf(e), t.length)
    }, SendToBack: function () {
      var e = this, t = e.owner.Controls;
      t.ChangeItemOrder(t.indexOf(e), 1)
    }
  }, E(Te, ge);
  var ye = function (e) {
    var t = this;
    Te.call(t, e), t.createWrapper(), t.AsTextBox = t
  };
  ye.prototype = {
    children: ["Border", "TextFormat"], afterLoad: function (e) {
      var t = this;
      Te.prototype.afterLoad.call(t, e), t.TextFormat.loadFromJSON(e)
    }, createWrapper: function () {
      var e = this;
      e.PaddingLeft = 2, e.PaddingRight = 1, e.PaddingTop = 1, e.PaddingBottom = 1, e.CanGrow = !1, e.CanShrink = !1, e.ShrinkFontToFit = !1, e.ForeColor = e.owner.ForeColor ? e.owner.ForeColor : A(0, e.report.viewer.alpha.text), e.TextFormat = new K, e.GetDisplayTextScript = ""
    }, generateContent: function (e) {
      var t = this;
      16 & t.TextFormat.TextAlign || (t.TextFormat.WordWrap || 64 & t.TextFormat.TextAlign ? (e.addStyle("display", "table"), e = new re("span", e), e.addStyle("display", "table-cell"), e.addStyle("vertical-align", 32 & t.TextFormat.TextAlign ? "middle" : "bottom")) : e.addStyle("line-height", C(t.getContentHeight()))), t.generateInCell(e)
    }, generateInCell: function (e) {
      var t = "<br />", r = this.getDisplayText();
      /[\r\n &<>"]/.test(r) && (r = r.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;").replace(/"/g, "&quot;").replace(/\r\n/g, t).replace(/\r/g, t).replace(/\n/g, t)), e.innerText = r
    }, getDisplayText: function () {
      var e = this;
      return e.displayTextAssigned = !1, e.doingGetDisplayText || (e.doingGetDisplayText = !0, e.report.fireTextBoxGetDisplayText(e), e.doingGetDisplayText = !1), e.displayTextAssigned ? e.assignedDisplayText : e._getDisplayText()
    }, setDisplayText: function (e) {
      var t = this;
      t.assignedDisplayText = e, t.displayTextAssigned = !0
    }
  }, E(ye, Te);
  var Se = function (e) {
    var t = this;
    ye.call(t, e), t.Text = "", t.Parameter = ""
  };
  Se.prototype = {
    ControlType: 1, _getDisplayText: function () {
      var e = this;
      return e.valueField ? e.valueField.DisplayText : e.oParameter ? e.oParameter.DisplayText : e.Text
    }, attachData: function () {
      var e = this;
      e.Parameter && (e.oParameter = e.report.ParameterByName(e.Parameter))
    }, unprepare: function () {
      var e = this;
      ye.prototype.unprepare.call(e), delete e.oParameter
    }, get DisplayText() {
      return this.getDisplayText()
    }, set DisplayText(e) {
      this.setDisplayText(e)
    }, get AsStaticBox() {
      return this
    }
  }, E(Se, ye);
  var we = function (e) {
    var t = this;
    ye.call(t, e), t.Text = ""
  };
  we.prototype = {
    ControlType: 8, createWrapper: function () {
      var e = this;
      ye.prototype.createWrapper.call(e), e.Text = ""
    }, _getDisplayText: function () {
      return this.textBuilder.generateDisplayText()
    }, attachData: function () {
      var e = this;
      e.textBuilder = new u.TextBuilder(e.report, e.Text)
    }, getSummaryExpFields: function () {
      var e = [];
      return this.textBuilder.forEach(function (t) {
        t.varItems && t.varItems.forEach(function (t) {
          4 === t.varField.type && e.push(t.varField)
        })
      }), e
    }, getParameterExpFields: function () {
      var e = [];
      return this.textBuilder.forEach(function (t) {
        t.varItems && t.varItems.forEach(function (t) {
          2 === t.varField.type && e.push(t.varField)
        })
      }), e
    }, isPureNumericExpression: function () {
      var e = this;
      return e.prepare(), e.textBuilder && 1 === e.textBuilder.items.length && e.textBuilder.items[0].isPureNumeric()
    }, get DisplayText() {
      return this.getDisplayText()
    }, set DisplayText(e) {
      this.setDisplayText(e)
    }, get AsFloat() {
      var e = this.textBuilder.items[0].calculate();
      return isNaN(e) ? 0 : e
    }, get Value() {
      return this.getDisplayText()
    }, get AsMemoBox() {
      return this
    }
  }, E(we, ye);
  var Fe = function (e) {
    var t = this;
    ye.call(t, e), t.DataField = ""
  };
  Fe.prototype = {
    ControlType: 4, createWrapper: function () {
      var e = this;
      ye.prototype.createWrapper.call(e), e.DataField = ""
    }, attachData: function () {
      var e = this;
      e.oDataField = e.report.RunningFieldByName(e.DataField)
    }, unprepare: function () {
      var e = this;
      ye.prototype.unprepare.call(e), delete e.oDataField
    }, _getDisplayText: function () {
      var e = this.oDataField;
      return e ? e.DisplayText : ""
    }, get DisplayText() {
      return this.getDisplayText()
    }, set DisplayText(e) {
      this.setDisplayText(e)
    }, get AsFieldBox() {
      return this
    }
  }, E(Fe, ye);
  var De = function (e) {
    var t = this;
    ye.call(t, e), t.SummaryFun = 1, t.RankNo = 1, t.DataField = "", t.DisplayField = "", t.Format = ""
  };
  De.prototype = {
    ControlType: 5, afterLoad: function (e) {
      var t = this;
      ye.prototype.afterLoad.call(t, e), d(t, "SummaryFun", a.SummaryFun)
    }, attachData: function () {
      var e, t, r = this, o = r.Format;
      r.init(r.DataField, r.DisplayField), o || (e = r.report.RunningFieldByName(r.DataField), e && (o = e.Format)), t = r.paramExp, t && 1 === t.varItems.length && 1 === t.varItems[0].type && 6 === t.varItems[0].object.FieldType ? r.formater = new s.DateTimeFormatter(o) : r.formater = new s.NumericFormatter(o)
    }, _getDisplayText: function () {
      var e, t = this, r = t.SummaryFun, o = t.valueField;
      if (18 === r || 19 === r || t.displayField) e = o ? o.DisplayText : t.value; else {
        if (o) {
          if (o.IsNull) return "";
          e = o.AsFloat
        } else e = t.value;
        e = t.formater.format(e)
      }
      return e
    }, get DisplayText() {
      return this.getDisplayText()
    }, set DisplayText(e) {
      this.setDisplayText(e)
    }, get Value() {
      return this.getValue()
    }, set Value(e) {
      this.setValue(e)
    }, get AsSummaryBox() {
      return this
    }
  }, E(De, ye), E(De, Y);
  var Pe = function (e) {
    var t = this;
    ye.call(t, e), t.SystemVar = 1, t.GroupIndex = 1, t.Format = ""
  };
  Pe.prototype = {
    ControlType: 3, afterLoad: function (e) {
      var t = this;
      ye.prototype.afterLoad.call(t, e), d(t, "SystemVar", a.SystemVarType)
    }, attachData: function () {
      var e = this;
      1 === e.SystemVar ? e.formater = new s.DateTimeFormatter(e.Format) : e.formater = new s.NumericFormatter(e.Format)
    }, _getDisplayText: function () {
      var e = this;
      return e.formater.format(e.report.SystemVarValue2(e.SystemVar, e.GroupIndex))
    }, get DisplayText() {
      return this.getDisplayText()
    }, set DisplayText(e) {
      this.setDisplayText(e)
    }, get AsSystemVarBox() {
      return this
    }
  }, E(Pe, ye);
  var Be = function (e) {
    Te.call(this, e)
  };
  Be.prototype = {
    generateContent: function (e) {
      var t, r, o = this, n = o;
      if (o.owner.inDynamicRow()) {
        n = o.cloneDraw();
        for (t in o) r = o[t], "object" != typeof r || n[t] || (n[t] = r)
      }
      return o.report.registerCanvas(n, e), n
    }, resize: function () {
      var e = this, t = e.canvas;
      t.width = Math.min(t.parentNode.clientWidth, window.innerWidth), t.height = Math.min(t.parentNode.clientHeight, window.innerHeight), e.draw(1)
    }
  }, E(Be, Te);
  var Re = function (e) {
    var t = this;
    Be.call(t, e), t.L2R = !0, t.U2D = !0, t.LinePen = new Z
  };
  Re.prototype = {
    ControlType: 10, children: ["LinePen"], afterLoad: function (e) {
      var t = this;
      Te.prototype.afterLoad.call(t, e), t.LinePen.loadFromJSON(e.Pen, t.report.viewer.alpha.stroke)
    }, cloneDraw: function (e) {
      var t = this, r = new Re(t.owner);
      return r.assign(t), r
    }, draw: function (e) {
      var t, r = this, o = r.canvas, n = new ee(o.getContext("2d")), a = 0, i = 0, l = o.width, s = o.height;
      n.SelectPen(r.LinePen), r.L2R || (t = a, a = l, l = t), r.U2D || (t = i, i = s, s = t), n.drawLine(a, i, l, s)
    }, get AsLine() {
      return this
    }
  }, E(Re, Be);
  var Ae = function (e) {
    var t = this;
    Be.call(t, e), t.ShapeType = 4, t.FillColor = 0, t.FillStyle = 2, t.CornerDx = 4, t.CornerDy = 4, t.LinePen = new Z
  };
  Ae.prototype = {
    ControlType: 2, children: ["LinePen"], afterLoad: function (e) {
      var t = this;
      Te.prototype.afterLoad.call(t, e), d(t, "ShapeType", a.ShapeBoxType), d(t, "FillStyle", a.BackStyle), f(t, "FillColor", t.report.viewer.alpha.background), t.LinePen.loadFromJSON(e.Pen, t.report.viewer.alpha.stroke)
    }, cloneDraw: function (e) {
      var t = this, r = new Ae(t.owner);
      return r.assign(t), r
    }, draw: function (e) {
      var t, r, o, n = this, a = n.canvas, i = a.width, l = a.height, s = new ee(a.getContext("2d")),
        u = n.LinePen.Width / 2, c = 1 === n.FillStyle;
      switch (s.SelectPen(n.LinePen), c && s.setFillColor(n.FillColor), n.ShapeType) {
        case 7:
          s.drawLine(0, u, i, u);
          break;
        case 1:
          t = s.circle;
          break;
        case 2:
          t = s.ellipse;
          break;
        case 3:
          t = s.rectangle;
          break;
        case 6:
          t = s.square;
          break;
        case 4:
          t = s.roundRectangle, r = 1;
          break;
        case 5:
          t = s.roundSquare, r = 1
      }
      t && (o = [u, u, i - 2 * u, l - 2 * u], r && o.push(n.CornerDx, n.CornerDy), o.push(c), t.apply(s, o)), c && s.resetFillStyle(), s.RestorePen()
    }, get AsShapeBox() {
      return this
    }
  }, E(Ae, Be);
  var Ve = function (e) {
    var t = this;
    Be.call(t, e), t.Text = "", t.BarcodeType = 4, t.BarWidth = 0, t.BarRatio = 2, t.CheckSum = !1, t.Direction = 1, t.Alignment = 2, t.CaptionPosition = 3, t.CaptionAlignment = 2, t.PDF417Rows = 0, t.PDF417Columns = 0, t.PDF417ErrorLevel = 0, t.PDF417Simple = !1, t.QRCodeVersion = 0, t.QRCodeErrorLevel = 1, t.QRCodeMask = 0, t.DtmxEncoding = 2, t.DtmxMatrixSize = 2, t.DtmxModuleSize = 0
  };
  Ve.prototype = {
    ControlType: 12, attachData: function () {
      var e = this;
      e.textBuilder = new u.TextBuilder(e.report, e.Text)
    }, afterLoad: function (e) {
      var t = this, r = e.BarcodeType;
      switch (Te.prototype.afterLoad.call(t, e), r) {
        case"Code25_Interleaved":
          t.BarcodeType = 1;
          break;
        case"Code25_Industrial":
          t.BarcodeType = 2;
          break;
        case"Code25_Matrix":
          t.BarcodeType = 3;
          break;
        case"Code39Extended":
          t.BarcodeType = 5;
          break;
        case"Code93Extended":
          t.BarcodeType = 10;
          break;
        default:
          d(t, "BarcodeType", a.BarcodeType)
      }
      d(t, "Direction", a.BarcodeDirection), d(t, "Alignment", a.StringAlignment), d(t, "CaptionPosition", a.BarcodeCaptionPosition), d(t, "CaptionAlignment", a.StringAlignment), d(t, "DtmxEncoding", a.DtmxEncoding), d(t, "DtmxMatrixSize", a.DtmxMatrixSize)
    }, getDisplayText: function () {
      return this.textBuilder.generateDisplayText()
    }, generateContent: function (e) {
      var t, r = this, o = r.BarcodeType, n = encodeURI(window.rubylong.grhtml5.barcodeURL),
        a = {type: o, text: r.DisplayText, codepage: r.report.CodePage};
      t = Be.prototype.generateContent.call(r, e), 1 !== r.CaptionPosition && (a.requireShowText = !0), n && a.text && (51 === o ? (a.Version = r.QRCodeVersion, a.ErrorLevel = r.QRCodeErrorLevel, a.Mask = r.QRCodeMask) : 50 === o ? (a.Rows = r.PDF417Rows, a.Columns = r.PDF417Columns, a.ErrorLevel = r.PDF417ErrorLevel, a.Simple = r.PDF417Simple) : 52 === o ? (a.Encoding = r.DtmxEncoding, a.MatrixSize = r.DtmxMatrixSize, a.ModuleSize = r.DtmxModuleSize) : a.CheckSum = r.CheckSum, n += "?params=" + encodeURIComponent(JSON.stringify(a)), window.rubylong.ajax(n, function (e, t) {
        var r = this;
        t && (r.data = JSON.parse(e.responseText), r.draw())
      }, t, "POST"))
    }, cloneDraw: function (e) {
      var t = this, r = new Ve(t.owner);
      return r.assign(t), r
    }, draw: function (e) {
      var t = this;
      t.data && t._dodraw()
    }, _dodraw: function () {
      function e(e) {
        return 50 === e || 51 === e || 52 === e
      }

      function t(e) {
        return 15 === e || 14 === e || 16 === e || 17 === e || 18 === e
      }

      function r(e) {
        return parseInt(e, 16)
      }

      function o() {
        var e, t, o, n, a, i, u, g = l / D, m = s / P, C = {
          init: function () {
            f.right = U.left, f.bottom = U.top + m
          }, draw: function () {
            f.right += g * a, b.fillRect(f, h), f.left = f.right
          }, end: function () {
            f.right += g * a, b.fillRect(f, h), f.top = f.bottom, f.bottom += m, f.left = U.left, f.right = U.left
          }
        }, v = {
          init: function () {
            f.left = U.right, f.top = U.bottom - m
          }, draw: function () {
            f.left -= g * a, b.fillRect(f, h), f.right = f.left
          }, end: function () {
            f.left -= g * a, b.fillRect(f, h), f.bottom = f.top, f.top -= m, f.left = U.right, f.right = U.right
          }
        }, w = {
          init: function () {
            f.bottom = U.top, f.left = U.right - m
          }, draw: function () {
            f.bottom += g * a, b.fillRect(f, h), f.top = f.bottom
          }, end: function () {
            f.bottom += g * a, b.fillRect(f, h), f.right = f.left, f.left -= m, f.top = U.top, f.bottom = U.top
          }
        }, F = {
          init: function () {
            f.top = U.bottom, f.right = U.left + m
          }, draw: function () {
            f.top -= g * a, b.fillRect(f, h), f.bottom = f.top
          }, end: function () {
            f.top -= g * a, b.fillRect(f, h), f.left = f.right, f.right += m, f.top = U.bottom, f.bottom = U.bottom
          }
        };
        switch (50 != y && (g > m ? g = m : m = g), c = g * D, d = m * P, j = (l - c) / 2, _ = (s - d) / 2, V || (p = j, j = _, _ = p), U.left += j, U.right = U.left + c, U.top += _, U.bottom = U.top + d, S) {
          case 1:
            u = C;
            break;
          case 2:
            u = v;
            break;
          case 3:
            u = w;
            break;
          default:
            u = F
        }
        for (f = U.clone(), u.init(), R = B.length, p = 0, t = 0; P > t; ++t) {
          for (o = r(B[p++]) << 4 | r(B[p++]), n = 128, h = o & n ? T : x, a = 1, n >>= 1, e = 1; D > e; ++e) 0 == e % 8 && (o = r(B[p++]) << 4 | r(B[p++]), n = 128), i = o & n ? T : x, h === i ? ++a : (u.draw(), h = i, a = 1), n >>= 1;
          u.end()
        }
      }

      function n() {
        switch (y) {
          case 15:
            I = 15, O = 0;
            break;
          case 16:
          case 17:
          case 18:
            I = 12, O = 12
        }
      }

      function a() {
        function e() {
          var e = m.BarRatio;
          switch (y) {
            case 1:
            case 2:
            case 4:
            case 14:
            case 15:
            case 5:
            case 13:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
              2 > e && (e = 2), e > 3 && (e = 3);
              break;
            case 3:
              2.25 > e && (e = 2.25), e > 3 && (e = 3)
          }
          return [1, e, 1.5 * e, 2 * e]
        }

        function t(e) {
          var t = r(e);
          return {w: h[t % 4], lt: Math.floor(t / 4)}
        }

        function o(e) {
          for (var r = e.length, o = 0; r-- > 0;) o += t(e[r]).w;
          return o
        }

        var n, a, i, d, h = e(), g = o(B), a = m.BarWidth, C = M / A.length / 10, v = 2 * s / 5,
          w = N ? s + 2 * L / 3 : s;
        if (G = C * I, H = C * O, u = a ? report.UnitToPixels(a) : (l - G - H) / g, c = u * g + G + H, k = c > l + 1, !k) {
          switch (m.Alignment) {
            case 1:
              j = G;
              break;
            case 2:
              j = (l - c) / 2 + G;
              break;
            default:
              j = l - c + G
          }
          switch (f = U, S) {
            case 1:
              f.left += j;
              break;
            case 2:
              f.right -= j;
              break;
            case 3:
              f.top += j;
              break;
            default:
              f.bottom -= j
          }
          for (p = 0; R > p; ++p) switch (n = t(B[p]), a = n.w * u, i = 2 === n.lt ? v : 3 == n.lt ? w : s, d = 0 == n.lt ? x : T, S) {
            case 1:
              f.right = f.left + a, f.bottom = f.top + i, b.fillRect(f, d), f.left = f.right;
              break;
            case 2:
              f.left = f.right - a, f.bottom = f.top + i, b.fillRect(f, d), f.right = f.left;
              break;
            case 3:
              f.bottom = f.top + a, f.left = f.right - i, b.fillRect(f, d), f.top = f.bottom;
              break;
            default:
              f.top = f.bottom - a, f.left = f.right - i, b.fillRect(f, d), f.bottom = f.top
          }
        }
      }

      function i() {
        var e, t, r, o, n = 1 === m.CaptionAlignment ? 33 : 2 === m.CaptionAlignment ? 34 : 36, a = z.left + j;
        if (V ? (3 === w && (_ = -_), z.top += _, z.bottom += _) : (2 === w && (j = -j), z.left += j, z.right += j), N) switch (p = 0, y) {
          case 15:
            a -= G, b.drawText(A.substr(p++, 1), a, z.top), a = z.left + j + 4 * u, o = a + 42 * u, b.drawEqualSpaceText(A.substr(p, 6), a, o, z.top), p += 6, a = z.left + j + 50 * u, o = a + 41 * u, b.drawEqualSpaceText(A.substr(p, 6), a, o, z.top);
            break;
          case 14:
            a += 4 * u, o = a + 28 * u, b.drawEqualSpaceText(A.substr(p, 4), a, o, z.top), p += 4, a = z.left + j + 36 * u, o = a + 27 * u, b.drawEqualSpaceText(A.substr(p, 4), a, o, z.top);
            break;
          case 17:
          case 18:
            b.FontSizeChangeTo(Math.floor(.77 * b.usingFont.Size)), L = g(b.usingFont), M = b.measureTextWidth("0"), a -= G, b.drawText("0", a, z.bottom - L), e = A.substr(6), M = b.measureTextWidth(e), a = z.right - j + H - M, b.drawText(e, a, z.bottom - L), b.FontPointRestore(), a = z.left + j + 4 * u, o = a + 42 * u, b.drawEqualSpaceText(A.substr(0, 6), a, o, z.top);
            break;
          case 16:
            b.FontSizeChangeTo(Math.floor(.77 * b.usingFont.Point)), L = g(b.usingFont), e = A.substr(0, 1), M = b.measureTextWidth(e), a -= G, b.drawText(e, a, z.bottom - L), e = A.substr(11), M = b.measureTextWidth(e), a = z.left + j + 95 * u + Math.max(H - M, 2), b.drawText(e, a, z.bottom - L), b.FontPointRestore(), a = z.left + j + 11 * u, o = a + 35 * u, ++p, b.drawEqualSpaceText(A.substr(p, 5), a, o, z.top), a = o + 5 * u, o = a + 35 * u, p += 5, b.drawEqualSpaceText(A.substr(p, 5), a, o, z.top)
        } else if (V) {
          switch (m.Alignment) {
            case 1:
              z.right = z.left + c;
              break;
            case 2:
              z.left = (z.left + z.right - c) / 2, z.right = z.left + c;
              break;
            default:
              z.left = z.right - c
          }
          b.drawText2(A, z, n)
        } else {
          switch (m.Alignment) {
            case 1:
              z.bottom = z.top + c;
              break;
            case 2:
              z.top = (z.top + z.bottom - c) / 2, z.bottom = z.top + c;
              break;
            default:
              z.top = z.bottom - c
          }
          switch (t = z.right, m.CaptionAlignment) {
            case 1:
              r = z.top;
              break;
            case 2:
              r = (z.top + z.bottom - M) / 2;
              break;
            default:
              r = z.bottom - M
          }
          b.drawTextRotate(A, t, r, 270)
        }
      }

      var l, s, u, c, d, h, f, p, m = this, C = m.canvas, b = new ee(C.getContext("2d")), v = m.getUsingFont(),
        x = m.BackColor, T = m.ForeColor, y = m.BarcodeType, S = m.Direction, w = m.CaptionPosition, F = m.data,
        D = F.cols, P = F.rows, B = F.graph, R = B ? B.length : 0, A = F.text ? F.text : m.DisplayText, e = e(y),
        V = 1 === S || 2 === S, N = t(y) && 1 === S && 3 === w, M = 0, L = g(v), E = e ? Math.max(L, 10) : 0, I = 0,
        O = 0, G = 0, H = 0, k = !1, j = 0, _ = 0, W = new X(0, 0, C.width, C.height), U = W.clone(), z = W.clone();
      if (D) {
        if (b.SelectFont(v), 1 !== w && (V ? 2 === w ? (z.bottom = z.top + L, U.top = z.bottom + E) : (z.top = z.bottom - L, U.bottom = z.top - E) : 2 === w ? (z.left = z.right - L, U.right = z.left - E) : (z.right = z.left + L, U.left = z.right + E)), l = V ? U.Width() : U.Height(), s = V ? U.Height() : U.Width(), 10 > l || 10 > s) return void b.RestoreFont();
        1 != w && (M = b.measureTextWidth(A)), e ? o() : (n(), a()), k ? pdd.drawTextCenter("条宽度太大，条码无法完整显示", (W.left + W.right) / 2, (W.top + W.bottom - L) / 2) : 1 != w && i(), b.RestoreFont()
      }
    }, get Value() {
      return this.getDisplayText()
    }, get DisplayText() {
      return this.getDisplayText()
    }, get AsBarcode() {
      return this
    }
  }, E(Ve, Be);
  var Ne = function (e) {
    var t = this;
    Te.call(t, e), t.Alignment = 3, t.SizeMode = 3, t.TransparentMode = 0, t.RotateMode = 0, t.ImageIndex = 0, t.Picture = "", t.ImageFile = "", t.DataField = ""
  };
  Ne.prototype = {
    ControlType: 7, afterLoad: function (e) {
      var t = this;
      Te.prototype.afterLoad.call(t, e), d(t, "SizeMode", a.PictureSizeMode), d(t, "TransparentMode", a.PictureTransparentMode), d(t, "RotateMode", a.PictureRotateMode)
    }, attachData: function () {
      var e = this;
      e.oDataField = e.report.RunningFieldByName(e.DataField)
    }, generateContent: function (e) {
      var t, r, o, n, a, i, s, u = this, c = l.pixelsToHtml;
      u.Picture ? n = "data:image;base64," + u.Picture : u.oDataField ? (n = u.oDataField.AsString, n.length > 256 && (n = "data:image;base64," + n)) : u.ImageFile && (n = u.ImageFile), n && (5 === u.SizeMode ? e.addStyle("background-image", "url(" + n + ")") : (t = u.pxRect, t || (t = u.owner.getRect()), r = t.Width(), o = t.Height(), e.addStyle("text-align", "center"), e.addStyle("vertical-align", "middle"), a = new re("img", e), i = c(r), s = c(o), i && a.addAttribute("width", i), s && a.addAttribute("height", s), a.addAttribute("src", n)))
    }, set Text(e) {
      this[e.length > 256 ? "Picture" : "ImageFile"] = e
    }, get AsPictureBox() {
      return this
    }, LoadFromFile: function (e) {
      this.ImageFile = e
    }
  }, E(Ne, Te);
  var Me = function (e) {
    var t = this;
    Te.call(t, e)
  };
  Me.prototype = {
    ControlType: 6, get AsRichTextBox() {
      return this
    }, generateContent: function (e) {
      e.innerText = "不支持RichTextBox"
    }
  }, E(Me, Te);
  var Le = function (e) {
    var t = this;
    Te.call(t, e), t.HideOnRecordsetEmpty = !1, t.RelationFields = "", t.Report = new et(e.report.viewer, t)
  };
  Le.prototype = {
    ControlType: 9, afterLoad: function (e) {
      var t = this, r = e.Report;
      Te.prototype.afterLoad.call(t, e), r && t.Report.loadFromJSON(r)
    }, prepare: function () {
      var e = this, t = e.report;
      Te.prototype.prepare.call(e), t._srChildren || (t._srChildren = []), t._srChildren.push(e), e.prepareRelationRecordset()
    }, prepareRelationRecordset: function () {
      var e, t, r, o, n, a, i = this, l = i.RelationFields, s = i.report, u = s.DetailGrid, c = i.Report,
        d = c.DetailGrid;
      if (l && d && u && (e = u.Recordset, r = d.Recordset, t = e.decodeFields(l), o = r.decodeFields(l), t.length === o.length && r.RecordCount)) {
        for (i._rmFields = t, i._rdFields = o, a = i._relations = [], r.First(), n = [], a.push(n), n.push(r.curRecord), r.keepValue(), r.Next(); !r.Eof();) r.fieldsKeepedValueChanged(o) && (n = [], a.push(n), r.keepValue()), n.push(r.curRecord), r.Next();
        a.sort(function (e, t) {
          for (var r, n, a, i = 0, l = o.length; l > i;) {
            if (r = o[i++]._tableMember, n = e[0][r], a = t[0][r], a > n) return -1;
            if (n > a) return 1
          }
          return 0
        })
      }
    }, generateContent: function (t) {
      var r = this, o = r.Report.DetailGrid ? r.Report.DetailGrid.Recordset : e, n = r._relations;
      n && r.attachRelationTable(), (!r.HideOnRecordsetEmpty || !o || o.RecordCount) && r.Report.generate(t), n && r.detachRelationTable()
    }, detachRelationTable: function () {
      var e = this.Report.DetailGrid.Recordset;
      e._dataTable = e._bakTable, delete e._bakTable
    }, attachRelationTable: function () {
      function e() {
        for (var e, r, o = 0; u > o;) {
          if (r = t[s[o]._tableMember], e = c[l[o++]._tableMember], e > r) return -1;
          if (r > e) return 1
        }
        return 0
      }

      var t, r, o, n = this, a = n._relations, i = n.Report.DetailGrid.Recordset, l = n._rmFields, s = n._rdFields,
        u = l.length, c = n.report.DetailGrid.Recordset.curRecord, d = a.length - 1, h = 0;
      for (i._bakTable = i._dataTable, i._dataTable = []; d >= h;) if (r = Math.floor((h + d) / 2), t = a[r][0], o = e(), 0 > o) h = r + 1; else {
        if (!(o > 0)) {
          i._dataTable = a[r];
          break
        }
        d = r - 1
      }
      return !0
    }, get AsSubReport() {
      return this
    }
  }, E(Le, Te);
  var Ee = function (e) {
    var t = this;
    ge.call(t, e), t.Visible = !0, t.FixedWidth = !1, t.Width = t.report.cm2Size(3)
  };
  Ee.prototype = {
    prepare: function () {
      self.pxWidth = this.report.size2Pixel(self.Width)
    }, get FreeGrid() {
      return this.owner
    }
  }, E(Ee, ge);
  var Ie = function (e) {
    var t = this;
    ge.call(t, e), t.Visible = !0, t.Height = t.report.cm2Size(.58)
  };
  Ie.prototype = {
    prepare: function () {
      self.pxHeight = this.report.size2Pixel(self.Height)
    }, get FreeGrid() {
      return this.owner
    }
  }, E(Ie, ge);
  var Oe = function (e) {
    var t = this;
    Te.call(t, e), t.ColumnCount = 5, t.RowCount = 5, t.TitleRows = 1, t.ShowColLine = !0, t.ShowRowLine = !0, t.ColLinePen = new Z, t.RowLinePen = new Z, t.columns = [], t.rows = [], t.cells = []
  };
  Oe.prototype = {
    ControlType: 13, attachData: function () {
      var e, t, r, o = this;
      for (t = o.cells.length, e = 0; t > e; e++) r = o.cells[e], r && r.forEach(function (e) {
        e.attachData(), e.prepare()
      })
    }, prepareChildren: function () {
      var e, t = this, r = t.columns, o = t.rows, n = t.cells;
      for (e = r.length = t.ColumnCount; e--;) r[e] || (r[e] = new Ee(t));
      for (e = n.length = o.length = t.RowCount; e--;) o[e] || (o[e] = new Ie(t)), n[e] || (n[e] = [], n[e].length = t.ColumnCount)
    }, layout: function (e) {
      var t, r, o, n, a = this, i = a.report, l = a.Border;
      for (r = a.columns.length, o = 0, t = 0; r > t; t++) n = a.columns[t], n.pxWidth = i.size2Pixel(n.Width), o += n.Width;
      for (a.Width = o + i.pixel2Size(l.getLeftWidth() + l.getRightWidth()), r = a.rows.length, o = 0, t = 0; r > t; t++) n = a.rows[t], n.pxHeight = i.size2Pixel(n.Height), o += n.Height;
      a.Height = o + i.pixel2Size(l.getTopWidth() + l.getBottomWidth()), Te.prototype.layout.call(a, e)
    }, prepare: function () {
      var e = this, t = new te;
      e.columns.length === e.ColumnCount && e.rows.length === e.RowCount && e.cells.length === e.RowCount || e.prepareChildren(), Te.prototype.prepare.call(e), t.addCellBorder(e), e.blankCellStyle = e.report.viewer.addCustomStyle(t)
    }, assign: function (e) {
      var t = this;
      Te.prototype.assign.call(t, e), e.columns.forEach(function (e, r) {
        var o = new Ee(t);
        o.assign(e), t.columns[r] = o
      }), e.rows.forEach(function (e, r) {
        var o = new Ie(t);
        o.assign(e), t.rows[r] = o
      }), e.cells.forEach(function (e, r) {
        e.forEach(function (e, o) {
          var n = new Ce(t, r, o);
          n.assign(e), t.cells[r] || (t.cells[r] = []), t.cells[r][o] = n
        })
      })
    }, afterLoad: function (e) {
      var t, r, o, n, a = this;
      if (Te.prototype.afterLoad.call(a, e), a.columns = [], a.rows = [], a.cells = [], a.prepareChildren(), e.FreeGridColumn) for (r = e.FreeGridColumn.length, t = 0; r > t; t++) n = e.FreeGridColumn[t], a.columns[n.index - 1].loadFromJSON(n);
      if (e.FreeGridRow) for (r = e.FreeGridRow.length, t = 0; r > t; t++) n = e.FreeGridRow[t], a.rows[n.index - 1].loadFromJSON(n);
      if (e.FreeGridCell) for (r = e.FreeGridCell.length, t = 0; r > t; t++) n = e.FreeGridCell[t], --n.row, --n.col, o = a.cells[n.row], o = o[n.col] = new Ce(a, n.row, n.col), o.loadFromJSON(n)
    }, generateContent: function (e) {
      var t, r, o, n, a = this, i = new re("table", e), l = new re("colgroup", i), s = [];
      for (a.Font.font && i.addClass(a.report.viewer.selectFont2(a.Font.font)), i.getStyles().addBorder(a.Border), i.addStyle("border-collapse", "collapse"), i.addStyle("width", "100%"), a.toFillBack() && i.addBackColorStyle(a.BackColor), n = a.ColumnCount, o = 0; n > o; o++) t = new re("col", l), t.skipend = 1, t.addStyle("width", b(100 * a.columns[o].pxWidth / a.pxRect.Width()));
      for (o = 0; o < a.RowCount; o++) r = [], r.length = a.ColumnCount, s.push(r);
      a.cells.forEach(function (e, t) {
        e.forEach(function (e) {
          function t() {
            for (var t, r = e.row, o = r + e.RowSpan, n = e.col + e.ColSpan; o > r; r++) for (t = e.col; n > t; t++) s[r][t] = 1
          }

          (e.ColSpan > 1 || e.RowSpan > 1) && t(), s[e.row][e.col] = e
        })
      }), s.forEach(function (e, t) {
        var r, o = a.ColumnCount, n = 0, l = new re("tr", i);
        l.addStyle("height", C(a.rows[t].pxHeight));
        do {
          for (; o > n && !e[n];) r = new re("td", l), r.addClass(a.blankCellStyle.getStyleName()), n++;
          for (; o > n && 1 === e[n];) n++;
          o > n && (r = e[n]) && (r.generate(l), n = r.col + r.ColSpan)
        } while (o > n)
      })
    }, get AsFreeGrid() {
      return this
    }, ColumnAt: function (e) {
      var t = this, r = t.columns;
      return r.length !== t.ColumnCount && t.prepareChildren(), r[e - 1]
    }, RowAt: function (e) {
      var t = this, r = t.rows;
      return r.length !== t.RowCount && t.prepareChildren(), r[e - 1]
    }, CellAt: function (t, r) {
      var o, n = this, a = n.cells, i = e;
      return a.length !== n.RowCount && n.prepareChildren(), t > 0 && t <= n.RowCount && r > 0 && r <= n.ColumnCount && (o = a[--t], i = o[--r], i || (i = o[r] = new Ce(n, t, r))), i
    }, CellByDataName: function (t) {
      for (var r, o, n, a = this, i = a.cells, l = i.length, s = l; s--;) for (r = i[s], o = r.length; o--;) if (n = r[o], n && n.DataName === t) return n;
      return e
    }
  }, E(Oe, Te);
  var Ge = function (e) {
    var t = this;
    ge.call(t, e), t.Visible = !0, t.CanGrow = !1, t.CanShrink = !1, t.Height = e.report.cm2Size(t.defaultHeight()), t.BackColor = e.BackColor, t.FormatScript = "", t.Font = new Q(t.getParentFont())
  };
  Ge.prototype = {
    afterLoad: function (e) {
      var t = this;
      e.BackColor || (t.BackColor = t.getParentBackColor()), f(t, "BackColor", t.report.viewer.alpha.background), t.Font.loadFromJSON(e.Font)
    }, prepare: function () {
      var e = this, t = e.Controls;
      e.pxHeight = e.report.size2Pixel(e.Height), e._singleHidableSR = e.getSingleHidableSR(), e._singleSR = t && 1 === t.Count && 9 === t.Item(1).ControlType
    }, unprepare: function () {
      delete self.defaultStyle
    }, generate: function (e) {
      var t = this;
      t.report.fireSectionFormat(t), t.pxHeight = t.report.size2Pixel(t.Height), t.isToGenerate() && (t._singleSR ? t.Controls.Item(1).generateContent(e) : t.doGenerate(e))
    }, defaultHeight: function () {
      return 3
    }, getParentBackColor: function (e) {
      return this.owner.BackColor
    }, getParentFont: function () {
      return this.owner.Font
    }, getSingleHidableSR: function () {
      return e
    }, isControlPositionClass: function () {
      return 0
    }, isToGenerate: function () {
      function e() {
        var e, r = t._singleHidableSR, o = r._relations;
        return o && r.attachRelationTable(), e = !r.Report.DetailGrid || r.Report.DetailGrid.Recordset.RecordCount, o && r.detachRelationTable(), e
      }

      var t = this, r = t.Visible && t.Height > 0;
      return r && t._singleHidableSR && (r = e()), r
    }
  }, E(Ge, ge);
  var He = function (e) {
    var t = this;
    Ge.call(t, e), t.Controls = new ie(t)
  };
  He.prototype = {
    children: ["Controls"], afterLoad: function (e) {
      var t = this;
      Ge.prototype.afterLoad.call(t, e), t.Controls.loadFromJSON(e.Control)
    }, attachData: function () {
      this.Controls.attachData()
    }, prepare: function () {
      var e = this, t = e.Controls, r = e.report, o = r.viewer;
      Ge.prototype.prepare.call(e), t.layout(), 2 !== o.options.controlPosition && e.buildTableLayout(r.getReportWidth(), e.pxHeight), t.prepare(), e.tableRows && (r.reportFitHeight && ne(e.tableRows), e.tableRows.forEach(function (e) {
        e.defaultStyle = o.selectSectionItem(e)
      })), e.defaultStyle = o.selectSectionItem(e)
    }, buildTableLayout: function (t, r) {
      function o(t, r, o, n) {
        var a, i, l, s = [];
        for (u.forEach(function (e) {
          s.push({pos: e.pxRect[t], count: 1}, {pos: e.pxRect[r], count: 1})
        }), s.sort(function (e, t) {
          return e.pos - t.pos
        }), a = s.length, i = 0; a > i && s[i].pos < o;) s[i++] = e;
        if (i > 0 && (s.unshift({pos: o, count: i}), ++a), !isNaN(n)) {
          for (i = a - 1; i >= 0 && s[i] && s[i].pos > n;) s[i--] = e;
          i = a - 1 - i, i >= 0 && s.push({pos: n, count: i})
        }
        return l = {pos: -98765}, s.forEach(function (t, r) {
          t && (l.pos === t.pos ? (l.count++, s[r] = e) : l = t)
        }), l = {pos: -98765}, s.forEach(function (t, r) {
          t && (t.pos - l.pos < 8 ? l.count > t.count ? (l.count += t.count, s[r] = e) : (t.count += l.count, s[i] = e, l = t, i = r) : (l = t, i = r))
        }), s = s.filter(function (e) {
          return e
        }), a = s.length, a > 1 && (s[0].pos < o + 4 && (s[0].pos = o), s[0].pos !== o && (s.unshift({
          pos: o,
          count: 0
        }), a++), isNaN(n) || (a--, n - s[a].pos < 4 && (s[a].pos = n), s[a].pos !== n && s.push({
          pos: n,
          count: 0
        }))), s
      }

      function n(e, t, r) {
        var o = 0, n = r.length;
        u.sort(function (t, r) {
          return t.pxRect[e] - r.pxRect[e]
        }), u.forEach(function (a) {
          for (var i = a.pxRect[e]; n > o && r[o].pos < i;) o++;
          (o >= n || o > 0 && i - r[o - 1].pos < r[o].pos - i) && --o, a.cell[t] = o
        })
      }

      var a, i, l, s, u, c, d, h, f = this, p = f.report.viewer, g = f.getTableColEdges,
        m = f.getMergedColumns ? f.getMergedColumns() : 0, C = [], b = [];
      if (u = f.Controls.items.filter(function (e) {
          return e.cell = {control: e}, e.Visible
        }), i = u.length, c = o("top", "bottom", 0, r), l = c.length - 1, g ? (d = f.getTableColEdges(), s = d.length - 1, 8 > s && (h = o("left", "right", 0, t), h.length > 2 * s && (d = h, g = e))) : d = o("left", "right", 0, t), s = d.length - 1, !g) for (f.tableCols = [], a = 0; s > a;) f.tableCols.push(d[a + 1].pos - d[a++].pos);
      for (n("top", "beginRow", c), n("bottom", "endRow", c), n("left", "beginCol", d), n("right", "endCol", d), u.forEach(function (e) {
        var t = e.cell;
        t.endCol <= t.beginCol && t.endCol < s && t.endCol++, t.endRow <= t.beginRow && t.endRow < l && t.endRow++
      }), a = 0; l > a;) b.push({section: f, pxHeight: c[a + 1].pos - c[a++].pos, cells: []});
      for (u = u.filter(function (e) {
        var t = e.cell;
        return t.beginCol < t.endCol && t.beginRow < t.endRow
      }), u.sort(function (e, t) {
        var r = e.cell.beginRow - t.cell.beginRow;
        return r ? r : e.cell.beginCol - t.cell.beginCol
      }), a = 0; l > a; a++) h = [], h.length = s, C.push(h);
      m && m.forEach(function (e) {
        var t = e.index;
        C.forEach(function (e) {
          e[t] = 1
        })
      }), a = 0, u.forEach(function (e) {
        for (var t, r, o = e.cell, n = C[o.beginRow]; o.beginCol < o.endCol && n[o.beginCol];) o.beginCol++;
        for (; o.endCol > o.beginCol && n[o.endCol - 1];) o.endCol--;
        if (o.beginCol < o.endCol) {
          for (t = o.beginRow; t < o.endRow; t++) for (r = o.beginCol; r < o.endCol; r++) C[t][r] = 1;
          n[o.beginCol] = e, a++
        }
      }), 1 === p.options.controlPosition || m || i && a / i > .8 ? (C.forEach(function (e, t) {
        var r, o, n, a = b[t].cells;
        r = o = 0;
        do {
          for (; s > o && !e[o];) o++;
          for (o > r && (a.push({beginCol: r, endCol: o}), r = o); s > o && 1 === e[o];) o++;
          r = o, s > r && (n = e[r]) && (n = n.cell, a.push(n), r = o = n.endCol)
        } while (s > o)
      }), f.tableRows = b) : (delete f.tableCols, delete f.tableRows, f.Controls.items.forEach(function (e) {
        delete e.cell
      }))
    }, unprepare: function () {
      var e = this;
      Ge.prototype.unprepare.call(e), e.Controls.unprepare()
    }, doGenerate: function (e) {
      var t = this, r = t.report.viewer;
      e = new re(t.tableRows ? "table" : "div", e), e.addClass(r.selectSection(t)), t.tableRows ? (e.addStyle("border-collapse", "collapse"), t.generateTableRows(e)) : (e.addStyle("position", "relative"), t.Controls.generate(e))
    }, generateTableRows: function (e, t) {
      var r, o, n = this, a = n.report, i = a.viewer, l = n.owner !== a || a.reportFitWidth, s = n.tableCols, u = 0;
      s && (r = new re("colgroup", e), l && (e.addStyle("width", "100%"), s.forEach(function (e) {
        u += e
      })), s.forEach(function (e) {
        o = new re("col", r), o.skipend = 1, o.addStyle("width", l ? b(100 * e / u) : C(e))
      })), n.tableRows.forEach(function (r, o) {
        function a(e) {
          e.ContentCell.generate(l), e.mergingElement = l.children[l.children.length - 1], e.ContentCell.getUsingFont() !== n.getUsingFont() && e.mergingElement.addClass(i.selectFont2(e.ContentCell.getUsingFont())), e.ContentCell.BackColor !== n.BackColor && e.mergingElement.addBackColorStyle(e.ContentCell.BackColor), e.mergedHeader.todoMerge = 0
        }

        var l;
        l = new re("tr", e), l.addClass(i.selectSection(r)), r.cells.forEach(function (e) {
          var r, n, s, u = e.control;
          if (!o && t) for (; (s = t[0]) && s.index <= e.beginCol;) a(s), t.shift();
          r = new re("td", l), n = e.endCol - e.beginCol, n > 1 && r.addAttribute("colspan", n + ""), e.endRow && (n = e.endRow - e.beginRow, n > 1 && r.addAttribute("rowspan", n + ""), u.Visible && (13 !== u.ControlType ? (r.addClass(i.selectControl(u)), u.Font.font && r.addClass(i.selectFont(u.Font.font, u.defaultFontStyle))) : r.addStyle("padding", "0px"), u.generateInCell(r)))
        }), !o && t && t.forEach(function (e) {
          a(e)
        })
      })
    }, getRect: function () {
      var e = this;
      return new X(0, 0, e.report.getReportWidth(), e.pxHeight)
    }, getSingleHidableSR: function () {
      var t = this, r = t.Controls.items, o = r[0];
      return 1 === r.length && 9 === o.ControlType && o.HideOnRecordsetEmpty ? o : e
    }, inDynamicRow: function () {
      return 0
    }
  }, E(He, Ge);
  var ke = function (e) {
    var t = this;
    He.call(t, e), t.Name = ""
  };
  ke.prototype = {}, E(ke, He);
  var je = function (e) {
    var t = this;
    He.call(t, e), t.Name = ""
  };
  je.prototype = {}, E(je, He);
  var _e = function (e) {
    var t = this;
    Ge.call(t, e), t.Height = t.report.cm2Size(.58)
  };
  _e.prototype = {
    defaultHeight: function () {
      return .58
    }
  }, E(_e, Ge);
  var We = function (e) {
    var t = this;
    _e.call(t, e), t.ContentCells = new ue(t), t.AlternatingBackColor = t.BackColor
  };
  We.prototype = {
    afterLoad: function (e) {
      var t = this;
      _e.prototype.afterLoad.call(t, e), e.AlternatingBackColor ? f(t, "AlternatingBackColor", t.report.viewer.alpha.background) : t.AlternatingBackColor = t.BackColor, t.ContentCells.loadFromJSON(e.ColumnContentCell)
    }, prepare: function () {
      var e, t = this, r = t.report.viewer;
      _e.prototype.prepare.call(t), t.defaultStyle = r.selectSectionItem(t), t.AlternatingBackColor !== t.BackColor && (e = t.BackColor, t.BackColor = t.AlternatingBackColor, t.altSectionStyle = r.selectSectionItem(t), t.BackColor = e), t.ContentCells.prepare()
    }, generate: function (e, t) {
      var r = this;
      r.owner.Recordset.MoveTo(t), _e.prototype.generate.call(r, e)
    }, doGenerate: function (e) {
      var t, r = this, o = r.owner, n = r.report.viewer;
      t = new re("tr", e), r.altSectionStyle && o.Recordset.RecordNo % 2 ? (r._BackColor = r.BackColor, r._defaultStyle = r.defaultStyle, r.BackColor = r.AlternatingBackColor, r.defaultStyle = r.altSectionStyle, t.addClass(n.selectSection(r)), r.BackColor = r._BackColor, r.defaultStyle = r._defaultStyle) : t.addClass(n.selectSection(r)), o.showingColumns.forEach(function (e) {
        o.hasMergedColumn && e.mergedHeader ? e.mergedHeader.todoMerge && (e.ContentCell.generate(t), e.mergingElement = t.children[t.children.length - 1]) : e.ContentCell.generate(t)
      }), o.hasMergedColumn && o.Groups.forEach(function (e) {
        e.Header.todoMerge && (e.Header.todoMerge = 0)
      })
    }, getSingleHidableSR: function () {
      for (var t, r, o = this, n = o.ContentCells.items, a = n.length, i = 0, l = 0; a > i;) t = n[i++], t._freeCell && (l += t.Controls.Count, 1 === l && (r = t.Controls.Item(1)));
      return 1 === l && 9 === r.ControlType && r.HideOnRecordsetEmpty ? r : e
    }, SetCellsBackColor: function (e) {
      this.ContentCells.forEach(function (t) {
        t.BackColor = e
      })
    }, SetCellsForeColor: function (e) {
      this.ContentCells.forEach(function (t) {
        t.setForeColor(e)
      })
    }
  }, E(We, _e);
  var Ue = function (t) {
    var r = this;
    _e.call(r, t), r.TitleCells = new se(r, e)
  };
  Ue.prototype = {
    afterLoad: function (e) {
      var t = this;
      _e.prototype.afterLoad.call(t, e), t.TitleCells.loadFromJSON(e.ColumnTitleCell)
    }, prepare: function () {
      function e(t) {
        var n = 1;
        return t.showingItems = [], t.forEach(function (a) {
          var i, l, s;
          a.layer = o, a.GroupTitle ? a.Visible && (o++, i = e(a.SubTitles) + 1, o--, l = a.SubTitles.showingItems, l.length > 0 && (t.showingItems.push(a), i > n && (n = i), a.colspan = 0, l.forEach(function (e) {
            a.colspan += e.colspan
          }))) : (s = a.Column, s.Visible && s.pxWidth > 0 && (t.showingItems.push(a), a.colspan = 1, s.pxLeft = r.columnsTotalWidth, s.index = r.showingColumns.length, r.columnsTotalWidth += s.pxWidth, r.showingColumns.push(s)))
        }), n
      }

      var t = this, r = t.owner, o = 0;
      _e.prototype.prepare.call(t), r.columnsTotalWidth = 0, r.showingColumns = [], t.layerCount = e(t.TitleCells), t.pxHeight /= t.layerCount, t.TitleCells.prepare(), t.defaultStyle = t.report.viewer.selectSectionItem(t)
    }, unprepare: function () {
    }, doGenerate: function (e) {
      function t(e) {
        e.forEach(function (e) {
          e.layer === o.generatingLayer && e.generate(r), e.GroupTitle && t(e.SubTitles.showingItems)
        })
      }

      var r, o = this, n = o.report.viewer;
      for (o.pxHeight /= o.layerCount, o.generatingLayer = 0; o.generatingLayer < o.layerCount;) r = new re("tr", e), r.addClass(n.selectSection(o)), t(o.TitleCells.showingItems), o.generatingLayer++
    }, FindColumnTitlesOfTitleCell: function (t) {
      function r(t, o) {
        var n, a, i, l = t.items.length;
        for (n = 0; l > n; n++) {
          if (a = t.items[n], a === o) return t;
          if (a.GroupTitle && (i = r(a.SubTitles, o))) return i
        }
        return e
      }

      return r(this.TitleCells, t)
    }, SetCellsBackColor: function (e) {
      function t(r) {
        r.forEach(function (r) {
          r.BackColor = e, r.GroupTitle && t(r.SubTitles)
        })
      }

      t(this.TitleCells)
    }, SetCellsForeColor: function (e) {
      function t(r) {
        r.forEach(function (r) {
          r.setForeColor(e), r.GroupTitle && t(r.SubTitles)
        })
      }

      t(this.TitleCells)
    }
  }, E(Ue, _e);
  var ze = function (e) {
    var t = this;
    He.call(t, e), t.Height = t.report.cm2Size(1.2)
  };
  ze.prototype = {
    generate: function (e, t) {
      var r = this, o = r.owner;
      o.recordset.MoveTo(t), o.owner.Recordset.MoveTo((r === o.Header ? o.beginNoField : o.endNoField).Value), He.prototype.generate.call(r, e)
    }, doGenerate: function (t) {
      var r, o = this, n = o.owner.owner;
      n.hasMergedColumn && (r = [], n.showingColumns.forEach(function (e) {
        e.mergedHeader && e.mergedHeader.todoMerge && (o.owner.Footer !== o || o.owner === n.Groups.Item(n.Groups.Count) && e.mergedHeader !== o.owner.Header) && r.push(e)
      }), r.length || (r = e)), o.tableRows && !o.tableCols ? o.generateTableRows(t, r) : (t = new re("tr", t), t.addClass(o.report.viewer.selectSection(o)), t = new re("td", t), t.addAttribute("colspan", o.owner.owner.showingColumns.length + ""), o.tableCols ? (t = new re("table", t), t.addClass(viewer.selectSection(o)), t.addStyle("border-collapse", "collapse"), o.generateTableRows(t)) : (t.addStyle("position", "relative"), o.Controls.generate(t)))
    }, prepare: function () {
      var e = this;
      !e.groupMergedColumns && He.prototype.prepare.call(e)
    }, getTableColEdges: function () {
      var e, t = this.owner.owner.showingColumns;
      return e = t.map(function (e) {
        return {pos: e.pxLeft, count: 1}
      }), e.push({pos: t[t.length - 1].pxRight, count: 1}), e
    }, getMergedColumns: function () {
      var e, t, r = this;
      return e = r.owner.index, t = r.owner.owner.showingColumns.filter(function (t) {
        var o, n, a = t.mergedHeader;
        return a && ((n = (o = a.owner).index) < e || n === e && r === o.Footer && o.Header.IncludeFooter)
      }), 0 === t.length && (t = 0), t
    }, getParentBackColor: function (e) {
      return this.owner.owner.BackColor
    }, getParentFont: function () {
      return this.owner.owner.Font
    }, inDynamicRow: function () {
      return 1
    }
  }, E(ze, He);
  var Ye = function (e) {
    var t = this;
    ze.call(t, e), t.OccupiedColumns = "", t.OccupyColumn = !1, t.SameAsColumn = !0, t.IncludeFooter = !1, t.VAlign = 1
  };
  Ye.prototype = {
    afterLoad: function (e) {
      var t = this;
      ze.prototype.afterLoad.call(t, e), d(t, "VAlign", a.OCGroupHeaderVAlign)
    }, prepare: function () {
      var e, t = this;
      t.OccupiedColumns && (e = t.owner.owner.Columns.decodeItems(t.OccupiedColumns), e = e.filter(function (e) {
        return e.Visible
      }), e.length > 0 && (t.groupMergedColumns = e, e.forEach(function (e) {
        e.mergedHeader = t, t.owner.owner.hasMergedColumn = 1
      }))), ze.prototype.prepare.call(t)
    }, unprepare: function () {
    }, generate: function (e, t) {
      var r = this;
      r.groupMergedColumns ? (r.curItemBegin = e.children.length, r.todoMerge = 1) : ze.prototype.generate.call(r, e, t)
    }
  }, E(Ye, ze);
  var Je = function (e) {
    ze.call(this, e)
  };
  Je.prototype = {
    generate: function (e, t) {
      var r, o = this, n = o.owner.Header, a = n.groupMergedColumns;
      ze.prototype.generate.call(o, e, t), a && (r = e.children.length - n.curItemBegin, !n.IncludeFooter && o.isToGenerate() && r--, r > 1 && a.forEach(function (e) {
        e.mergingElement && e.mergingElement.addAttribute("rowspan", r + "")
      }))
    }
  }, E(Je, ze);
  var Xe = function (t) {
    var r = this;
    ge.call(r, t), r.FieldType = 1, r._name = "", r._dbFieldName = "", r._tableMember = e, r.Format = "", r.Length = 0, r.RTrimBlankChars = !1, r.GetDisplayTextScript = ""
  };
  Xe.prototype = {
    afterLoad: function (e) {
      var t = this;
      e.Type && (t.FieldType = e.Type), e.Name && (t.Name = e.Name), e.DBFieldName && (t.DBFieldName = e.DBFieldName), d(t, "FieldType", a.FieldType)
    }, prepare: function () {
      var e = this, t = e.FieldType;
      6 === t ? e.formater = new s.DateTimeFormatter(e.Format) : 5 === t ? e.formater = new s.BooleanFormatter(e.Format) : 2 !== t && 3 !== t && 4 !== t || (e.formater = new s.NumericFormatter(e.Format))
    }, unprepare: function () {
      delete this.formater
    }, isNumeric: function () {
      var e = this.FieldType;
      return 2 === e || 3 === e || 4 === e
    }, get Value() {
      var t = this, r = t.owner.curRecord;
      return r ? r[t._tableMember] : e
    }, set Value(t) {
      var r = this, o = r.owner.curRecord;
      if (o) {
        if (t !== e && null !== t) switch (r.FieldType) {
          case 2:
          case 3:
          case 4:
            t = +t;
            break;
          case 5:
            t = F(t);
            break;
          case 6:
            t = T(t);
            break;
          default:
            t += ""
        } else t = e;
        o[r._tableMember] = t
      }
    }, get AsBoolean() {
      return F(this.Value)
    }, set AsBoolean(e) {
      this.Value = e
    }, get AsCurrency() {
      return +this.Value
    }, set AsCurrency(e) {
      this.Value = e
    }, get AsDateTime() {
      return v(this.Value)
    }, set AsDateTime(e) {
      this.Value = e
    }, get AsFloat() {
      var e, t = this;
      if (6 === t.FieldType) {
        var r = new J;
        r.value = t.Value, e = r.AsFloat
      } else e = +t.Value;
      return isNaN(e) ? 0 : e
    }, set AsFloat(e) {
      var t, r = this;
      6 === r.FieldType && (t = new J, t.AsFloat = e, e = t.value), r.Value = e
    }, get AsInteger() {
      return Math.floor(this.AsFloat)
    }, set AsInteger(e) {
      this.AsFloat = Math.floor(+e)
    }, get AsString() {
      var e = this;
      return e.IsNull ? "" : e.Value + ""
    }, set AsString(e) {
      this.Value = e
    }, get DisplayText() {
      var e = this, t = e.FieldType, r = e.Value;
      return e.displayTextAssigned = 0, e.doingGetDisplayText || (e.doingGetDisplayText = 1, e.report.fireFieldGetDisplayText(e), e.doingGetDisplayText = 0), e.displayTextAssigned ? e.assignedDisplayText : e.IsNull ? "" : 1 === t || 7 === t ? r + "" : e.formater.format(r)
    }, set DisplayText(e) {
      var t = this;
      t.assignedDisplayText = e + "", t.displayTextAssigned = 1
    }, get IsNull() {
      var t = this.Value;
      return t === e || null === t
    }, get DataSize() {
      return 0
    }, get DataBuffer() {
      return e
    }, get Name() {
      return this._name
    }, set Name(e) {
      var t = this;
      t._tableMember && t._tableMember !== t._name || (t._tableMember = e), t._name = e
    }, get DBFieldName() {
      return this._name
    }, set DBFieldName(e) {
      var t = this;
      t._dbFieldName = e, e && (t._tableMember = e)
    }, get RunningDBField() {
      var e = this;
      return e._dbFieldName || e._name
    }, Clear: function () {
      this.Value = e
    }
  }, E(Xe, ge);
  var Ze = function (e) {
    var t = this;
    ge.call(t, e), t.QuerySQL = "", t.Fields = new ce(t), t.SortAsc = !0, t.SortCaseSensitive = !1, t.SortFields = "", t.XmlTableName = "", t.FetchRecordScript = "", t.BeforePostRecordScript = "", t.ProcessRecordScript = "", t._dataTable = [], t.recordNo = 0
  };
  Ze.prototype = {
    children: ["Fields"], afterLoad: function (e) {
      this.Fields.loadFromJSON(e.Field)
    }, attachDataTable: function (e) {
      var t = this;
      t._dataTable = e, t.MoveTo(0)
    }, prepareTableData: function () {
      function t(t, r) {
        if (t.hasOwnProperty(r)) return r;
        r = r.toUpperCase();
        for (name in t) if (r === name.toUpperCase()) return name;
        return e
      }

      var r, o, n, a, i, l = this, s = l._dataTable, u = l.Fields.items, c = s.length, d = u.length;
      if (DEBUG) for (; d--;) o = u[d];
      for (; c--;) for (r = s[c], d = u.length; d--;) {
        if (o = u[d], i = o._fts, a = o._tableMember, i === e && (a = t(r, a))) {
          switch (o.FieldType) {
            case 1:
              i = "string" != typeof r[a];
              break;
            case 2:
            case 3:
            case 4:
              i = "number" != typeof r[a];
              break;
            case 5:
              i = "boolean" != typeof r[a];
              break;
            case 6:
              i = !Date.prototype.isPrototypeOf(r[a]);
              break;
            default:
              i = !1
          }
          o._fts = i, o._tableMember = a
        }
        if (i && r.hasOwnProperty(a)) if (n = r[a], "" === n || null === n || n === e) r[a] = e; else switch (o.FieldType) {
          case 1:
            r[a] = n + "";
            break;
          case 2:
          case 3:
          case 4:
            r[a] = +n;
            break;
          case 5:
            r[a] = F(n);
            break;
          case 6:
            r[a] = x(n)
        }
      }
      l.SortFields && l.Resort(l.SortFields, l.SortAsc, l.SortCaseSensitive)
    }, prepare: function () {
      var e = this, t = e._dataTable, r = t.length, o = 0;
      if (e.Fields.prepare(), e.prepareTableData(), e.isDetailGridRecordset()) {
        for (; r > o;) e.MoveTo(o++), e.report.fireBeforePostRecord();
        e.MoveTo(0)
      }
    }, unprepare: function () {
      this.Fields.unprepare()
    }, decodeFields: function (e) {
      return this.Fields.decodeItems(e)
    }, isDetailGridRecordset: function () {
      var e = this;
      return e.owner === e.report.DetailGrid
    }, isAppendingRecord: function () {
      return 1 === this.editStatus
    }, keepValue: function () {
      var e = this;
      e.keepedRecord = e.curRecord
    }, fieldsKeepedValueChanged: function (e) {
      var t = this;
      return e.some(function (e) {
        var r = e._tableMember, o = t.keepedRecord[r], n = t.curRecord[r];
        return n > o || o > n
      })
    }, sortRecords: function (t, r) {
      for (var o = this, n = o._dataTable, a = n.length, i = 0, l = []; a > i;) l.push(i++);
      return t.length > 0 && (t.forEach(function (e) {
        e.fieldName = e.field._tableMember
      }), l.sort(function (r, o) {
        var a;
        return t.some(function (t) {
          var i = n[r][t.fieldName], l = n[o][t.fieldName];
          return i !== e && l !== e ? 1 === t.field.FieldType ? (t["case"] || (i = i.toUpperCase(), l = l.toUpperCase()), a = i.localeCompare(l)) : a = l > i ? -1 : i > l ? 1 : 0 : a = i === e && l === e ? 0 : i === e ? -1 : 1, t.asc || (a = -a), a
        }), a
      })), r ? l : (i = [], l.forEach(function (e) {
        i.push(n[e])
      }), o._dataTable = i, void o.MoveTo(0))
    }, get RecordCount() {
      var e = this;
      return e._dataTable ? e._dataTable.length : 0
    }, get RecordNo() {
      return this.recordNo
    }, FieldByName: function (e) {
      return this.Fields.itemByName(e)
    }, FieldByDBName: function (t) {
      var r, o = this.Fields.items, n = o.length;
      for (t = t.toUpperCase(), r = 0; n > r; r++) if (o[r].RunningDBField.toUpperCase() === t) return o[r];
      return e
    }, Append: function () {
      var e = this;
      e.editStatus = 1, e.recordNo = e._dataTable.length, e.curRecord = {}
    }, Edit: function () {
      var t, r, o = this, n = o.Fields.items, a = n.length, i = o.curRecord, l = {};
      if (o.recordNo >= 0 && o.recordNo < o._dataTable.length) {
        for (o.editStatus = 2; a--;) t = n[a], r = t._tableMember, i[r] !== e && (6 === t.FieldType ? l[r] = T(i[r]) : l[r] = i[r]);
        o.curRecord = l
      }
    }, Cancel: function () {
      var e = this;
      e.editStatus && (1 === e.editStatus ? e.Last() : e.curRecord = e._dataTable[e.recordNo], e.editStatus = 0)
    }, Post: function () {
      var e = this;
      e.editStatus && (e.isDetailGridRecordset() && e.report.fireBeforePostRecord(), 1 === e.editStatus ? e._dataTable.push(e.curRecord) : e._dataTable[e.recordNo] = e.curRecord, e.editStatus = 0)
    }, First: function () {
      this.MoveTo(0)
    }, Next: function () {
      var e = this;
      e.MoveTo(e.recordNo + 1)
    }, Prior: function () {
      var e = this;
      e.MoveTo(e.recordNo - 1)
    }, Last: function () {
      var e = this;
      e.MoveTo(e._dataTable.length - 1)
    }, MoveBy: function (e) {
      var t = this;
      t.MoveTo(t.recordNo + e)
    }, Bof: function () {
      var e = this;
      return e.recordNo < 0 || !e._dataTable.length
    }, Eof: function () {
      var e = this;
      return e.recordNo >= e._dataTable.length
    }, MoveTo: function (e) {
      var t = this, r = t._dataTable;
      t.recordNo = e, t.curRecord = r[Math.min(Math.max(0, e), r.length - 1)]
    }, Empty: function () {
      this.attachDataTable([])
    }, AddField: function (e, t) {
      var r = this.Fields.Add();
      return r.Name = e, r.FieldType = t, r
    }, RemoveAllFields: function () {
      this.Fields.RemoveAll()
    }, Resort: function (e, t, r) {
      function o() {
        var o = [], n = e.split(";");
        return n.forEach(function (e) {
          function n(e) {
            e = e.trim().toUpperCase(), "ASC" === e ? l.asc = !0 : "DESC" === e ? l.asc = !1 : "CASE" === e ? l["case"] = !0 : "CASEIN" === e && (l["case"] = !1)
          }

          var a, l = {};
          e = e.trim(), a = e.split(" "), a[0] = a[0].trim(), l.field = i.Fields.Item(a[0]), l.field && (l.asc = t, l["case"] = r, a.length > 1 && n(a[1]), a.length > 2 && n(a[2]), o.push(l))
        }), o
      }

      var n, a, i = this, l = [];
      e && (n = o(), a = n.length, a > 0 && (i.report.fireBeforeSort(e, i), i.isDetailGridRecordset() && (i.owner.Groups.forEach(function (e) {
        i.decodeFields(e.ByFields).forEach(function (e) {
          l.indexOf(e) < 0 && l.push(e)
        })
      }), n.forEach(function (e) {
        var t = l.indexOf(e.field);
        0 > t ? l.push(e) : l[t] = e
      }), l.forEach(function (e, o) {
        e.field || (l[o] = {field: e, asc: t, "case": r})
      }), n = l, a = n.length)), i.sortRecords(n, 0))
    }
  }, E(Ze, ge);
  var qe = function (e) {
    var t = this;
    ge.call(t, e), t.Name = "", t.Visible = !0, t.FixedWidth = !1, t.Width = t.report.cm2Size(3)
  };
  qe.prototype = {
    prepare: function () {
      var e = this;
      e.pxWidth = e.report.size2Pixel(e.Width)
    }, get pxRight() {
      var e = this;
      return e.pxLeft + e.pxWidth
    }
  }, E(qe, ge);
  var $e = function (e) {
    var t = this;
    ge.call(t, e), t.Header = new Ye(t), t.Footer = new Je(t), t.Name = "", t.ByFields = "", t.SortSummaryBox = "", t.SortAsc = !1, t.GroupBeginScript = "", t.GroupEndScript = ""
  };
  $e.prototype = {
    children: ["Header", "Footer"], afterLoad: function (e) {
      var t = this;
      t.Header.loadFromJSON(e.GroupHeader), t.Footer.loadFromJSON(e.GroupFooter)
    }, prepare: function (e) {
      function t(e) {
        e.forEach(function (e) {
          function o(e) {
            function n(e) {
              var t, o, n, a = r.summaryItems.length + "", i = "";
              r.summaryItems.push(e), e.SummaryFun ? (e.value = 0, 28 === e.SummaryFun && (t = r.owner.Groups.indexOf(r), t > 0 && (o = new Y, o.SummaryFun = -1, o.init(), r.owner.Groups.items[t - 1].summaryItems.push(o))), e.displayField ? (n = e.displayField.FieldType, i = e.displayField.Format) : n = 18 === e.SummaryFun || 19 === e.SummaryFun ? 1 : 3) : (n = e.oParameter.DataType, i = e.oParameter.Format), e.valueField = r.recordset.AddField(a, n), e.valueField.Format = i
            }

            var a = e.ControlType;
            5 === a ? n(e) : 8 === a ? (e.getSummaryExpFields().forEach(function (e) {
              n(e)
            }), e.getParameterExpFields().forEach(function (e) {
              n(e)
            })) : 1 === a ? e.oParameter && n(e) : 13 === a && e.cells.forEach(function (e) {
              e.forEach(function (e) {
                e.FreeCell ? t(e.Controls) : o(e)
              })
            })
          }

          o(e)
        })
      }

      var r = this;
      r.index = e, r.Header.prepare(), r.Footer.prepare(), r.oByFields = r.owner.Recordset.decodeFields(r.ByFields), r.SortSummaryBox && (r.sortSummaryBoxObj = r.Footer.Controls.itemByName(r.SortSummaryBox), r.sortSummaryBoxObj || (r.sortSummaryBoxObj = r.Header.Controls.itemByName(r.SortSummaryBox)), r.sortSummaryBoxObj && 5 !== r.sortSummaryBoxObj.ControlType && delete r.sortSummaryBoxObj), r.recordset = new Ze(r), r.beginNoField = r.recordset.AddField("b", 2), r.endNoField = r.recordset.AddField("e", 2), r.groupItemNo = 0, r.summaryItems = [], t(r.Header.Controls), t(r.Footer.Controls), r.recordset.prepare()
    }, unprepare: function () {
    }, inphaseByDetail: function (e) {
      var t = this, r = t.recordset;
      if (!r.isAppendingRecord() && r.RecordCount) {
        for (; t.beginNoField.Value > e && !r.Bof();) r.Prior();
        for (; t.endNoField.Value < e && !r.Eof();) r.Next()
      }
    }, get Parent() {
      return this.owner
    }
  }, E($e, ge);
  var Qe = function (e) {
    var t = this;
    ge.call(t, e), t.FixCols = 0, t.BackColor = e.BackColor, t.ShowColLine = !0, t.ShowRowLine = !0, t.Font = new Q(e.Font), t.Border = new q(15), t.ColLinePen = new Z, t.RowLinePen = new Z, t.Recordset = new Ze(t), t.ColumnContent = new We(t), t.ColumnTitle = new Ue(t), t.Columns = new le(t), t.Groups = new de(t)
  };
  Qe.prototype = {
    children: ["Border", "ColLinePen", "RowLinePen", "Recordset", "Groups"], afterLoad: function (e) {
      var t = this;
      f(t, "BackColor", t.report.viewer.alpha.background), t.Border.loadFromJSON(e.Border, t.report.viewer.alpha.border), t.ColLinePen.loadFromJSON(e.ColLine, t.report.viewer.alpha.stroke), t.RowLinePen.loadFromJSON(e.RowLine, t.report.viewer.alpha.stroke), t.Font.loadFromJSON(e.Font), t.Recordset.loadFromJSON(e.Recordset), t.Groups.loadFromJSON(e.Group), t.Columns.loadFromJSON(e.Column), t.ColumnContent.loadFromJSON(e.ColumnContent), t.ColumnTitle.loadFromJSON(e.ColumnTitle), t.IsCrossTab = e.IsCrossTab, e.IsCrossTab && t.CrossTab.loadFromJSON(e.CrossTab)
    }, assign: function (e) {
      function t(e, o) {
        o.forEach(function (o) {
          var n;
          o.GroupTitle ? (n = e.AddGroup("", ""), n.assign(o), t(n.SubTitles, o.SubTitles)) : (n = r.Columns.addTo(e), n.assign(o.Column), n.TitleCell.assign(o), n.ContentCell.assign(o.Column.ContentCell))
        })
      }

      var r = this;
      ge.prototype.assign.call(r, e), r.ColumnContent.assign(e.ColumnContent), r.ColumnTitle.assign(e.ColumnTitle), t(r.ColumnTitle.TitleCells, e.ColumnTitle.TitleCells), r.IsCrossTab = e.IsCrossTab, r.IsCrossTab && r.CrossTab.assign(e.CrossTab)
    }, attachData: function () {
      function e(t) {
        t.forEach(function (t) {
          t.attachData(), t.GroupTitle && e(t.SubTitles)
        })
      }

      var t = this;
      t.Recordset.prepare(), t.ColumnContent.ContentCells.forEach(function (e) {
        e.attachData()
      }), e(t.ColumnTitle.TitleCells), t.Groups.forEach(function (e) {
        e.Header.Controls.attachData(), e.Footer.Controls.attachData()
      })
    }, buildColumnsOrder: function () {
      function e(t) {
        t.forEach(function (t) {
          t.GroupTitle ? e(t.SubTitles) : (t.Column.orderNo = r.length, r.push(t.Column))
        })
      }

      var t = this, r = [];
      e(t.ColumnTitle.TitleCells), t.Columns.items = r
    }, beginGroupItem: function (e) {
      var t = this;
      t.rows.push({
        header: e.Header,
        recordNo: e.groupItemNo
      }), e.recordset.Append(), e.beginNoField.Value = t.Recordset.recordNo, e.groupRecordCount = 0, e.summaryItems.forEach(function (e) {
        e.SummaryFun && e.beginSummaryValue()
      }), t.report.fireGroupBegin(e)
    }, endGroupItem: function (t) {
      var r = this, o = r.report;
      r.rows.push({footer: t.Footer, recordNo: t.groupItemNo++}), t.summaryItems.forEach(function (e) {
        e.SummaryFun && e.endSummaryValue()
      }), t.summaryItems.forEach(function (t) {
        var r = t.SummaryFun;
        r ? -1 !== r && t.value !== e && (t.valueField.AsFloat = t.value) : t.valueField.Value = t.oParameter.Value
      }), o.fireGroupEnd(t), o.DetailGrid.CrossTab && o.DetailGrid.CrossTab.GroupEndProcess(t), t.endNoField.Value = r.Recordset.recordNo, t.recordset.Post()
    }, prepare: function () {
      function e(r) {
        r.forEach(function (r) {
          function o(r) {
            var n = r.ControlType;
            5 === n ? t.globalSummaryItems.push(r) : 8 === n ? we.prototype.getSummaryExpFields.call(r).forEach(function (e) {
              t.globalSummaryItems.push(e)
            }) : 13 === n && r.cells.forEach(function (t) {
              t.forEach(function (t) {
                t.FreeCell ? e(t.Controls) : o(t)
              })
            })
          }

          o(r)
        })
      }

      var t = this, r = t.report;
      t.CrossTab ? (t.buildColumnsOrder(), t.CrossTab.prepare()) : (t.Columns.prepare(), t.ColumnContent.prepare(), t.ColumnTitle.prepare(), t.Groups.forEach(function (e, t) {
        e.prepare(t)
      }), t.globalSummaryItems = [], r.ReportHeaders.items.concat(r.ReportFooters.items).forEach(function (t) {
        e(t.Controls)
      }))
    }, unprepare: function () {
      var e = this;
      e.CrossTab && e.CrossTab.unprepare()
    }, generate: function (e) {
      function t(e) {
        var t = e.report, r = t.viewer.options.detailgridResize;
        return 1 === r || 2 === r && window.innerWidth && e.width < window.innerWidth && (!t.ownerReport || t.ownerReport.owner._singleSR)
      }

      var r, o = this, n = new re("table", e), a = new re("colgroup", n);
      o.Font.font && n.addClass(o.report.viewer.selectFont2(o.Font.font)), n.getStyles().addBorder(o.Border), n.addStyle("border-collapse", "collapse"), n.addStyle("width", t(o) ? "100%" : C(o.width)), o.toFillBack() && n.addBackColorStyle(o.BackColor), o.showingColumns.forEach(function (e) {
        r = new re("col", a), r.skipend = 1, r.addStyle("width", b(100 * e.pxWidth / o.columnsTotalWidth))
      }), o.ColumnTitle.generate(n), o.rows.forEach(function (e, t) {
        o.generatingRowNo = t, e.header ? e.header.generate(n, e.recordNo) : e.footer ? e.footer.generate(n, e.recordNo) : o.ColumnContent.generate(n, e)
      })
    }, buildRows: function () {
      function e(e) {
        e.summaryItems.forEach(function (e) {
          e.SummaryFun && e.summaryCurRecord()
        }), e.groupRecordCount++
      }

      function t(e) {
        function t() {
          var t, r = l.length, o = e.owner.rows, n = [];
          1 >= r || (t = l[0].beginRowNo, l.forEach(function (t) {
            e.recordset.MoveTo(t.groupItemNo), t.sortValue = e.sortSummaryBoxObj.valueField.AsFloat
          }), l.sort(function (t, r) {
            return e.SortAsc ? t.sortValue - r.sortValue : r.sortValue - t.sortValue
          }), l.forEach(function (e) {
            n = n.concat(o.slice(e.beginRowNo, e.endRowNo))
          }), n.forEach(function (e) {
            o[t++] = e
          }))
        }

        var r, o, n, a = e.owner.rows, i = a.length, l = [];
        for (r = 0; i > r;) {
          for (n = {}, o = a[r], o.footer && o.footer.owner.index < e.index && (t(), l = [], r++); i > r;) if (o = a[r++], o.header && o.header.owner.index === e.index) {
            n.beginRowNo = r - 1, n.groupItemNo = o.recordNo;
            break
          }
          for (; i > r;) if (o = a[r++], o.footer && o.footer.owner.index === e.index) {
            n.endRowNo = r, l.push(n);
            break
          }
        }
        t()
      }

      var r, o, n, a = this, i = a.report, l = a.Recordset, s = a.Groups.items, u = s.length, c = 0;
      for (a.rows = [], a.globalSummaryItems.forEach(function (e) {
        e.beginSummaryValue()
      }), l.First(), l.keepValue(), s.forEach(function (e) {
        a.beginGroupItem(e)
      }); !l.Eof();) {
        for (r = 0; u > r && !l.fieldsKeepedValueChanged(s[r].oByFields); r++) ;
        if (u > r) {
          for (l.Prior(), o = u - 1; o >= r; o--) a.endGroupItem(s[o]);
          for (l.Next(), o = r; u > o; o++) a.beginGroupItem(s[o])
        }
        i.fireProcessRecord(l), s.forEach(function (t) {
          e(t)
        }), a.globalSummaryItems.forEach(function (e) {
          e.summaryCurRecord()
        }), a.rows.push(l.recordNo), l.keepValue(), l.Next()
      }
      for (i.fireProcessEnd(), o = u - 1; o >= 0; o--) a.endGroupItem(s[o]);
      a.globalSummaryItems.forEach(function (e) {
        e.endSummaryValue()
      }), s.forEach(function (e) {
        e.sortSummaryBoxObj && (t(e), c = 1)
      }), c && (n = [], o = 0, a.sortedTable = [], s.forEach(function (e) {
        e.sortedTable = [], e.groupItemNo = 0
      }), a.rows.forEach(function (e) {
        var t;
        e.header ? (t = e.header.owner, t.recordset.MoveTo(e.recordNo), t.recordset.Edit(), t.beginNoField.Value = o, e.recordNo = t.groupItemNo) : e.footer ? (t = e.footer.owner, t.endNoField.Value = o, t.recordset.Post(), t.sortedTable.push(t.recordset._dataTable[e.recordNo]), e.recordNo = t.groupItemNo++) : (a.sortedTable.push(l._dataTable[e]), e = o++), n.push(e)
      }), a.rows = n, l.attachDataTable(a.sortedTable), delete a.sortedTable, s.forEach(function (e) {
        e.recordset.attachDataTable(e.sortedTable), delete e.sortedTable
      }))
    }, clearColumns: function () {
      var e = this;
      e.ColumnContent.ContentCells.RemoveAll(), e.ColumnTitle.TitleCells.RemoveAll(), e.Columns.RemoveAll()
    }, get width() {
      var e = this, t = e.Border;
      return e.columnsTotalWidth + t.getLeftWidth() + t.getRightWidth()
    }, _ColumnMoveTo: function (e, t) {
      var r = this, o = r.ColumnTitle.FindColumnTitlesOfTitleCell(e.TitleCell),
        n = t ? t.SubTitles : r.ColumnTitle.TitleCells;
      r.MoveTitleTo(e.TitleCell, o, n, -1)
    }, MoveTitleTo: function (e, t, r, o) {
      t.items.splice(t.items.indexOf(e), 1), 0 > o ? r.items.push(e) : r.items.splice(o, 0, e)
    }, get IsCrossTab() {
      return !!this.CrossTab
    }, set IsCrossTab(e) {
      var t = this;
      e ? t.CrossTab || (t.CrossTab = new mt(t)) : delete t.CrossTab
    }, AddColumn: function (e, t, r, o) {
      var n = this.Columns.Add();
      return n.Name = e, n.Width = o, n.ContentCell.DataField = r, n.TitleCell.Text = t, n
    }, ClearColumns: function () {
      this.Columns.RemoveAll()
    }, FindGroupTitleCell: function (e) {
      function t(r) {
        var o, n = r.items.length, a = r.itemByName(e);
        if (!a) for (o = 0; n > o; o++) if (a = r.items[o], a.GroupTitle && (a = t(a.SubTitles, e))) return a;
        return a
      }

      return t(this.ColumnTitle.TitleCells, e)
    }, AddGroupTitle: function (e, t) {
      return this.ColumnTitle.TitleCells.AddGroup(e, t)
    }, ClearGroupTitles: function () {
      var e, t, r = this, o = r.Columns.Count, n = r.ColumnTitle.TitleCells, a = [];
      for (e = 1; o >= e; e++) ColumnMoveToEnd(e);
      for (o = n.Count, e = 0; o > e; e++) t = n.items[e], !t.GroupTitle && a.push(t);
      n.items = a
    }, ColumnMoveToEnd: function (t) {
      var r = this, o = r.Columns.Item(t);
      o && sel._ColumnMoveTo(o, e)
    }, ColumnMoveTo: function (t, r, o) {
      var n, a = this, i = a.Columns.Item(t), l = i ? i.TitleCell : a.FindGroupTitleCell(t),
        s = r ? a.FindGroupTitleCell(r) : e, u = r ? s ? s.SubTitles : e : a.ColumnTitle.TitleCells;
      l && u && (n = a.ColumnTitle.FindColumnTitlesOfTitleCell(l), a.MoveTitleTo(l, n, u, o))
    }, StartNewGroup: function (e) {
      var t, r = this, o = r.Recordset, n = r.Groups.items, a = n.length, i = r.Groups.Item(e);
      if (i) {
        for (o.Prior(), t = a - 1; t >= i.index; t--) r.endGroupItem(n[t]);
        for (o.Next(), t = i.index; a > t; t++) r.beginGroupItem(n[t])
      }
    }, ColumnByShowOrder: function (t) {
      function r(t, o, n) {
        var a, i, l = t.Count;
        for (a = 0; l > a; a++) if (i = t.items[a], i.GroupTitle) {
          if (i = r(i.SubTitles, o, n)) return i
        } else {
          if (o == n) return i;
          o++
        }
        return e
      }

      var o = 0;
      return r(this.ColumnTitle.TitleCells, o, t)
    }
  }, E(Qe, ge);
  var Ke = function (t) {
    var r = this;
    ge.call(r, t), r.DataType = 1, r.Name = "", r.Format = "", r.Value = e
  };
  Ke.prototype = {
    afterLoad: function (t) {
      var r = this;
      d(r, "DataType", a.ParameterDataType), r.Value !== e && r.setValue(r.Value)
    }, prepare: function () {
      var e = this;
      6 === e.DataType ? e.formater = new s.DateTimeFormatter(e.Format) : 5 === e.DataType ? e.formater = new s.BooleanFormatter(e.Format) : 2 !== e.DataType && 3 !== e.DataType || (e.formater = new s.NumericFormatter(e.Format))
    }, unprepare: function () {
      delete this.formater
    }, setValue: function (t) {
      var r = this;
      if (null !== t || t !== e) switch (r.DataType) {
        case 2:
          t = Math.floor(+t);
          break;
        case 3:
          t = +t;
          break;
        case 5:
          t = F(t);
          break;
        case 6:
          t = x(t);
          break;
        default:
          t += ""
      }
      r.Value = t
    }, get AsBoolean() {
      return !!this.Value
    }, set AsBoolean(e) {
      this.setValue(e)
    }, get AsDateTime() {
      return T(this.Value)
    }, set AsDateTime(e) {
      this.setValue(e)
    }, get AsFloat() {
      var e = this, t = e.Value;
      if (6 === e.DataType) {
        var r = new J;
        r.value = t, t = r.AsFloat
      } else t = +t;
      return isNaN(t) ? 0 : t
    }, set AsFloat(e) {
      var t, r = this;
      6 === r.DataType && (t = new J, t.AsFloat = e, e = t.value), r.setValue(e)
    }, get AsInteger() {
      return Math.floor(this.AsFloat)
    }, set AsInteger(e) {
      this.AsFloat = Math.floor(+e)
    }, get AsString() {
      return this.Value + ""
    }, set AsString(e) {
      this.setValue(e)
    }, get DisplayText() {
      var t = this, r = t.Value;
      if (r === e) return "";
      switch (t.DataType) {
        case 1:
          return r + "";
        default:
          return t.formater.format(r)
      }
    }, get IsNull() {
      return this.Value === e
    }, Clear: function () {
      this.Value = e
    }
  }, E(Ke, ge);
  var et = function (t, r) {
    var o = this;
    o.viewer = t, o.report = o, r && (o.ownerSR = r), o.Font = new Q(e), o.Font.font = new $, o.Parameters = new pe(o), o.ReportHeaders = new he(o), o.ReportFooters = new fe(o), o.XmlTableName = "", o.Unit = 1, o.CodePage = 0, o.BackColor = 16777215 | t.alpha.background << 24, o.QuerySQL = "", o.Title = "", o.Author = "", o.Description = "", o.InitializeScript = "", o.ProcessBeginScript = "", o.ProcessEndScript = "", o.BeforeSortScript = "", o.Printer = {
      DesignPaperWidth: 21,
      DesignPaperLength: 29.7,
      DesignPaperLeftMargin: 2.5,
      DesignPaperRightMargin: 2.5,
      DesignPaperOrientation: 1
    }
  };
  et.prototype = {
    loadFromJSON: function (e) {
      var t = this, r = t.Printer, o = e.Printer;
      t.Clear(), c(t, e), f(t, "BackColor", t.report.viewer.alpha.background), t.Font.loadFromJSON(e.Font), t.Parameters.loadFromJSON(e.Parameter), t.ReportHeaders.loadFromJSON(e.ReportHeader), t.ReportFooters.loadFromJSON(e.ReportFooter), e.DetailGrid && t.InsertDetailGrid().loadFromJSON(e.DetailGrid), e.Printer && (o.Width && (r.DesignPaperWidth = o.Width), o.Height && (r.DesignPaperLength = o.Height), o.hasOwnProperty("LeftMargin") && (r.DesignPaperLeftMargin = o.LeftMargin), o.hasOwnProperty("RightMargin") && (r.DesignPaperRightMargin = o.RightMargin), o.Oriention && (r.DesignPaperOrientation = 2), t.Printer = r)
    }, generateHtml: function () {
      function e(t, r) {
        r && (t.push(r.beginText()), r.children ? r.children.forEach(function (r) {
          e(t, r)
        }) : t.push(r.innerText), t.push(r.endText()))
      }

      var t = this, r = [], o = {
        htmlElements: [], addChild: function (e) {
          o.htmlElements.push(e)
        }
      };
      return t.generate(o), o.htmlElements.forEach(function (t) {
        e(r, t)
      }), r.join("")
    }, generate: function (e) {
      var t, r = this, o = r.ReportHeaders, n = r.ReportFooters;
      r.fireInitialize(), !r.ownerSR && r.matchTables(), r.DetailGrid && r.fireFetchRecord(), r.fireProcessBegin(), !r.ownerSR && r.prepare(), r.singleChart ? r.singleChart.generateContent(e) : (t = r.RunningDetailGrid, r.reportFitHeight && ne(o.items.concat(n.items)), t && t.buildRows(r), o.generate(e), t && t.generate(e), n.generate(e)), !t && r.fireProcessEnd()
    }, matchTables: function () {
      function e(e, t) {
        function r(e) {
          function t(e, t) {
            var r = this;
            r.isRecordset = e, r.tableName = t.XmlTableName, r.object = t
          }

          var o, n, a;
          if (e) for (b.push(new t(!1, e)), e.DetailGrid && b.push(new t(!0, e.DetailGrid.Recordset)), n = e.FindFirstControl(); n;) a = n.ControlType, 11 === a ? (o = n.Recordset, o.Fields.Count > 0 && b.push(new t(!0, o))) : 9 === a && r(n.Report), n = e.FindNextControl()
        }

        function o(e, t, r) {
          function o(e, t) {
            var r, o = e.length, n = 0;
            for (r = 0; o > r; r++) t.indexOf(e[r]) >= 0 && n++;
            return 100 * n / o
          }

          var n = t.recordCount, a = t.fieldNames, i = 0;
          if (e.length && t.fieldNames.length) {
            if (i = o(e, a), !i) return 0;
            100 === i && e.length === a.length ? i = 200 : i += o(a, e), i += r && n > 1 || !r && 1 === n ? 5 : -5
          }
          return i
        }

        function n(e) {
          return e >= 200
        }

        function a() {
          var t, r, o, n = e, a = [];
          for (t = n.Parameters.items.length; t--;) a.push(n.Parameters.items[t].Name.toUpperCase());
          for (r = n.FindFirstControl(); r;) o = r.ControlType, 1 === o || 8 === o || 7 === o || 12 === o ? a.push(r.Name.toUpperCase()) : 13 === o && r.cells.forEach(function (e) {
            e.forEach(function (e) {
              e.DataName && a.push(e.DataName.toUpperCase())
            })
          }), r = n.FindNextControl();
          return a
        }

        function i(e) {
          for (var t = e[0], r = 1, o = e.length; o > r; r++) e[r].weight > t.weight && (t = e[r]);
          return t
        }

        function l(e, t, r) {
          r.matchWeight < e && (r.matchWeight = e, r.reportTableInfo = t)
        }

        var s, u, c, d, h, f, p, g, m, C, b = [];
        for (r(e), c = b.length, s = 0; c > s; ++s) {
          if (h = b[s], h.tableName) {
            if (u = t.indexOf(h.tableName), u >= 0) {
              t[u].turnToFullMatched();
              continue
            }
            h.tableName = ""
          }
          if (h.isRecordset) {
            for (m = h.object.Fields.items, C = [], u = 0, d = m.length; d > u;) C.push(m[u++].RunningDBField.toUpperCase());
            for (p = [], d = t.length, u = 0; d > u;) if (f = t[u++], !f.isFullMatched()) {
              if (g = o(C, f, !0), n(g)) {
                l(g, h, f), p = [];
                break
              }
              g > 0 && p.push({dataTableInfo: f, weight: g})
            }
            p.length && (u = i(p), l(u.weight, h, u.dataTableInfo))
          }
        }
        if (t.some(function (e) {
            return !e.isMatched()
          })) for (c = b.length, s = 0; c > s; ++s) if (h = b[s], !h.isRecordset && !h.tableName) {
          for (C = a(), p = [], d = t.length, u = 0; d > u;) if (f = t[u++], !f.isFullMatched()) {
            if (g = o(C, f, !1), n(g)) {
              l(g, h, f), p = [];
              break
            }
            g > 0 && p.push({dataTableInfo: f, weight: g})
          }
          p.length && (u = i(p), l(u.weight, h, u.dataTableInfo))
        }
        for (c = t.length, s = 0; c > s;) f = t[s++], h = f.reportTableInfo, h && h.object.attachDataTable(f.table)
      }

      var t = this, r = t.viewer.tables, o = [], n = function (e, t) {
        var r, o = this, n = o.fieldNames = [], a = Math.min(t.length, 50);
        for (o.tableName = e, o.table = t, o.matchWeight = 0; a--;) {
          r = t[a];
          for (var i in r) i = i.toUpperCase(), n.indexOf(i) < 0 && n.push(i)
        }
      };
      n.prototype = {
        isFullMatched: function () {
          return this.matchWeight >= 200
        }, turnToFullMatched: function () {
          this.matchWeight = 200
        }, isMatched: function () {
          return this.matchWeight >= 40
        }, get recordCount() {
          return this.table.length
        }
      };
      for (var a in r) o.push(new n(a, r[a]));
      1 === o.length && o[0].recordCount > 1 && t.DetailGrid ? t.DetailGrid.Recordset.attachDataTable(o[0].table) : e(t, o)
    }, attachDataTable: function (e) {
      var t, r, o = this, n = e[0];
      for (var a in n) t = n[a], r = o.ParameterByName(a), r ? r.setValue(t) : (r = o.ControlByName(a), r && (r.hasOwnProperty("Text") || 7 === r.ControlType) && (r.Text = t + ""))
    }, prepare: function () {
      var e = this, t = e.ownerSR, r = e.Printer, o = e.ReportHeaders, n = e.ReportFooters;
      e.designWidth = t ? t.pxRect ? t.pxRect.Width() : t.owner.getRect().Width() : e.size2Pixel((1 === r.DesignPaperOrientation ? r.DesignPaperWidth : r.DesignPaperLength) - r.DesignPaperLeftMargin - r.DesignPaperRightMargin), e.DetailGrid && e.DetailGrid.attachData(), o.attachData(), n.attachData(), e.Parameters.prepare(), e.DetailGrid && e.DetailGrid.prepare(), o.prepare(), n.prepare(), e._srChildren && e._srChildren.forEach(function (e) {
        e.Report.prepare()
      }), t || !e.viewer.options.singleChartFill || e.DetailGrid || o.Count + n.Count !== 1 || (e.singleChart = (o.items[0] || n.items[0]).Controls.items[0], 11 !== e.singleChart.ControlType && delete e.singleChart)
    }, unprepare: function () {
      var e = this;
      e.Parameters.unprepare(), e.DetailGrid && (e.DetailGrid.unprepare(), e.RunningDetailGrid = e.DetailGrid), delete e._srChildren, delete e.singleChart, delete e.canvasControls
    }, getUsingFont: function () {
      return this.Font.font
    }, getRunningColumnByName: function (t) {
      var r = this;
      return r.RunningDetailGrid ? r.RunningDetailGrid.Columns.itemByName(t) : e
    }, getReportWidth: function () {
      var e = this;
      return e.RunningDetailGrid ? e.RunningDetailGrid.width : e.designWidth
    }, get reportFitHeight() {
      var e = this;
      return !e.RunningDetailGrid && e.viewer.options.reportFitHeight
    }, get reportFitWidth() {
      return this.viewer.options.reportFitWidth
    }, get toFillHolder() {
      var e = this;
      return e.reportFitHeight || e.singleChart
    }, get isDynamicSize() {
      var e = this, t = e.viewer.options;
      return e.toFillHolder || t.reportFitWidth || t.detailgridResize
    }, pixel2Size: function (e) {
      return e /= 96, 1 === this.Unit && (e *= 2.54), e
    }, size2Pixel: function (e) {
      return 1 === this.Unit && (e /= 2.54), 96 * e
    }, cm2Size: function (e) {
      return 1 === this.Unit ? e : e / 2.54
    }, registerCanvas: function (e, t) {
      var r = this, o = new re("canvas", t), n = oe();
      o.addAttribute("id", n), r.isDynamicSize ? (o.addStyle("width", "100%"), o.addStyle("height", "100%"), o.addStyle("display", "block")) : (o.addAttribute("width", e.pxRect.Width() + ""), o.addAttribute("height", e.pxRect.Height() + "")), e.canvasID = n, r.canvasControls || (r.canvasControls = []), r.canvasControls.push(e)
    }, prepareCanvas: function () {
      for (var e, t = this, r = t.canvasControls, o = r.length; o-- > 0;) e = r[o], e.canvas = document.getElementById(e.canvasID), e.prepareCanvas && e.prepareCanvas()
    }, resizeCanvas: function () {
      for (var e = this, t = e.canvasControls, r = t.length; r-- > 0;) t[r].resize()
    }, renderCanvas: function () {
      for (var e = this, t = e.canvasControls, r = t.length; r-- > 0;) t[r].draw(1)
    }, executeEventScript: function (e, t, r) {
      gr.script.execEvent(e, t, r, this)
    }, fireInitialize: function () {
      var e = this;
      e.InitializeScript && e.executeEventScript(e.InitializeScript, "InitializeScript", e), e.OnInitialize && e.OnInitialize()
    }, fireFetchRecord: function () {
      var e = this;
      e.FetchRecordScript && e.executeEventScript(e.FetchRecordScript, "FetchRecordScript", e.DetailGrid.Recordset), e.OnFetchRecord && e.OnFetchRecord()
    }, fireBeforePostRecord: function (e) {
      var t = this, r = t.DetailGrid.Recordset;
      r.BeforePostRecordScript && t.executeEventScript(r.BeforePostRecordScript, "BeforePostRecordScript", r), t.OnBeforePostRecord && t.OnBeforePostRecord()
    }, fireBeforeSort: function (e, t) {
      var r = this;
      r.BeforeSortScript && r.executeEventScript(r.BeforeSortScript, "BeforeSortScript", t), r.OnBeforeSort && t.isDetailGridRecordset() && r.OnBeforeSort()
    }, fireProcessBegin: function () {
      var e = this;
      e.ProcessBeginScript && e.executeEventScript(e.ProcessBeginScript, "ProcessBeginScript", e), e.OnProcessBegin && e.OnProcessBegin()
    }, fireProcessEnd: function () {
      var e = this;
      e.ProcessEndScript && e.executeEventScript(e.ProcessEndScript, "ProcessEndScript", e), e.OnProcessEnd && e.OnProcessEnd()
    }, fireProcessRecord: function (e) {
      var t = this;
      e.ProcessRecordScript && t.executeEventScript(e.ProcessRecordScript, "ProcessRecordScript", e), t.OnProcessRecord && t.OnProcessRecord()
    }, fireGroupBegin: function (e) {
      var t = this;
      e.GroupBeginScript && t.executeEventScript(e.GroupBeginScript, "GroupBeginScript", e), t.OnGroupBegin && t.OnGroupBegin(e)
    }, fireGroupEnd: function (e) {
      var t = this;
      e.GroupEndScript && t.executeEventScript(e.GroupEndScript, "GroupEndScript", e), t.OnGroupEnd && t.OnGroupEnd(e)
    }, fireSectionFormat: function (e) {
      var t = this;
      e.FormatScript && t.executeEventScript(e.FormatScript, "FormatScript", e), t.OnSectionFormat && t.OnSectionFormat(e)
    }, fireFieldGetDisplayText: function (e) {
      var t = this;
      e.GetDisplayTextScript && t.executeEventScript(e.GetDisplayTextScript, "FieldGetDisplayTextScript", e), t.OnFieldGetDisplayText && t.DetailGrid && t.RunningDetailGrid.Recordset === e.owner && t.OnFieldGetDisplayText(e)
    }, fireTextBoxGetDisplayText: function (e) {
      var t = this;
      e.GetDisplayTextScript && t.executeEventScript(e.GetDisplayTextScript, "TextBoxGetDisplayTextScript", e), t.OnTextBoxGetDisplayText && t.OnTextBoxGetDisplayText(e)
    }, fireControlCustomDraw: function (e) {
    }, fireChartRequestData: function (e) {
      var t = this;
      t.OnChartRequestData && t.OnChartRequestData(e)
    }, get Version() {
      return i.VERSION
    }, get FloatControls() {
      var e = this;
      return e._floatControls || (e._floatControls = new ie(e)), e._floatControls
    }, get ImageList() {
      return {}
    }, get ParentReport() {
      var t = this;
      return t.ownerSR ? t.ownerSR.Report : e
    }, get Utility() {
      return gr.utility
    }, get Running() {
      return !!this.viewer.running
    }, get DisplayMode() {
      return 1
    }, get IsBlank() {
      var e = this;
      return e.DetailGrid && e.PageHeader && e.PageFooter && !e.ReportHeaders.Count && !e.ReportFooters.Count
    }, ControlByName: function (t) {
      function r(o) {
        function n(o) {
          function n(o) {
            return o.FreeCell ? r(o.Controls) : o.DataName.toUpperCase() === t ? o : e
          }

          for (var a, i, l, s, u = o.length; u--;) if (l = o[u]) for (a = l.length; a--;) if (s = l[a], i = s ? n(s) : 0) return i;
          return e
        }

        for (var a, i = o.items, l = i.length; l--;) {
          if (a = i[l], a.Name.toUpperCase() === t) return a;
          if (13 === a.ControlType && (a = n(a.cells))) return a
        }
        return e
      }

      function o(t) {
        return t.FreeCell ? r(t.Controls) : e
      }

      function n(t) {
        for (var r, a, i = t.items.length; i--;) if (r = t.items[i], a = o(r), r.GroupTitle && !a && (a = n(r.SubTitles)), a) return a;
        return e
      }

      function a(e) {
        for (var t = e.length; t--;) if (u = r(e[t].Controls)) return u
      }

      var i, l, s, u, c = this;
      if (t = t.toUpperCase(), u = a(c.ReportHeaders.items) || a(c.ReportFooters.items)) return u;
      if (c.DetailGrid) {
        for (i = c.DetailGrid.Groups.items, l = i.length; l--;) if (s = i[l], u = r(s.Header.Controls) || r(s.Footer.Controls)) return u;
        for (i = c.DetailGrid.ColumnContent.ContentCells.items, l = i.length; l--;) if (u = o(i[l])) return u;
        return n(c.DetailGrid.ColumnTitle.TitleCells)
      }
      return e
    }, ColumnByName: function (t) {
      var r = this;
      return r.DetailGrid ? r.DetailGrid.Columns.itemByName(t) : e
    }, FieldByName: function (e) {
      return this.RunningFieldByName(e)
    }, FieldByDBName: function (t) {
      var r = this.RunningDetailGrid;
      return r ? r.Recordset.FieldByDBName(t) : e
    }, ParameterByName: function (e) {
      return this.Parameters.itemByName(e)
    }, FindFirstControl: function () {
      function e(e) {
        e.FreeCell && (l = l.concat(e.Controls.items))
      }

      function t(r) {
        r.forEach(function (r) {
          e(r), r.GroupTitle && t(r.SubTitles)
        })
      }

      var r, o, n, a = this, i = a.DetailGrid, l = [];
      for (o = a.ReportHeaders.Count, r = 0; o > r; r++) l = l.concat(a.ReportHeaders.items[r].Controls.items);
      for (o = a.ReportFooters.Count, r = 0; o > r; r++) l = l.concat(a.ReportFooters.items[r].Controls.items);
      if (i) {
        for (o = i.Groups.Count, r = 0; o > r; r++) n = i.Groups.items[r], l = l.concat(n.Header.Controls.items), l = l.concat(n.Footer.Controls.items);
        i.ColumnContent.ContentCells.forEach(function (t) {
          e(t)
        }), t(i.ColumnTitle.TitleCells)
      }
      return l.length > 0 && (a.findControls = l, a.findControlIndex = -1), a.FindNextControl()
    }, FindNextControl: function () {
      var t = this;
      return t.findControls && (++t.findControlIndex, t.findControlIndex >= t.findControls.length && (delete t.findControls, delete t.findControlIndex)), t.findControls ? t.findControls[t.findControlIndex] : e
    }, RunningFieldByName: function (t) {
      var r = this.RunningDetailGrid;
      return r ? r.Recordset.FieldByName(t) : e
    }, PixelsToUnit: function (e) {
      return this.pixel2Size(e)
    }, UnitToPixels: function (e) {
      return this.size2Pixel(e)
    }, SystemVarValue: function (e) {
      return this.SystemVarValue2(e, 0)
    }, SystemVarValue2: function (e, t) {
      var r, o, n, a = this, i = a.RunningDetailGrid;
      if (1 === e) r = new Date; else if (i) switch (o = i.Recordset, e) {
        case 4:
          r = o.RecordNo + 1;
          break;
        case 19:
          r = o.RecordCount;
          break;
        case 8:
          r = i.generatingRowNo + 1;
          break;
        default:
          n = i.Groups.items[t - 1], n && (21 === e ? r = n.recordset.RecordCount : (n.inphaseByDetail(o.RecordNo), r = 20 === e ? n.recordset.isAppendingRecord() ? n.recordset.RecordCount : n.recordset.RecordNo : 22 === e ? o.RecordNo - n.beginNoField.Value : n.endNoField.Value - n.beginNoField.Value, r++))
      }
      return r
    }, AddParameter: function (e, t) {
      var r = this.Parameters.Add();
      return r.Name = e, r.DataType = t, r
    }, InsertDetailGrid: function () {
      var e = this;
      return e.DetailGrid || (e.DetailGrid = new Qe(e), e.RunningDetailGrid = e.DetailGrid), e.DetailGrid
    }, InsertPageHeader: function () {
      return new ke(this)
    }, InsertPageFooter: function () {
      return new ke(this)
    }, Clear: function () {
      var e = this;
      et.call(e, e.viewer), e.DeleteDetailGrid()
    }, DeleteDetailGrid: function () {
      var t = this;
      t.DetailGrid = e, t.RunningDetailGrid = e
    }, DeletePageHeader: function () {
    }, DeletePageFooter: function () {
    }
  };
  var tt = "", rt = "_hta", ot = "_htaa", nt = "_htc", at = "_htca", it = "_htn", lt = "_htx", st = "_hp", ut = "_vp",
    ct = "_htp", dt = "_vtp", ht = function () {
      this.Flag = 0
    };
  ht.prototype = {
    get CalcHTotal() {
      return 1 & this.Flag
    }, set CalcHTotal(e) {
      var t = this;
      e ? t.Flag |= 1 : t.Flag &= -2
    }, get CalcHAverage() {
      return 2 & this.Flag
    }, set CalcHAverage(e) {
      var t = this;
      e ? t.Flag |= 2 : t.Flag &= -3
    }, get CalcHAverageA() {
      return 4 & this.Flag
    }, set CalcHAverageA(e) {
      var t = this;
      e ? t.Flag |= 4 : t.Flag &= -5
    }, get CalcHCount() {
      return 8 & this.Flag
    }, set CalcHCount(e) {
      var t = this;
      e ? t.Flag |= 8 : t.Flag &= -9
    }, get CalcHCountA() {
      return 16 & this.Flag
    }, set CalcHCountA(e) {
      var t = this;
      e ? t.Flag |= 16 : t.Flag &= -17
    }, get CalcHMin() {
      return 32 & this.Flag
    }, set CalcHMin(e) {
      var t = this;
      e ? t.Flag |= 32 : t.Flag &= -33
    }, get CalcHMax() {
      return 64 & self.Flag
    }, set CalcHMax(e) {
      var t = this;
      e ? t.Flag |= 64 : t.Flag &= -65
    }, onBySummaryFun: function (e) {
      var t = this;
      t.CalcHTotal = !0, 2 === e ? t.CalcHAverage = !0 : 15 === e ? t.CalcHAverageA = !0 : 3 === e ? t.CalcHCount = !0 : 13 === e ? t.CalcHCountA = !0 : 4 === e ? t.CalcHMin = !0 : 5 === e && (t.CalcHMax = !0)
    }
  };
  var ft = function (t) {
    var r = this;
    r.originObject = e, r.HTotalFlag = new ht, r.HSubtotalFlag = new ht, r.MiscFlag = 0, r.DatafieldIndex = -1, r.TotalValue = 0, r.EntireTotalValue = 0, t && O(r, t, 0)
  };
  ft.prototype = {
    CopyAddField: function (e, t) {
      var r = this, o = e.Fields.Add();
      return r.originObject.FieldType ? (o.assign(r.originObject), r.originObject.isNumeric() && (o.FieldType = 3)) : r.NumericField && (o.FieldType = 3, o.Format = r.originObject.textBuilder.items[0].format), o.Name = t, o.DBFieldName = "", o
    }, CombineCalcFlag: function (e) {
      var t = this;
      t.HTotalFlag.Flag |= e.HTotalFlag.Flag, t.HSubtotalFlag.Flag |= e.HSubtotalFlag.Flag, t.MiscFlag |= e.MiscFlag
    }, SetFlagBySummaryFun: function (e, t) {
      var r = this;
      3 === t ? r.HSubtotalFlag.onBySummaryFun(e) : r.HTotalFlag.onBySummaryFun(e)
    }, get CalcHPercent() {
      return 1 & this.MiscFlag
    }, set CalcHPercent(e) {
      var t = this;
      e ? t.MiscFlag |= 1 : t.MiscFlag &= -2
    }, get CalcVPercent() {
      return 2 & this.MiscFlag
    }, set CalcVPercent(e) {
      var t = this;
      e ? t.MiscFlag |= 2 : t.MiscFlag &= -3
    }, get CalcTotalHPercent() {
      return 4 & this.MiscFlag
    }, set CalcTotalHPercent(e) {
      var t = this;
      e ? t.MiscFlag |= 4 : t.MiscFlag &= -5
    }, get CalcTotalVPercent() {
      return 8 & this.MiscFlag
    }, set CalcTotalVPercent(e) {
      var t = this;
      e ? t.MiscFlag |= 8 : t.MiscFlag &= -9
    }, get CalcHTotalExclude() {
      return 16 & this.MiscFlag
    }, set CalcHTotalExclude(e) {
      var t = this;
      e ? t.MiscFlag |= 16 : t.MiscFlag &= -17
    }, get NumericField() {
      return 32 & this.MiscFlag
    }, set NumericField(e) {
      var t = this;
      e ? t.MiscFlag |= 32 : t.MiscFlag &= -33
    }
  };
  var pt = function (e, t) {
    var r = this;
    r.Group = e, r.DataFieldInfo = t, r.DataSumBoxes = []
  }, gt = function (t) {
    var r = this;
    r.PriorCrossTitleCell = e, r.OriginTextBox = t, r.PriorTitleText = ""
  }, mt = function (e) {
    var t = this;
    ge.call(t, e), t.HCrossFields = "", t.VCrossFields = "", t.ListCols = 1, t.TotalCols = 0, t.SubtotalCols = 0, t.HResort = !0, t.HSortAsc = !0, t.VResort = !0, t.VSortAsc = !0, t.HTotalAtFirst = !1, t.HPercentColumns = "", t.VPercentColumns = "", t.TotalExcludeColumns = "", t.TotalHPercentColumns = "", t.TotalVPercentColumns = "", t.PercentFormat = "0.##%", t.HCrossPeriodType = 0, t.BeginDateParameter = "", t.EndDateParameter = "", t.GroupAutoSum = !0
  };
  mt.prototype = {
    loadFromJSON: function (e) {
      var t = this;
      e && (ge.prototype.loadFromJSON.call(t, e), d(t, "HCrossPeriodType", a.PeriodType))
    }, prepare: function () {
      function o() {
        var e = d.ParameterByName(c.BeginDateParameter), t = d.ParameterByName(c.EndDateParameter), r = {};
        return e && (r.begin = e.AsDateTime), t ? (r.end = t.AsDateTime, e || (r.begin = v(r.end))) : r.end = v(r.begin), r.end < r.begin && (e = r.begin, r.begin = r.end, r.end = e), r
      }

      function n() {
        function n() {
          function e(e) {
            var t = e.orderNo;
            return ie > t ? 1 : le > t ? 2 : se > t ? 3 : 4
          }

          function t(t, r) {
            function o(e) {
              N.some(function (t) {
                return t.originObject !== e.originObject ? !1 : (t.CombineCalcFlag(e), !0)
              }) || (e.NumericField = e.originObject.isNumeric(), N.push(e))
            }

            function n(e, t) {
              e ? e.varItems.forEach(function (e) {
                var r = e.varField;
                1 === r.type && (t.originObject = r.object, o(t))
              }) : (t.originObject = N[0].originObject, o(t))
            }

            var a, i = new ft, l = e(r), s = 1 !== l, u = t.ControlType;
            4 === l ? (i.HTotalFlag.CalcHTotal = 1, me.indexOf(r) >= 0 && (i.CalcHTotalExclude = 1), pe.indexOf(r) >= 0 && (i.CalcTotalHPercent = 1), ge.indexOf(r) >= 0 && (i.CalcTotalVPercent = 1)) : 3 === l ? i.HSubtotalFlag.CalcHTotal = 1 : 2 === l && (he.indexOf(r) >= 0 && (i.CalcHPercent = 1), fe.indexOf(r) >= 0 && (i.CalcVPercent = 1), i.CalcHPercent && (i.HTotalFlag.CalcHTotal = 1)), 4 === u || 7 === u ? s && (i.originObject = t.oDataField, i.originObject && o(i)) : 5 === u ? (i.SetFlagBySummaryFun(t.SummaryFun, l), n(t.paramExp, i)) : 12 === u ? s && (i.originObject = t, N.push(i)) : 8 === u && (a = !1, t.textBuilder.forEach(function (e) {
              e.varItems && e.varItems.forEach(function (e) {
                var t, r = e.varField;
                4 === r.type ? (t = new ft(i), t.SetFlagBySummaryFun(r.SummaryFun, l), n(r.paramExp, t), a = !0) : 1 === r.type && s && (t = new ft(i), t.originObject = r.object, o(t))
              }), !a && s && (i.originObject = t, i.NumericField = t.isPureNumericExpression(), N.push(i))
            }))
          }

          function r(e) {
            e.forEach(function (e) {
              e.GroupTitle ? r(e.SubTitles.items) : e.Column.ContentCell.getControls().forEach(function (r) {
                t(r, e.Column)
              })
            })
          }

          function o(r) {
            r.Controls.forEach(function (r) {
              var o = T.itemByName(r.AlignColumn) || T.itemByName(r.AlignColumnEx);
              o && 1 !== e(o) && t(r, o)
            })
          }

          r(P), F.forEach(function (e) {
            o(e.Footer), o(e.Header)
          }), u = 0, N.forEach(function (e) {
            e.DatafieldIndex = u, ++u, e.CalcHPercent && ++u, e.CalcVPercent && ++u
          })
        }

        function i() {
          N.forEach(function (e) {
            e.originObject.FieldType && p.Fields.Remove(e.originObject.Name)
          })
        }

        function I(e) {
          var t = p.Fields.Add();
          return t.Name = e, t.FieldType = 3, t
        }

        function k() {
          function e(e) {
            e.Controls.items = e.Controls.items.filter(function (e) {
              var t = C.itemByName(e.AlignColumn) || C.itemByName(e.AlignColumnEx);
              return !t || t.orderNo < c.ListCols
            })
          }

          s.forEach(function (t) {
            e(t.Footer), e(t.Header)
          })
        }

        function j(e, o, n, i, l, u) {
          function v(e, t) {
            var r, o;
            e.FreeCell ? (t.setFreeCell(!0), H(t, e), e.Controls.forEach(function (e) {
              function n() {
                return 2 === c.HCrossPeriodType || 3 === c.HCrossPeriodType || 4 === c.HCrossPeriodType || 6 === c.HCrossPeriodType || 7 === c.HCrossPeriodType
              }

              function a() {
                function e(e) {
                  var t = new J;
                  return t.value = e, Math.floor(t.AsFloat)
                }

                var t, r = c.CurPeriodBeginDate.getFullYear(), o = c.CurPeriodBeginDate.getMonth() + 1,
                  n = c.CurPeriodBeginDate.getDate();
                switch (c.HCrossPeriodType) {
                  case 2:
                    t = "第" + Math.floor((e(c.CurPeriodBeginDate) - e(oe.begin)) / 7 + 1) + "周";
                    break;
                  case 3:
                    t = 11 > n ? "上" : 21 > n ? "中" : "下", t = o + "月" + t + "旬";
                    break;
                  case 4:
                    t = 16 > n ? "上" : "下", t = o + "月" + t + "半月";
                    break;
                  case 6:
                    t = m(r, 2) + "-" + (o + 2) / 3 + "季度";
                    break;
                  case 7:
                    t = 7 > o ? "上" : "下", t = m(r, "00") + "-" + t + "半年"
                }
                return t
              }

              var i, l;
              r = e.ControlType, e.TextFormat ? (o = t.Controls.Add(1), o.assign(e), i = n() && 4 === r && e.DataField === c.HCrossFields ? a() : e.getDisplayText(), o.Text = i) : (o = t.Controls.Add(r), o.assign(e), 7 === r ? e.DataField && (o.DataField = "", l = d.FieldByName(e.DataField), l && (7 === l.FieldType ? o.Picture = l.Value : (i = l.DisplayText, o.ImageIndex = parseInt(i), isNaN(o.ImageIndex) && (o.ImageIndex = 0, o.ImageFile = i)))) : 12 === r && (o.Text = e.get_DisplayText()))
            })) : t.assign(e)
          }

          function x() {
            var t, r, a = 0;
            2 === S && (t = Ce[u - ue], r = t ? t[i] : 0, a = r && r.PriorCrossTitleCell && r.PriorTitleText === r.OriginTextBox.getDisplayText() && !l), a ? o = r.PriorCrossTitleCell : (o = (o ? o.SubTitles : g).AddGroup("", ""), v(e, o), o.Name = y, r && (r.PriorCrossTitleCell = o, r.PriorTitleText = r.OriginTextBox.getDisplayText())), e.SubTitles.forEach(function (e) {
              j(e, o, n, i + 1, !a, u)
            })
          }

          function T() {
            function t(e) {
              var t;
              return N.some(function (r) {
                return r.originObject.Name !== e ? !1 : (t = r, !0)
              }), t
            }

            function i(e, t) {
              var r;
              return c.HPercentSums.some(function (o) {
                return o.Group !== e || o.DataFieldInfo !== t ? !1 : (r = o, !0)
              }), r
            }

            function l(e, t) {
              var o, a = r(e);
              return 4 === S || 1 === S ? a ? (t += tt + a, o = t) : L.CalcHPercent ? (o = t + tt, t += ct) : L.CalcVPercent ? (t += dt, o = t) : (t += tt, o = t) : 3 === S ? (t += n + a, o = t) : (t += n, o = t, L.CalcHPercent ? t += st : L.CalcVPercent && (t += ut, o = t)), o = D(o), {
                DataField: t,
                SummaryDataField: o
              }
            }

            function u(e, t) {
              var r, o = 0, n = "";
              return e.varItems.forEach(function (a) {
                o < a.beginIndex && (n += e.expText.substring(o, a.beginIndex)), 1 === a.varField.type ? (r = l(t, a.varField.object.Name), n += r.SummaryDataField) : n += a.varField.getExpText(), o = a.endIndex
              }), n += e.expText.substr(o)
            }

            function g(e, t) {
              return e = "[#" + e, t && (e += ":" + t), e += "#]"
            }

            function m(e, t) {
              var r, o = 0, n = "";
              return e.varItems.forEach(function (i) {
                var l = i.varField, s = l.type;
                o < i.beginIndex && (n += e.expText.substring(o, i.beginIndex)), 4 === s ? (r = u(l.paramExp, l.SummaryFun), n += t ? B(a.SummaryFun, l.SummaryFun) + "(" + r + (l.RankNo ? "," + l.RankNo : "") + ")" : r) : n += l.getExpText(), o = i.endIndex
              }), n += e.expText.substr(o)
            }

            function x() {
              s.forEach(function (e, r) {
                function o(e, t) {
                  t.isToGenerate() && e.Controls.forEach(function (e) {
                    var r, o, n, i = e.ControlType, s = e.AlignColumn || e.AlignColumnEx;
                    s === M.Name && (r = t.Controls.Add(i), r.assign(e), r.AlignColumn = V.Name, r.AlignColumnEx = "", 5 === i ? e.DataField && (r.DataField = u(e.paramExp, e.SummaryFun), r.Tag = e.DataField, a.push(r)) : 8 === i ? (o = "", e.textBuilder.forEach(function (e) {
                      o += e.varItems ? g(m(e, !0), e.format) : e.text
                    }), r.Text = o) : 4 === i && (n = d.FieldByName(r.DataField), n && (r.DataField = l(0, originFieldName).SummaryDataField)))
                  })
                }

                var n, a = [];
                n = F[r], o(n.Footer, e.Footer), o(n.Header, e.Header), a.forEach(function (r) {
                  var o, n;
                  L.CalcHPercent && (r.Format = c.PercentFormat, o = t(r.Tag), n = i(e, o), n || (n = new pt(e, o), c.HPercentSums.push(n)), A ? n.TotalSumBox = r : n.DataSumBoxes.push(r))
                })
              })
            }

            var T, w, P = 1 !== S, R = c.GroupAutoSum && P, A = n === tt,
              V = C.addTo(o ? o.SubTitles : f.ColumnTitle.TitleCells), M = e.Column, L = new ft;
            V.assign(M), V.Name = y, v(e, V.TitleCell), V.ContentCell.assign(M.ContentCell), T = V.ContentCell.getControls(), w = 1 === T.length, A ? (pe.indexOf(M) >= 0 && (L.CalcHPercent = 1), ge.indexOf(M) >= 0 && (L.CalcVPercent = 1)) : (he.indexOf(M) >= 0 && (L.CalcHPercent = 1), fe.indexOf(M) >= 0 && (L.CalcVPercent = 1)), T.forEach(function (e, r) {
              function o(r) {
                s.forEach(function (o, n) {
                  function a(e, t) {
                    return e.isToGenerate() && e.Controls.items.some(function (e) {
                      return e.AlignColumn === t.Name || e.AlignColumnEx === t.Name
                    })
                  }

                  function l(t) {
                    var o, n, a, i;
                    return t.isToGenerate() && (o = t.Controls.Add(5), o.assign(e), o.Dock = 0, o.TextAlign = e.TextAlign, o.AlignColumn = V.Name, o.DataField = r.summaryDataField, b.ShowColLine && (n = o.Border, n.Styles |= 4, a = b.ColLinePen.Width, i = e.Border, i && 4 & i.Styles && i.Pen.Width > 0 ? a += i.Pen.Width : n.Pen.Color = b.ColLinePen.Color, n.Pen.Width = a), w ? (o.Top = 0, o.Height = t.Height, 16777215 !== V.ContentCell.BackColor && 16777215 === t.BackColor && (o.BackStyle = 1, o.BackColor = V.ContentCell.BackColor)) : (o.Top = e.Top, o.Height = e.Height, 1 === e.BackStyle() && (o.BackStyle = 1, o.BackColor = e.BackColor))), o
                  }

                  var s, u, d, h = F[n];
                  a(h.Footer, M) || a(h.Header, M) || (s = l(o.Footer), s || (s = l(o.Header)), s && (s.Format = r.format, L.CalcHPercent && (s.Format = c.PercentFormat, u = t(r.originDataField), d = i(o, u), d || (d = new pt(o, u), c.HPercentSums.push(d)), A ? d.TotalSumBox = s : d.DataSumBoxes.push(s))))
                })
              }

              function a() {
                var t, n, a = e.DataField, i = e.SummaryFun;
                5 === f && (a || (a = N[0].originObject.Name), n = e.Format, V.ContentCell.Controls ? (e = new Fe(V.ContentCell), e.assign(T[r]), V.ContentCell.Controls.items[r] = e) : V.ContentCell.assign(T[r])), d = l(i, a), e.DataField = d.DataField, 7 !== f && (n && (t = p.Fields.Item(d.DataField), t && (t.Format = n)), R && o({
                  summaryDataField: d.SummaryDataField,
                  originDataField: a,
                  format: ""
                }))
              }

              function u() {
                var t, a, i, s, u = !1;
                u = h && K(e, n), u || (a = M.ContentCell.getControls()[r], t = (i = a.textBuilder.items[0]) && i.varItems.some(function (e) {
                  return 4 === e.varField.type
                }), t ? (s = m(i, !1), e.Text = g(s, i.format), R && o({
                  summaryDataField: D(s),
                  originDataField: "",
                  format: i.format
                })) : P && (d = l(0, e.Name), e.Text = "[#" + d.DataField + "#]", R && o({
                  summaryDataField: d.SummaryDataField,
                  originDataField: e.Name,
                  format: ""
                })))
              }

              var d, f = e.ControlType;
              4 === f || 5 === f || 7 === f ? a() : 12 === f ? 1 !== S && (d = l(e.Name, 0), e.Text = "[#" + d.DataField + "#]") : 8 === f && u()
            }), P && x()
          }

          var y = e.Name + (n ? n : ""), S = t(n);
          e.GroupTitle ? x() : T()
        }

        function _() {
          var e = x.Fields;
          p.Fields.forEach(function (t) {
            M.push({crossField: t, originField: e.itemByName(t.Name)})
          })
        }

        function W() {
          N.forEach(function (e) {
            function t(e, t, o) {
              r = e.CopyAddField(p, t + o), r.GetDisplayTextScript = "", L.push(r)
            }

            var r, o = e.HTotalFlag, n = e.originObject.Name;
            o.CalcHTotal && t(e, n, tt), o.CalcHAverage && t(e, n, rt), o.CalcHAverageA && t(e, n, ot), o.CalcHCount && t(e, n, nt), o.CalcHCountA && t(e, n, at), o.CalcHMin && t(e, n, it), o.CalcHMax && t(e, n, lt), e.CalcTotalHPercent && (r = I(n + ct), r.Format = c.PercentFormat, L.push(r)), e.CalcTotalVPercent && (r = I(n + dt), r.Format = c.PercentFormat, L.push(r))
          })
        }

        function U() {
          var t = P.length;
          for (l = de; t > l; l++) j(P[l], e, tt, 0, !0, -1)
        }

        function z(e) {
          var t, r = e.getControls();
          e.GroupTitle && 1 === r.length && (t = r[0], t.TextFormat && (Ce[Ce.length - 1].push(new gt(t)), 1 === e.SubTitles.items.length && z(e.SubTitles.items[0])))
        }

        function Y() {
          var e = [];
          c.HResort && R.forEach(function (t) {
            e.push({field: t, asc: c.HSortAsc, "case": 1})
          }), re = x.sortRecords(e, 1)
        }

        function X(t) {
          var r, o;
          for (r = "_" + t, R.forEach(function (e) {
            o = p.Fields.Add(), o.assign(e), o.Name += r, o.DBFieldName = "", E.push(o)
          }), N.forEach(function (e) {
            var t = e.originObject.Name + r;
            L.push(e.CopyAddField(p, t)), e.CalcHPercent && (o = I(t + st), o.Format = c.PercentFormat, L.push(o)), e.CalcVPercent && (o = I(t + ut), o.Format = c.PercentFormat, L.push(o))
          }), l = ue; ce > l; l++) j(P[l], e, r, 0, !1, l)
        }

        function Z() {
          function t() {
            var e;
            return P[ue].GroupTitle && 1 === Ce.length && Ce[0].length >= 1 && (e = Ce[0][0]).PriorCrossTitleCell && e.PriorTitleText !== e.OriginTextBox.getDisplayText()
          }

          function r() {
            var t, r;
            for (O.push(V), t = "_S" + O.length, N.forEach(function (e) {
              r = e.originObject.Name + t, G.push(e.CopyAddField(p, r + tt)), e.HSubtotalFlag.CalcHAverage && G.push(e.CopyAddField(p, r + rt)), e.HSubtotalFlag.CalcHAverageA && G.push(e.CopyAddField(p, r + ot)), e.HSubtotalFlag.CalcHCount && G.push(e.CopyAddField(p, r + nt)), e.HSubtotalFlag.CalcHCountA && G.push(e.CopyAddField(p, r + at)), e.HSubtotalFlag.CalcHMin && G.push(e.CopyAddField(p, r + it)), e.HSubtotalFlag.IsCalcHMax && G.push(e.CopyAddField(p, r + lt))
            }), l = ce; de > l; l++) j(P[l], e, t, 0, !1, -1)
          }

          re.forEach(function (e, o) {
            (e < c.VAddedItemRecordOffsetBegin || e >= c.VAddedItemRecordOffsetEnd) && (x.MoveTo(e), o && !x.fieldsKeepedValueChanged(R) || (c.SubtotalCols > 0 && o && t() && (x.MoveTo(re[o - 1]), r(), x.MoveTo(e)), x.keepValue(), X(++V)), x.curRecord._CrossNo_ = V)
          }), c.SubtotalCols > 0 && r()
        }

        function q() {
          function e() {
            function e() {
              function e(e, t) {
                function r() {
                  11 > l ? ++l : (++s, l = 0)
                }

                var o = oe.begin.getDate(), n = oe.begin.getMonth(), a = oe.begin.getFullYear(), i = o, l = n, s = a;
                switch (c.HCrossPeriodType) {
                  case 3:
                    10 >= o ? (o = 1, i = 11) : 20 >= o ? (o = 11, i = 21) : (o = 21, r(), i = 1);
                    break;
                  case 4:
                    15 >= o ? (o = 1, i = 16) : (o = 16, r(), i = 1);
                    break;
                  case 5:
                    o = i = 1, r();
                    break;
                  case 6:
                    o = i = 1, n -= n % 3, l = n, r(), r(), r();
                    break;
                  case 7:
                    o = i = 1, n = 6 > n ? 0 : 6, l = 6 > n ? 6 : 0, l || s++;
                    break;
                  case 8:
                    o = i = 1, n = l = 0, s++
                }
                c.CurPeriodBeginDate = new Date(a, n, o), c.CurPeriodEndDate = new Date(s, l, i)
              }

              return oe = o(), y(oe.begin), y(oe.end), S(oe.end), c.HCrossPeriodType <= 2 ? (c.CurPeriodBeginDate = v(oe.begin), c.CurPeriodEndDate = v(oe.begin), w(c.CurPeriodEndDate, 1 === c.HCrossPeriodType ? 1 : 7)) : e(), c.CurPeriodBeginDate < oe.end
            }

            function t() {
              function e() {
                11 > a ? ++a : (++i, a = 0)
              }

              var t = c.CurPeriodBeginDate.getDate(), r = c.CurPeriodBeginDate.getMonth(),
                o = c.CurPeriodBeginDate.getFullYear(), n = t, a = r, i = o;
              switch (c.HCrossPeriodType) {
                case 3:
                  10 >= t ? (t = 11, n = 21) : 20 >= t ? (t = 21, n = 1, e()) : (t = 1, n = 11, e(), o = i, r = a);
                  break;
                case 4:
                  15 >= t ? (t = 16, n = 1, e()) : (t = 1, n = 16, e(), o = i, r = a);
                  break;
                case 5:
                  e(), o = i, r = a, e();
                  break;
                case 6:
                  e(), e(), e(), o = i, r = a, t = n, e(), e(), e();
                  break;
                case 7:
                  r ? (r = 0, o++, a = 6) : (r = 6, a = 0), i++;
                  break;
                case 8:
                  o++, i++, i++
              }
              c.CurPeriodBeginDate = new Date(o, r, t), c.CurPeriodEndDate = new Date(i, a, n)
            }

            return oe ? (c.HCrossPeriodType <= 2 ? (c.CurPeriodBeginDate = v(c.CurPeriodEndDate), w(c.CurPeriodEndDate, 1 === c.HCrossPeriodType ? 1 : 7)) : t(), c.CurPeriodBeginDate < oe.end) : e()
          }

          for (var t, r, n = re.length, a = 0; e();) for (t = R[0].AsDateTime, R[0].AsDateTime = c.CurPeriodBeginDate, X(++V), R[0].AsDateTime = t; n > a && (x.MoveTo(re[a]), r = R[0].AsDateTime, !(r < c.CurPeriodBeginDate || r >= c.CurPeriodEndDate));) x.curRecord._CrossNo_ = V, a++
        }

        function $() {
          c.HPercentSums.forEach(function (e) {
            function t(e) {
              e.isToGenerate() && (r = e.Controls.Add(5), r.DataField = o)
            }

            var r, o;
            e.TotalSumBox || (o = e.DataFieldInfo.originObject.Name + tt, t(e.Group.Footer), !r && t(e.Group.Header), r.Visible = !1, e.TotalSumBox = r)
          })
        }

        function Q() {
          var e = L.splice(0, te);
          L = L.concat(e)
        }

        function K(e, t) {
          var r, o = e.Text, n = o.indexOf(":");
          return n > 0 && o.substring(2, n) === R[0].Name ? (r = "G" === t ? "[#" + ae : o.substr(0, n) + t, r += o.substr(n), e.Text = r, 1) : 0
        }

        function ee() {
          function e() {
            var e, t = R[0], r = new Date(2009, 7, 30), o = t.AsDateTime;
            for (e = 0; 7 > e; ++e) t && (t.AsDateTime = r), X(++V), S(r);
            t.AsDateTime = o
          }

          function t(e) {
            var t = R[0];
            e.Controls.forEach(function (e) {
              4 === e.ControlType ? t.Name === e.DataField && (e.DataField = ae) : 8 === e.ControlType && K(e, "G")
            })
          }

          var r, o, n = f.Groups.items[0];
          e(), n && (r = p.Fields.Add(), r.FieldType = 2, r.Name = ne, A.push(r), n.ByFields = ne, r = p.Fields.Add(), r.FieldType = 6, r.Format = R[0].Format, r.Name = ae, A.push(r), t(n.Header), t(n.Footer)), T.Count > 1 && (o = T.items[1].ContentCell.BackColor, C.Item(1).ContentCell.BackColor = o, C.Item(7).ContentCell.BackColor = o)
        }

        var te, re, oe, ne = "_Month_", ae = "_Date_", ie = 0, le = 1, se = 1, ue = -1, ce = -1, de = -1, he = [],
          fe = [], pe = [], ge = [], me = [], Ce = [];
        if (h) {
          if (c.GroupAutoSum = !1, x.Fields.forEach(function (e) {
              6 === e.FieldType && R.push(e)
            }), !R.length) throw new Error("None date field!")
        } else {
          if (he = T.decodeItems(c.HPercentColumns), fe = T.decodeItems(c.VPercentColumns), pe = T.decodeItems(c.TotalHPercentColumns), ge = T.decodeItems(c.TotalVPercentColumns), me = T.decodeItems(c.TotalExcludeColumns), R = x.decodeFields(c.HCrossFields), !R.length) throw new Error("生成交叉表不成功，没有定义'横向交叉数据字段'！");
          A = x.decodeFields(c.VCrossFields), ie = c.ListCols, se = T.Count - c.TotalCols, le = se - c.SubtotalCols
        }
        if (ce = P.length, de = ce, P.forEach(function (e, t) {
            var r = e.findFirstColumn().orderNo;
            r === ie && (ue = t), r === le && (ce = t), r === se && (de = t)
          }), n(), i(), f.clearColumns(), h) ee(); else {
          if (!N.length) throw new Error("生成交叉表不成功，不存在交叉数据项！");
          if (0 >= ue) throw new Error("生成交叉表不成功，不存在交叉数据列！");
          for (f.buildColumnsOrder(), Y(), k(), l = 0; ue > l; ++l) j(P[l], e, e, 0, !0, -1);
          for (_(), W(), te = L.length, c.HTotalAtFirst && U(), l = ue; ce > l; l++) Ce.push([]), z(P[l]);
          0 === c.HCrossPeriodType ? Z() : q(), !c.HTotalAtFirst && U(), te > 0 && Q(), $()
        }
      }

      function i() {
        function t() {
          var e = [];
          c.VResort && (A.forEach(function (t) {
            e.push({field: t, asc: c.VSortAsc, "case": 1})
          }), R.forEach(function (t) {
            e.push({field: t, asc: c.HSortAsc, "case": 1})
          })), s = x.sortRecords(e, 1)
        }

        function r(e, t) {
          R.forEach(function (t, r) {
            var o = R.length * e + r;
            E[o].IsNull && (E[o].Value = t.Value)
          }), N.forEach(function (r, o) {
            var n, a = u * e + r.DatafieldIndex;
            r.NumericField ? (n = r.originObject.AsFloat, L[a].AsFloat += n, r.CalcHTotalExclude && r.TotalValue || (r.TotalValue += n, t && (t[e * N.length + o] += n))) : L[a].IsNull && (L[a].Value = r.originObject.Value)
          })
        }

        function n() {
          p.Append(), M.forEach(function (e) {
            e.crossField.Value = e.originField.Value
          }), N.forEach(function (e) {
            e.TotalValue = 0
          })
        }

        function a() {
          function e(e, t, a, i, l) {
            function s() {
              var l, s, c = Number.MAX_VALUE, d = -Number.MAX_VALUE;
              for (r = e; t > r; ++r) l = L[u * r + a.DatafieldIndex], l.IsNull || (s = l.AsFloat, isNaN(s) || (c > s && (c = s), s > d && (d = s)));
              i.CalcHMin && (c < Number.MAX_VALUE && (n[o].AsFloat = c), o++), i.CalcHMax && (d > -Number.MAX_VALUE && (n[o].AsFloat = d), o++)
            }

            var c = t - e, d = c;
            if (i.CalcHAverageA || i.CalcHCountA) for (r = e; t > r; r++) L[u * r + a.DatafieldIndex].IsNull && --d;
            n[o].AsFloat = l, o++, i.CalcHAverage && (c > 0 && (n[o].AsFloat = l / c), o++), i.CalcHAverageA && (d > 0 && (n[o].AsFloat = l / d), o++), i.CalcHCount && (n[o].AsFloat = c, o++), i.CalcHCountA && (n[o].AsFloat = d, o++), (i.CalcHMin || i.CalcHMax) && s()
          }

          function t() {
            var t = G.length / O.length, a = 0;
            O.forEach(function (i, l) {
              var s = I(N.length, 0);
              for (r = a; i > r; ++r) N.forEach(function (e, t) {
                s[t] += L[u * r + e.DatafieldIndex].AsFloat
              });
              n = G, o = t * l, N.forEach(function (t, r) {
                e(a, i, t, t.HSubtotalFlag, s[r])
              }), a = i
            })
          }

          var r, o = u * V, n = L;
          for (N.forEach(function (t) {
            t.HTotalFlag.Flag && (e(0, V, t, t.HTotalFlag, t.TotalValue, L), t.CalcTotalHPercent && (n[o].AsFloat = 1, o++), t.CalcTotalVPercent && o++, t.EntireTotalValue += t.TotalValue)
          }), r = 0; V > r; ++r) N.forEach(function (e) {
            e.CalcHPercent && (o = u * r + e.DatafieldIndex, 0 != e.TotalValue ? L[o + 1].AsFloat = L[o].AsFloat / e.TotalValue : L[o + 1].Clear())
          });
          O.length && t(), p.Post()
        }

        function i() {
          var e, t, r, o, n, a, i;
          for (p.First(); !p.Eof();) {
            for (p.Edit(), e = 0, t = 0, r = 0, o = 0; V > o; ++o) N.forEach(function (r, l) {
              r.CalcVPercent && (n = u * o + r.DatafieldIndex, a = L[n].AsFloat, i = d[o * N.length + l], r.CalcHPercent && ++n, ++n, i && (L[n].AsFloat = a / i), e += a, t += i)
            }), o === O[r] && (N.forEach(function (o) {
              o.CalcVPercent && (n = u * r + o.DatafieldIndex + 1 + (o.CalcHPercent ? 1 : 0), t && (G[n].AsFloat = e / t))
            }), r++);
            n = u * V, N.forEach(function (e) {
              var t = e.HTotalFlag;
              a = L[n].AsFloat, t.CalcHTotal && ++n, t.CalcHAverage && ++n, t.CalcHAverageA && ++n, t.CalcHCount && ++n, t.CalcHCountA && ++n, t.CalcHMin && ++n, t.CalcHMax && ++n, e.CalcTotalHPercent && ++n, e.CalcTotalVPercent && (e.EntireTotalValue && (L[n].AsFloat = a / e.EntireTotalValue), ++n)
            }), p.Post(), p.Next()
          }
        }

        function l() {
          var t, i, l, u, c = o(), d = [], h = 0;
          for (d.push({field: R[0], asc: 1, "case": 1}), s = x.sortRecords(d, 1), t = s.length; c.begin <= c.end;) {
            for (; t > h && (x.MoveTo(s[h]), !(R[0].AsDateTime >= c.begin));) h++;
            for (i = c.begin.getDay(), l = c.begin.getMonth(), n(), A.length && (A[0].AsInteger = l + 1, A[1].AsDateTime = c.begin), u = i; 7 > u; ++u) {
              for (E[u].AsDateTime = c.begin; t > h && (x.MoveTo(s[h]), !(R[0].AsDateTime > c.begin));) r(u, e), h++;
              if (S(c.begin), c.begin > c.end || A.length && l !== c.begin.getMonth()) break
            }
            a()
          }
        }

        var s, d = I(V * N.length, 0);
        h ? l() : (t(), s.forEach(function (e, t) {
          (e < c.HAddedItemRecordOffsetBegin || e >= c.HAddedItemRecordOffsetEnd) && (x.MoveTo(e), t && !x.fieldsKeepedValueChanged(A) || (x.keepValue(), t && a(), n())), x.curRecord._CrossNo_ && r(x.curRecord._CrossNo_ - 1, d)
        }), a(), N.some(function (e) {
          return e.CalcVPercent || e.CalcTotalVPercent
        }) && i())
      }

      var l, s, u, c = this, d = c.report, h = 9 === c.HCrossPeriodType, f = new Qe(d), p = f.Recordset,
        g = f.ColumnTitle.TitleCells, C = f.Columns, b = c.owner, x = b.Recordset, T = b.Columns, F = b.Groups.items,
        P = b.ColumnTitle.TitleCells.items, R = [], A = [], V = 0, N = [], M = [], L = [], E = [], O = [], G = [];
      c.HAddedItemRecordOffsetBegin = -1, c.HAddedItemRecordOffsetEnd = -1, c.VAddedItemRecordOffsetBegin = -1, c.VAddedItemRecordOffsetEnd = -1, c.HPercentSums = [], f.assign(b), f.IsCrossTab = 0, s = f.Groups.items, n(), i(), d.RunningDetailGrid = f, f.attachData(), f.prepare()
    }, unprepare: function () {
    }, GroupEndProcess: function (e) {
      var t = this;
      t.HPercentSums.forEach(function (t) {
        var r;
        t.Group === e && (r = t.TotalSumBox.Value, t.DataSumBoxes.forEach(function (e) {
          r ? e.Value /= r : e.Value = 0
        }), t.TotalSumBox.Value = 1)
      })
    }, get Recordset() {
      var t = this.report, r = t.RunningDetailGrid;
      return r != t.DetailGrid ? r.Recordset : e
    }, HBeginAddItem: function () {
      var e = this;
      e.HAddedItemRecordOffsetBegin = e.report.RunningDetailGrid.Recordset.RecordCount
    }, HEndAddItem: function () {
      var e = this;
      e.HAddedItemRecordOffsetEnd = e.report.RunningDetailGrid.Recordset.RecordCount
    }, VBeginAddItem: function () {
      var e = this;
      e.VAddedItemRecordOffsetBegin = e.report.RunningDetailGrid.Recordset.RecordCount
    }, VEndAddItem: function () {
      var e = this;
      e.VAddedItemRecordOffsetEnd = e.report.RunningDetailGrid.Recordset.RecordCount
    }, GetCurPeriodBeginDate: function () {
      return this.CurPeriodBeginDate
    }, GetCurPeriodEndDate: function () {
      return this.CurPeriodEndDate
    }
  }, E(mt, ge);
  var Ct = .25, bt = 96 / 2.54,
    vt = [3381606, 39423, 16737996, 3394764, 10079232, 6737100, 10040319, 3407718, 16737843, 13421568, 6723993, 14535833, 3342489, 8965273, 13369497, 14535833, 13395507, 10092424, 10066278, 14522879],
    xt = vt.length, Tt = 4, yt = 8, St = 4, wt = function (e, t) {
      var r, o, n = 0;
      for (e >= 1 && (t = 0), r = 0; t > r; r++) e *= 10;
      for (o = e; o > 1;) ++n, o /= 10;
      if (o = .15 > o ? .1 : .3 > o ? .2 : .75 > o ? .5 : 1, t > 0 && (n -= t), n > 0) for (r = 0; n > r; r++) o *= 10; else for (r = n; 0 > r; r++) o /= 10;
      return o
    }, Ft = function (e) {
      ae.call(this, e)
    };
  L(Ft, ae), Ft.prototype._createItem = function () {
    return new Vt(this.owner)
  };
  var Dt = function (e, t) {
    var r = this;
    r.seriesIndex = e, r.groupIndex = t
  }, Pt = function (e, t, r) {
    var o = this;
    Dt.call(o, e, t), o.rect = r
  };
  Pt.prototype = {
    inRange: function (e, t) {
      return this.rect.PtInRect(e, t)
    }, tooltipPos: function () {
      var e = this.rect;
      return {x: (e.left + e.right) / 2, y: (e.top + e.bottom) / 2}
    }
  };
  var Bt = function (e, t, r, o, n, a, i) {
    var l = this;
    Dt.call(l, e, t), l.x = r, l.y = o, l.r = n, l.beginAngle = a, l.endAngle = i
  };
  Bt.prototype = {
    inRange: function (e, t) {
      function r() {
        var r = e - o.x, n = t - o.y, a = Math.sqrt(r * r + n * n), i = Math.atan2(n, r);
        return 0 > n && (i += 2 * Math.PI), {angle: 360 - W(i), distance: a}
      }

      var o = this, n = r();
      return o.beginAngle <= n.angle && n.angle < o.endAngle && n.distance < o.r
    }, tooltipPos: function () {
      var e = this, t = -U(e.beginAngle + e.endAngle) / 2, r = e.r / 2;
      return {x: e.x + Math.cos(t) * r, y: e.y + Math.sin(t) * r}
    }
  };
  var Rt = function (e, t, r, o, n) {
    var a = this;
    Dt.call(a, e, t), a.x = r, a.y = o, a.r = n
  };
  Rt.prototype = {
    inRange: function (e, t) {
      var r = this, o = e - r.x, n = t - r.y;
      return Math.sqrt(o * o + n * n) <= r.r
    }, tooltipPos: function () {
      var e = this;
      return {x: e.x + 4, y: e.y - 4 - Nt.prototype.options.tooltipFontSize}
    }
  };
  var At = function (e) {
    var t = this;
    ge.call(t, e), t.LinePen = new Z, t.CoordLinePen = new Z, t.Label = "", t.Max = 0, t.Min = 0, t.Space = 0, t.TextAngle = 0, t.TextVisible = !0, t.TextFormat = "0.##", t.LineVisible = !0, t.CoordLineVisible = !1, t.MarginBeginWeight = 25, t.MarginEndWeight = 25, t.Scales = [], t.CustomCoordLines = []
  };
  At.prototype = {
    children: ["LinePen", "CoordLinePen"], afterLoad: function (e) {
      var t = this;
      t.LinePen.loadFromJSON(e.LinePen, t.report.viewer.alpha.chartStroke), t.CoordLinePen.loadFromJSON(e.CoordLinePen, t.report.viewer.alpha.chartStroke)
    }, CalcLabelHeight: function () {
      var e = this;
      return e.Used && e.Label ? e.owner.fontHeight + St / 2 : 0
    }, CalcHorzAxisHeight: function (e) {
      return this.DoCalcAxisSize(!0, e)
    }, CalcVertAxisWidth: function () {
      return this.DoCalcAxisSize(!1, !1)
    }, DoCalcAxisSize: function (e, t) {
      var r, o = this, n = o.owner, a = [], i = o.owner.fontHeight, l = 0;
      if (o.Used) {
        if (o.TextVisible && (!e || !n.IsDrawNegativeGraph())) {
          if (t) a.push("1Agf"); else if (o.IsValueAxis) if (o.Scales.length) o.Scales.forEach(function (e) {
            a.push(e.Text)
          }); else for (r = o.DrawMin; r < o.DrawMax + o.GetScaleTiny(); r += o.DrawSpace) a.push(o.ScaleFormatParser.format(r)); else for (r = 0; r < n.GroupCount; r++) a.push(n.GroupLabels[r]);
          -270 === o.TextAngle ? (a.forEach(function (e) {
            l = Math.max(l, e.length)
          }), l *= i) : (a.forEach(function (e) {
            l = Math.max(l, n.context.measureTextWidth(e))
          }), e && (l = Math.abs(Math.sin(U(o.TextAngle)) * l) + 1 + i))
        }
        n.Chart3DReal && n.IsHorzGraph() && n.YAxis === o && (l += n.yView3DDepth), o.LineVisible && (l += Tt), l && (l += St)
      }
      return l
    }, CalcGroupPos: function (e, t) {
      var r = this, o = r.owner, n = o.IsHorzGraph() ? o.CalcColumnBarCount() : o.CalcBarCount(),
        a = r.MarginBeginWeight + r.MarginEndWeight + 100 * (o.GroupCount - 1) + (n > 0 ? o.BarWidthPercent : 0),
        i = a ? e * r.MarginBeginWeight / a : 0, l = a ? e * r.MarginEndWeight / a : 0, s = e - i - l,
        u = n > 0 ? o.BarWidthPercent : 0, c = 100 * t, d = c + u, h = {};
      return a -= r.MarginBeginWeight + r.MarginEndWeight, h.BeginPos = i, h.EndPos = i, a > 0 && (h.BeginPos += s * c / a, h.EndPos += s * d / a), h.LabelMiddlePos = (h.BeginPos + h.EndPos) / 2, h
    }, DrawHorzAxisLabel: function (e) {
      var t = this, r = t.owner.context;
      !e.IsRectEmpty() && t.Label && r.drawText(t.Label, (e.left + e.right - r.measureTextWidth(t.Label)) / 2, (e.top + e.bottom - t.owner.fontHeight) / 2)
    }, DrawVertAxisLabel: function (e) {
      var t = this, r = t.owner.context;
      !e.IsRectEmpty() && t.Label && r.drawTextRotate(t.Label, (e.left + e.right - t.owner.fontHeight) / 2, (e.top + e.bottom + r.measureTextWidth(t.Label)) / 2, 90)
    }, DrawAxisTextsPrepare: function (e) {
      var t, r = this, o = r.owner, n = [];
      if (r.IsValueAxis) if (r.Scales.length) r.Scales.forEach(function (t) {
        n.push({Text: t.Text, PosVal: r.CalcValuePos(t.PosVal, e)})
      }); else for (t = r.DrawMin; t < r.DrawMax + r.GetScaleTiny(); t += r.DrawSpace) n.push({
        Text: r.ScaleFormatParser.format(t),
        PosVal: r.CalcValuePos(t, e)
      }); else for (t = 0; t < o.GroupCount; t++) n.push({
        Text: o.GroupLabels[t] || "",
        PosVal: r.CalcGroupPos(e, t).LabelMiddlePos
      });
      return n
    }, DrawHorzAxis: function (e, t, r) {
      function o(e, t, r, o, n) {
        var a, i, l, s, u = h.owner.context, c = r.length, d = h.owner.fontHeight;
        if (o ? (i = e.bottom - 1, h.LineVisible && (i -= Tt), f.Chart3DReal && (i -= f.yView3DDepth), t += f.xView3DDepth) : (i = e.top + 1, h.LineVisible && (i += Tt)), -270 === h.TextAngle) for (s = u.measureTextWidth("A"), a = e.left + t - s, o && (i -= d * c), l = 0; c > l; l++) u.drawText(r.charAt(l), a, i), i += d; else s = u.measureTextWidth(r), a = e.left + t - Math.abs(s / 2 * Math.cos(U(h.TextAngle))) + Math.abs(d / 2 * Math.sin(U(h.TextAngle))), o && (i -= d), n || (i -= d + 2 * Tt - 1), u.drawTextRotate(r, a, i, h.TextAngle)
      }

      var n, a, i, l, s, u, c, d, h = this, f = h.owner, p = f.context, g = e.Width() - f.xView3DDepth,
        m = f.IsDrawNegativeGraph(), C = h.IsValueAxis, b = h.LinePen, v = b.clone(), x = b.clone();
      h.Used && !e.IsRectEmpty() && (v.Width = .5, x.Width = .5, x.Color = N(b.Color), h.LineVisible && (p.SelectPen(b), a = e.left, i = a + f.xView3DDepth, l = a + g, s = l + f.xView3DDepth, u = r ? e.bottom : e.top, c = u - f.yView3DDepth, d = r ? t.bottom - 2 * f.yView3DDepth : t.top, p.DrawHorzLine(u, a, l), f.Chart3DReal && (f.YAxis.Used || !f.Y2Axis.Used || f.IsHorzGraph() ? (p.drawPolyLine([l, u, s, c, i, c], 0), p.drawPolyLine([s, c, s, d, i, d], 0)) : (p.drawPolyLine([s, c, i, c, a, u], 0), p.drawPolyLine([s, d, i, d, i, c], 0))), p.RestorePen()), n = h.DrawAxisTextsPrepare(g), p.SelectPen(v), n.forEach(function (n, a) {
        var i, l, s = f.IsScatterGraph() || !m || (h.IsValueAxis ? n.PosVal >= 0 : f.Value(0, a) >= 0),
          u = e.left + n.PosVal;
        h.LineVisible && (r ? (u += f.xView3DDepth, l = e.bottom - f.yView3DDepth, i = l - Tt) : (i = e.top + 1, l = s ? e.top + 1 + Tt : e.top + 1 - Tt), p.DrawVertLine(u, i, l), f.Chart3DReal && !C && (r && (u -= f.xView3DDepth, i += f.yView3DDepth + Tt), p.SelectPen(x), p.drawLine(u, i, u + f.xView3DDepth, i - f.yView3DDepth), p.RestorePen())), h.TextVisible && o(e, n.PosVal, n.Text, r, s), h.CoordLineVisible && !C && h.IsValueAxis && (p.SelectPen(h.CoordLinePen), i = t.top + 1, l = t.bottom - f.yView3DDepth, r && (i -= f.yView3DDepth, l -= f.yView3DDepth), p.DrawVertLine(u + f.xView3DDepth, i, l), p.RestorePen()), C = !1
      }), p.RestorePen(), h.CustomCoordLines.forEach(function (n) {
        var a = h.CalcValuePos(n.PosVal, g);
        n.Text && o(e, a, n.Text, r, !0), p.SelectPen(n.LinePen), p.DrawVertLine(e.left + a, t.top + 1, t.bottom), p.RestorePen()
      }))
    }, DrawVertAxis: function (e, t, r, o) {
      function n(e, t, r, o) {
        var n = d.owner.context;
        n.drawText(r, o ? e.left + (d.LineVisible ? Tt : 0) : e.right - n.measureTextWidth(r) - (d.LineVisible ? Tt : 0), t - d.owner.fontHeight / 2)
      }

      var a, i, l, s, u, c, d = this, h = d.owner, f = h.context, p = e.Height() - h.yView3DDepth, g = d.LinePen,
        m = g.clone(), C = g.clone();
      !e.IsRectEmpty() && d.Used && (m.Width = .5, C.Width = .5, C.Color = N(g.Color), d.LineVisible && (f.SelectPen(g), a = r ? e.left - h.xView3DDepth : e.right, i = e.bottom, o && (i -= h.yView3DDepth), l = i - p, f.DrawVertLine(a, l, i + 1), h.Chart3DReal && (s = a + h.xView3DDepth, u = i - h.yView3DDepth, f.drawPolyLine([a, i, s, u, s, u - p, a, l], 0)), f.RestorePen()), f.SelectPen(m), c = d.DrawAxisTextsPrepare(p), c.forEach(function (a, i) {
        var l, s, u = d.IsValueAxis ? e.bottom - a.PosVal : e.top + a.PosVal + (o ? 0 : h.yView3DDepth), c = u;
        d.LineVisible && a.PosVal != d.DrawMin && (l = e.right - Tt, s = e.right, r && (l = e.left, s = e.left + Tt), f.DrawHorzLine(c, l, s), h.Chart3DReal && (f.SelectPen(C), r ? (l = e.left - h.xView3DDepth, c += h.yView3DDepth) : l = e.right, f.drawLine(l, c, l + h.xView3DDepth, c - h.yView3DDepth), f.RestorePen())), d.TextVisible && n(e, u, a.Text, r), d.CoordLineVisible && d.IsValueAxis && (f.SelectPen(d.CoordLinePen), c -= h.yView3DDepth, f.DrawHorzLine(c, t.left + h.xView3DDepth + g.Width, t.right), f.RestorePen())
      }), f.RestorePen(), d.CustomCoordLines.forEach(function (o) {
        var a = e.bottom - d.CalcValuePos(o.PosVal, p);
        o.Text && n(e, a, o.Text, r), f.SelectPen(o.LinePen), f.DrawHorzLine(a - h.yView3DDepth, t.left + h.xView3DDepth + g.Width, t.right), f.RestorePen()
      }))
    }, PrepareDraw: function () {
      var e = this;
      e.Used = !1, e.IsValueAxis = !1, e.DrawMax = -Number.MAX_VALUE, e.DrawMin = Number.MAX_VALUE, e.DrawSpace = 0, e.ScaleFormatParser = new s.NumericFormatter(e.TextFormat)
    }, PrepareDrawRange: function () {
      var e = this;
      e.Max ? e.DrawMax = e.Max : e.Scales.forEach(function (t) {
        e.DrawMax = Math.max(e.DrawMax, t.PosVal)
      }), e.Min ? e.DrawMin = e.Min : e.DrawMin > 0 && e.DrawMax > 0 ? e.DrawMin = 0 : e.DrawMin < 0 && e.DrawMax < 0 ? e.DrawMax = 0 : e.owner.NegativeAsZero && (e.DrawMin = 0), e.DrawMax <= e.DrawMin && (e.DrawMin = 0, e.DrawMax = 100)
    }, PrepareDrawSpace: function (e, t, r) {
      var o, n = this;
      n.Space ? n.DrawSpace = n.Space : (o = n.owner.fontHeight * t, n.DrawSpace = (n.DrawMax - n.DrawMin) * o / e, n.DrawSpace = wt(n.DrawSpace, n.ScaleFormatParser.positiveAnalyser.precision)), n.DrawMax <= n.DrawMin && (n.DrawMax = n.DrawMin + 1, n.DrawSpace = .2), n.DrawSpace < 2 * n.GetScaleTiny() && (n.DrawSpace = 2 * n.GetScaleTiny()), n.Max || n.Min || r || (n.DrawMax > 0 && (n.DrawMax = n.DrawSpace * Math.ceil(n.DrawMax / n.DrawSpace)), n.DrawMin < 0 && (n.DrawMin = n.DrawSpace * Math.floor(n.DrawMin / n.DrawSpace)))
    }, GetScaleTiny: function () {
      var e = this;
      return (e.DrawMax - e.DrawMin) / 1e4
    }, CalcValuePos: function (e, t) {
      var r = this;
      return (e - r.DrawMin) * t / (r.DrawMax - r.DrawMin)
    }, get ScaleCount() {
      return this.Scales.length
    }, AddCustomScale: function (e, t) {
      this.Scales.push({PosVal: e, Text: t})
    }, EmptyCustomScale: function () {
      this.Scales = []
    }, GetScaleText: function (e) {
      return this.Scales[e].Text
    }, GetScaleValue: function (e) {
      return this.Scales[e].PosVal
    }, AddCustomCoordLine: function (e, t, r, o, n) {
      var a = new Z;
      a.Width = r, a.Style = n, a.Color = o, this.CustomCoordLines.push({PosVal: e, Text: t, LinePen: a})
    }, EmptyCustomCoordLine: function () {
      this.CustomCoordLines = []
    }
  }, E(At, ge);
  var Vt = function (e) {
    var t = this;
    ge.call(t, e), t.ChartType = 1, t.ByY2Axis = !1, t.SeriesName = "", t.XValueField = "", t.YValueField = "", t.ZValueField = "", t.FillColor = 0, t.FillColorAuto = !0, t.LabelText = "", t.LabelAsGroup = !1, t.LabelInBar = !1, t.LabelTextAngle = 0, t.TooltipText = "", t.ValueFormat = "0.##", t.MarkerStyle = 3, t.MarkerSize = 4, t.MarkerColor = 16777215, t.MarkerColorAuto = !0, t.MarkerLegendShow = !0, t.BorderPen = new Z, t.MarkerPen = new Z
  };
  Vt.prototype = {
    afterLoad: function (e) {
      var t = this;
      "StepBarChart" === t.ChartType ? t.ChartType = 4 : d(t, "ChartType", a.ChartType), d(t, "MarkerStyle", a.PointMarkerStyle), f(t, "FillColor", t.report.viewer.alpha.chartGraph), f(t, "MarkerColor", t.report.viewer.alpha.chartGraph), t.BorderPen.loadFromJSON(e.BorderPen, t.report.viewer.alpha.chartStroke), t.MarkerPen.loadFromJSON(e.MarkerPen, t.report.viewer.alpha.chartStroke)
    }, PrepareDraw: function () {
      var e = this;
      e.ValueFormatParser = new s.NumericFormatter(e.ValueFormat)
    }, IsHorzGraph: function () {
      var e = this;
      return 11 === e.ChartType || 12 === e.ChartType || 13 === e.ChartType
    }, IsPercent100Graph: function () {
      var e = this;
      return 2 === e.ChartType || 10 === e.ChartType || 13 === e.ChartType
    }, IsBarChart: function () {
      var e = this;
      return 1 === e.ChartType || 4 === e.ChartType || 10 === e.ChartType || 11 === e.ChartType || 12 === e.ChartType || 13 === e.ChartType
    }, IsScatterGraph: function () {
      var e = this;
      return 5 === e.ChartType || 6 === e.ChartType || 8 === e.ChartType || 9 === e.ChartType
    }, CanGroupLabelChart: function () {
      var e = this;
      return 1 === e.ChartType || 11 === e.ChartType
    }, HasPointMarker: function () {
      var e = this;
      return 3 === e.ChartType || 7 === e.ChartType || 5 === e.ChartType || 6 === e.ChartType || 8 === e.ChartType || 9 === e.ChartType
    }, Support3D: function () {
      var e = this;
      return 1 === e.ChartType || 4 === e.ChartType || 10 === e.ChartType || 11 === e.ChartType || 12 === e.ChartType || 13 === e.ChartType || 2 === e.ChartType
    }
  }, E(Vt, ge);
  var Nt = function (e) {
    var t = this;
    Be.call(t, e), t.XAxis = new At(t), t.YAxis = new At(t), t.Y2Axis = new At(t), t.Series = new Ft(t), t.Recordset = new Ze(t), t.TitleFont = new Q(t.Font), t.ValueFont = new Q(t.Font), t.Title = "", t.Chart3D = !1, t.Chart3DViewAngle = 35, t.LegendVisible = !0, t.LegendValueVisible = !1, t.LegendShowSum = !1, t.LegendAtBottom = !1, t.LegendColumnCount = 0, t.LegendSumLabel = "", t.SeriesField = "", t.SeriesAuto = !0, t.GroupField = "", t.GroupAuto = !0, t.GroupCount = 5, t.SeriesCount = 2, t.AbsNegativeValue = !1, t.NegativeBarColor = 255, t.BarWidthPercent = 70, t.NegativeAsZero = !1, t.SingleSeriesColored = !0, t.Bar3DAxisDepth = 25, t.Pie3DHeightDepth = 25, t.BubbleScalePerCm = 0, t.SeriesLabels = [], t.GroupLabels = [], t.values = []
  };
  Nt.prototype = {
    ControlType: 11,
    children: ["Border", "XAxis", "YAxis", "Y2Axis", "Series"],
    options: {
      tooltipBoxColor: "rgba(0,0,0,.8)",
      tooltipBoxCorner: 4,
      tooltipFontSize: 14,
      tooltipFontStyle: "normal",
      tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      tooltipFontColor: "#fff"
    },
    afterLoad: function (e) {
      var t, r, o = this;
      if (Be.prototype.afterLoad.call(o, e), f(o, "NegativeBarColor", o.report.viewer.alpha.chartGraph), o.XAxis.loadFromJSON(e.XAxis, o.report.viewer.alpha.chartStroke), o.YAxis.loadFromJSON(e.YAxis, o.report.viewer.alpha.chartStroke), o.Y2Axis.loadFromJSON(e.Y2Axis, o.report.viewer.alpha.chartStroke), o.Series.loadFromJSON(e.ChartSeries), o.Recordset.loadFromJSON(e.Recordset), o.TitleFont.loadFromJSON(e.TitleFont), o.ValueFont.loadFromJSON(e.ValueFont), o.prepareValues(), t = e.GroupLabel, t && (o.GroupLabels = t.split("\r")), t = e.SeriesLabel, t && (o.SeriesLabels = t.split("\r")), t = e.Value) {
        for (t = t.split(","), r = t.length; r-- > 0;) t[r] = +t[r];
        for (o.values = [], r = 0; r < o.SeriesCount;) o.values.push(t.slice(r++ * o.GroupCount, r * o.GroupCount))
      }
    },
    assign: function (e) {
      var t = this;
      Be.prototype.assign.call(t, e), t.TitleFont.assign(e.TitleFont), t.ValueFont.assign(e.ValueFont)
    },
    attachData: function () {
      var e = this, t = e.Recordset;
      t.prepare(), e.oSeriesField = t.FieldByName(e.SeriesField), e.oGroupField = t.FieldByName(e.GroupField), e.Series.forEach(function (e) {
        e.oYValueField = t.FieldByName(e.YValueField), e.IsScatterGraph() && (e.oXValueField = t.FieldByName(e.XValueField), 9 === e.ChartType && (e.oZValueField = t.FieldByName(e.ZValueField)))
      }), e.loadDrawingData()
    },
    loadDrawingData: function () {
      function e() {
        return t.Series.items.every(function (e) {
          return e.oYValueField && (!e.IsScatterGraph() || e.oXValueField && (9 !== e.ChartType || e.oZValueField))
        })
      }

      var t = this, r = e();
      r ? t.applyDataFromRecordset() : t.values || t.EmptyValues()
    },
    applyDataFromRecordset: function () {
      var t, r, o, n, a, i, l = this, s = l.Recordset, u = l.Series.items, c = u[0].IsScatterGraph();
      for (l.SeriesAuto && l.oSeriesField && (l.SeriesCount = 0, l.SeriesLabels = []), !c && l.GroupAuto && l.oGroupField && (l.GroupCount = 0, l.GroupLabels = []), l.EmptyValues(), s.First(); !s.Eof();) t = 0, l.oSeriesField && (r = l.oSeriesField.DisplayText, t = l.GetSeriesIndexByLabel(r, !1), 0 > t && l.SeriesAuto && (t = l.SeriesCount, l.SeriesLabels.push(r), ++l.SeriesCount)), o = 0, l.oGroupField && !c && (n = l.oGroupField.DisplayText, o = l.GetGroupIndexByLabel(n, !1), 0 > o && l.GroupAuto && (o = l.GroupCount, l.GroupLabels.push(n), ++l.GroupCount)), u.forEach(function (r, n) {
        n && (t = n), c ? l.AddXYZValue(t, r.oXValueField.AsFloat, r.oYValueField.AsFloat, r.oZValueField ? r.oZValueField.AsFloat : e) : (a = r.oYValueField.AsFloat, i = l.Value(t, o), i && (a += i), l.SetValue(t, o, a))
      }), s.Next()
    },
    showTooltip: function (t, r) {
      var o = this, n = o.options, a = o.context;
      if (t || (t = e), o.activeShape !== t && (o.activeShape = t, a.ctx.clearRect(0, 0, o.canvas.width, o.canvas.height), o.draw(), t)) {
        var i = o.graphSerieses[t.seriesIndex];
        if (i.TooltipTextBuilder) {
          var l, s = a.ctx.font, u = i.TooltipTextBuilder.generateChartDisplayText(t.seriesIndex, t.groupIndex),
            c = t.tooltipPos(), d = n.tooltipFontSize + 2, h = 0;
          if (a.ctx.font = p(n.tooltipFontSize, n.tooltipFontStyle, n.tooltipTitleFontFamily), i.tooltipLines > 1) {
            l = [];
            for (var f, g, m = 0; (f = u.indexOf("\n", m)) >= 0;) g = u.substring(m, f - ("\r" === u.charAt(f - 1) ? 1 : 0)), l.push(g), h = Math.max(h, a.measureTextWidth(g)), m = f + 1;
            g = u.substr(m), l.push(g), h = Math.max(h, a.measureTextWidth(g))
          } else h = a.measureTextWidth(u);
          var C = new X(c.x, c.y, c.x + h, c.y + d * i.tooltipLines - 2);
          if (C.InflateRect(n.tooltipBoxCorner, n.tooltipBoxCorner), C.OffsetRect(Math.min(o.canvas.width - C.right, 0), Math.min(o.canvas.height - C.bottom, 0)), a.setFillStyle(n.tooltipBoxColor), a.roundRectangle(C.left, C.top, C.Width(), C.Height(), n.tooltipBoxCorner, n.tooltipBoxCorner, 1), a.setFillStyle(n.tooltipFontColor), l) {
            var b = C.left + n.tooltipBoxCorner, v = C.top + n.tooltipBoxCorner;
            l.forEach(function (e) {
              a.drawText(e, b, v), v += d
            })
          } else a.drawTextCenter(u, (C.left + C.right) / 2, (C.top + C.bottom - n.tooltipFontSize) / 2);
          a.resetFillStyle(), a.ctx.font = s
        }
      }
    },
    prepareCanvas: function () {
      function e() {
        var e, t, r = n.Series.items, o = r.length;
        for (e = 0; o > e; e++) if (t = r[e], t.LabelText && (t.LabelTextBuilder = new u.TextBuilder(n, t.LabelText)), t.TooltipText) {
          t.TooltipTextBuilder = new u.TextBuilder(n, t.TooltipText), t.tooltipLines = 1;
          for (var i = 0; (i = t.TooltipText.indexOf("\n", i)) >= 0;) ++i, ++t.tooltipLines;
          a = 1
        }
      }

      function t() {
        var e = U(n.Chart3DViewAngle);
        n.xView3DDepth = Math.cos(e) * n.Bar3DAxisDepth, n.yView3DDepth = Math.sin(e) * n.Bar3DAxisDepth
      }

      function r() {
        var e, t, r = n.Series.items, o = n.graphs = [], a = n.graphSerieses = [];
        for (e = 0; e < n.SeriesCount; e++) {
          t = e < r.length ? r[e] : r[0], a.push(t);
          for (var i = 0; i < o.length; i++) if (t.ChartType === a[o[i][0]].ChartType) {
            o[i].push(e);
            break
          }
          i === o.length && o.push([e])
        }
      }

      function o(e) {
        var t, r, o = n.shapes.length;
        if (n.graphs.length > 1) for (t = 0; o > t; t++) if (r = n.shapes[t], !r.rect && r.inRange(e.x, e.y)) return r;
        for (t = 0; o > t; t++) if (r = n.shapes[t], r.inRange(e.x, e.y)) return r;
        return 0
      }

      var n = this, a = 0;
      n.Chart3DReal = n.Chart3D && n.Support3D(), n.xView3DDepth = 0, n.yView3DDepth = 0, n.Chart3DReal && t(), e(), r(), a && _(n, ["mousemove", "touchstart", "touchmove", "mouseout"], function (e) {
        var t, r;
        "mouseout" !== e.type && (t = j(e), r = o(t)), n.showTooltip(r, t)
      })
    },
    cloneDraw: function (e) {
      var t = this, r = new Nt(t.owner);
      return r.assign(t), r
    },
    draw: function (e) {
      function t() {
        function e() {
          var e, o, n;
          u.DrawBubbleScalePerCm = u.BubbleScalePerCm, u.DrawBubbleScalePerCm <= 0 && (e = r * t * Ct, o = e / (bt * bt), u.DrawBubbleScalePerCm = p / o), n = Math.sqrt(f / u.DrawBubbleScalePerCm) * bt, 0 === v.Max && (v.DrawMax += (v.DrawMax - v.DrawMin) * (n / 2) / t), 0 == b.Max && (b.DrawMax += (b.DrawMax - b.DrawMin) * (n / 2) / r)
        }

        var t, r, o = u.IsScatterGraph(), n = u.Series.items, a = n[0].ChartType, c = 10 === a || 13 === a, f = 0,
          p = 0;
        for (b.PrepareDraw(), v.PrepareDraw(), x.PrepareDraw(), l = n.length, i = 0; l > i; i++) n[i].PrepareDraw(this);
        b.Used = !0, b.IsValueAxis = !1, v.IsValueAxis = !0, x.IsValueAxis = !0, u.Title && (T = g(u.getUsingTitleFont()) + yt), o ? (b.IsValueAxis = !0, m.forEach(function (e) {
          e.forEach(function (e) {
            var t, r = u.values[e], o = r ? r.length : 0, n = b, a = u.YAxisOfSeries(C[e]);
            for (a.Used = !0, i = 0; o > i; i++) t = r[i], t.y < a.DrawMin && (a.DrawMin = t.y), t.y > a.DrawMax && (a.DrawMax = t.y), t.x < n.DrawMin && (n.DrawMin = t.x), t.x > n.DrawMax && (n.DrawMax = t.x), f < t.z && (f = t.z), p += t.z
          })
        }), b.PrepareDrawRange()) : m.forEach(function (e) {
          var t, r, o = C[e[0]].ChartType, n = 4 === o || 10 === o || 12 === o || 13 === o;
          for (t = 0; t < u.GroupCount; t++) if (r = 0, e.forEach(function (e) {
              var o = u.Value(e, t), a = u.YAxisOfSeries(C[e]);
              n ? r += o : (a.Used = !0, u.AbsNegativeValue && (o = Math.abs(o)), o < a.DrawMin && (a.DrawMin = o), o > a.DrawMax && (a.DrawMax = o))
            }), n) {
            var a = C[e[0]], i = u.YAxisOfSeries(a);
            i.Used = !0, c ? (i.DrawMin = 0, i.DrawMax = 100) : (r < i.DrawMin && (i.DrawMin = r), r > i.DrawMax && (i.DrawMax = r))
          }
        }), v.Used || x.Used || (v.Used = !0), v.Used && (s = v.DrawMax), x.Used && s < x.DrawMax && (s = x.DrawMax), v.PrepareDrawRange(), x.PrepareDrawRange(), t = h - T - b.CalcLabelHeight() - b.CalcHorzAxisHeight(!0), t = Math.max(t, 1), v.PrepareDrawSpace(t, 3, c), x.PrepareDrawSpace(t, 3, c), o && (r = d - v.CalcLabelHeight() - v.CalcVertAxisWidth() - x.CalcLabelHeight() - x.CalcVertAxisWidth(), r = Math.max(r, 1), b.PrepareDrawSpace(r, 6, !1), t = h - T - b.CalcLabelHeight() - b.CalcHorzAxisHeight(!1), t = Math.max(t, 1), 9 === n[0].ChartType && e())
      }

      function r() {
        var e;
        u.LegendAtBottom ? (e = u.DrawHorzSideLegend(f), f.bottom -= e + yt) : (e = u.DrawVertSideLegend(f), f.right -= e + yt)
      }

      function o() {
        p.SelectFont(u.getUsingTitleFont()), p.drawTextCenter(u.Title, (f.left + f.right) / 2, f.top + yt / 2), p.RestoreFont()
      }

      function n(e) {
        var t, r, o, n, a, i, l, c, d = u.Series.items, h = b.CalcLabelHeight(), f = b.CalcHorzAxisHeight(!1),
          T = v.CalcLabelHeight(), y = v.CalcVertAxisWidth(), S = x.CalcLabelHeight(), w = x.CalcVertAxisWidth(), F = 0,
          D = 0, P = !1;
        for (r = d.length, t = 0; r > t; t++) if (o = d[t], o.LabelTextBuilder && !o.LabelInBar) {
          P = !0;
          break
        }
        if (!P && u.Title || (F = g(u.getUsingValueFont()) / (o.LabelTextBuilder ? 1 : 2), u.IsDrawNegativeGraph() && (D = F), o.LabelTextAngle && (p.SelectFont(u.getUsingValueFont()), F = Math.max(Math.abs(p.measureTextWidth(o.ValueFormatParser.format(s)) * Math.sin(U(o.LabelTextAngle))), F), p.RestoreFont())), a = new X(e.left + T + y, e.top + F, e.right - S - w, e.bottom - h - f - D), l = new X(e.left, e.top + F, e.left + T, e.bottom - h - f - D), v.DrawVertAxisLabel(l), c = new X(e.right - S, l.top, e.right, l.bottom), x.DrawVertAxisLabel(c), l.left = l.right, l.right += y, v.DrawVertAxis(l, a, !1), c.right = c.left, c.left -= w, x.DrawVertAxis(c, a, !0), i = new X(e.left + T + y, e.bottom - h, e.right - S - w, e.bottom), b.DrawHorzAxisLabel(i), u.IsDrawNegativeGraph() ? (i.top = l.bottom - v.CalcValuePos(0, l.Height()), i.bottom = i.top + f) : (i.top = a.bottom, i.bottom = i.top + f), u.Chart3D && b.DrawHorzAxis(i, a, !1), !a.IsRectEmpty() && (u.IsScatterGraph() || u.GroupCount)) {
          for (p.SelectFont(u.getUsingValueFont()), r = m.length, t = 0; r > t; t++) switch (o = m[t], n = C[o[0]].ChartType) {
            case 1:
              u.DrawBar(o, a);
              break;
            case 4:
            case 10:
              u.DrawStackedBar(o, n, a);
              break;
            case 3:
            case 7:
              u.DrawLine(o, n, a);
              break;
            case 9:
              u.DrawBubble(o, a);
              break;
            default:
              u.DrawXYScatterGraph(o, n, a)
          }
          p.RestoreFont()
        }
        !u.Chart3D && b.DrawHorzAxis(i, a, !1)
      }

      function a(e) {
        var t, r, o, n, a, i, l, c, d = u.Series.items, h = b.CalcLabelHeight(), f = b.CalcVertAxisWidth(),
          g = v.CalcLabelHeight(), T = v.CalcHorzAxisHeight(!1), y = x.CalcLabelHeight(), S = x.CalcHorzAxisHeight(!1),
          w = 0, F = 0, D = !1;
        for (r = d.length, t = 0; r > t; t++) if (o = d[t], o.LabelTextBuilder && !o.LabelInBar) {
          D = !0;
          break
        }
        if (D && (p.SelectFont(u.getUsingValueFont()), w = p.measureTextWidth(o.ValueFormatParser.format(s)), u.IsDrawNegativeGraph() && (F = w), p.RestoreFont()), a = new X(e.left + h + f + F, e.top + g + T, e.right - w, e.bottom - y - S), l = new X(a.left, e.top, a.right, e.top + g), v.DrawHorzAxisLabel(l), c = new X(l.left, e.bottom - y, l.right, e.bottom), x.DrawHorzAxisLabel(c), l.top = l.bottom, l.bottom += T, v.DrawHorzAxis(l, a, !0), c.bottom = c.top, c.top -= S, x.DrawHorzAxis(c, a, !1), i = new X(e.left, a.top, e.left + h, a.bottom), b.DrawVertAxisLabel(i), i.left = i.right, i.right += f, u.Chart3D && b.DrawVertAxis(i, a, !1, v.Used), !a.IsRectEmpty() && u.GroupCount) {
          for (p.SelectFont(u.getUsingValueFont()), r = m.length, t = 0; r > t; t++) switch (o = m[t], n = C[o[0]].ChartType) {
            case 11:
              u.DrawColumnBar(o, a);
              break;
            case 12:
            case 13:
              u.DrawStackedColumnBar(o, n, a)
          }
          p.RestoreFont()
        }
        !u.Chart3D && b.DrawVertAxis(i, a, !1)
      }

      var i, l, s, u = this, c = u.canvas, d = c.width, h = c.height, f = new X(0, 0, d, h),
        p = u.context = new ee(c.getContext("2d")), m = u.graphs, C = u.graphSerieses, b = u.XAxis, v = u.YAxis,
        x = u.Y2Axis, T = 0;
      u.fontHeight = g(u.getUsingFont()), u.valueFontHeight = g(u.getUsingValueFont()), p.SelectFont(u.getUsingFont()), p.setDefaultFillColor(u.ForeColor), u.report.singleChart && (f.left += u.PaddingLeft, f.top += u.PaddingTop, f.right -= u.PaddingRight, f.bottom -= u.PaddingBottom), u.toUpdateShapes = e, e && (u.shapes = []), t(), u.LegendVisible && u.SeriesCount && r(), u.Title && o(), f.top += T, f.IsRectEmpty() || (2 === u.Series.items[0].ChartType ? u.DrawPie(f) : u.IsHorzGraph() ? a(f) : n(f)), p.RestoreFont()
    },
    DrawPie: function (e) {
      var t, r, o, n, a = this, i = a.context, l = 0, s = 0, u = e.Height(), c = e.Width(), d = c * u,
        h = Number.MAX_VALUE, f = -1, p = -1;
      for (t = 0; t < a.GroupCount; t++) {
        for (r = 0; r < a.SeriesCount; r++) i.SelectFont(a.getUsingValueFont()), a.graphSerieses[r].LabelTextBuilder && (l = Math.max(l, i.measureTextWidth(a.GetDrawValueText(r, t)))), i.RestoreFont();
        s = Math.max(s, i.measureTextWidth(a.GroupLabel(t)))
      }
      for (t = 1; t <= a.GroupCount; t++) r = Math.floor((a.GroupCount + t - 1) / t), o = Math.min(c / r, u / t), o = d - o * o * a.GroupCount, h > o && (h = o, f = r, p = t);
      for (i.SelectFont(a.getUsingValueFont()), o = 0; o < a.GroupCount; o++) t = Math.floor(o / f), r = o % f, n = new X(e.left + c * r / f, e.top + u * t / p, e.left + c * (r + 1) / f, e.top + u * (t + 1) / p), a.Chart3DReal ? i.drawTextCenter("三维饼图暂不支持!!!", (n.left + n.right) / 2, (n.top + n.bottom - 16) / 2) : a.DrawOne2DPie(o, n, l, s);
      i.RestoreFont()
    },
    DrawOne2DPie: function (e, t, r) {
      function o() {
        var r, o, p, m, b, v, x = c.getUsingValueFont(), T = x.Italic ? h(x) : 0, y = new X(0, 0, 0, 0);
        for (u = 0, n = 0; g > n; n++) s = U(C[n]), o = i + Math.cos(s) * a, p = l - Math.sin(s) * a, v = c.GetDrawValueText(n, e), b = d.measureTextWidth(v) + T, r = new X(o, p, o + b, p + f), s < Math.PI / 2 ? (r.OffsetRect(2, -f), 1 === u && r.top < y.bottom && (m = y.right - r.left + 2, r.right + m < t.right ? r.OffsetRect(m, 0) : r.OffsetRect(0, y.bottom - r.top), d.drawLine(o, p, r.left, r.bottom - b.cy / 3)), u = 1) : s < Math.PI ? (r.OffsetRect(-b - 2, -f), 2 === u && r.top < y.bottom && (m = r.right - y.left + 2, r.left - m > t.left ? r.OffsetRect(-m, 0) : r.OffsetRect(0, y.bottom - r.top), d.drawLine(o, p, r.right, r.bottom - b.cy / 3)), u = 2) : s < 1.5 * Math.PI ? (r.OffsetRect(-b - 2, 0), 3 === u && r.bottom > y.top && (m = r.right - y.left + 2, r.left - m > t.left ? r.OffsetRect(-m, 0) : r.OffsetRect(0, r.bottom - y.top), d.drawLine(o, p, r.right, r.top + b.cy / 3)), u = 3) : (r.OffsetRect(2, 0), 4 === u && r.bottom > y.top && (m = y.right - r.left + 2, r.right - m < t.right ? r.OffsetRect(m, 0) : r.OffsetRect(0, r.bottom - y.top), d.drawLine(o, p, r.left, r.top + b.cy / 3)), u = 4), c.DrawLabelText(v, (r.left + r.right) / 2, r.top), y = r
      }

      var n, a, i, l, s, u, c = this, d = c.context, h = c.fontHeight, f = c.valueFontHeight, p = !1, g = c.SeriesCount,
        m = 0, C = [];
      for (n = 0; g > n; n++) m += c.Value(n, e), c.graphSerieses[n].LabelTextBuilder && (p = !0);
      if (!(0 >= m || (i = t.Width() - 2 * r - 2 * St, l = t.Height() - h - 2 * f - 2 * St, 0 >= i || 0 >= l || (a = Math.min(i, l) / 2, p ? t.InflateRect(-St, -St) : t.InflateRect(a - i / 2, a - l / 2), t.bottom -= h, t.IsRectEmpty())))) {
        for (c.DrawLabelText(c.GroupLabel(e), (t.left + t.right) / 2, t.bottom), i = (t.left + t.right) / 2, l = (t.top + t.bottom) / 2, s = 0, n = 0; g > n; n++) u = s + 360 * c.Value(n, e) / m, c.toUpdateShapes && c.shapes.push(new Bt(n, e, i, l, a, s, u)), d.setFillColor(c.GetGraphFillColor(n)), d.pie(i, l, a, s, u), p && C.push((s + u) / 2), s = u;
        d.resetFillStyle(), p && o()
      }
    },
    DrawColumnBar: function (e, t) {
      var r, o, n, a, i, l, s, u, c, d, h, f, p, g = this, m = g.context, C = g.graphSerieses,
        b = g.CalcColumnBarCount(), v = g.CalcFirtColumnBarIndex(e), x = t.Width() - g.xView3DDepth,
        T = t.Height() - g.yView3DDepth, y = g.IsDrawNegativeGraph() ? g.YAxis.CalcValuePos(0, x) : t.left + 1,
        S = e.length, w = g.IsDrawNegativeGraph(), F = [];
      for (a = 0; a < g.GroupCount; a++) for (u = g.XAxis.CalcGroupPos(T, a), c = u.EndPos - u.BeginPos, r = t.top + u.BeginPos, g.Y2Axis.Used && (r += g.yView3DDepth), o = S; o-- > 0;) i = e[o], l = C[i], n = g.Value(i, a), d = g.AbsNegativeValue && 0 > n, d && (n = -n), p = new X(0, r + c * (v + o) / b, 0, r + c * (v + o + 1) / b), f = g.YAxisOfSeries(l).CalcValuePos(n, x), w ? (p.left = t.left + y, p.right = Math.min(t.left + f, t.right), y > f && (f = p.left, p.left = p.right, p.right = f)) : (p.left = t.left, p.right = Math.min(t.left + Math.max(0, f), t.right)), F.push(p), g.toUpdateShapes && g.shapes.push(new Pt(i, a, p)), h = d ? g.NegativeBarColor : g.GetGraphFillColor(g.IsColorSingleBar() ? a : i), g.DrawRectBar(p, h, l.BorderPen, !0, !0, n >= 0);
      for (a = 0; a < g.GroupCount; a++) if (l = C[e[0]], l.LabelAsGroup) {
        for (s = g.GetDrawValueText(e[0], a), f = -9999, o = 0; S > o; o++) p = F[a * S + o], f < p.right && (f = p.right);
        g.DrawValueText(l, s, f + St + m.measureTextWidth(s) / 2, (F[a * S].top + F[a * S + S - 1].bottom + g.valueFontHeight) / 2)
      } else for (o = 0; S > o; o++) i = e[o], l = C[i], l.LabelTextBuilder && (s = g.GetDrawValueText(i, a), p = F[a * S + o], l.LabelInBar ? g.DrawHorzBarText(s, p) : g.DrawValueText(l, s, p.right + St + m.measureTextWidth(s) / 2, (p.top + p.bottom + g.valueFontHeight) / 2))
    },
    DrawStackedColumnBar: function (e, t, r) {
      var o, n, a, i, l, s, u, c, d, h, f, p, g, m, C = this, b = C.context, v = C.graphSerieses,
        x = C.CalcColumnBarCount(), T = C.CalcFirtColumnBarIndex(e), y = r.Width() - C.xView3DDepth,
        S = r.Height() - C.yView3DDepth, w = e.length, F = [];
      for (a = 0; a < C.GroupCount; a++) {
        for (s = C.XAxis.CalcGroupPos(S, a), u = s.EndPos - s.BeginPos, d = r.top + s.BeginPos, C.Y2Axis.Used && (d += C.yView3DDepth), p = d + u * T / x, g = d + u * (T + 1) / x, h = r.left, o = 0; w > o; o++) i = e[o], l = v[i], n = C.Value(i, a), 13 === t && (n *= 100 / C.CalcGroupTotalValue(e, a)), f = Math.max(0, C.YAxisOfSeries(l).CalcValuePos(n, y)), m = new X(h, p, Math.min(r.right, h + f), g), F.push(m), C.toUpdateShapes && C.shapes.push(new Pt(i, a, m)), c = C.GetGraphFillColor(i), C.DrawRectBar(m, c, l.BorderPen, !0, o === w - 1, !0), h += f;
        if (l.LabelInBar) for (o = 0; w > o; o++) i = e[o], l = v[i], l.LabelTextBuilder && C.DrawHorzBarText(C.GetDrawValueText(i, a), F[a * w + o]); else i = e[0], l = v[i], n = C.GetDrawValueText(i, a), C.DrawValueText(l, n, h + St + b.measureTextWidth(n) / 2, (p + g + C.valueFontHeight) / 2)
      }
    },
    DrawBar: function (e, t) {
      var r, o, n, a, i, l, s, u, c, d, h, f, p, g = this, m = g.graphSerieses, C = g.CalcBarCount(),
        b = g.CalcFirtBarIndex(e), v = g.IsDrawNegativeGraph(), x = t.Height() - g.yView3DDepth,
        T = v ? g.YAxis.CalcValuePos(0, x) : t.bottom + 1, y = e.length, S = [];
      for (a = 0; a < g.GroupCount; a++) for (u = g.XAxis.CalcGroupPos(t.Width() - g.xView3DDepth, a), c = u.EndPos - u.BeginPos, n = b, r = 0; y > r; r++) i = e[r], l = m[i], o = g.Value(i, a), d = g.AbsNegativeValue && 0 > o, d && (o = -o), p = new X(t.left + u.BeginPos + c * n / C, 0, t.left + u.BeginPos + c * (n + 1) / C, 0), f = g.YAxisOfSeries(l).CalcValuePos(o, x), v ? (p.top = Math.max(t.bottom - f, t.top), p.bottom = t.bottom - T, T > f && (f = p.top, p.top = p.bottom, p.bottom = f)) : (p.top = t.bottom - f, p.bottom = t.bottom), S.push(p), g.toUpdateShapes && g.shapes.push(new Pt(i, a, p)), h = d ? g.NegativeBarColor : g.GetGraphFillColor(g.IsColorSingleBar() ? a : i), g.DrawRectBar(p, h, l.BorderPen, !1, !0, o >= 0), ++n;
      for (a = 0; a < g.GroupCount; a++) if (i = e[0], l = m[i], l.LabelAsGroup) {
        for (s = g.GetDrawValueText(i, a), f = 9999, r = 0; y > r; r++) p = S[a * y + r], f > p.top && (f = p.top);
        g.DrawValueText(l, s, (S[a * y].left + S[a * y + y - 1].right + g.xView3DDepth) / 2, f - St / 2 - g.yView3DDepth)
      } else for (r = 0; y > r; r++) i = e[r], l = m[i], l.LabelTextBuilder && (s = g.GetDrawValueText(i, a), p = S[a * y + r], l.LabelInBar ? g.DrawVertBarText(s, p) : (f = p.top - St / 2 - g.yView3DDepth, g.IsDrawNegativeGraph() && t.bottom - T < p.bottom && (f = p.bottom + g.valueFontHeight), g.DrawValueText(l, s, (p.left + p.right + g.xView3DDepth) / 2, f)))
    },
    DrawStackedBar: function (e, t, r) {
      var o, n, a, i, l, s, u, c, d, h, f, p, g, m = this, C = m.graphSerieses, b = m.CalcBarCount(),
        v = m.CalcFirtBarIndex(e), x = r.Width() - m.xView3DDepth, T = r.Height() - m.yView3DDepth, y = e.length,
        S = [];
      for (a = 0; a < m.GroupCount; a++) {
        for (s = m.XAxis.CalcGroupPos(x, a), u = s.EndPos - s.BeginPos, h = r.left + s.BeginPos + u * v / b, f = r.left + s.BeginPos + u * (v + 1) / b, p = r.bottom, o = 0; y > o; o++) i = e[o], l = C[i], n = m.Value(i, a), 10 === t && (n *= 100 / m.CalcGroupTotalValue(e, a)), d = m.YAxisOfSeries(l).CalcValuePos(n, T), g = new X(h, Math.min(Math.max(p - d, r.top), p), f, p), S.push(g), m.toUpdateShapes && m.shapes.push(new Pt(i, a, g)), c = m.GetGraphFillColor(i), m.DrawRectBar(g, c, l.BorderPen, !1, o === y - 1, !0), p -= d;
        if (l.LabelInBar) for (o = 0; y > o; o++) i = e[o], l = C[i], l.LabelTextBuilder && m.DrawVertBarText(m.GetDrawValueText(i, a), S[a * y + o]); else i = e[0], l = C[i], m.DrawValueText(l, m.GetDrawValueText(i, a), (h + f + m.xView3DDepth) / 2, p - St / 2 - m.yView3DDepth)
      }
    },
    DrawRectBar: function (e, t, r, o, n, a) {
      function i(e, t) {
        s.setFillColor(e), s.SelectPen(new Z(1, e, 1)), s.drawPolyLine(t, 1, 1), s.RestorePen(), s.resetFillStyle()
      }

      var l = this, s = l.context, u = N(t), c = M(t), d = [];
      l.Chart3DReal && (d.length = 8, d[0] = e.right - 1, d[1] = e.top, d[2] = d[0] + l.xView3DDepth, d[3] = d[1] - l.yView3DDepth, (n || o) && (d[4] = d[2] - e.Width(), d[5] = d[3], d[6] = e.left, d[7] = d[1], i(u, d)), !n && o || (d[4] = d[2], d[5] = e.bottom - l.yView3DDepth, d[6] = e.right - 1, d[7] = e.bottom, i(c, d))), l.Chart3DReal ? (s.setFillColor(t), s.rectangle2(e, 1), s.resetFillStyle()) : s.drawBar(e, r, t, o ? a ? 1 : 3 : a ? 0 : 2)
    },
    DrawLine: function (e, t, r) {
      var o, n, a, i, l, s, u, c, d = this, h = d.context, f = e.length, p = [];
      for (o = 0; f > o; o++) p.push([]);
      for (n = 0; n < d.GroupCount; n++) for (u = r.left + d.XAxis.CalcGroupPos(r.Width() - d.xView3DDepth, n).LabelMiddlePos, o = 0; f > o; o++) {
        a = e[o], i = d.graphSerieses[a];
        var g = {x: u, y: r.bottom - d.YAxisOfSeries(i).CalcValuePos(d.Value(a, n), r.Height())};
        p[o].push(g), d.toUpdateShapes && d.shapes.push(new Rt(a, n, g.x, g.y, i.MarkerSize))
      }
      for (o = 0; f > o; o++) (7 === t ? d.DrawCurveLine : d.DrawPolyLine).call(d, p[o], e[o]);
      for (o = 0; f > o; o++) d.DrawPointsMarker(p[o], e[o]);
      for (n = 0; n < d.GroupCount; n++) for (o = 0; f > o; o++) a = e[o], i = d.graphSerieses[a], i.LabelTextBuilder && (c = r.bottom - d.YAxisOfSeries(i).CalcValuePos(d.Value(a, n), r.Height()), -1 !== i.MarkerStyle && (c -= i.MarkerSize / 2), l = d.GetDrawValueText(a, n), s = h.measureTextWidth(l), u = p[o][n].x + s / 2, d.GroupCount > 1 && (u -= s * n / (d.GroupCount - 1)), d.DrawValueText(i, l, u, c))
    },
    DrawBubble: function (e, t) {
      var r, o, n, a, i, l, s, u, c, d = this, h = (d.context, e.length), f = [], p = [];
      for (r = 0; h > r; r++) for (a = e[r], i = d.graphSerieses[a], u = [], c = [], f.push(u), p.push(c), s = d.ValueCount(a), n = 0; s > n; n++) {
        o = d.Value(a, n), l = Math.sqrt(o.z / d.DrawBubbleScalePerCm) * bt / 2;
        var g = {
          x: t.left + d.XAxis.CalcValuePos(o.x, t.Width()),
          y: t.bottom - d.YAxisOfSeries(i).CalcValuePos(o.y, t.Height())
        };
        u.push(g), c.push(l), d.toUpdateShapes && d.shapes.push(new Rt(a, n, g.x, g.y, l)), i.LabelTextBuilder && d.DrawValueText(i, d.GetDrawValueText(a, n), g.x, g.y - l)
      }
      for (r = 0; h > r; r++) a = e[r], d.DrawPointsMarker(f[a], a, p[a])
    },
    DrawXYScatterGraph: function (e, t, r) {
      var o, n, a, i, l, s, u, c = this, d = e.length, h = [];
      for (o = 0; d > o; o++) for (i = e[o], l = c.graphSerieses[i], u = [], h.push(u), s = c.ValueCount(i), a = 0; s > a; a++) {
        n = c.Value(i, a);
        var f = {
          x: r.left + c.XAxis.CalcValuePos(n.x, r.Width()),
          y: r.bottom - c.YAxisOfSeries(l).CalcValuePos(n.y, r.Height())
        };
        u.push(f), c.toUpdateShapes && c.shapes.push(new Rt(i, a, f.x, f.y, l.MarkerSize)), l.LabelTextBuilder && c.DrawValueText(l, c.GetDrawValueText(i, a), f.x, f.y - l.MarkerSize)
      }
      if (6 === t || 8 === t) for (o = 0; d > o; o++) i = e[o], l = c.graphSerieses[i], (8 === t ? c.DrawCurveLine : c.DrawPolyLine).call(c, h[i], i);
      for (o = 0; d > o; o++) i = e[o], c.DrawPointsMarker(h[i], i)
    },
    DrawPolyLine: function (e, t) {
      var r, o, n = this, a = n.context, i = e.length, l = [];
      for (r = 0; i > r; r++) l.push(e[r].x, e[r].y);
      o = n.graphSerieses[t].BorderPen.clone(), o.Color = n.GetGraphFillColor(t), a.SelectPen(o), a.drawPolyLine(l), a.RestorePen()
    },
    DrawCurveLine: function (e, t) {
      function r(e, t, r) {
        var o = .4, n = Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)),
          a = Math.sqrt(Math.pow(r.x - t.x, 2) + Math.pow(r.y - t.y, 2)), i = n + a, l = i > 0 ? o * n / i : 1,
          s = i > 0 ? o * a / i : 1;
        return {
          inner: {x: t.x - l * (r.x - e.x), y: t.y - l * (r.y - e.y)},
          outer: {x: t.x + s * (r.x - e.x), y: t.y + s * (r.y - e.y)}
        }
      }

      var o, n, a, i, l = this, s = l.context, u = e.length, c = [];
      if (u > 1) {
        for (a = e[0], i = r(a, a, e[1]), c.push(a, i.outer), o = 1; u - 1 > o; o++) a = e[o], i = r(e[o - 1], a, e[o + 1]), c.push(i.inner, a, i.outer);
        a = e[o], i = r(e[o - 1], a, a), c.push(i.inner, a), n = l.graphSerieses[t].BorderPen.clone(), n.Color = l.GetGraphFillColor(t), s.SelectPen(n), s.polyBezier(c), s.RestorePen()
      }
    },
    DrawPointsMarker: function (e, t, r) {
      var o, a = this, i = a.context, l = a.graphSerieses[t], s = e.length;
      if (-1 !== l.MarkerStyle) for (o = 0; s > o; o++) i.DrawPointMarker(n(e[o].x, e[o].y, r ? r[o] : l.MarkerSize), l.MarkerStyle, l.MarkerPen, l.MarkerColorAuto ? a.GetGraphFillColor(t) : l.MarkerColor)
    },
    DrawHorzSideLegend: function (e) {
      var t, r, o, n, a, i, l, s, u = this, c = u.context, d = u.LegendRealShowValue(),
        h = u.LegendColumnCount > 0 ? u.LegendColumnCount : 999, f = e.Width(), p = 2 * u.fontHeight, g = 3 * p / 4,
        m = u.LegendItemCount(), C = f, b = [], v = {Count: 0, Width: 0};
      for (r = 0; m > r; ++r) t = yt + g + St, t += c.measureTextWidth(u.LegendItemLabel(r)), d && (t += St + c.measureTextWidth(u.LegendItemValueText(r))), (t > C || v.Count >= h) && v.Width > 0 && (b.push(v), v = {
        Count: 0,
        Width: 0
      }, C = f), v.Count++, v.Width += t, C -= t;
      for (v.Count > 0 && b.push(v), n = St + b.length * p, o = 0, v = b[o], r = e.bottom - n + St, a = new X((e.left + e.right - v.Width) / 2, e.bottom - n + St, 0, r + p), r = 0; m > r; ++r) v.Count <= 0 && (o++, v = b[o], a.left = (e.left + e.right - v.Width) / 2, a.top = a.bottom, a.bottom += p), v.Count--, a.left += yt, (m - 1 > r || !u.LegendIsSumItem(r)) && (t = (a.top + a.bottom - g) / 2, i = new X(a.left, t, a.left + g, t + g), u.DrawLegendGraph(r, i)), a.left += g, l = (a.top + a.bottom - u.fontHeight) / 2, s = u.LegendItemLabel(r), a.left += St, a.right = a.left + c.measureTextWidth(s), c.drawText(s, a.left, l), a.left = a.right, d && (s = u.LegendItemValueText(r), a.left += St, a.right = a.left + c.measureTextWidth(s), c.drawText(s, a.left, l), a.left = a.right);
      return n
    },
    DrawVertSideLegend: function (e) {
      var t, r, o, n, a, i, l, s, u, c, d, h, f, p, g = this, m = g.context, C = g.LegendRealShowValue(),
        b = g.LegendRealShowSum(), v = g.LegendItemCount(), x = g.LegendColumnCount, T = 2 * g.fontHeight,
        y = 3 * T / 4, S = e.Height() - 2 * St, w = 0, F = 0, D = 2 * St, P = [], B = [];
      for (n = 0; v > n; ++n) i = m.measureTextWidth(g.LegendItemLabel(n)), i > w && (w = i), l = T, D += l, P.push(l), C && (i = m.measureTextWidth(g.LegendItemValueText(n)), i > F && (F = i));
      if (t = w + St, F > 0 && (t += F + St), 0 >= x && (x = 1, D > e.Height())) for (i = 0, n = 0; v > n; ++n) i > S && (x++, i = P[n]);
      if (S < P[0]) return 0;
      for (n = 0, i = 0; x > i; i++) for (l = S; v > n && l > P[n];) l -= P[n++];
      for (r = v > n, r && (i = v, b && (n--, i--), P.splice(n, i - n)), i = P.length, l = x, s = Math.ceil(i / x), B = I(x, 0), b && (B[x - 1] = s, i -= s, l--, l > 0 && (s = Math.ceil(i / l))), n = 0; l > n; n++) B[n] = Math.min(s, i), i -= B[n];
      for (l = 0, n = 0, i = 0; x > i; i++) {
        for (s = 0, a = 0; a < B[i]; a++) s += P[n++];
        s > l && (l = s)
      }
      for (D = Math.min(e.Height(), l + 2 * St), u = St + y + St + t, c = u * x + St, c > 2 * e.Width() / 3 && (c = 2 * e.Width() / 3, l = u, u = (c - St) / x, w -= l - u), i = e.right - c, l = (e.top + e.bottom - D) / 2, d = new X(i, l, i + c, l + D), m.rectangle2(d), i = d.left + St, l = u - St, h = new X(i, 0, i + y, 0), i += h.Width() + St, l -= h.Width() + St, f = new X(i, d.top + St, i + Math.min(l, w + St), 0), i += f.Width() + St, l -= f.Width() + St, p = new X(i, 0, i + l, 0), i = P.length - 1, b && i--, l = 0, n = 0; x > n; n++) {
        for (f.top = d.top + St, a = 0; a < B[n]; ++a) f.bottom = f.top + P[l], s = (f.top + f.bottom - g.fontHeight) / 2, r && i === l ? m.drawText("... ...", h.left, s) : (h.top = (f.top + f.bottom - y) / 2, h.bottom = h.top + y, o = b && l === P.length - 1, o ? l = v - 1 : g.DrawLegendGraph(l, h), m.drawText(g.LegendItemLabel(l), f.left, s), C && m.drawText(g.LegendItemValueText(l), p.left, s), o && (m.SelectPen(new Z(.5, 0, 1)), m.DrawHorzLine(f.top, h.left, p.right), m.RestorePen(new Z(.5, 0, 1)))), f.top += P[l++];
        h.left += u, h.right += u, f.left += u, f.right += u, p.left += u, p.right += u
      }
      return c
    },
    DrawLegendGraph: function (e, t) {
      var r, o = this, n = o.context, a = !1, i = o.GetGraphFillColor(e);
      o.LegendIsGroup() || (r = o.graphSerieses[e], a = r.HasPointMarker() && r.MarkerLegendShow, a && n.DrawPointMarker(t, r.MarkerStyle, r.MarkerPen, i)), a || (n.setFillColor(i), n.rectangle2(t, 1), n.resetFillStyle())
    },
    DrawValueText: function (e, t, r, o) {
      var n, a = this, i = a.context, l = a.valueFontHeight;
      e.LabelTextAngle ? (n = U(e.LabelTextAngle), r -= (i.measureTextWidth(t) * Math.cos(n) + Math.abs(l * Math.sin(n))) / 2, o -= Math.abs(l * Math.cos(n)), i.drawTextRotate(t, r, o, e.LabelTextAngle)) : i.drawTextCenter(t, r, o - l)
    },
    DrawLabelText: function (e, t, r) {
      var o = this.context;
      o.drawTextCenter(e, t, r)
    },
    DrawVertBarText: function (e, t) {
      var r = this, o = r.context;
      o.drawTextRotate(e, (t.left + t.right - r.fontHeight) / 2, (t.top + t.bottom + o.measureTextWidth(e)) / 2, 90)
    },
    DrawHorzBarText: function (e, t) {
      var r = this, o = r.context, n = o.measureTextWidth(e), a = r.fontHeight, i = (t.left + t.right - n) / 2,
        l = (t.top + t.bottom - a) / 2;
      o.drawText(e, i, l)
    },
    CalcBarCount: function () {
      var e, t, r, o = this, n = o.graphs.length, a = 0;
      for (e = 0; n > e; e++) t = o.graphs[e], r = o.graphSerieses[t[0]].ChartType, 1 === r ? a += t.length : 4 !== r && 10 !== r || a++;
      return a
    },
    CalcColumnBarCount: function () {
      var e, t, r, o = this, n = o.graphs.length, a = 0;
      for (e = 0; n > e; e++) t = o.graphs[e], r = o.graphSerieses[t[0]].ChartType, 11 === r ? a += t.length : 12 !== r && 13 !== r || a++;
      return a
    },
    CalcFirtBarIndex: function (e) {
      var t, r, o, n = this, a = n.graphs, i = a.length, l = 0;
      for (t = 0; i > t && (r = a[t], r !== e); t++) o = n.graphSerieses[r[0]].ChartType, 1 === o ? l += r.length : 4 !== o && 10 !== o || ++l;
      return l
    },
    CalcFirtColumnBarIndex: function (e) {
      var t, r, o, n = this, a = n.graphs, i = a.length, l = 0;
      for (t = 0; i > t && (r = a[t], r !== e); t++) o = n.graphSerieses[r[0]].ChartType, 11 === o ? l += r.length : 12 !== o && 13 !== o || ++l;
      return l
    },
    CalcGroupTotalValue: function (e, t) {
      var r, o = this, n = e.length, a = 0;
      for (r = 0; n > r; r++) a += o.Value(e[r], t);
      return a
    },
    IsScatterGraph: function () {
      return this.Series.items[0].IsScatterGraph()
    },
    IsHorzGraph: function () {
      return this.Series.items[0].IsHorzGraph()
    },
    IsColorSingleBar: function () {
      var e = this;
      return 1 == e.SeriesCount && e.SingleSeriesColored
    },
    IsDrawNegativeGraph: function () {
      var e = this;
      return !e.Series.items.some(function (e) {
        return e.ByY2Axis
      }) && e.YAxis.DrawMax >= 0 && e.YAxis.DrawMin < 0 && !e.AbsNegativeValue
    },
    LegendIsGroup: function () {
      var e = this, t = e.Series.items[0].ChartType;
      return 1 === e.SeriesCount && e.SingleSeriesColored && (1 === t || 3 === t || 7 === t || 11 === t)
    },
    LegendRealShowValue: function () {
      var e = this;
      return e.LegendValueVisible && (!e.IsScatterGraph() || 9 === e.Series.items[0].ChartType)
    },
    LegendRealShowSum: function () {
      var e = this;
      return e.LegendShowSum && e.LegendRealShowValue()
    },
    LegendItemCount: function () {
      var e = this;
      return (e.LegendIsGroup() ? e.GroupCount : e.SeriesCount) + (e.LegendRealShowSum() ? 1 : 0)
    },
    LegendIsSumItem: function (e) {
      var t = this;
      return t.LegendIsGroup() ? e === t.GroupCount : e === t.SeriesCount
    },
    LegendItemLabel: function (e) {
      var t = this;
      return t.LegendIsSumItem(e) ? t.LegendSumLabelShow() : t.LegendIsGroup() ? t.GroupLabels[e] : t.getSeriesShowLabel(e)
    },
    LegendItemValueText: function (e) {
      var t = this, r = 0, o = t.graphSerieses[0];
      return t.LegendIsSumItem(e) ? r = t.GetTotalValue() : t.LegendIsGroup() ? r = t.Value(0, e) : (r = t.GetSeriesTotalValue(e), o = t.graphSerieses[e]), o.ValueFormatParser.format(r)
    },
    LegendSumLabelShow: function () {
      return this.LegendSumLabel || "合计"
    },
    Support3D: function () {
      return this.Series.items.every(function (e) {
        return e.Support3D()
      })
    },
    YAxisOfSeries: function (e) {
      var t = this;
      return e.ByY2Axis ? t.Y2Axis : t.YAxis
    },
    getSeriesShowLabel: function (e) {
      var t = this;
      return t.SeriesLabels[e] || (t.graphSerieses[e] ? t.graphSerieses[e].SeriesName : "")
    },
    getUsingTitleFont: function () {
      return this.TitleFont.UsingFont()
    },
    getUsingValueFont: function () {
      return this.ValueFont.UsingFont()
    },
    GetGraphFillColor: function (e) {
      var t, r, o, n, a = this, i = a.graphSerieses[e], l = a.FillColors ? a.FillColors.length : xt;
      return a.IsColorSingleBar() || i.FillColorAuto ? (t = Math.floor(e / l), r = e % l, o = a.FillColors ? a.FillColors[r] : A(vt[r], a.report.viewer.alpha.chartGraph), t > 0 && (n = V(o), o = R((n.r + 73 * r + 196 * t) % 255, (n.g + 197 * r + 120 * t) % 255, (n.b + 117 * r + 90 * t) % 255, n.a)), o) : i.FillColor
    },
    GetSeriesIndexByLabel: function (e, t) {
      var r = this, o = r.SeriesLabels.indexOf(e);
      return 0 > o && t && (o = +e, (!isNaN(o) || o >= r.SeriesCount) && (o = -1)), o
    },
    GetGroupIndexByLabel: function (e, t) {
      var r = this, o = r.GroupLabels.indexOf(e);
      return 0 > o && t && (o = +e, (!isNaN(o) || o >= r.GroupCount) && (o = -1)), o
    },
    GetDrawValueText: function (e, t) {
      var r = this.graphSerieses[e];
      return r.LabelTextBuilder ? r.LabelTextBuilder.generateChartDisplayText(e, t) : ""
    },
    GetGroupTotalValue: function (e, t) {
      var r, o = this, n = e.length, a = 0;
      if (!o.IsScatterGraph()) for (r = 0; n > r; r++) a += o.Value(e[r], t);
      return a
    },
    GetSeriesTotalValue: function (e) {
      var t, r, o = this, n = 0;
      if (o.IsScatterGraph()) for (r = o.ValueCount(e), t = 0; r > t; t++) n += o.Value(e, t).z; else for (t = 0; t < o.GroupCount; t++) n += o.Value(e, t);
      return n
    },
    GetTotalValue: function () {
      var e, t = this, r = 0;
      for (e = 0; e < t.SeriesCount; e++) r += t.GetSeriesTotalValue(e);
      return r
    },
    prepareValues: function () {
      for (var e = this, t = e.values.length; t++ < e.SeriesCount;) e.values.push([])
    },
    get AsChart() {
      return this
    },
    GroupLabel: function (e) {
      return this.GroupLabels[e]
    },
    SetGroupLabel: function (e, t) {
      this.GroupLabels[e] = t
    },
    SeriesLabel: function (e) {
      return this.SeriesLabels[e]
    },
    SetSeriesLabel: function (e, t) {
      this.SeriesLabels[e] = t;
    },
    Value: function (e, t) {
      var r = this;
      return r.prepareValues(), r.values[e][t]
    },
    SetValue: function (e, t, r) {
      var o = this;
      o.prepareValues(), o.values[e][t] = r
    },
    ValueCount: function (e) {
      var t = this;
      return t.prepareValues(), t.values[e].length
    },
    get FillColorCount() {
      var e = this;
      return e.FillColors ? e.FillColors.length : 0
    },
    getFillColor: function (t) {
      var r = this;
      return r.FillColors ? r.FillColors[t] : e
    },
    AddFillColor: function (e) {
      var t = this;
      t.FillColors && (t.FillColors = []), t.FillColors.push(e)
    },
    EmptyFillColors: function () {
      delete self.FillColors
    },
    LoadDataFromXML: function (e, t, r, o) {
      function n() {
        return l ? i.text : i.textContent
      }

      var a, i, l, s, u, c, d = this, h = 1, f = k(e);
      if (!dom) return 0;
      for (o && (d.GroupCount = 0, d.GroupLabels = []), r && (d.SeriesCount = 0, d.SeriesLabels = []), d.values = [], a = f.childNodes[0].firstChild, nodeText = a.hasOwnProperty("text"); a;) {
        if (i = a.firstChild, t && (s = n(), i = i.nextSibling, u = d.GetSeriesIndexByLabel(s, !r), 0 > u && r && (u = d.SeriesCount, d.SeriesCount++, d.SeriesLabels.push(s)), 0 > u)) throw 0;
        if (s = n(), i = i.nextSibling, c = d.GetGroupIndexByLabel(s, !o), 0 > c && o && (c = d.GroupCount, d.GroupCount++, d.GroupLabels.push(s)), 0 > c) throw 0;
        if (t) d.SetValue(u, c, +n() + d.Value(u, c)); else for (u = 0; i;) d.SetValue(u, c, +n() + d.Value(u, c)), u++, i = i.nextSibling;
        a = a.nextSibling
      }
      return h
    },
    DoLoadXYZDataFromXML: function (e, t, r) {
      function o() {
        return i ? a.text : a.textContent
      }

      var n, a, i, l, s, u, c, d, h = this, f = 1, p = k(e);
      if (!dom) return 0;
      for (t && (h.SeriesCount = 0, h.SeriesLabels = []), h.values = [], n = p.childNodes[0].firstChild, nodeText = n.hasOwnProperty("text"); n;) {
        if (a = n.firstChild, FirstSeries ? (l = o(), d = h.GetSeriesIndexByLabel(l, !t), 0 > d && t && (d = m_SeriesCount, ++m_SeriesCount, m_SeriesLabels[d] = l), a = a.nextSibling) : d = 0, 0 > d) throw 0;
        s = +o(), a = a.nextSibling, u = +o(), r || (a = a.nextSibling, c = +o()), h.AddXYZValue(d, s, u, c), n = n.nextSibling
      }
      return f
    },
    LoadXYDataFromXML: function (e, t) {
      return this.DoLoadXYZDataFromXML(e, t, 1)
    },
    LoadXYZDataFromXML: function (e, t) {
      return DoLoadXYZDataFromXML(e, t, 0)
    },
    AddXYZValue: function (e, t, r, o) {
      var n = this;
      n.prepareValues(), n.values[e].push({x: t, y: r, z: o})
    },
    EmptyValues: function () {
      var e = this;
      e.values = [], e.prepareValues()
    }
  }, E(Nt, Be), gr.dom.Report = et
}(), function (e, t) {
  "use strict";
  var r = gr.helper, o = gr.common, n = gr.const_, a = r.penStyleText, i = r.fontCSSText, l = r.pixelsToHtml,
    s = r.colorValue2Html, u = r.assignObject, c = r.compareObject, d = r.parseXML, h = r.xmlToReportDataJSON,
    f = o.HtmlStyles, p = function (e, t) {
      return e.Styles === t.Styles && (!e.Styles || c(e.Pen, t.Pen)) && e.Shadow === t.Shadow && (!e.Shadow || e.ShadowWidth === t.ShadowWidth && e.ShadowColor === t.ShadowColor)
    }, g = function (e, t) {
      return e.PaddingLeft === t.PaddingLeft && e.PaddingRight === t.PaddingRight && e.PaddingTop === t.PaddingTop && e.PaddingBottom === t.PaddingBottom
    }, m = function (e) {
      var t, r = this;
      e.FreeCell ? e.isSingleDockControl() && (t = e.Controls.items[0], t.TextFormat && (r.TextFormat = {}, u(r.TextFormat, t.TextFormat), r.TextFormat.ForeColor = t.ForeColor), r.PaddingLeft = t.PaddingLeft, r.PaddingRight = t.PaddingRight, r.PaddingTop = t.PaddingTop, r.PaddingBottom = t.PaddingBottom) : (r.TextFormat = {}, u(r.TextFormat, e.TextFormat), r.TextFormat.ForeColor = e.ForeColor, r.PaddingLeft = e.PaddingLeft, r.PaddingRight = e.PaddingRight, r.PaddingTop = e.PaddingTop, r.PaddingBottom = e.PaddingBottom), e.BorderCustom ? (r.border = {}, u(r.border, e.Border)) : r.ownerGrid = e.getOwnerGrid(), r.toFillBack = e.toFillBack(), r.toFillBack && (r.BackColor = e.BackColor)
    };
  m.prototype = {
    compareObject: function (e) {
      var t = this, r = e.toFillBack();
      return (t.TextFormat && !e.FreeCell && c(e.TextFormat, t.TextFormat) && t.TextFormat.ForeColor === e.ForeColor && g(t, e) || !t.TextFormat && !e) && (t.border && e.Border && p(e.Border, t.border) || !t.border && !e.Border && t.ownerGrid === e.getOwnerGrid()) && t.toFillBack === r && (!r || t.BackColor === e.BackColor)
    }, getStyleName: function () {
      return "-gr-cell" + this.index
    }, getStyles: function () {
      var e = this, t = new f, r = e.TextFormat;
      return r && (t.addTextFormat(r, 1), t.addObjectPadding(e)), e.border ? t.addBorder(e.border) : t.addCellBorder(e.ownerGrid), e.toFillBack && t.addBackColor(e.BackColor), t
    }
  };
  var C = function (e) {
    var t = this, r = e.getUsingFont();
    t.asCell = !!e.cell, e.TextFormat && (t.TextFormat = {}, u(t.TextFormat, e.TextFormat), t.TextFormat.ForeColor = e.ForeColor), t.PaddingLeft = e.PaddingLeft, t.PaddingRight = e.PaddingRight, t.PaddingTop = e.PaddingTop, t.PaddingBottom = e.PaddingBottom, t.border = {}, u(t.border, e.Border), t.toFillBack = e.toFillBack(), t.toFillBack && (t.BackColor = e.BackColor), t.textdecoration = {
      Underline: r.Underline,
      Strikethrough: r.Strikethrough
    }
  };
  C.prototype = {
    compareObject: function (e) {
      var t = this, r = e.getUsingFont(), o = e.toFillBack(), n = !!e.cell;
      return (e.TextFormat && t.TextFormat && c(e.TextFormat, t.TextFormat) && t.TextFormat.ForeColor === e.ForeColor || !e.TextFormat && !t.TextFormat) && g(t, e) && p(e.Border, t.border) && t.toFillBack === o && (!o || t.BackColor === e.BackColor) && t.asCell === n && t.textdecoration.Underline === r.Underline && t.textdecoration.Strikethrough === r.Strikethrough
    }, getStyleName: function () {
      return "-gr-ctrl" + this.index
    }, getStyles: function () {
      var e = this, t = new f, r = e.textdecoration;
      return !e.asCell && t.add("position", "absolute"), t.addObjectPadding(e), t.addBorder(e.border), e.TextFormat && t.addTextFormat(e.TextFormat, e.asCell), e.toFillBack && t.addBackColor(e.BackColor), (r.Underline || r.Strikethrough) && t.add("text-decoration", (r.Underline ? "underline" : "") + (r.Underline && r.Strikethrough ? " " : "") + (r.Strikethrough ? "line-through" : "")), t
    }
  };
  var b = function (e) {
    var t = this;
    t.Left = e.pxRect.left, t.Top = e.pxRect.top, t.Width = e.getContentWidth(), t.Height = e.getContentHeight()
  };
  b.prototype = {
    compareObject: function (e) {
      var t = this;
      return t.Left === e.pxRect.left && t.Top === e.pxRect.top && t.Width === e.getContentWidth() && t.Height === e.getContentHeight()
    }, getStyleName: function () {
      return "-gr-pos" + this.index
    }, getStyles: function () {
      var e = this, t = new f;
      return t.add("left", l(e.Left)), t.add("top", l(e.Top)), t.add("width", l(e.Width)), t.add("height", l(e.Height)), t
    }
  };
  var v = function (e) {
    var t = this, r = e.cells ? e : 0;
    t.section = e, t.isLastRow = 1, t.Height = e.pxHeight, r && (e = r.section, t.isLastRow = e.tableRows[e.tableRows.length - 1] === r), e.Font.font && (t.Font = {}, u(t.Font, e.Font.font)), e.owner.Header && (t.detailgrid = e.owner.owner), !e.toFillBack() || r && !t.detailgrid || (t.BackColor = e.BackColor)
  };
  v.prototype = {
    compareObject: function (e) {
      var t = this, r = e.cells ? e : 0, o = e.pxHeight, n = 1;
      r && (e = e.section, n = e.tableRows[e.tableRows.length - 1] === r);
      var a = e.toFillBack() && (!r || e.owner.Header), i = e.Font.font;
      return t.Height === o && (i && t.Font && c(i, t.Font) || !i && !t.Font) && (a && t.BackColor && t.BackColor === e.BackColor || !a && !t.BackColor) && (e.owner.Header && e.owner.owner === t.detailgrid || !e.owner.Header && !t.detailgrid) && t.isLastRow === n
    }, getStyleName: function () {
      return "-gr-section" + this.index
    }, getStyles: function () {
      var e = this, t = e.section, r = t.pctHeight, o = new f, n = e.detailgrid;
      return o.add("height", r ? r + "%" : l(e.Height)), (r || !t.cells && t.report.viewer.options.reportFitWidth) && o.add("width", "100%"), e.Font && (o.items = o.items.concat(x.prototype.getStyles.call(e.Font).items)), e.BackColor && o.addBackColor(e.BackColor), e.isLastRow && n && n.ShowRowLine && o.add("border-bottom", a(n.ColLinePen)), o
    }
  };
  var x = function (e) {
    var t = this;
    t.Size = e.Size, t.Bold = e.Bold, t.Italic = e.Italic, t.Name = e.Name
  };
  x.prototype = {
    compareObject: function (e) {
      var t = this;
      return t.Size === e.Size && t.Bold === e.Bold && t.Italic === e.Italic && t.Name === e.Name
    }, getStyleName: function () {
      return "-gr-fs" + this.index
    }, getStyles: function () {
      var e = new f;
      return e.add("font", i(this)), e
    }
  };
  var T = function (e) {
    this.htmlStyles = e
  };
  T.prototype = {
    getStyleName: function () {
      return "-gr-cs" + this.index
    }, getStyles: function () {
      return this.htmlStyles
    }
  };
  var y = function (e) {
    var t = this;
    t.items = [], t.classStyle = e
  };
  y.prototype = {
    toString: function () {
      var e = "";
      return this.items.forEach(function (t) {
        e += "." + t.getStyleName() + "{" + t.getStyles().getText() + "}\r\n"
      }), e
    }, select: function (e, t) {
      return this.selectItem(e, t).getStyleName()
    }, selectItem: function (e, t) {
      var r, o, n = this, a = n.items.length;
      if (t && t.compareObject(e)) return t;
      for (r = 0; a > r; r++) if (o = n.items[r], o.compareObject(e)) return o;
      return o = new n.classStyle(e), o.index = a, n.items.push(o), o
    }
  };
  var S = function (e, t, r, o) {
    var n = this;
    n.running = !1, n.generated = !1, n.events = {}, n.viewerHolderID = e, n.reportHTTP = {}, "string" == typeof t ? n.reportHTTP.url = t : u(n.reportHTTP, t), n.dataHTTP = {}, "string" == typeof r ? n.dataHTTP.url = r : u(n.dataHTTP, r), n.alpha = {
      background: .5,
      border: .8,
      stroke: .8,
      pen: .8,
      text: .8,
      chartGraph: 0,
      chartStroke: 1
    }, n.options = {
      controlPosition: gr.enum_.controlLayout.auto,
      reportFitWidth: !1,
      reportFitHeight: !1,
      detailgridResize: gr.enum_.detailgridResize.asDesign,
      singleChartFill: !0
    }, n.attachOptions(o), n.report = new gr.dom.Report(n)
  };
  S.prototype = {
    attachOptions: function (e) {
      var t = this;
      t.stop(), e && u(t.options, e)
    }, loadReport: function (e, r, o) {
      var n, a = this, i = e;
      if (r = r || r === t, o = o || o === t) {
        try {
          i.responseText !== t && (i = i.responseText), "string" == typeof i && (i = JSON.parse(i)), a.report.loadFromJSON(i), a.events.onReportLoaded && a.events.onReportLoaded(a)
        } catch (l) {
          o = 0, n = "解析报表模板"
        }
        o && (a.reportPrepared = !0, r && !a.waitData && a.generate())
      } else n = "获取报表模板";
      !o && a.displayError(n, e, 1)
    }, loadData: function (e, r, o) {
      var n, a = this, i = e;
      if (r = r || r === t, o = o || o === t) {
        try {
          if (i.responseText !== t && (i = i.responseText), "string" == typeof i) if ("{" === i.charAt(0)) i = JSON.parse(i); else {
            if (i = i.replace(/\r\n/g, ""), i = d(i), !i) throw 0;
            i = h(i)
          }
          a.tables = i
        } catch (l) {
          o = 0, n = "解析报表数据"
        }
        o && (a.dataPrepared = !0, r && a.generate())
      } else n = "获取报表数据";
      !o && a.displayError(n, e, 0)
    }, start: function () {
      var t = this;
      t.waitData && (t.waitData = 0), t.generated || t.running || (t.running = !0, t.events.onGenerateBegin && t.events.onGenerateBegin(t), t.reportPrepared = t.reportPrepared || !t.reportHTTP.url, t.dataPrepared = t.dataPrepared || !t.dataHTTP.url, t.reportPrepared && t.dataPrepared ? (t.events.onReportLoaded && t.events.onReportLoaded(t), !t.waitData && t.generate()) : (!t.reportPrepared && e.rubylong.ajax(t.reportHTTP, function (e, t) {
        this.loadReport(e, 1, t)
      }, t), !t.dataPrepared && e.rubylong.ajax(t.dataHTTP, function (e, t) {
        this.loadData(e, 1, t)
      }, t)))
    }, stop: function (e, r) {
      var o, n = this, a = n.report;
      return n.running ? !1 : (n.generated && (e || (a.Clear(), n.reportPrepared = !1), r || (n.tables = t, n.dataPrepared = !1), n.viewerHolderID && (o = document.getElementById(n.viewerHolderID), o && (o.innerHTML = "", DEBUG && (document.getElementById("htmlText") && (document.getElementById("htmlText").innerText = "htmlText"), document.getElementById("stylesText") && (document.getElementById("stylesText").innerText = "stylesText")))), a.unprepare(), n.generated = !1), !0)
    }, generate: function () {
      var t = this, o = t.report, n = document.getElementById(t.viewerHolderID);
      if (t.reportPrepared && t.dataPrepared) {
        try {
          n.innerHTML = "", DEBUG && (t.stylesText = ""), t.html = "", t.createStyles(), n.classList.add(t.selectFont2(o.Font.font)), 16777215 !== o.BackColor && (n.style.backgroundColor = s(o.BackColor)), t.html = o.generateHtml(), t.generateStyles(), n.innerHTML = t.html, o.toFillHolder && (n.style.height = "100%"), o.singleChart && (n.style.backgroundColor = s(o.singleChart.BackColor)), o.canvasControls && (o.prepareCanvas(), o.isDynamicSize ? (r.addEvent(e, "resize", function (e) {
            o.resizeCanvas()
          }, 1), o.resizeCanvas()) : o.renderCanvas()), DEBUG && (document.getElementById("htmlText") && (document.getElementById("htmlText").innerText = t.html), document.getElementById("stylesText") && (document.getElementById("stylesText").innerText = t.stylesText))
        } catch (a) {
          n.innerHTML = "生成报表时发生异常错误!<br />Error Code: " + a.number + "<br />Error Name: " + a.name + "<br />Error Message: " + a.message
        }
        t.running = !1, t.generated = !0, t.events.onGenerateEnd && t.events.onGenerateEnd(t)
      }
    }, createStyles: function () {
      var e = this;
      e.fontStyles = new y(x), e.controlStyles = new y(C), e.cellStyles = new y(m), e.sectionStyles = new y(v), e.positionStyles = new y(b), e.customStyles = new y(T)
    }, generateStyles: function () {
      var e = this, t = e.report.toFillHolder ? "html,body{height:100%;}\n*{margin:0;padding:0;}" : "",
        r = [t, e.fontStyles, e.positionStyles, e.sectionStyles, e.cellStyles, e.controlStyles, e.customStyles],
        o = r.join(""), a = document.getElementById(n.REPORT_STYLE_ID);
      a || (a = document.createElement("STYLE"), a.id = n.REPORT_STYLE_ID, document.head.appendChild(a)), a.innerHTML = o, DEBUG && (e.stylesText = o)
    }, addCustomStyle: function (e) {
      var t = this.customStyles.items, r = new T(e);
      return r.index = t.length, t.push(r), r
    }, selectCell: function (e) {
      return this.cellStyles.select(e, e.defaultStyle)
    }, selectCellItem: function (e) {
      return this.cellStyles.selectItem(e)
    }, selectControl: function (e) {
      return this.controlStyles.select(e, e.defaultStyle)
    }, selectControlItem: function (e) {
      return this.controlStyles.selectItem(e)
    }, selectSection: function (e) {
      return this.sectionStyles.select(e, e.defaultStyle)
    }, selectSectionItem: function (e) {
      return this.sectionStyles.selectItem(e)
    }, selectPosition: function (e) {
      return this.positionStyles.select(e, e.defaultPositionStyle)
    }, selectPositionItem: function (e) {
      return this.positionStyles.selectItem(e)
    }, selectFont: function (e, t) {
      return this.fontStyles.select(e, t)
    }, selectFont2: function (e) {
      return this.selectFontItem(e).getStyleName()
    }, selectFontItem: function (e) {
      return this.fontStyles.selectItem(e)
    }, displayError: function (e, r, o) {
      var a, i = this, l = r.responseText !== t, s = l ? o ? i.reportHTTP : i.dataHTTP : t,
        u = document.getElementById(i.viewerHolderID);
      a = '<div style="background-color:#bbffbb"><h3>' + e + "失败，锐浪HTML5报表(" + n.VERSION + ")</h3>", s && (a += '<div>URL: <a href="' + s.url + '">' + s.url + "</a></div>"), l ? (a += "<div>HTTP Status: " + r.status + "</div><div>HTTP Status Text: " + r.statusText + "</div>", r.responseText && (a += "<div>HTTP Response Text: <pre>" + r.responseText + "</pre></div>")) : a += "string" == typeof r ? "<div>Loaded Text: <pre>" + r + "</pre></div>" : "<div>Loaded Json Object: <pre>" + JSON.stringify(r) + "</pre></div>", a += "</div>", u.innerHTML = a
    }, get reportURL() {
      return this.reportHTTP.url
    }, set reportURL(e) {
      this.reportHTTP.url = e
    }, get dataURL() {
      return this.dataHTTP.url
    }, set dataURL(e) {
      this.dataHTTP.url = e
    }
  }, e.rubylong = {
    grhtml5: {
      controlLayout: gr.enum_.controlLayout,
      detailgridResize: gr.enum_.detailgridResize,
      barcodeURL: "/html5/General/Barcode.ashx",
      Viewer: S,
      insertReportViewer: function (e, t, r, o) {
        return new S(e, t, r, o)
      }
    }, ajax: function (e, t, r, o) {
      var n = new XMLHttpRequest;
      n.onreadystatechange = function () {
        4 == n.readyState && n.status > 0 && t.call(r, n, 200 == n.status)
      }, n.onerror = function () {
        t.call(r, n, 0)
      }, "string" == typeof e && (e = {url: e}), e.method || (e.method = o ? o : "GET"), n.open(e.method, e.url, !0), n.send(e.data)
    }
  }
}(window);
