const jsname = '🔔🔔🔔🔔晶彩天气任务签到🔔🔔🔔🔔'
const $ = Env(jsname)
const notifyFlag = 1; //0为关闭通知，1为打开通知,默认为1
const logDebug = 0

const notify = $.isNode() ? require('./sendNotify') : '';
let notifyStr = ''

let rndtime = "" //毫秒
let httpResult //global buffer

let numBoxbody

let jctqWithdrawFlag =   ($.isNode() ? process.env.jctqWithdrawFlag   : $.getdata('jctqWithdrawFlag'))   || 1;
let jctqWithdraw =       ($.isNode() ? process.env.jctqWithdraw       : $.getdata('jctqWithdraw'))       || '';

let jctqQdBody = 'p=X9XQc_gCBVVg=aTDrO5aIwhCAKNZRuv2ueMhw7Zcg5h42a1Aw5MI2lGZvjmFuMQvZOj2o4UjxSd86l72fVMUiU_6sSpeZAxhRviY20ZC7mgGgueJIFjx5GX0ZToO3ebbCYHc_iyZ5MJNtcaKmh07nH-HAIks7fmcvGfxlK_6dWdF4KtPIAM9YR4TC0el5vbBkOjocpNT0OpLde5E518qmYEmj0qb5_G-gmWgZ2aaZTurqbaV7-q2rwkV4A-aNko1H0IRW_1QYzGEX80XpVgrDIVnx6WbaJAYwQmjWnHD1SNjD3i0bJsTDU9G0pPIll08pf3_LXuzwBNaIim0bS6rP7MJOB75d8yLgOBwRRMWmT3Kx_7prf1I5XFyCrQbBlsbaQ8acTv8y1vmEnyxkThRZWz4Rv2fVAZVHTZEWL_2b6wPAGZhmgiHX8iUhwtN5MyopTTOBxW9rskqKfOaxg_NMVfRdYraxWdP0dUvWv0-qqjZu4jP3UVLVOnIUGygc3N_UiFjJvU_0lDjFdaY9r_rKEojLY20wriXrls3uSnW6i4osyCNNI76oePFnuwOKTydsWsn1XMM8zCyfxr__Wp_ArXOllgjjzJid41eUgUw5Rf5M07NdJv-K3UnR4XfhOyWZGo3gCBIZeKsYkGJWfR9Zg9Uc7Dt-3EXkvRshT22DpN_Fagib_uICI1lN8lZFeIh7GebjRI3WWevO8Ut0l3qJONv4IRus9lI3zGZtu0Srn2aWIZp7Xpotklue2G8lZ394J2H4UFIjcSlTS0ZooPTqn7ysTWaV5f5rbB6QiX8utnilsxDzyf4bpuK2JHJuJW4VWb2EmONC7vjEOai83xy4tlpKGDTAx9Ffzz4HD2iAC34JSfyjZu9r2wAn4Y6uigOoYzPdOSeIFldjahZax8K0LHOCOP4jgZIglj6iqVOd8B8qfAJ-7XUlrk1X40jX4rRYBT958efvccRqIG7gcZVkRLeYpFjdwl80_q-gWXvpkjWPXJwYjp8KuEXnJiKsTquS9rIIGQ2wEgHXBVOzeWM8H92rSHIiHX0ODJWNt30Jgd6VnS1mdIeUFXGWHQx_QUzrUbLd2yy9xnfortMeJAIf2rldawyfEaII5VIjX48NFq2kBm8q1ivwdy2_bPjjhIfARWMsfHKFfyyZ0Asq_HUb0gkrTQcVSXFvW-edwH1IPnq0y82cuiCs21fwNHsVFAqlnmYMGwM8z2cF2TmsZp1Dn7e9PcdBNJ17zw==Ic'
let jctqSignDoubleBody = 'p=kGN6hU7ZYPOA=7uL9QbJxXLRkFZO09y8O5ejVM72EFwF4U98NzM8hdAo_Jo7CzNrfLbcrhsyzZyx_bUCdVCKLL0b_swyvTl5TQq0BenYh-375g29EtUw5OfODfDDsxmHeuFIvEqVuw5dDd3LQTFg7fZRr0kwuf_2ORjZJRdm4KAeXPYgxEEhp8Psbz4nkMIFNFMxzZYI1uXkK5-yucxqa3a_K0rtYoofx_ey2fSdfGfrIS25NPHuv-fzp2S75Pr5S6VxRVLtzbsXAgQuc9trVZpwgBURZXzudGvbqKOwNgUEy-5z8Ye_oIpjkOeVAjMGMfKeD0qNkl80xuJaFH8r3kqNOjYZ2KE5VZN_mXGdcLG2xN2rAaKakLuOcpRlJ55M_JgAvefWp8NLjaW48FnP0NYLiLiDmfYRW45BW-9OAw5EM4uJ1NMKg69MkYGhRSy4RsrzP6RJkIkv6RbAkYN59kDmGsERBB3uJTSvvNMjCsLe2iiFYOGsU3uaLM6qGC3voTdmFpXTVRTgB-I9-NnZmrecdf3KM20er7GPHe4AnRVB8kbSURf-rQgCI_CTLoonPBAsEsKNSdaOXEVzZCit-y_FgiQ74pWstskCFdm_XuDl9cXImvwyEHpyuRKaim5IZZcHLUjd1nKCJIOZ9GM1XKoRaovfm6rB38T1pzTxGSLSLGK4TABxCS6wphNtK8iZ6aRrkPdjXS9TExec_uda3Vz3BW-NP8G2ZPQDqarFRZFQGvkKJe-X3dzQsJID5J3JZjI-euRT7jjj1qXkuj30dC_S_Sub5FwcTa_JmcMqSObBu3LC-j0i9DC9ri_5FWUe1rcxPcNvVq9vt69rw42PbIk-LBTt92QFHwoHteJowa9dHnr6DmMTT8l9L98QsZyHywwuW0o9bLfaCNpLo-1nQXAe29HTERshcOitK6jWMlTUdShbHtQDKvzWrjnRrgEvyIQ1Uzx8KoYzTSOWIdJSu3mpv5s4Su0yQY1V0xVt7oprodCqd4WhyKMPKPtOhAoowo1-iCOlyJ0bZaMNrtWoq6foucEm3y3apETfVaM7pC3UcvZGmR6RbloqzzxCpuhUrh-kNZ508i33zKn08t033jPbhLQGhVnFFflTUaebbn7_v-QU-kjLOpFPaXE-O6vTeJd2XEVsJQp8td0HgKGeybAw_AahDStPrHCV6evp2mAPuqmztCP3GksKqlYpXBFJwIQseC7ytNBo24y9ezNiAYylCTxUxQUkLht_-BPsCUitey'
let jctqCookie = 'access=4G&app-version=8.3.8.1&app_name=jckd_app&app_version=8.3.8.1&carrier=%E4%B8%AD%E5%9B%BD%E7%94%B5%E4%BF%A1&channel=c1005&device_brand=SMARTISAN&device_id=51426980&device_model=SM919&device_platform=android&device_type=android&dpi=560&inner_version=202111161441&language=zh-CN&memory=5&mi=0&mobile_type=1&net_type=2&network_type=4G&openudid=6f9c21802e9e7d69&os_api=23&os_version=MXB48T%20release-keys&request_time=1637564766&resolution=1440x2560&rom_version=MXB48T%20release-keys&s_ad=GFsSOfXcbejQ%3DzsLToxWkbStrMy-l4aAFoKU_B0MeXK7mH&s_im=8pnoxxlgBSPY%3DftJU16u0felTt5IexLbZSA%3D%3D&sim=1&sm_device_id=202109291605277cd2e35c7911bcbb3f30a0fecc28a12b01b20b831a219744&storage=52.62&subv=1.2.2&uid=55242014&version_code=838&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FrWKwzXWxhXyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdl2qFooaZr6m6apqGcXY&zqkey_id=67a2b7bd2cca47bfdd05405d10af9fe6&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3MiOiI0RyIsImFwcC12ZXJzaW9uIjoiOC4zLjguMSIsImFwcF9uYW1lIjoiamNrZF9hcHAiLCJhcHBfdmVyc2lvbiI6IjguMy44LjEiLCJjYXJyaWVyIjoiJUU0JUI4JUFEJUU1JTlCJUJEJUU3JTk0JUI1JUU0JUJGJUExIiwiY2hhbm5lbCI6ImMxMDA1IiwiZGV2aWNlX2JyYW5kIjoiU01BUlRJU0FOIiwiZGV2aWNlX2lkIjoiNTE0MjY5ODAiLCJkZXZpY2VfbW9kZWwiOiJTTTkxOSIsImRldmljZV9wbGF0Zm9ybSI6ImFuZHJvaWQiLCJkZXZpY2VfdHlwZSI6ImFuZHJvaWQiLCJkcGkiOiI1NjAiLCJpbm5lcl92ZXJzaW9uIjoiMjAyMTExMTYxNDQxIiwibGFuZ3VhZ2UiOiJ6aC1DTiIsIm1lbW9yeSI6IjUiLCJtaSI6IjAiLCJtb2JpbGVfdHlwZSI6IjEiLCJuZXRfdHlwZSI6IjIiLCJuZXR3b3JrX3R5cGUiOiI0RyIsIm9wZW51ZGlkIjoiNmY5YzIxODAyZTllN2Q2OSIsIm9zX2FwaSI6IjIzIiwib3NfdmVyc2lvbiI6Ik1YQjQ4VCtyZWxlYXNlLWtleXMiLCJyZXF1ZXN0X3RpbWUiOiIxNjM3NTY0NzY2IiwicmVzb2x1dGlvbiI6IjE0NDB4MjU2MCIsInJvbV92ZXJzaW9uIjoiTVhCNDhUK3JlbGVhc2Uta2V5cyIsInNfYWQiOiJHRnNTT2ZYY2JlalElM0R6c0xUb3hXa2JTdHJNeS1sNGFBRm9LVV9CME1lWEs3bUgiLCJzX2ltIjoiOHBub3h4bGdCU1BZJTNEZnRKVTE2dTBmZWxUdDVJZXhMYlpTQSUzRCUzRCIsInNpbSI6IjEiLCJzbV9kZXZpY2VfaWQiOiIyMDIxMDkyOTE2MDUyNzdjZDJlMzVjNzkxMWJjYmIzZjMwYTBmZWNjMjhhMTJiMDFiMjBiODMxYTIxOTc0NCIsInN0b3JhZ2UiOiI1Mi42MiIsInN1YnYiOiIxLjIuMiIsInVpZCI6IjU1MjQyMDE0IiwidmVyc2lvbl9jb2RlIjoiODM4IiwienFrZXkiOiJNREF3TURBd01EQXdNSkNNcE4tdzA5V3RnNS1CYjM2ZWg2Q1BxSHVhbEllamw2LUZyV0t3elhXeGhYeXA0TERQeUdsOW9ucWtqM1pxWUphOFk4OThuYWpXc0p1cFpMRGRsMnFGb29hWnI2bTZhcHFHY1hZIiwienFrZXlfaWQiOiI2N2EyYjdiZDJjY2E0N2JmZGQwNTQwNWQxMGFmOWZlNiJ9.cSD8O3FX7XlGWPidJpV-JvF_2ttO5yqFCAgO4k-QM9X-g2HNqTLKH2XXqWJfB8q7Fa-_VghAidoGUhe-7wS31A'
let jctqBoxbody = ''

