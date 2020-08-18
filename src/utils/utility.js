/**
 * 上半部分是项目特有，下半部分公用
 *  Created by LiveSW on 2016/10/19.
 */
import Vue from "vue";
import queryTemplate from "../api/queryTemplate";
import ums from "../api/ums";
import pms from "../api/pms";
import sys from "../api/sys";
import cont from "../api/cont";
import request from "@/utils/request";
export default {
    getTableHeight(that, cutheight, divname) {
        // cutheight灵活调整高度，divname 标头div动态高度,vue组件画面可能需要用nexttick来dom重新渲染
        // divname只是标识业务单据模式中减去表头的高度，统一用vue属性ref查找高度解决cj20190924
        if (cutheight === undefined) {
            return document.body.clientHeight - 190;
        } else if (divname === undefined) {
            return document.body.clientHeight - cutheight;
        } else {
            // console.log("sanggegaodu-----------");
            // console.log(that.$refs.contentheader.offsetHeight);
            // console.log(cutheight);
            // console.log(document.body.clientHeight);
            // return document.body.clientHeight - cutheight - $(divname).height();
            return document.body.clientHeight - cutheight - that.$refs.contentheader.offsetHeight;
        }
    },
    getContentCatTree(that, modelName) {
        return cont.getContentCatTree().then(res => {
            that[modelName] = res;
            return res;
        });
    },
    getCompanyTree(that, modelName) {
        return ums.getOrgTree().then(res => {
            that[modelName] = res;
            return res;
        });
    },
    getDepartTree(that, modelName) {
        return ums.getDepartTree().then(res => {
            that[modelName] = res;
            return res;
        });
    },
    getProductCategoryTree(that, modelName) {
        return pms.productCatWithAll().then(res => {
            that[modelName] = res;
            return res;
        });
    },
    printselect(that, printname, printvalue, grftype) {
        if (this.isnullorwhitespace(printvalue)) {
            if (that.selectrows.length === 0) {
                this.messagenotify(that, "请选择行");
                return;
            }
        }
        let printpk;
        let self = this;
        let querywhere = self.getwherelikelists("sys_def_list.code", printname);
        let defComp = Vue.component("defComp", {
            template: '<div><cselect title="模板" v-model="pkprint" :querylist="querylist" :length="1" querypk="14744e5a-f4c0-4f53-9e42-e3bbbf310ce1" @change="btnchange"></cselect></div>',
            store: that.$store,
            data() {
                return {
                    key: 1,
                    pkprint: "",
                    querylist: querywhere
                };
            },
            created: function() {},
            methods: {
                btnchange(val) {
                    printpk = val[0];
                }
            }
        });
        const h = that.$createElement;
        that
            .$msgbox({
                title: "打印模板选择",
                message: h(defComp, {
                    key: this.key++
                }),
                showCancelButton: true,
                confirmButtonText: "打印",
                cancelButtonText: "取消"
            })
            .then(action => {
                self.grfprint(that, printpk, printvalue, grftype);
            })
            .catch(action => {});
    },
    grfprint(that, printpk, printvalue, grftype) {
        if (this.isnullorwhitespace(printpk)) {
            this.messagenotify(that, "请选择打印模板");
            return;
        }
        if (this.isnullorwhitespace(printvalue)) {
            let ids = [];
            ids.push(printvalue);
            that.selectrows.forEach(function(row) {
                ids.push(row.pk);
            });
            printvalue = ids.join(","); // 供打印模板in查询用
            // console.log(printvalue);
        } else {
            printvalue = "'".concat(printvalue).concat("'");
        }
        let self = this;
        sys
            .templatePrintData({
                printPk: printpk,
                sqlValue: printvalue
            })
            .then(function(r) {
                let args = {
                    type: self.isnullorwhitespace(grftype) ? "preview" : grftype, // 设置不同的属性可以执行不同的任务，如：preview print pdf xls csv txt rtf img grd
                    reportid: "ytprint" // 这个参数不是必须的，只是用于回发消息标识报表身份
                };
                let report_url = "static/grf/".concat(r.grf.concat(".grf")).toString(); // 传递grf模板路径和文件名
                let data = JSON.stringify(r.printData);
                // console.log(report_url)
                // console.log(data)
                // 在通过gridreprt封装ajax方式获取报表模板后，调用webapp_ws_run进行报表生成
                webapp_ajax("GET", report_url, function(httpresponse, success) {
                    if (success) {
                        console.log(data);
                        webapp_ws_run(args, httpresponse.responseText, data);
                    } else {
                        self.message(that, "未找到打印模板");
                    }
                });
            })
            .catch(err => {
                self.message(that, err);
            });
    },
    gettableheight(that, cutheight, divname) {
        // cutheight灵活调整高度，divname 标头div动态高度,vue组件画面可能需要用nexttick来dom重新渲染
        if (cutheight === undefined) {
            return document.body.clientHeight - 190;
        } else if (divname === undefined) {
            return document.body.clientHeight - cutheight;
        } else {
            // console.log($(divname).height());
            return document.body.clientHeight - cutheight - $(divname).height();
        }
    },
    getdivheght(divname) {
        return $(divname).height();
    },
    setcontrolwidth(that, widthclass) {
        var overflowLength = 0;
        if (that.length > 1) {
            overflowLength = -(that.length * 17);
        }
        that.$el.getElementsByClassName(widthclass)[0].style.width = that.length * 300 - 110 + overflowLength + "px";
    },
    openpageadd(that, pk, ui, pkui, morewindow) {
        if (that.windowarray === undefined) {
            this.message(that, "请检查是否定义了windowarray");
        }
        if (morewindow === undefined || morewindow === false) {
            that.windowarray = []; // 是否多弹出多窗口
        }
        that.windowarray.push({
            pk: pk,
            ui: ui,
            pkui: pkui
        });
    },
    closepageadd(that, pk) {
        that.windowarray = that.windowarray.filter(w => w.pk !== pk);
    },
    commentui(that, ui, mountdiv) {
        // 用v-if解决new组件后，不能自动销毁
        ui = "<div class='page-controlstyle' v-if='destroystate'>" + ui + "</div>";
        var MyComponent = Vue.extend({
            template: ui,
            store: that.$store,
            data() {
                return that._data;
            }
        });
        // 必须new后挂载到元素上，不然会覆盖之前的动态组件
        mountdiv = this.isnullorwhitespace(mountdiv) ? "uicontent" : mountdiv;
        // 如果在界面渲染和加载则可以用下面语法挂载制定div的id
        // new MyComponent().$mount(mountdiv);
        let divui = new MyComponent().$mount();
        that.$refs[mountdiv].appendChild(divui.$el);
    },
    loadDynamicUI(that, uipk, mountdiv) {
        let self = this;
        let url = "PageContent/GetContent";
        let userdata = {
            pk: uipk
        };
        let cachepk = "querydatacache" + url + JSON.stringify(userdata).replace(/^\s+|\s+$/g, "");
        let data = window.localStorage.getItem(cachepk);
        if (data !== null) {
            self.commentui(that, JSON.parse(data).Value, mountdiv);
        } else {
            return request.post(url, userdata).then(function(r) {
                if (r.ok) {
                    let d = r.data;
                    if (!self.isnullorwhitespace(r.data)) {
                        window.localStorage.setItem(cachepk, JSON.stringify(d));
                    }
                    self.commentui(that, d.Value, mountdiv);
                } else {
                    self.message(that, r.message);
                    console.log(r.message);
                }
            });
        }
    },
    // 用于实时对界面输入html元素编码
    loadui(that, uipk, refdiv) {
        that.$nextTick(() => {
            // 从querydatacache复制改造
            // (that, url, userdata, datas)
            // u.querydatacachef(that, 'PageContent', 'GetContent', {pk: '572f2478-b435-4bdd-bc0b-a79600aeb993'}, this.compile(this, ui,refdiv), true)
            let self = this;
            let url = "PageContent/GetContent";
            let userdata = {
                pk: uipk
            };
            let cachepk = "querydatacache" + url + JSON.stringify(userdata).replace(/^\s+|\s+$/g, "");
            let data = window.localStorage.getItem(cachepk);
            if (data !== null) {
                // that[datas] = JSON.parse(data)
                self.compile(that, JSON.parse(data), refdiv);
            } else {
                let self = this;
                return request.post(url, userdata).then(function(r) {
                    if (r.ok) {
                        let d = r.data;
                        if (!self.isnullorwhitespace(r.data)) {
                            window.localStorage.setItem(cachepk, JSON.stringify(d));
                        }
                        self.compile(that, d, refdiv);
                        // that[datas] = d
                    } else {
                        self.message(that, r.message);
                        console.log(r.message);
                    }
                });
            }
        });
    },
    // 用于实时对界面输入html元素编码
    compile(that, ui, refdiv) {
        let $datasparent = that.$parent.$parent;
        if (this.isnullorwhitespace($datasparent.params)) {
            $datasparent = that.$parent;
            if (this.isnullorwhitespace($datasparent.params)) {
                $datasparent = that.$parent.$parent.$parent;
                if (this.isnullorwhitespace($datasparent.params)) {
                    this.message(that, "complie寻找承载页面出错");
                }
            }
        }
        let template = "";
        if (ui.Value === undefined) {
            template = ui;
        } else {
            template = ui.Value;
        }
        const newdiv = document.createElement("div");
        newdiv.setAttribute("class", "page-controlstyle");
        newdiv.innerHTML = template;
        let methods = {};
        Object.keys($datasparent).forEach(key => {
            const func = $datasparent[key];
            if (typeof func === "function" && (func.name === "boundFn" || func.name === "n")) {
                methods[key] = func;
            }
        });
        const res = Vue.compile(newdiv.outerHTML);
        console.log("res:");
        console.log(res);
        // 将功能页面的数据、方法重新带入渲染
        const component = new Vue({
            render: res.render,
            staticRenderFns: res.staticRenderFns,
            methods: methods,
            destroyed: function() {
                console.log("estroy input");
            },
            beforeDestroy: function() {
                console.log("newvue destroy");
            },
            created: function() {
                console.log("new input");
            },
            data() {
                return $datasparent._data;
            }
        });
        const divui = component.$mount();
        var v = this.isnullorwhitespace(refdiv) ? "maindiv" : refdiv;
        that.$refs[v].appendChild(divui.$el);
    },
    addtagview(that, title, compentname, tpParams) {
        let tagview = {
            meta: {
                title: title,
                tpParams: tpParams
            },
            path: compentname
        }
        that.$store.dispatch('tagsView/addView', tagview)
    },
    deltagview(that) {
        that.$store.dispatch('tagsView/delView', that.$store.state.tagsView.activeTagView)
    },
    message: function(that, message) {
        that.$message(message);
    },
    messagesuccess: function(that) {
        that.$message({
            message: "成功",
            type: "success",
            duration: 3000
        });
    },
    messagewarning: function(that, message) {
        that.$message({
            message: message,
            type: "warning",
            duration: 3000
        });
    },
    messagedelete: function(that) {
        return that.$confirm("确认删除数据?", "提示", {
            type: "warning"
        });
    },
    messageconfirm: function(that, message) {
        return that.$confirm("确认" + message + "?", "提示", {
            type: "warning"
        });
    },
    messagenotify: function(that, message, duration) {
        if (this.isnullorwhitespace(duration)) {
            duration = 6000;
        }
        that.$message({
            title: "提示",
            message: message,
            duration: duration
        });
    },
    getcolumnstyle(obj) {
        if (obj.style === "align") {
            if (obj.title === "金额" || obj.title === "收款" || obj.title === "产品奖励" || obj.title === "大单奖励") {
                return "right";
            }
        } else if (obj.style === "width") {
            if (obj.title === "地址" || obj.title === "仓库名称") {
                return 200;
            } else if (obj.title === "序号") {
                return 70;
            } else if (obj.title === "备注") {
                return 360;
            } else if (obj.title.indexOf("时间") > 0) {
                return 180;
            } else {
                return 240;
            }
        }
    },
    getpageparmas(that) {
        console.log(that.$store.getters.tpParams);
        let params = that.$store.getters.tpParams;
        // $(".menulist").css("height", document.body.offsetHeight - 120 + "px");
        // console.log("utility:" + params);
        return this.isnullorwhitespace(params) ? "" : params.split(",");
    },
    buttonpower: function(permissionId, activeUser, btnid) {
        let buttons = activeUser.buttonPowers;
        if (buttons === null) {
            return true;
        } else {
            return buttons.filter(btn => btn.permissionId === permissionId).filter(btn => btn.value === btnid).length !== 1;
        }
        return true;
    },
    querypagesize: function() {
        return 20;
    },
    pagebatchoperate(that, delRequest) {
        if (that.selectrows.length === 0) {
            this.messagenotify(that, "请选择行");
            return;
        }
        let sucrows = [];
        that.selectrows.forEach(function(row) {
            sucrows.push(row.pk);
        });

        return delRequest(sucrows.join(",")).then(function(res) {
            that.dataLoad();
            return res;
        });
    },
    deleteoperate(that, delRequest, pk) {
        return this.messagedelete(that)
            .then(() => {
                if (!this.isnullorwhitespace(pk)) {
                    let self = this;
                    delRequest(pk).then(function(res) {
                        that.mm = {};
                        that.winvisible = false;
                        that.wintitle = "";
                        that.dataLoad();
                        return res;
                    });
                } else {
                    this.pagebatchoperate(that, delRequest);
                }
            })
            .catch(e => {
                console.log(e);
            });
    },
    deletedetailoperate(that, ctname, billtype) {
        let u = this;
        u.messagedelete(that)
            .then(() => {
                request
                    .post(that, ctname + "/Delete", {
                        pk: that.mm["pk_" + ctname]
                    })
                    .then(function(r) {
                        if (r.ok) {
                            u.closetab(that);
                            u.addnewtab(that, billtype);
                        } else {
                            u.messagenotify(that, r.message);
                        }
                    });
            })
            .catch(e => {
                console.log(e);
            });
    },
    signoperate(that, ctname, pk) {
        if (!this.isnullorwhitespace(pk)) {
            let self = this;
            request
                .post(ctname + "/Sign", {
                    pk: pk
                })
                .then(function(r) {
                    if (r.ok) {
                        that.loaddata();
                        self.messagesuccess(that);
                    } else {
                        self.messagenotify(that, r.message);
                    }
                });
        } else {
            this.pagebatchoperate(that, ctname + "/Sign");
        }
    },
    signcanceloperate(that, ctname, pk) {
        if (!this.isnullorwhitespace(pk)) {
            let self = this;
            request
                .post(ctname + "/SignCancel", {
                    pk: pk
                })
                .then(function(r) {
                    if (r.ok) {
                        that.loaddata();
                        self.messagesuccess(that);
                    } else {
                        self.messagenotify(that, r.message);
                    }
                });
        } else {
            this.pagebatchoperate(that, ctname + "/SignCancel");
        }
    },
    saveoperate(that, ctname) {
        let self = this;
        request.post(ctname + "/Save", that.mm).then(function(r) {
            if (r.ok) {
                self.messagesuccess(that);
                that.winvisible = false;
                that.wintitle = "";
                that.btndataload(1);
            } else {
                self.messagenotify(that, r.message);
            }
        });
    },
    doSave(that, saveMethod) {
        let self = this;
        if (!that.mm) {
            self.messagenotify(that, "您的数据有错误，请联系管理员！");
        } else {
            return saveMethod(that.mm).then(res => {
                that.mm = {};
                that.dataLoad();
                if (that.winvisible) {
                    that.winvisible = false;
                }
                self.messagenotify(that, "恭喜您，保存成功！");
            });
        }
    },
    savedetailoperate(that, ctname) {
        let self = this;
        request.post(ctname + "/Save", that.mm).then(function(r) {
            if (r.ok) {
                that.params[0] = that.mm["pk_" + ctname];
                that.params[1] = "Query";
                that.loaddata();
                self.messagesuccess(that);
            } else {
                self.messagenotify(that, r.message);
            }
        });
    },
    dtselectvalue(that, row) {
        if (this.isnullorwhitespace(row)) {
            if (that.selectrows.length !== 1) {
                this.messagenotify(that, "请选择单行");
                return null;
            } else {
                row = that.selectrows[0];
                return that.selectrows[0];
            }
        } else {
            return row;
        }
    },
    // getdata: function(that, url, userdata, loading) {
    //   if (loading !== false) {
    //     // that.$store.commit("changeprogress", true);
    //   }
    //   if (this.isnullorwhitespace(userdata)) {
    //     userdata = {
    //       pk: "nodata"
    //     };
    //   }
    //   let self = this;
    //   let promise = new Promise((resolve, reject) => {});
    //   return promise;
    // },
    /**
     * 上半部分是项目特有，下半部分公用
     */
    newid() {
        let date = new Date();
        var guid = date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() + date.getMilliseconds().toString();
        let user = this.getuser();
        if (user !== null) {
            guid = guid + user.UserCode;
        }
        let lg = guid.length;
        if (lg >= 32) {
            guid = guid.substr(0, 32);
        } else {
            for (let i = 1; i <= 32 - lg; i++) {
                guid += Math.floor(Math.random() * 16.0).toString(16);
            }
        }
        return guid.substr(0, 8) + "-" + guid.substr(8, 4) + "-" + guid.substr(12, 4) + "-" + guid.substr(16, 4) + "-" + guid.substr(20);
    },
    getuser: function() {
        let user = window.localStorage.getItem("user");
        if (user != null) {
            return JSON.parse(user);
        } else {
            return null;
        }
    },
    openshowmodel: function(that, row) {
        if (!that.btnpower("btnedit")) {
            return;
        }
        row = this.dtselectvalue(that, row);
        if (!this.isnullorwhitespace(row)) {
            that.wintitle = "查看";
            that.winvisible = true;
            that.loaddata(row.pk);
        }
    },
    openeditmodel: function(that, getRequest, row) {
        if (!that.btnpower("btnedit")) {
            return;
        }
        row = this.dtselectvalue(that, row);
        if (!this.isnullorwhitespace(row)) {
            return this.getmodel(that, getRequest, row.pk, "编辑");
        }
    },
    openaddmodel: function(that, ctname) {
        // this.getmodel(that, ctname, '', 'mm', '新增')
        that.mm = {};
        that.winvisible = true;
        that.wintitle = "新增";
    },
    getmodel: function(that, getRequest, pk, wintitle) {
        if (!this.isnullorwhitespace(wintitle)) {
            that["winvisible"] = true;
            that["wintitle"] = wintitle;
        }
        pk = this.isnullorwhitespace(pk) ? "" : pk;
        return getRequest(pk).then(res => {
            that.mm = res;
            return res;
        });
    },
    getmodelf: function(that, ctname, pk, ufun, loading) {
        return this.querydataf(
            that,
            ctname + "/GetModel", {
                pk: this.isnullorwhitespace(pk) ? "" : pk
            },
            ufun,
            loading
        );
    },
    getmodelcache(that, ctname, pk, mm) {
        return this.querydatacache(
            that,
            ctname + "/GetModel", {
                pk: this.isnullorwhitespace(pk) ? "" : pk
            },
            mm
        );
    },
    getmodelcachef: function(getApi, pk, ufun) {
        return this.querydatacachef(getApi, pk, ufun);
    },
    querydata: function(that, url, userdata, datas) {
        request.post(url, userdata).then(res => {
            that[datas] = res;
        });
    },
    querydataf: function(that, url, userdata, ufun, loading) {
        let returnvalue = request.post(url, userdata);
        if (ufun === undefined) {
            return returnvalue;
        } else {
            let self = this;
            return returnvalue.then(function(r) {
                if (r.ok) {
                    ufun(r.data);
                } else {
                    ufun(null);
                    self.message(that, r.message);
                    console.log(r.message);
                }
            });
        }
    },
    queryDefList: function(that, reqParams, datas) {
        queryTemplate.queryDefList(reqParams).then(res => {
            that[datas] = res;
            return res;
        });
    },
    queryurldatacache: function(that, url, userdata, datas) {
        let self = this;
        let cachepk = "queryDataCache" + url + JSON.stringify(userdata).replace(/^\s+|\s+$/g, "");
        let data = window.localStorage.getItem(cachepk);
        if (data != null) {
            that[datas] = JSON.parse(data);
        } else {
            return request.post(url, userdata).then(function(r) {
                if (r.ok) {
                    let d = r.data;
                    if (!self.isNullOrWhiteSpace(r.data)) {
                        window.localStorage.setItem(cachepk, JSON.stringify(d));
                    }
                    that[datas] = d;
                } else {
                    self.message(that, r.message);
                    console.log(r.message);
                }
            });
        }
    },
    queryurldatacachef: function(that, url, userdata, ufun) {
        let cachepk = "queryDataCachef" + url + JSON.stringify(userdata).replace(/^\s+|\s+$/g, "");
        let data = window.localStorage.getItem(cachepk);
        if (data != null) {
            ufun(JSON.parse(data));
        } else {
            let self = this;
            return request.post(url, userdata).then(function(r) {
                if (r.ok) {
                    let d = r.data;
                    if (!self.isNullOrWhiteSpace(r.data)) {
                        window.localStorage.setItem(cachepk, JSON.stringify(d));
                    }
                    ufun(d);
                } else {
                    ufun(null);
                    self.message(that, r.message);
                    console.log(r.message);
                }
            });
        }
    },
    querydatacache: function(that, reqParams, datas) {
        let cachepk = "querydatacache/queryTemplate/queryAll/" + JSON.stringify(reqParams).replace(/^\s+|\s+$/g, "");
        console.log(' 缓存查找 ' + cachepk)
        let cacheData = window.localStorage.getItem(cachepk);
        console.log(cacheData)
        if (cacheData != null && cacheData.length !== 0) {
            //直接取本地缓存
            let objData = JSON.parse(cacheData);
            that[datas] = objData;
            return new Promise((resolve, reject) => {
                resolve(objData);
            });
        } else {
            console.log(' 数据库查找 ')
            //调用查询模板查询数据
            console.log(reqParams)
            return queryTemplate.queryAll(reqParams).then(res => {
                that[datas] = res;
                //保存结果至本地缓存
                window.localStorage.setItem(cachepk, JSON.stringify(res));
                return res;
            });
        }
    },
    querydatacachef: function(getApi, userdata, ufun) {
        let cachepk = "querydatacachef" + getApi + JSON.stringify(userdata).replace(/^\s+|\s+$/g, "");
        let data = window.localStorage.getItem(cachepk);
        if (data != null) {
            ufun(JSON.parse(data));
        } else {
            let self = this;
            return getApi(userdata).then(res => {
                if (!self.isnullorwhitespace(res)) {
                    window.localStorage.setItem(cachepk, JSON.stringify(res));
                }
                ufun(res);
                return res;
            });
        }
    },
    queryquery: function(that, querypk, datas) {
        return this.querywhere(that, querypk, null, 0, 0, datas);
    },
    querypage: function(that, querypk, datas) {
        if (this.isnullorwhitespace(datas)) {
            // 这个datas相对其他特殊，为空时候有默认值
            datas = "tabledata";
        }
        return this.querywhere(that, querypk, null, null, null, datas);
    },
    queryAll: function(querypk, querylist) {
        let resultPromise = queryTemplate.queryAll({
            pk: querypk,
            lists: querylist
        });
        return resultPromise;
    },
    querywhere: function(that, querypk, querylists, pagesize, pagenum, datas, loading) {
        let self = this;
        console.log("queryLists====")
        console.log(that["querylist"])
        if (!querylists) {
            querylists = that["querylist"];
        }
        if (!pagesize) {
            pagesize = this.querypagesize();
        }
        if (!pagenum) {
            pagenum = that["pagenum"];
        }
        let resultPromise = queryTemplate.query({
            pk: querypk,
            pagenum: pagenum,
            pagesize: pagesize,
            lists: querylists
        });
        if (datas === undefined) {
            return returnvalue;
        } else {
            resultPromise
                .then(res => {
                    that[datas] = res;
                })
                .catch(e => {
                    self.message(that, e);
                    return null;
                });
        }
    },
    querychart: function(that, querypk, querylists, charttype, doc, chart, id, stack, title, loading) {
        stack = stack === undefined ? "" : stack;
        let param = {
            pk: querypk,
            pagenum: 0,
            lists: querylists,
            type: charttype,
            stack: stack,
            title: title
        };
        let returnvalue = request.post("sys/queryChart", userdata);
        if (id === undefined || doc === undefined || chart === undefined) {
            return returnvalue;
        } else {
            let self = this;
            returnvalue.then(function(r) {
                let myid = doc.getElementById(id);
                if (myid === null) {
                    return null;
                }
                let myChart = chart.init(myid);
                myChart.setOption(r.data);
            });
            return null;
        }
    },
    querymodel: function(that, querypk, pk, mm) {
        let returnvalue = request.post("QueryQuery/Model", {
            pk: querypk,
            value: pk
        });
        if (mm === undefined) {
            return returnvalue;
        } else {
            let self = this;
            return returnvalue.then(function(r) {
                if (r.ok) {
                    that[mm] = r.data;
                } else {
                    self.message(that, r.message);
                    console.log(r.message);
                }
            });
        }
    },
    dateadd: function(date, day) {
        date.setDate(date.getDate() + day);
        return this.getdate(date);
    },
    datetimeadd: function(date, hour) {
        date.setHours(date.getHours() + hour);
        return this.gettime(date);
    },
    gettime: function(date) {
        if (date === undefined) {
            date = new Date();
        }
        var year = date.getFullYear();
        var month = date.getMonth();
        var data = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        var time = year + "-" + this.fnW(month + 1) + "-" + this.fnW(data) + " " + this.fnW(hours) + ":" + this.fnW(minute) + ":" + this.fnW(second);
        return time;
    },
    getdate: function(date) {
        if (date === undefined) {
            date = new Date();
        }
        var year = date.getFullYear();
        var month = date.getMonth();
        var data = date.getDate();
        var time = year + "-" + this.fnW(month + 1) + "-" + this.fnW(data);
        return time;
    },
    fnW: function(str) {
        return str > 9 ? str : "0" + str;
    },
    isnullorwhitespace: function(val) {
        if (val === undefined || val === null || val === "") {
            return true;
        } else {
            return false;
        }
        // if (!val) {
        //   return true
        // } else {
        //   return false
        // }
    },
    addwhere: function(that, field, value, querylist) {
        this.addwheres(that, "", "", field, "=", value, "", "", "", "", querylist);
    },
    addwherelike: function(that, field, value, querylist) {
        this.addwheres(that, "", "", field, "like", value, "", "", "", "", querylist);
    },
    addwhereparm: function(that, field, value, querylist) {
        this.addwheres(that, "", "", field, "=", value, "", "", "Y", "", querylist);
    },
    addwherefix: function(that, field, value, querylist) {
        this.addwheres(that, "", "", field, "=", value, "", "Y", "", "", querylist);
    },
    addwheres: function(that, lg, lp, field, condition, value, rp, fix, parm, need, querylist) {
        if (need === "Y" && this.isnullorwhitespace(value)) {
            // this.message(that, field + "条件必输字");
            return field + "条件必输";
        }
        if (this.isnullorwhitespace(querylist)) {
            querylist = "querylist";
        }
        if (value !== "" || condition.indexOf("null") >= 0 || fix === "Y" || parm === "Y") {
            that[querylist] = that[querylist].concat([{
                logic: lg,
                leftParenthesis: lp,
                field: field,
                condition: condition,
                value: value,
                rightParenthesis: rp,
                isFixParament: fix,
                parm: parm
            }]);
        }
    },
    getwherelikelists: function(field, value) {
        return this.getwhereslists("", "", field, "like", value, "", "", "");
    },
    getwhereslists: function(lg, lp, field, condition, value, rp, fix, parm) {
        if (value !== "" || condition.indexOf("null") >= 0 || fix === "Y" || parm === "Y") {
            return [{
                logic: lg,
                leftParenthesis: lp,
                field: field,
                condition: condition,
                value: value,
                rightParenthesis: rp,
                isFixParament: fix,
                parm: parm
            }];
        } else {
            return "";
        }
    },
    ischs: function(val) {
        var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
        // ：^[\u4e00-\u9fa5],{0,}$
        if (reg.test(val)) {
            return true;
        } else {
            return false;
        }
    },
    isnumorchar: function(val) {
        var reg = new RegExp("^\\w+$");
        if (reg.test(val)) {
            return true;
        } else {
            return false;
        }
    },
    isnum: function(val) {
        var reg = new RegExp("^[0-9]*$");
        if (reg.test(val)) {
            return true;
        } else {
            return false;
        }
    },
    ischar: function(val) {
        var reg = new RegExp("^[A-Za-z]+$");
        if (reg.test(val)) {
            return true;
        } else {
            return false;
        }
    },
    todecimal(val, ws) {
        if (this.isnullorwhitespace(ws)) {
            ws = 2;
        } else if (this.isnum(ws)) {
            if (ws < 1) {
                ws = 1;
            }
        } else {
            ws = 2;
        }
        if (isNaN(val)) {
            return 0;
        } else {
            return Math.round(val * Math.pow(10, ws)) / Math.pow(10, ws);
        }
    },
    toyn(val) {
        if (val === true) {
            return "Y";
        } else if (val === false) {
            return "N";
        } else {
            return "N";
        }
    },
    copyjson: function(val) {
        return JSON.parse(JSON.stringify(val));
    },
    listsum(lists, pkname) {
        let s = 0;
        lists.forEach(function(row, index) {
            s = s + row[pkname];
        });
        return s;
    },
    listadd(lists, list, pkname) {
        this.listremove(lists, list[this.isnullorwhitespace(pkname) ? "pk" : pkname], pkname);
        lists.push(list);
        return lists;
    },
    listvalue(lists, pk, pkname) {
        let ls = [];
        if (this.isnullorwhitespace(pkname)) {
            ls = lists.filter(c => c.pk === pk);
        } else {
            ls = lists.filter(c => c[pkname] === pk);
        }
        if (ls.length === 1) {
            return ls[0];
        } else {
            return null;
        }
    },
    listremove(lists, pk, pkname) {
        let self = this;
        let index = lists.findIndex(function(value, index, arr) {
            if (self.isnullorwhitespace(pkname)) {
                return value.pk === pk;
            } else {
                return value[pkname] === pk;
            }
        });
        if (index !== -1) {
            return lists.splice(index, 1);
        } else {
            return lists;
        }
    },
    arrayadd(arr, val) {
        if (this.isnullorwhitespace(arr)) {
            return [];
        }
        var index = arr.indexOf(val);
        if (index < 0) {
            return arr.push(val);
        }
        return arr;
    },
    arrayremove(arr, val) {
        if (this.isnullorwhitespace(arr)) {
            return [];
        }
        for (var i = 0; i < arr.length; i++) {
            var index = arr.indexOf(val);
            if (index > -1) {
                arr.splice(index, 1);
            } else {
                return arr;
            }
        }
    }
};