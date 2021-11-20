const $ = new Env("晶彩看点看看赚");
const notify = $.isNode() ? require('./sendNotify') : '';
message = ""

let lookStartbody= $.isNode() ? (process.env.lookStartbody ? process.env.lookStartbody : "") : ($.getdata('lookStartbody') ? $.getdata('lookStartbody') : "")
let lookStartbodyArr = []
let lookStartbodys = ""

let jc_cookie= $.isNode() ? (process.env.jc_cookie ? process.env.jc_cookie : "") : ($.getdata('jc_cookie') ? $.getdata('jc_cookie') : "")
let jc_cookieArr = []
let jc_cookies = ""


const lookheader = {
    'device-platform': 'android',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': '1183',
    'Host': 'ant.xunsl.com'
}

const rewardheader={
    'device-platform': 'android',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': '1199',
    'Host': 'ant.xunsl.com'
}

const lookStartheader={
    'device-platform': 'android',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': '1197',
    'Host': 'ant.xunsl.com'
}


if (jc_cookie) {
    if (jc_cookie.indexOf("@") == -1 && jc_cookie.indexOf("@") == -1) {
        jc_cookieArr.push(jc_cookie)
    } else if (jc_cookie.indexOf("@") > -1) {
        jc_cookies = jc_cookie.split("@")
    } else if (process.env.jc_cookie && process.env.jc_cookie.indexOf('@') > -1) {
        jc_cookieArr = process.env.jc_cookie.split('@');
        console.log(`您选择的是用"@"隔开\n`)
    }
} else if($.isNode()){
    var fs = require("fs");
    jc_cookie = fs.readFileSync("jc_cookie.txt", "utf8");
    if (jc_cookie !== `undefined`) {
        jc_cookies = jc_cookie.split("\n");
    } else {
        $.msg($.name, '【提示】进入点击右下角"任务图标"，再跑一次脚本', '不知道说啥好', {
            "open-url": "给您劈个叉吧"
        });
        $.done()
    }
}
Object.keys(jc_cookies).forEach((item) => {
    if (jc_cookies[item] && !jc_cookies[item].startsWith("#")) {
        jc_cookieArr.push(jc_cookies[item])
    }
})
if (jclookStartbody) {
    if (jclookStartbody.indexOf("&") == -1) {
        jclookStartbodyArr.push(jclookStartbody)
    } else if (jclookStartbody.indexOf("&") > -1) {
        jclookStartbodys = jclookStartbody.split("&")
    } else if (process.env.jclookStartbody && process.env.jclookStartbody.indexOf('&') > -1) {
        jclookStartbodyArr = process.env.jclookStartbody.split('&');
        console.log(`您选择的是用"&"隔开\n`)
    }
} else if($.isNode()){
    var fs = require("fs");
    jclookStartbody = fs.readFileSync("jclookStartbody.txt", "utf8");
    if (jclookStartbody !== `undefined`) {
        jclookStartbodys = jclookStartbody.split("\n");
    } else {
        $.msg($.name, '【提示】请点击看看赚某一任务获取body', '不知道说啥好', {
            "open-url": "给您劈个叉吧"
        });
        $.done()
    }
}
Object.keys(jclookStartbodys).forEach((item) => {
    if (jclookStartbodys[item] && !jclookStartbodys[item].startsWith("#")) {
        jclookStartbodyArr.push(jclookStartbodys[item])
    }
})