let jctqRewardBodyArr = []
let jctqSignDoubleBodyArr = []
let jctqWithdrawArr = []
let jctqCookieArr = []

let withdrawSuccess = 0

///////////////////////////////////////////////////////////////////

!(async () => {

    if(typeof $request !== "undefined")
    {
        $.msg(jsname+': 此脚本不做重写，请检查重写设置')
    }
    else
    {
        await checkEnv()
        
        numBoxbody = jctqRewardBodyArr.length
        console.log(`找到${numBoxbody}个签到/奖励body`)
        
        for(let i=0; i<numBoxbody; i++) {
            let rewardBody = jctqRewardBodyArr[i]
            await toGetReward(rewardBody,i)
            await $.wait(2000)
        }
        
        numBoxbody = jctqSignDoubleBodyArr.length
        console.log(`找到${numBoxbody}个签到翻倍body，观看32秒视频后开始领取下一个`)
        
        for(let i=0; i<numBoxbody; i++) {
            let rewardBody = jctqSignDoubleBodyArr[i]
            await $.wait(32000)
            await toDouble(rewardBody)
        }
        
        if(jctqWithdrawFlag > 0 && jctqWithdrawArr.length > 0) {
            numBoxbody = jctqWithdrawArr.length
            console.log(`找到${numBoxbody}个提现body`)
            
            for(let i=0; i<numBoxbody; i++) {
                let withBody = jctqWithdrawArr[i]
                await withdraw(withBody)
                await $.wait(1000)
            }
        } else if(jctqWithdrawFlag == 0) {
            console.log(`你设置了不自动提现`)
        } else if(jctqWithdrawArr.length == 0) {
            console.log(`没有找到提现body`)
        }
        
        numBoxbody = jctqCookieArr.length
        console.log(`找到${numBoxbody}个cookie`)
        
        for(let i=0; i<numBoxbody; i++) {
            notifyStr += `\n============= 账户${i+1} =============\n`
            await getBalance(jctqCookieArr[i])
            await $.wait(1000)
        }
        
        await showmsg()
        
    }
  

})()
.catch((e) => $.logErr(e))
.finally(() => $.done())

