const $ = new Env("");
const notify = $.isNode() ? require('./sendNotify') : '';
let bodyVal="",tsxx = "",zqbody="";

let zq_cookieArr= [
	"zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl7CFrWaxzYGyhbKp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdibOEjKCZsKnEapqGcXY&zqkey_id=1320f1f00f3eaaad9f4b2743be9915e7&uid=5928632"
]

!(async () => {
    await do_ydfb();
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })

async function do_ydfb(){
	
    console.log(`共${zq_cookieArr.length}个账号`)
    for (let k = 0; k < zq_cookieArr.length; k++) {
		//var time1 = Date.parse(new Date()).toString();
        //time1 = time1.substr(0, 10);
        //bodyVal = zq_cookieArr[k];
        //zqbody= bodyVal+'&request_time=' + time1;
        //zqbody='&device_id=55778744&device_model=SM919&device_platform=android&device_type=android&dpi=560&inner_version=202108181534&language=zh-CN&memory=5&mi=0&mobile_type=1&net_type=2&network_type=4G&openudid=6f9c21802e9e7d69&os_api=23&os_version=MXB48T%20release-keys&request_time=1636905848&resolution=1440x2560&rom_version=MXB48T%20release-keys&s_ad=aFbVGOYyXwIo%3D_bdT7wAf9shC-jFaSRThTaN0uhLjsnFpe&s_im=jYFg4QJ5A6eY%3DchJevhO619_tkVb8-aLNRQ%3D%3D&sim=1' +zqbody;
        console.log(`------------第 ${k + 1} 个账号申请阅读翻倍`)
		tsxx += "账号" + (k + 1) + "任务执行信息：";
		//tsxx += "=================================\n";
        await ydfb(zqbody)
    }
    $.msg($.name, "🏠阅读翻倍：", `${tsxx}`);
    if ($.isNode()) {
        await notify.sendNotify("🏠阅读翻倍", `${tsxx}`);
    }
}

function ydfb(zqbody,timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url : 'https://kandian.wkandian.com/v17/NewTask/setJoinTaskPromotion.json?access=4G&app-version=3.6.0&app_name=zqkd_app&app_version=3.6.0&carrier=%E4%B8%AD%E5%9B%BD%E7%94%B5%E4%BF%A1&channel=c1031&device_brand=SMARTISAN&device_id=55778744&device_model=SM919&device_platform=android&device_type=android&dpi=560&inner_version=202108181534&language=zh-CN&memory=5&mi=0&mobile_type=1&net_type=2&network_type=4G&openudid=6f9c21802e9e7d69&os_api=23&os_version=MXB48T%20release-keys&request_time=1636905848&resolution=1440x2560&rom_version=MXB48T%20release-keys&s_ad=aFbVGOYyXwIo%3D_bdT7wAf9shC-jFaSRThTaN0uhLjsnFpe&s_im=jYFg4QJ5A6eY%3DchJevhO619_tkVb8-aLNRQ%3D%3D&sim=1&sm_device_id=202109291605277cd2e35c7911bcbb3f30a0fecc28a12b01b20b831a219744&storage=52.62&subv=1.2.2&uid=59286327&version_code=63&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl7CFrWaxzYGyhbKp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdibOEjKCZsKnEapqGcXY&zqkey_id=1320f1f00f3eaaad9f4b2743be9915e7&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3MiOiI0RyIsImFwcC12ZXJzaW9uIjoiMy42LjAiLCJhcHBfbmFtZSI6Inpxa2RfYXBwIiwiYXBwX3ZlcnNpb24iOiIzLjYuMCIsImNhcnJpZXIiOiIlRTQlQjglQUQlRTUlOUIlQkQlRTclOTQlQjUlRTQlQkYlQTEiLCJjaGFubmVsIjoiYzEwMzEiLCJkZXZpY2VfYnJhbmQiOiJTTUFSVElTQU4iLCJkZXZpY2VfaWQiOiI1NTc3ODc0NCIsImRldmljZV9tb2RlbCI6IlNNOTE5IiwiZGV2aWNlX3BsYXRmb3JtIjoiYW5kcm9pZCIsImRldmljZV90eXBlIjoiYW5kcm9pZCIsImRwaSI6IjU2MCIsImlubmVyX3ZlcnNpb24iOiIyMDIxMDgxODE1MzQiLCJsYW5ndWFnZSI6InpoLUNOIiwibWVtb3J5IjoiNSIsIm1pIjoiMCIsIm1vYmlsZV90eXBlIjoiMSIsIm5ldF90eXBlIjoiMiIsIm5ldHdvcmtfdHlwZSI6IjRHIiwib3BlbnVkaWQiOiI2ZjljMjE4MDJlOWU3ZDY5Iiwib3NfYXBpIjoiMjMiLCJvc192ZXJzaW9uIjoiTVhCNDhUK3JlbGVhc2Uta2V5cyIsInJlcXVlc3RfdGltZSI6IjE2MzY5MDU4NDgiLCJyZXNvbHV0aW9uIjoiMTQ0MHgyNTYwIiwicm9tX3ZlcnNpb24iOiJNWEI0OFQrcmVsZWFzZS1rZXlzIiwic19hZCI6ImFGYlZHT1l5WHdJbyUzRF9iZFQ3d0FmOXNoQy1qRmFTUlRoVGFOMHVoTGpzbkZwZSIsInNfaW0iOiJqWUZnNFFKNUE2ZVklM0RjaEpldmhPNjE5X3RrVmI4LWFMTlJRJTNEJTNEIiwic2ltIjoiMSIsInNtX2RldmljZV9pZCI6IjIwMjEwOTI5MTYwNTI3N2NkMmUzNWM3OTExYmNiYjNmMzBhMGZlY2MyOGExMmIwMWIyMGI4MzFhMjE5NzQ0Iiwic3RvcmFnZSI6IjUyLjYyIiwic3VidiI6IjEuMi4yIiwidWlkIjoiNTkyODYzMjciLCJ2ZXJzaW9uX2NvZGUiOiI2MyIsInpxa2V5IjoiTURBd01EQXdNREF3TUpDTXBOLXcwOVd0ZzUtQmIzNmVoNkNQcUh1YWxJZWpsN0NGcldheHpZR3loYktwNExEUHlHbDlvbnFrajNacVlKYThZODk4bmFqV3NKdXBaTERkaWJPRWpLQ1pzS25FYXBxR2NYWSIsInpxa2V5X2lkIjoiMTMyMGYxZjAwZjNlYWFhZDlmNGIyNzQzYmU5OTE1ZTcifQ.XEi1PvV_0wLJv8DhneyibHF3woiR8l8lWGHEMcVvet04nUsQZr3xcjbGaziNoIlVkRe36YgSceQSsX5-YDF1jg',
            headers : {
				'Host': 'kandian.wkandian.com'
			},
        }
        $.get(url, async (err, resp, data) => {
            try {
                //console.log(data);
                const result = JSON.parse(data)
                if(result.success == true){
                    console.log('阅读翻倍:'+result.message);
                    tsxx += `🔺${result.message}\n`;
                }else{
                    console.log('翻倍失败:'+result.message);
					tsxx += `⛔️${result.message}\n`;
                }
            } catch (e) {
            } finally {
                resolve()
            }
            },timeout)
    })
}