!(async () => {
     if (typeof $request !== "undefined") {
     await getlookStartbody()
     $.done()
 }else{
    console.log(`共${lookStartbodyArr.length}个看看赚body`)
	        for (let k = 0; k < lookStartbodyArr.length; k++) {

                lookStartbody1 = lookStartbodyArr[k];
                console.log(`--------第 ${k + 1} 次看看赚激活执行中--------\n`)
                    await lookStart()
                await $.wait(1000);
                console.log("\n\n")
            }
            console.log(`共${jc_cookieArr.length}个cookie`)
	        for (let k = 0; k < jc_cookieArr.length; k++) {
                bodyVal = jc_cookieArr[k].split('&uid=')[0];
                var time1 = Date.parse( new Date() ).toString();
                time1 = time1.substr(0,10);

                cookie = bodyVal.replace(/zqkey=/, "cookie=")
                cookie_id = cookie.replace(/zqkey_id=/, "cookie_id=")
                jc_cookie1= cookie_id  +'&device_brand=xfdg&device_id=cc7dgdsgfsz83e&device_model=1gx&device_platform=android&device_type=android&inner_version=202107261526&mi=0&openudid=cc7dgdsgfsz83e&os_api=27&os_version=bdftgsdfga&phone_network=WIFI&phone_sim=1'+'&request_time=' + time1 +'&time=' + time1 +'&'+ bodyVal
                //console.log(`${jc_cookie1}`)
                console.log(`--------第 ${k + 1} 个账号看看赚上方宝箱奖励执行中--------\n`)
                for(let k = 0; k < 3; k++){
                    id = k.toString()
                    await openbox(id,jc_cookie1)
                    await $.wait(30000);

                }

                console.log("\n\n")

            }


function openbox(id,jc_cookie1,timeout=0) {
    return new Promise((resolve) => {
        let url = {
            url : 'https://ant.xunsl.com/WebApi/Nameless/getBoxReward?id='+ id + '&' + jc_cookie1,
            headers : {
    'Host': 'ant.xunsl.com',
     //'Referer': 'https://ant.xunsl.com/h5/20190527watchMoney/?' +jc_cookie1
     'Referer':'https://ant.xunsl.com/h5/20190527watchMoney/?keyword_wyq=woyaoq.com&access=WIFI&app-version=8.1.2&app_version=8.1.2&carrier=%E4%B8%AD%E5%9B%BD%E7%A7%BB%E5%8A%A8&channel=c1005&'+jc_cookie1},
            }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)
                if(result.status == 1){
                    console.log(result.data)
                }else{
                     console.log(result)
                }
            } catch (e) {
            } finally {
                resolve()
            }
            },timeout)
    })
}}
    })()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())








//获取看看赚激活body
async function getlookStartbody() {
if ($request.url.match(/\/ant.xunsl.com\/v5\/nameless\/adlickstart/)) {
          bodyVal=$request.body
          await $.wait(1100);
        if (lookStartbody) {
            if (lookStartbody.indexOf(bodyVal) > -1) {
                $.log("此看看赚任务请求已存在，本次跳过")
            } else if (lookStartbody.indexOf(bodyVal) == -1) {
                lookStartbodys = lookStartbody + "&" + bodyVal;
                $.setdata(lookStartbodys, 'lookStartbody');
                $.log(`${$.name}获取看看赚任务: 成功, lookStartbodys: ${bodyVal}`);
                bodys = lookStartbodys.split("&")
                $.msg($.name, "获取第" + bodys.length + "个看看赚任务请求: 成功🎉", ``)
            }
        } else {
            $.setdata(bodyVal, 'lookStartbody');
            $.log(`${$.name}获取看看赚任务: 成功, lookStartbodys: ${bodyVal}`);
            $.msg($.name, `获取第一个看看赚任务请求: 成功🎉`, ``)
        }
    }

  }
//看看赚激活
function lookStart(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url : 'https://ant.xunsl.com/v5/nameless/adlickstart.json',
            headers : lookStartheader,
            body : lookStartbody1,}//xsgbody,}
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)
                if(result.success === true ){
                    console.log('\n激活看看赚任务成功')
                    comstate = result.items.comtele_state
                    if(comstate === 1){
                        console.log('\n任务: '+ result.items.banner_id+'已完成，跳过')
                    }else {
                        $.log("任务开始，" + result.items.banner_id + result.message);
                        for (let j = 0; j < result.items.see_num - result.items.read_num; j++) {
                        $.log("任务执行第" + parseInt(j + 1) + "次")
                        await $.wait(8000);
                        await lookstart()
                    }
                        await $.wait(10000);
                    await reward()
                    }

                }else{
                    console.log('\n激活看看赚任务失败')
                    smbody = $.getdata('lookStartbody').replace(lookStartbody1 + "&", "");
                    $.setdata(smbody, 'lookStartbody');
                    console.log("该看看赚任务已自动删除")
                }
            } catch (e) {
            } finally {
                resolve()
            }
            },timeout)
    })
}
//看看赚阅读
function lookstart(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url : 'https://ant.xunsl.com/v5/nameless/bannerstatus.json',
            headers : lookheader,
            body : lookStartbody1,}//xsgbody,}
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)
                if(result.success === true ){
                    console.log('\n浏览看看赚文章成功')
                }else {
                    console.log('\n浏览看看赚文章失败')
                }

            } catch (e) {
            } finally {
                resolve()
            }
            },timeout)
    })
}
//看看赚奖励
function reward(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url : 'https://ant.xunsl.com/v5/nameless/adlickend.json',
            headers : rewardheader,
            body : lookStartbody1,}//xsgbody,}
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)
                if(result.items.score !== "undefined" ){
                    console.log('\n看看赚获得：'+result.items.score + '金币')
                }else{
                    console.log('\n领取奖励失败')
                }
            } catch (e) {
            } finally {
                resolve()
            }
            },timeout)
    })
}