//通知
async function showmsg() {
    
    notifyBody = notifyStr
    
    if (notifyFlag != 1) {
        console.log(notifyBody);
    }

    if (notifyFlag == 1) {
        $.msg(notifyBody);
        if ($.isNode()){await notify.sendNotify($.name, notifyBody );}
    }
}

async function checkEnv() {
    
    if(jctqCookie) {
        if(jctqCookie.indexOf('@') > -1) {
            let jctqCookies = jctqCookie.split('@')
            for(let i=0; i<jctqCookies.length; i++) {
                jctqCookieArr.push(replaceCookie(jctqCookies[i]))
            }
        } else {
            
            jctqCookieArr.push(replaceCookie(jctqCookie))
        }
    }
    
    if(jctqWithdraw) {
        if(jctqWithdraw.indexOf('&') > -1) {
            let jctqWithdraws = jctqWithdraw.split('&')
            for(let i=0; i<jctqWithdraws.length; i++) {
                jctqWithdrawArr.push(jctqWithdraws[i])
            }
        } else {
            jctqWithdrawArr.push(jctqWithdraw)
        }
    }
    
    if(jctqQdBody) {
        if(jctqQdBody.indexOf('&') > -1) {
            let jctqQdBodyArr = jctqQdBody.split('&')
            for(let i=0; i<jctqQdBodyArr.length; i++) {
                jctqRewardBodyArr.push(jctqQdBodyArr[i])
            }
        } else {
            jctqRewardBodyArr.push(jctqQdBody)
        }
    }
    
    if(jctqBoxbody) {
        if(jctqBoxbody.indexOf('&') > -1) {
            let jctqBoxbodyArr = jctqBoxbody.split('&')
            for(let i=0; i<jctqBoxbodyArr.length; i++) {
                jctqRewardBodyArr.push(jctqBoxbodyArr[i])
            }
        } else {
            jctqRewardBodyArr.push(jctqBoxbody)
        }
    }
    
    if(jctqSignDoubleBody) {
        if(jctqSignDoubleBody.indexOf('&') > -1) {
            let jctqSignDoubleBodys = jctqSignDoubleBody.split('&')
            for(let i=0; i<jctqSignDoubleBodys.length; i++) {
                jctqSignDoubleBodyArr.push(jctqSignDoubleBodys[i])
            }
        } else {
            jctqSignDoubleBodyArr.push(jctqSignDoubleBody)
        }
    }
}