function Env(t, e) {
    class s {
        constructor(t) {
            this.env = t
        }
        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            }
                : t;
            let s = this.get;
            return "POST" === e && (s = this.post),
                new Promise((e, i) => {
                    s.call(this, t, (t, s, r) => {
                        t ? i(t) : e(s)
                    })
                })
        }
        get(t) {
            return this.send.call(this.env, t)
        }
        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }
    return new class {
        constructor(t, e) {
            this.name = t,
                this.http = new s(this),
                this.data = null,
                this.dataFile = "box.dat",
                this.logs = [],
                this.isMute = !1,
                this.isNeedRewrite = !1,
                this.logSeparator = "\n",
                this.startTime = (new Date).getTime(),
                Object.assign(this, e),
                this.log(`\n${this.name}\u811a\u672c,\u5f00\u59cb\u6267\u884c:`)
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports
        }
        isQuanX() {
            return "undefined" != typeof $task
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }
        isLoon() {
            return "undefined" != typeof $loon
        }
        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }
        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }
        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i)
                try {
                    s = JSON.parse(this.getdata(t))
                } catch { }
            return s
        }
        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }
        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }
        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20,
                    r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"),
                    a = {
                        url: `http://${h}/v1/scripting/evaluate`,
                        body: {
                            script_text: t,
                            mock_type: "cron",
                            timeout: r
                        },
                        headers: {
                            "X-Key": o,
                            Accept: "*/*"
                        }
                    };
                this.post(a, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }
        loaddata() {
            if (!this.isNode())
                return {}; {
                this.fs = this.fs ? this.fs : require("fs"),
                    this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i)
                    return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }
        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"),
                    this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }
        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r)
                    return s;
            return r
        }
        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
                    r = s ? this.getval(s) : "";
                if (r)
                    try {
                        const t = JSON.parse(r);
                        e = t ? this.lodash_get(t, i, "") : e
                    } catch (t) {
                        e = ""
                    }
            }
            return e
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
                    o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t),
                        s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t),
                        s = this.setval(JSON.stringify(o), i)
                }
            } else
                s = this.setval(t, e);
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }
        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"),
                this.cktough = this.cktough ? this.cktough : require("tough-cookie"),
                this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar,
                t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }
        get(t, e = (() => { })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]),
                this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                    "X-Surge-Skip-Scripting": !1
                })), $httpClient.get(t, (t, s, i) => {
                    !t && s && (s.body = i, s.statusCode = s.status),
                        e(t, s, i)
                })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                    hints: !1
                })), $task.fetch(t).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                    try {
                        if (t.headers["set-cookie"]) {
                            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                            this.ckjar.setCookieSync(s, null),
                                e.cookieJar = this.ckjar
                        }
                    } catch (t) {
                        this.logErr(t)
                    }
                }).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                }))
        }
        post(t, e = (() => { })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon())
                this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                    "X-Surge-Skip-Scripting": !1
                })), $httpClient.post(t, (t, s, i) => {
                    !t && s && (s.body = i, s.statusCode = s.status),
                        e(t, s, i)
                });
            else if (this.isQuanX())
                t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                    hints: !1
                })), $task.fetch(t).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }
        time(t) {
            let e = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "H+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let s in e)
                new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
            return t
        }
        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t)
                    return t;
                if ("string" == typeof t)
                    return this.isLoon() ? t : this.isQuanX() ? {
                        "open-url": t
                    }
                        : this.isSurge() ? {
                            url: t
                        }
                            : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
            let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
            h.push(e),
                s && h.push(s),
                i && h.push(i),
                console.log(h.join("\n")),
                this.logs = this.logs.concat(h)
        }
        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]),
                console.log(t.join(this.logSeparator))
        }
        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `${this.name}\u811a\u672c, \u6267\u884c\u7ed3\u675f! \u7528\u65f6${s}\u79d2`),
                this.log(),
                (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }
        (t, e)
}