function replaceCookie(jctqCookieItem) {
    if(jctqCookieItem.indexOf('cookie=') == -1 && jctqCookieItem.indexOf('zqkey=') > -1) {
        jctqCookieItem = jctqCookieItem.replace(/zqkey=/, "cookie=")
    }
    if(jctqCookieItem.indexOf('cookie_id=') == -1 && jctqCookieItem.indexOf('zqkey_id=') > -1) {
        jctqCookieItem = jctqCookieItem.replace(/zqkey_id=/, "cookie_id=")
    }
    if(jctqCookieItem.indexOf('app_version=') == -1) {
        jctqCookieItem = 'app_version=8.3.7&' + jctqCookieItem
    }
    return jctqCookieItem
}

///////////////////////////////////////////////////////////////////

//领取奖励
async function toGetReward(rewardBody,idx) {
    let caller = printCaller()
    let url = 'https://tq.xunsl.com/v5/CommonReward/toGetReward.json'
    let urlObject = populatePostUrl(url,rewardBody)
    await httpPost(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.success == true) {
        if(result.items && result.items.score) {
            let signStr = ''
            if(result.items.title && result.items.title.indexOf('签到成功') > -1) signStr = '签到'
            console.log(`领取第${idx+1}个奖励成功，${signStr}获得${result.items.score}金币`)
        }
    } else {
        console.log(`领取第${idx+1}个奖励失败：${result.message}`)
    }
}

//签到翻倍
async function toDouble(rewardBody) {
    let caller = printCaller()
    let url = 'https://tq.xunsl.com/v5/CommonReward/toDouble.json'
    let urlObject = populatePostUrl(url,rewardBody)
    await httpPost(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.success == true) {
        if(result.items && result.items.score) {
            console.log(`签到翻倍成功，获得${result.items.score}金币`)
        }
    } else {
        console.log(`签到翻倍失败：${result.message}`)
    }
}

//今日收益
async function getBalance(cookie) {
    let caller = printCaller()
    let url = 'https://tq.xunsl.com/wap/user/balance?keyword_wyq=woyaoq.com&' + cookie
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.status == 0) {
        notifyStr += `【账号昵称】：r\n`
        notifyStr += `【金币总数】：${result.user.score}\n`
        notifyStr += `【今日收益】：${result.user.today_score}\n`
        for(let i=0; i<result.history.length; i++) {
            let rewardItem = result.history[i]
            if(rewardItem.newdate.indexOf('今日收益') > -1) {
                for(let j=0; j<rewardItem.group.length; j++) {
                    let groupItem = rewardItem.group[j]
                    notifyStr += `【${groupItem.name}】：${groupItem.money}\n`
                }
                break;
            }
        }
    } else {
        console.log(`查询今日收益失败：${result.message}`)
    }
}

//提现
async function withdraw(withBody) {
    let caller = printCaller()
    let url = 'https://tq.xunsl.com/v5/wechat/withdraw2.json '
    let urlObject = populatePostUrl(url,withBody)
    await httpPost(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.success == true) {
        console.log(`=======提现成功=======`)
        notifyStr += `=======提现成功=======\n`
    } else {
        console.log(`提现失败：${result.message}`)
    }
}

////////////////////////////////////////////////////////////////////
function populatePostUrl(url,reqBody){
    let rndtime = Math.floor(new Date().getTime()/1000)
    let urlObject = {
        url: url,
        headers: {
            'request_time' : rndtime,
            'Host' : 'tq.xunsl.com',
            'device-model' : 'VOG-AL10',
            'device-platform' : 'android',
            'Connection' : 'keep-alive',
            'app-type' : 'jcweather',
        },
        body: reqBody
    }
    return urlObject;
}

function populateGetUrl(url){
    let rndtime = Math.floor(new Date().getTime()/1000)
    let urlObject = {
        url: url,
        headers: {
            'request_time' : rndtime,
            'Host' : 'tq.xunsl.com',
            'device-model' : 'VOG-AL10',
            'device-platform' : 'android',
            'Connection' : 'keep-alive',
            'app-type' : 'jcweather',
        }
    }
    return urlObject;
}

async function httpPost(url,caller) {
    httpResult = null
    return new Promise((resolve) => {
        $.post(url, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(caller + ": post请求失败");
                    console.log(JSON.stringify(err));
                    $.logErr(err);
                } else {
                    if (safeGet(data)) {
                        httpResult = JSON.parse(data,caller);
                        if(logDebug) console.log(httpResult);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

async function httpGet(url,caller) {
    httpResult = null
    return new Promise((resolve) => {
        $.get(url, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(caller + ": get请求失败");
                    console.log(JSON.stringify(err));
                    $.logErr(err);
                } else {
                    if (safeGet(data,caller)) {
                        httpResult = JSON.parse(data);
                        if(logDebug) console.log(httpResult);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

function safeGet(data,caller) {
    try {
        if (typeof JSON.parse(data) == "object") {
            return true;
        } else {
            console.log(`Function ${caller}: 未知错误`);
            console.log(data)
        }
    } catch (e) {
        console.log(e);
        console.log(`Function ${caller}: 服务器访问数据为空，请检查自身设备网络情况`);
        return false;
    }
}

function printCaller(){
    return (new Error()).stack.split("\n")[2].trim().split(" ")[1]
}

function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
