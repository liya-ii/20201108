const $ = new Env('中青看点-基本任务');
const notify = $.isNode() ? require('./sendNotify') : '';

const hour = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).getHours();
const minute = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).getMinutes();

const TS = Math.round((new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000) / 1000);
let i = '',m = '',n = '',s = '';

const basicurl="https://kandian.wkandian.com/";
const YOUTH_HOST = "https://kd.youth.cn/WebApi/";
const basicApi = 'CommonReward/toGetReward.json';
const doubleSignApi = 'CommonReward/toDouble.json';
//const CryptoJS = require('./crypto-js')
//let basicApi = 'CommonReward/toGetReward.json',signBody = 'p=rXU6PBNNsHKc=ForGprwD-04dLgfLhY6RGeX-xYK9ZeSCC71w5svlfJomboBHefRzQ5Pg8NMNd5XdIerqkixI50mDIHNrzlwXJFsidSPMTMBoJCb_RcJeKb5iCgmKXmERExkbBL_L_kWjBIP0PaBXvjnRyviG33GBUoB2Z5i6nGLY0F8JccXkqvjelbXwjaoTe3z_DYzCV6Z62FAYPvTJ2iH05bLgQGrDFEv1haDpOTP1oMGRxrJdhN1HmGDDCDWBtLavarNx1s_mKIoTCQdEMrMQlJ9N_YBg3ruxehClZqFpaA7b7OynGbHzZFTQRLZE7D9FqfYVS8xcah4GZzvE7D5SGO-RWDb7rEwVZmT4SCfWt4WfLr0XPY24opz0bGLFOq6YhxAO96Ryeke7zF1t1Oh6h9SA0ngLuqMpOnOFwyVWtBkIYMxqNsdF_T0gwe8Cch967I5kxr6ApM2RV8eOtn0JEQf5NPLPxBbed4aUry3MfRWHtt3mm-xBNXof3_usqQeoMjox0H4SL3txx7BoEJQHasZDgKatmwpkgUspZR--G26CGdT9sx-sA4E4sH0QMPBl7O8OtAuVyw8IPJCUnU8Mrr05-PsW5v0Ei4Uicco1oDO11qptFdECPHI_qgDpEPP90y3xo3ezhHsVal_lVuifL5eP9m2ai47XV44sxPyBGx85NLDU85M4-e3ft4vDIr8idZ5fqRb5k3tVKfXde1-IDjcVpcWWKERawI0Bp3T29AJeG_qfGMNN-UattTGuRTnlSHsbJDva3DQ_V71klih3lIiwQGZo-Rl3AODtr95vE1HC8KmIZQ7NCgafZwzTr26zgT-I5tzsXAzNe1uqTh8EJraCZzI8iGyNaqJIxW1e0HbLhLnAwN-qrn1Vbk1dnmaReyV55lokgKP9hUlUzc54seaga6jeCI81Fv916e-n1ARvfIcYU4F70F0g5hSEgLTQsgLnjW1nLBRznVC1j_Hol2IMn7A-nXxYC5OoPwc96cWo9Id3XL7QFPn-ydoOv353m1zqGXwtGP0QMKIVBTH1Zdp-pM9hLm6igvhK68251vBIKJUBPjTYSHg-87ur9xGnMun5uF5FZVscMBIoyXQ_QdW4pDIH21Np9Y_JGAIaX6nPaDNw2uOd4L7Y0S0B_6m2W8fC9g2SNUrPF-ehSEuXUvwUjRccdEu8aA22NFVvpn91f75eCy1nTYZNbtZPXg==E';
//let doubleSignApi = 'CommonReward/toDouble.json',doubleSignBody = 'p=ycTMBiVxDAfc=-Z4t1n9xCHViTEixuAOYRqfylSrDl_tcUQepJ95w98Z5zE2fG97uGoVdkz8FuWpk4kUIsluOXqCO2of-hoinO2C-x-xemO6g43h4k1MM9g2ly5G7Ln5olyn1B9YmXv2ZZWlzlte0mkzEeWXQGOQ3zcIpm2mfRVOPWSo4Mh4bKht7l0Ow3yTv3UVbmon9M1fnz8uwtYzDlZ_YFZfiKgCXYOvIw02ITru1Af3g7GvZGRLR5oW8HwO33Xecefb7SAAnNCVxYgrD38UctoQ4p-WKpgFwxjsi6Gb8mkqNMNeMlsHIgSxB8BK7gnvyasfOJD1LsU0r8ipq-RTRz3qSdCkOu77dY83JIa4MudkVHY6gSq2HX5p_N1d17I3d2KvFlE4rAkAvKNhVPNvcwU-fNj-L7oVPau7qqLwhELys_WkTP5BvQi2Q3ZCW8TMeDbAozzJPJA1_g-v2k7gc9HLZ31N-Wrp_pl9bls1vjwkwT1MZdCzXXeA7tCVSYAWcSpPoD57loaAA5xcsnNiXUSQG5ACO7777dWoYFYh-lrM6Wvsrf3dqHtlAYf2pXFiZcTYGEGp1cILpyg5pDLfb34kuUyyOGWpjAz3daBZzkbBIwk2rUdDhHhZ8igaJZnxUDcpjHsmOZm6qZvreVcI1PACLhvbHF0QPLIXO7qHDEI-yEu5NJD9BQVdWuJcbLBnK_jEHjDHUiAPJFCEmQXDc63RjqGMVOB-0pChV-90JJB7YX_Y4ymruOo5zn6GPrXfNetGFa9zEZa-k4eUXg6i5CnXYcF00rV6ql8Cz-rR2hl-UD-0eJMRfp2UYUXUUOKLogYCUlmAbG1gHUqAI-SsyAgGnS0iWZ9i2_M3On19LsipayqaJXrjhv1HuJAdUXxUxpd-TBUtL-Rns9-8lQfBYNQs-uicglIz9QCSXvtP7ZTLj1CUTe-QXfF5-dy61WRsKqFSfltXOgEEnePfUlwj6TGSJDO51zRur6jDslRNIOS9dqVEbFIr2BDHoiPGIMRVg1Sv00_TaqxbpPB6lMc6NzQq1Hye9xqy8R_7bibFFva4wjLuUpvyHWBOQa6H9k8iJ1GUkgu1zdv91sFRED7tOPH9UsHTAP3Zlnq-lw7HEa3vOf3vLlA21-yQSEVWOkw1qmuseaWNSD0VqkI0oBnF_okjrQbcJjlJVVSzlnV7XoSI-cDjpgNFxH8vtvn_R6ruRLLeiq_gku';
let scApi = 'user/stay.json',scBody = 'p=bYdVi_XPUOzA=cAnw_9nbsumVjGd2xUAO-byDAKZoR7R7apJvLEYgmcV76n1BRVS_1c83XMSZqR1lyJ6Se0xRvmrhvEgiVWvJPS4O4KhKJCStXG0ZKwJqhksGL-dZRuTGRDgClcPHUFnvwhbCBo9b777ePy5O3HO3w-qSJ-Kz8KWlapqf4CqSVcabwL3I0jzxFCOOL90fghbGYAN6zqRE74Tw-du9ay1aHBE_mXEIRta9-UoAponuqNCMZZf4UFnS2rLxXQDCh-aYwai8EzwEgJrcrFEbhhpa6T5XV3cVVmY-7GAtIWNLVOuPmRcdImxIV5foEmerbCwT1ho_F_c4LJaH6e8W1UVxdt3K1ERjwSWArREDjcZ0r25Rvk0xXSCyl1F-f43CobVPZWfk15arZGk-tqfYTHuPqFcBEE_sY8jMX2I3XieOxeBBom56B_RR0ThWVhPMPJgSxQ7KonqO1vceOgpX0eLKf2NICY_AvJiG5PxKugd4_Ap6a1NqhGZFPEnw-tKiXwftqYD-2MRC5hakAa_pz7C1m_vlgfsxfdI_ayYZaaZT_TcE-4NCNTVrRwoPH1gin4gN1pb2xveAHmaPqgvA74xXput5C89wKjTOkpaf5zpYRPpVrjkbxV1oZaoQ7x7RN9oFoOM9GqKwvL_Uo7yNowWn6BOj66Fss22HDmO9OJpQbY5ywni3giKmMo_ewGzbzEM9TGdYllXkNt-GCoMXnRAhJmpFSVIA6tpVzW6G7BdvQYwLcsGbJ6kf-BVusYrBLViGJEu-AcKJHqd8iGe3TH7JPmNpyAHAAfDsDeGKYTmKswyKRLMPcIF3eBEyagkrNP9QFBBQUQaVeX08ZhmPRCBCrpXKUsZffYL74drMhiyanb3PfNX4MPxXDp_BKWG5Ib-N5Or5k6F71V1qn8z3tz3cNGBw7oRc23R2HWQyIGAnVOq0tNpcIV1kWIxrq7ZsFACCpGjts857ZHHkI7H1eoOVnhzOvx07EGH_6rzAZmm88Ra6PY1CLe4RWs3gVTrH--JQsIiURqnR7ultQZgDSw6GKbC-cyo3z4jHABXEj6PdU_pXh7c-KkEkGsOdWXHxMyFozcNXWr2AaokkJgeGppRFPXCCDAfVaD4qy_yDH_kY77tlRfATphHEdSR0-p-G2DQ5yGP0LArYy-o=HJ';
    



let usernmae="",zqjsons="",filename="";
let tsxx="";	//推送信息
let ts=true;	//推送开关
let ishbfx=false;	//是否打开火爆分享，默认关闭
let otherts=false;	//重要信息会自动打开推送，初始化状态是关闭

let zqtoken="",zqcookie="",zquid="",zqsign="",zquuid="",rewardbody="",cookie="",cookie_id="",syhburl="",fxbody="";
let urlArr=[],qdArr=[],boxArr=[];
let rotaryscore=0, rotarytimes=0,doublerotary=0;
//let jsonArr=[];

//json文件，改成你的名字
const zqbody = require("./Cohc-2-1/Task.json");

console.log(`您使用的是json文件模式\n`)
zqcookie = zqbody.zqcookie;

//提现设置
let cash=zqbody.cash?zqbody.cash:10;
let cashUrl=zqbody.withdraw;

//任务栏小任务，和看看赚一起跑，这里不需要了
//taskbodyArr=zqbody.taskbodys;

//cookie参数处理
username=zqbody.user;
var params =UrlParamHash(zqcookie);
zquid=params["uid"];
zqkey=params["zqkey"];
zqkey_id=params["zqkey_id"];
zquuid=params["uuid"];
zqtoken = params["zqtoken"];
cookie=zqkey;
cookie_id=zqkey_id;

//时长body
//scBody=zqbody.staybody;
//首页右上角视频奖励body，要单独抓
syspbody=zqbody.syspbody;

//时间戳
var time1 = Date.parse( new Date() ).toString();
time1 = time1.substr(0,10);

//cookie，翻倍，签到会用到，不然提示未登录
let rotarbody = "cookie="+ cookie + '&cookie_id=' + cookie_id;


//可选功能，火爆分享，签到，收奖励宝箱
//火爆分享链接
urlArr=zqbody.shareurl;
//签到的宝箱
qdArr=zqbody.qdbodys;
//其他宝箱
boxArr=zqbody.boxbodys;


!(async () => {

	
if ($.isNode()){
			tsxx+="【"+username+"】本次任务记录：\n";
			await taskall();	
}else {
	console.log(`暂不支持v2p变量，请使用json文件\n`);
}
})()
    .catch((e) => {
      $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
      $.done();
    })

function UrlParamHash(url) {
    var params = [], h;
	//var hash = url.slice(url.indexOf("?") + 1).split('&');

    var hash = url.split('&');
    for (var i = 0; i < hash.length; i++) {
        h = hash[i].split("=");
        params.push(h[0]);
        params[h[0]] = h[1];
    }
    return params;
}
 

async function taskall(){
   //八点之后开启报名打开
	if(hour >=9 && hour <12){
		await punchCard()
	};
	if ( hour>20 && hour<22){
		await endCard();
	}else if (hour >4&&hour<8){
		await endCard();
	}
	await $.wait(1000);
	//开签到宝箱
	if (hour == 5){
		await do_openbox(qdArr);
	}
	if (minute < 30) {		
		//console.log(`token：${zqbody.syhbbody}`)
		rewardbody=zqbody.syhbbody;
		await do_toGetReward(rewardbody); //首页红包common，每小时一次
		await $.wait(1000);
		if (hour % 2 == 0){
		await do_open_invitefriendbox();	//邀请宝箱，每2小时一次
		}
	}
	//7:30-10点为zqyd阅读时间，跳过
	if ((hour == 7) || (hour == 10) || (hour == 12) || (hour == 15) || (hour == 16) || (hour == 17)){
		await do_sysp(); //首页看视频领青豆，每天6次
	}
	if (hour == 10 && minute < 40) {
		rewardtype=5;
		await do_sc_prize2(rewardtype);	//领5分钟60分钟阅读奖励50+400
		rewardtype=60;
		await do_sc_prize2(rewardtype);	//领5分钟60分钟阅读奖励50+400
	}
	await $.wait(1000);
	
	//火爆转发3次(早中晚)
	if ((hour ==6) || (hour == 12) || (hour == 18)) {
        await do_wzlist();
        await $.wait(4000);
        await do_sharejl();	   
	}

	//分享文章，被好友阅读后每篇500
	if (ishbfx){
	if (hour == 7 || hour==12 || hour ==18) {
		//await do_hbfx();
	}
	}
	
	//收看看赚任务完成宝箱
	if (hour == 16 ) {
		await do_openlookbox();
	}
	await do_tasklist();
	
	await $.wait(1000)
	//抽奖赚
	if ((hour == 10) || (hour == 11) || (hour >= 15&&hour <23)) {	
	for ( k=0;k<10;k++){
		await $.wait(5000);
		await rotary();
		if (rotaryres.status == 0) {
		   rotarynum = ` 转盘${rotaryres.msg}🎉`;
		   break
		} else if(rotaryres.status == 1){
			rotaryscore += rotaryres.data.score
			rotarytimes = rotaryres.data.remainTurn
			//放这里检查是否到开宝箱条件
			await rotaryCheck();
		}
		if (rotaryres.status == 1 && rotaryres.data.score > 0 && rotaryres.data.doubleMultiple > 0) {
			console.log(`等待28秒开始抽奖翻倍 ---`)
			await $.wait(28300)					
			await TurnDouble();
			if (Doubleres.status == 1) {
				doublerotary += Doubleres.data.score
			}
		}
	}
	//打印开宝箱统计信息
	if (rotaryres.status == 1) {
		console.log(`\n转盘抽奖+${rotaryscore}个青豆 剩余${rotaryres.data.remainTurn}次`);
	}else{
		console.log(`\n转盘抽奖已用完`);
	}
	if (rotaryres.status !== 0&&rotaryres.data.doubleNum !== 0){
		console.log(`转盘双倍+${doublerotary}青豆 剩余${rotaryres.data.doubleNum}次\n`);
	}else{
		console.log(`转盘双倍已用完\n`);
	}
	//再检查一遍是否满足开宝箱
	await rotaryCheck();
	}
	
	if (hour == 21){
		await do_openbox(boxArr);
	}	
	await do_userdata();
	//推送信息
	if (ts){
		if ((hour==12) || (hour==23)){
			if ($.isNode()){await notify.sendNotify($.name, tsxx );}
		}else if (otherts){
			if ($.isNode()){
				await notify.sendNotify($.name, tsxx );
				otherts=false;	//推送完成，重置为初始化状态
			}			
		}
		
	}		
}
//tasklist
async function do_tasklist() {
  return new Promise(resolve => {
    $.get(tasklist(), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
			const result = JSON.parse(unescape(data));
			//console.log(`tasklist：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`\n获取日常任务列表成功，开始检测任务状态 --- `)

				//每日任务
				daily = result.items.daily
				//console.log(daily)
				for (let m = 0;m < daily.length; m++){
					$.title = daily[m].title
					if(daily[m].status == 2){
						console.log(`\n任务 ${$.title} ${daily[m].but}！`)
					} else if (daily[m].status == 0){
						console.log(`\n任务 ${$.title} 未完成，等待完成 ---`)
						
						if ($.title === `阅读60分钟` && (hour>12) ) {							
							for (let n = 0; n < 3; n++){
								await do_sc(scBody);
								await $.wait(60000)
							}
						}
						if ($.title === `看福利视频`) {							
							await do_flsp();
						}
						if ($.title === `转发文章`) {
							//await do_fx();
							if (ishbfx){console.log(`火爆分享任务已开启，请耐心等待自动完成 ---`);}
							else {console.log(`火爆分享任务未开启，请手动完成分享到朋友圈 ---`);}
						}
					} 
				}
			} else {
				console.log(`签获取任务列表失败:${JSON.stringify(result)}\n`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

//快速赚钱-开宝箱
async function do_open_invitefriendbox() {
    return new Promise((resolve) => {
        setTimeout(() => {
        var header = {
            'Accept-Encoding': `gzip, deflate, br`,
            'Accept': `*/*`,
            'Connection': `keep-alive`,
            'Referer': `https://kd.youth.cn/h5/20190410invitefriend/?`+rotarbody+'&request_time=' + time1+'&time=' + time1,
            'Host': `kd.youth.cn`,
				'Origin':'https://kd.youth.cn',
            'User-Agent': `Mozilla/5.0 (Linux; Android 11; Mi 10 Pro Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/90.0.4430.210 Mobile Safari/537.36`,
            'Accept-Language': `zh-cn`,
        };

        let url = {
                url: 'https://kd.youth.cn/WebApi/invite/openHourRed',
                headers: header,
				body : rotarbody
            };
        $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
				console.log(`boxinfo：${JSON.stringify(result)}\n`);
                console.log(`收取邀请宝箱：${result.msg}` )
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        });

        return 0;
        }, 1000)
    })
}

//批量开宝箱
async function do_openbox(bodyArr) {
	let num=bodyArr.length;
	if ( num > 0) {
		console.log(`共${num}个奖励body`)
		for (let k = 0; k < num; k++) {
			//let boxVal = bodyArr[k];
			console.log(`--------开始收取第 ${k + 1} 次奖励\n`);
			do_toGetReward(bodyArr[k]);
			await $.wait(1000);
		}
	}	
}

//看看赚完成任务宝箱
async function do_openlookbox() {

   console.log(`--------收取看看赚任务完成奖励`);
	for(let k = 0; k < 3; k++){		
		await openlookbox(k.toString());
		await $.wait(30000);
	}
}
function openlookbox(id) {
    return new Promise((resolve, reject) => {
        const time = new Date().getTime();
        const url = {
            url: `${basicurl}WebApi/Nameless/getBoxReward?id=`+id+'&'+rotarbody,
            headers : {
				'Host': 'kandian.wkandian.com',
				'Referer':'https://kandian.wkandian.com/h5/20190527watchMoney/?keyword_wyq=woyaoq.com&access=WIFI&app-version=8.1.2&app_version=8.1.2&carrier=%E4%B8%AD%E5%9B%BD%E7%A7%BB%E5%8A%A8&channel=c1005&'+rotarbody,
            }
        }
        $.get(url, (error, response, data) => {
               const result = JSON.parse(data)
                if(result.status == 1){
                    console.log(`🏠获取：${result.data}青豆`);
                }else{
                     console.log(result.msg)
                }		
        resolve();
        })
    })
}

//火爆转发早中晚共3次
//获取文章id
function do_wzlist(timeout = 5000) {
    return new Promise((resolve) => {
        let url = {
            url : 'https://kandian.wkandian.com/WebApi/ArticleTop/listsNewTag',
            headers : {'Host': 'kandian.wkandian.com'},
            body : rotarbody +'&tag=12',
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)
                if(result.data.items !== "undefined" ){
                    wzid = result.data.items[0].id;
                    console.log(`文章id：${result.data.items[0].id}`);
		            await $.wait(3000);
                    await sharewz(wzid)

                }else{
                    console.log(result)
                }
            } catch (e) {
            } finally {
                resolve()
            }
            },timeout)
    })
}

function sharewz(wzid,timeout=0) {
    return new Promise((resolve) => {
        let url = {
            url : 'https://kandian.wkandian.com/WebApi/ShareNew/getShareArticleReward',
            headers : {
				'Content-Type': 'application/x-www-form-urlencoded',
				//'Content-Length': (zq_cookie1+ '&article_id='+wzid).length.toString(),
				'Host': 'kandian.wkandian.com',
				'Referer': 'https://kandian.wkandian.com/h5/20200612makeMoney/?' +rotarbody
			},
            body :  rotarbody + '&article_id='+wzid,
			}
			$.post(url, async (err, resp, data) => {
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
}
//分享的返回数据
function do_sharejl(timeout=0) {
    return new Promise((resolve) => {
        if(hour >= 5 && hour <=10 ){
            reward = 'one'
        }else if(hour >= 11 && hour <=16){
            reward = 'two'
        }else if(hour >= 17 && hour <=22){
            reward = 'three'
        }
        let url = {
            url : 'https://kandian.wkandian.com/WebApi/ShareNew/execExtractTask',
            headers : {
				'Content-Type': 'application/x-www-form-urlencoded',
				//'Content-Length': (zq_cookie1+ '&action=beread_extra_reward_'+ reward).length.toString(),
				'Host': 'kandian.wkandian.com',
				'Referer': 'https://kandian.wkandian.com/h5/20200612makeMoney/?' +rotarbody
			},
            body :  rotarbody + '&action=beread_extra_reward_'+ reward,
			}
			$.post(url, async (err, resp, data) => {
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
}

//火爆分享
async function do_hbfx() {
		let times=randomNum(2,4);
		console.log("本次随机助力次数:" + times);
		tsxx += `【火爆分享】${hour}点${minute}分开始分享助力${times}次\n`;
		otherts=true;
		
		$.log(`您共提供${urlArr.length}条分享链接`)
		for(let i=0;i<times;i++){
			let waittime = randomNum(50000,200000);
			console.log(`随机延迟${waittime/1000}秒`);
			console.log(`分享第${i+1}次`);
			let num=urlArr.length;
			if ( num > 0) {
				let m = Math.floor(Math.random()*(num));	
				$thisurl=urlArr[m];
				$.log(`-------------------------\n本次使用第${m+1}条分享链接`)
			}

			if($thisurl.indexOf("script.baertt.com/count2/callback") > -1) {
				var url = $thisurl;
				var s_si = url.match(/si=(.*?)&/)[1];
				//开始分享
				await postShareInfoa(url,s_si, i)
				await $.wait(waittime);		
			} else {
				console.log("️url链接错误");
			}
		}
}

//提现
function do_withdraw(zq_withdraw1,timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url : 'https://kandian.wkandian.com/v5/wechat/withdraw2.json',
            headers : {
            'request_time': time1,
            'device-platform': 'android' ,
            //'app-version': '3.6.0',
            'Content-Type': 'application/x-www-form-urlencoded',
            //'Content-Length': zq_withdraw1.length.toString(),
            'Host': 'kandian.wkandian.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/3.12.2'
            },
            body : zq_withdraw1,}
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)
            if (result.error_code == 0) {
				//提现成功自动打开推送
				otherts=true;
				console.log(result)
                console.log(`自动提现提现${zq_cash}元成功\n`)
                tsxx += `\n自动提现提现${zq_cash}元成功\n`
                //$.msg($.name,$.sub,$.desc)
            } else {
                console.log(`自动提现失败:${result.items.text}`);
				tsxx += `\n自动提现失败:${result.items.text}\n`;
            }
            } catch (e) {
            } finally {
                resolve()
            }
            },timeout)
    })
}

//打卡报名

function punchCard(timeout = 0) {
	//$.log(rotarbody);
    return new Promise((resolve, reject) => {
       let url = {
            url : 'https://kd.youth.cn/WebApi/PunchCard/signUp?'+rotarbody ,
            headers : {'Host': 'kd.youth.cn',
            'Content-Length': '0',
             'Referer':' https://kd.youth.cn/h5/20190603cardactive/?'+'keyword_wyq=woyaoq.com&access=4G&app-version=3.5.5&carrier=%E4%B8%AD%E5%9B%BD%E7%A7%BB%E5%8A%A8&channel=c1005&'+rotarbody
            },
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)
                if(result.code === 1 ){
                    signup1 = result.data.signup_num
                    //console.log(result)
                    console.log(`报名 ${result.msg} \n`)
                    console.log(`瓜分人数 ${signup1}\n`)
                    console.log(`瓜分金额 ${result.data.jackpot_money}`)
                    $.message = `中青打卡赚钱报名:${result.msg}\n 瓜分人数:${signup1} \n 瓜分金额:${result.data.jackpot_money}元`
                    tsxx += `中青打卡赚钱报名:${result.msg}\n 瓜分人数:${signup1} \n 瓜分金额:${result.data.jackpot_money}元\n`;
					otherts=true;
                }else{
                    tsxx +=  `结果:${result.msg}\n`;
                    console.log( `打卡:${result.msg}`);
                }
            } catch (e) {
            } finally {
                resolve()
            }
            },timeout)
    })
}

//结束打卡
function endCard() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

		let url = {
            url : 'https://kd.youth.cn/WebApi/PunchCard/doCard?'+rotarbody,
            headers : {'Host': 'kd.youth.cn',
            'Content-Length': '0',
             'Referer':' https://kd.youth.cn/h5/20190603cardactive/?'+'keyword_wyq=woyaoq.com&access=4G&app-version=8.1.2&app_version=8.1.2&carrier=%E4%B8%AD%E5%9B%BD%E7%A7%BB%E5%8A%A8&channel=c1005&'+rotarbody 
            },
        }
        $.post(url, async (err, resp, data) => {
                punchcardend = JSON.parse(data)
                if (punchcardend.code == 1) {
                    tsxx += `早起打卡${punchcardend.data.card_time}${punchcardend.msg}✅\n`;
					otherts=true;
                   $.log("早起打卡成功，打卡时间:"+`${punchcardend.data.card_time}`);
                   await $.wait(1000);
                   //await Cardshare();
                } else if (punchcardend.code == 0) {
                    // TODO .不在打卡时间范围内
                    //tsxx += `早起打卡${punchcardend.msg}\n`
                   $.log("不在打卡时间范围内")
                }
                resolve()
            })
        },s)
    })
}
//打卡分享
function Cardshare() {
  return new Promise((resolve, reject) =>{
		let url = {
            url : 'https://kd.youth.cn/WebApi/PunchCard/shareStart?'+rotarbody,
            headers : {'Host': 'kd.youth.cn',
            'Content-Length': '0',
             'Referer':' https://kd.youth.cn/h5/20190603cardactive/?'+'keyword_wyq=woyaoq.com&access=4G&app-version=8.1.2&app_version=8.1.2&carrier=%E4%B8%AD%E5%9B%BD%E7%A7%BB%E5%8A%A8&channel=c1005&'+rotarbody 
            },
        }
		$.post(url, async (err, resp, data) => {
      sharestart = JSON.parse(data);
      //tsxx += `打卡分享${sharestart.msg}\n`
      if (sharestart.code == 1) {
       // $.post(kdHost('WebApi/PunchCard/shareEnd?'), (error, response, data) =>{
		let url2={
			url: 'https://kd.youth.cn/WebApi/PunchCard/shareEnd?'+`&${zquid}`,
			headers:{
			'Accept': '*/*',
			'Accept-Encoding': 'gzip, deflate, br',
			'Referer': 'https://kd.youth.cn/',
			'Host': 'kd.youth.cn',
			'User-Agent': 'okhttp/3.12.2',
			'X-Requested-With': 'XMLHttpRequest'
			},
			//body: body,
		}
		$.post(url2, async (err, resp, data) => {
          shareres = JSON.parse(data);
          if (shareres.code == 1) {
            tsxx += ` + ${shareres.data.score}青豆\n`
          } else {
            //tsxx += `打卡分享${shareres.msg}\n`
            //$.log(`${shareres.msg}`)
          }
          resolve()
        })
      }
    })
  })
}

function rotary() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const time = new Date().getTime()
            const url = {
                url: `https://kd.youth.cn/WebApi/RotaryTable/turnRotary?_=${time}`,
				headers:{
					'Referer':basicurl+'html/rotaryTable/index.html?'+zqcookie+"&"+rotarbody
				},
                body: rotarbody
            }
            $.post(url,async (error, response, data) => {
                try{
                      rotaryres = JSON.parse(data)
			if (rotaryres.status == 1 && rotaryres.data.score > 0) {
				console.log(`\n抽奖成功，获得 ${rotaryres.data.score} 青豆！`)
				console.log(`剩余可抽奖次数：${rotaryres.data.remainTurn} 次`)
			} else if (rotaryres.status == 1 && rotaryres.data.score == 0){
			  console.log(`\n抽奖失败,获得 ${rotaryres.data.score} 青豆！`)
			  console.log(`剩余可抽奖次数：${rotaryres.data.remainTurn} 次`)
			} else {
				console.log(`\n抽奖失败：${JSON.stringify(rotaryres)}`)
			}
                     } catch (e) {
                   $.logErr(e, resp);
                   } finally {
                  resolve()
                }
            })
        }, s);
    })
}

//转盘双倍奖励
function TurnDouble() {
    //const rotarbody = "cookie="+ cookie + '&cookie_id=' + cookie_id;

    let parameter = rotarbody+'&request_time='+time1 ;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          
            const url = {
                url: `https://kd.youth.cn/WebApi/RotaryTable/toTurnDouble?_=${time1}`,
				headers:{
					//'request_time':time,
					'Content-Type': `application/x-www-form-urlencoded`,
					'Host': `kandian.wkandian.com`,
					'Connection': `Keep-Alive`,
					'Accept-Encoding': `gzip`,
					'User-Agent': `okhttp/3.12.2`,
					'Referer' : 'https://kd.youth.cn/html/rotaryTable/index.html?'+parameter
				},
				body: rotarbody
			}
            $.post(url, (error, response, data) => { 
              try{
                Doubleres = JSON.parse(data)
				if (Doubleres.status==1) {
					console.log(`抽奖翻倍成功，获得 ${Doubleres.data.doubleNum} 青豆！`)
				} else {
					console.log(`抽奖翻倍失败:${JSON.stringify(Doubleres)}`)
				}                     
				} catch (e) {
                   $.logErr(e, resp);
                   } finally {
                  resolve()
                }
             resolve()
            })
        },s)
    })
}

//转盘宝箱判断
function rotaryCheck() {
    return new Promise(async(resolve) => {
		//console.log(`抽奖数据：${JSON.stringify(rotaryres)}\n`);
        if (rotaryres.status != 1) {
            return resolve();
        }
        let i = 0;
        while (i <= 3) {
            if (100 - rotaryres.data.remainTurn >= rotaryres.data.chestOpen[i].times&&rotaryres.data.chestOpen[i].received==0) {
                await runRotary(i + 1)
            }
            i++;
        }
      resolve();
    })
}


//开启宝箱
function runRotary(index) {
	
    return new Promise((resolve, reject) => {
        const time = new Date().getTime();
        const url = {
            url: `${basicurl}WebApi/RotaryTable/chestReward?_=${time}`,
            //url : 'https://kandian.wkandian.com/WebApi/RotaryTable/chestReward?_='+ time,
            headers : {'Host': 'kandian.wkandian.com',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; 16 X Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/65.0.3325.109 Mobile Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept-Language': 'zh-CN,en-US;q=0.9',
                'Accept-Encoding': 'gzip, deflate',
                //'Content-Length': (rotarbody +'&num='+index).length.toString(),
                'Referer':'https://kandian.wkandian.com/html/rotaryTable/index.html?'+rotarbody+'&request_time=' + time1
            },
            body:rotarbody + '&num=' + index,
        }
        $.post(url, (error, response, data) => {
			//$.log(unescape(data));
			
			if (safeGet(data)){
			const rotaryresp = JSON.parse(data);
			console.log(`抽奖数据：${JSON.stringify(rotaryresp.score)}\n`)
            if (rotaryresp.status == 1) {
                console.log(`转盘宝箱${index}+${rotaryresp.data.score}个青豆\n`);
            }else{
                if(rotaryresp.code == "10010"){
                    console.log(`转盘宝箱${index}+今日抽奖完成\n`);
                }
            }
			}
            resolve();
        })
    })
}

 
function do_userdata() {
  return new Promise(resolve => {
	
	url=`${basicurl}v15/user/userdata.json?`+zqcookie;
    $.get(userdata(url), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(unescape(data));
			//console.log(`userdata：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`=========================`)
				tsxx += `=========================\n`;
				console.log(`用户名：${zqbody.user} `);
				tsxx += `用户名：${zqbody.user} \n`;
				console.log(`青豆总数：${result.items.score} `);
				tsxx += `青豆总数：${result.items.score} \n`;
				//自动提现
				if (result.items.score > parseInt(cash)*10000) {
					console.log(`当前金额：${result.items.score/10000} 大于设置的提现金额：${cash}---开始尝试提现`);
					await do_withdraw(cashUrl);
				}
				console.log(`今日获得青豆：${result.items.today_score} \n明日签到青豆：${result.items.sign_reward_score}`)
				tsxx += `今日签到青豆：${result.items.sign_status} \n明日签到青豆：${result.items.sign_reward_score}\n`;
				if (result.items.sign_status == 0) {
					console.log(`今日签到状态：未签到。去执行签到 ---`)
				} else if (result.items.sign_status == 1) {
					console.log(`今日签到状态：已签到`)
				}				
				if (result.items.is_login==1){
					console.log(`登入状态：已登入`)
				}
				console.log(`今日获得青豆：${result.items.today_score}`);
				tsxx += `今日获得青豆：${result.items.today_score}\n`;
				console.log(`账户余额：${result.items.money_str}`);
				tsxx += `账户余额：${result.items.money_str}\n`;
			} else {
				console.log(`个人信息获取失败:${JSON.stringify(result)}\n`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

 //时段奖励，每10分钟一次，限6次。
 function do_sdjl() {
  return new Promise(resolve => {
    $.post(basic(basicApi,sdBody), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`时段奖励结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`时段奖励成功，获得 ${result.items.score} 青豆！ `)
			} else {
				console.log(`时段奖励失败:${JSON.stringify(result)}\n`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

 //刷时长
 function do_sc(scbody) {
  return new Promise(resolve => {
    $.post(basic(scApi,scBody), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			console.log(`刷时长结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`刷入时长成功！`)
			} else {
				console.log(`刷入时长失败:${JSON.stringify(result)}`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
/*
 //分享
 function do_fx() {
  return new Promise(resolve => {
    $.post(fx(), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`分享结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`分享1次成功！`)
			} else {
				console.log(`分享失败:${JSON.stringify(result)}`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
//share
function fx() {
  return {
	//https://kandian.wkandian.com/v6/article/share/put.json  任务栏火爆转发一篇文章到微信，返回 
    url: `${basicurl}v6/article/share/put.json`,
    headers: {
		'Token': 'ca7cf664ea4f59a2c42af91f3429e3ea',
		'Content-Type': `application/x-www-form-urlencoded`,
		'Host': `kandian.wkandian.com`,
		'Connection': `Keep-Alive`,
		'Accept-Encoding': `gzip`,
		'User-Agent': `okhttp/3.12.2`
	},
    body: fxbody
	//body: 
  }
}
*/
 //时段红包，每30分钟一次。
 function do_sdhb() {
  return new Promise(resolve => {
    $.post(sdhb(), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`时段红包结果：${JSON.stringify(result)}\n`)
			if (result.code == 1) {
				console.log(`\n时段红包领取成功，获得 ${result.data.score} 青豆！`)
			} else {
				console.log(`\n时段红包领取失败:${JSON.stringify(result)}`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

 //每小时开宝箱。
 function do_HourRed() {
  return new Promise(resolve => {
    $.post(HourRed(), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`开宝箱结果：${JSON.stringify(result)}\n`)
			if (result.code == 1) {
				console.log(`\n开宝箱成功，获得 ${result.data.score} 青豆！`)
			} else {
				console.log(`\n开宝箱失败:${JSON.stringify(result)}`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

//通用函数，领取宝箱和奖励 
function do_toGetReward(rewardbody) {
	//console.log(`body：${rewardbody}`)
  return new Promise(resolve => {
       let url = {
            url : 'https://kandian.wkandian.com/v5/CommonReward/toGetReward.json',
            headers : {
            'device-platform': 'android',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': rewardbody.length.toString(),
            'Host': 'kandian.wkandian.com',
			},
            body : rewardbody,
		}
        $.post(url, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
			  //$.log(data);
            const result = JSON.parse(data);
			//console.log(`领取首页红包结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`\n成功获得 ${result.items.score} 青豆！`)
          } else {
			  console.log(`\n失败:${JSON.stringify(result)}`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

 //首页时段视频奖励，每天6次
 function do_sysp() {
  return new Promise(resolve => {
    $.post(sysp(), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`时段红包结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`\n首页时段激励奖励获取成功，获得 ${result.items.dialog.score} 青豆！`)
			} else {
				console.log(`\n首页时段激励奖励获取失败:${JSON.stringify(result)}`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}


//领取5分钟时长奖励
function do_sc_prize2(rewardtype) {
	data =getFormData( {'request_time': TS, 'reward_type': rewardtype, 'token': zqtoken, 'uid': zquid});
	//$.log(`${data}`);
  return new Promise(resolve => {
    let options = {
		url: `${basicurl}v17/Ad/getReward.json`,
		headers: {
			'Token': zqtoken,
			'Content-Type': `application/x-www-form-urlencoded`,
			'Host': `kandian.wkandian.com`,
			'Connection': `Keep-Alive`,
			'Accept-Encoding': `gzip`,
			'User-Agent': `okhttp/3.12.2`
		},
		body: data
	};
	$.post(options, async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`领取5分钟时长奖励结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`领取5分钟时长奖励成功，获得 ${result.items.score} 青豆！`)
          } else {
			  console.log(`领取5分钟时长奖励失败:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}



//看福利视频，每天5次
function do_flsp() {
  return new Promise(resolve => {
    $.get(flsp(), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`看福利视频结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`看福利视频成功！`)
          } else {
			  console.log(`看福利视频失败:${JSON.stringify(result)}`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}


//开启时段宝箱
function openbox() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const url = {
                url: `${basicurl}invite/openHourRed`,
                headers: JSON.parse(zqcookie),
            }
            $.post(url, async(error, response, data) => {
               try{
					boxres = JSON.parse(data)
					if (boxres.code == 1) {
					  boxretime = boxres.data.time
					  $.setdata(boxretime, 'opbox')
					    tsxx += `开启宝箱+${boxres.data.score}青豆 下次奖励${boxres.data.time / 60}分钟\n`
					      await boxshare();
					}else{
					    tsxx += `开启宝箱${boxres.msg}\n`
					}
				} catch (e) {
					$.logErr(e, resp)
				} finally {
					resolve();
				}
            })
        },s)
    })
}

/*
//签到
function do_sign() {
  return new Promise(resolve => {
    $.post(basic(basicApi,signBody), async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`签到结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`签到成功，获得 ${result.items.score} 金币！`)
				console.log(`开始执行 ${result.items.button.title} ---`)
				await $.wait(30000);
				await do_sign2();
          } else {
			  console.log(`今日已签到:${JSON.stringify(result)}\n`)
        }
      }
    }
  }	catch (e) {
     $.logErr(e, resp)
     } finally {
        resolve();
      }
	})
  })
}

 //签到翻倍
 function do_sign2() {
  return new Promise(resolve => {
    $.post(basic(doubleSignApi,doubleSignBody), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(resp)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            const result = JSON.parse(data);
			//console.log(`签到翻倍结果：${JSON.stringify(result)}\n`)
			if (result.success == true) {
				console.log(`签到翻倍成功，获得 ${result.items.score} 金币！ `)
			} else {
				console.log(`签到翻倍失败:${JSON.stringify(result)}\n`)
			}
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
*/


//basic
function basic(api,body) {
  return {
    url: `${basicurl}v5/`+api,
    headers: {
        'Accept-Encoding': `gzip`,
        'Connection': `keep-alive`,
        'Host': `kandian.wkandian.com`,
        'User-Agent': `okhttp/3.12.2`,
	},
    body: body
  }
}



//时段红包-赚钱，右上角时段奖励
function sdhb() {
  return {
    url: `${basicurl}WebApi/TimePacket/getReward`,
    headers: {
		"Host" :`kandian.wkandian.com`,
		'Referer':basicurl+'html/rotaryTable/index.html?'+zqcookie
		},
    body: zqcookie
  }
}

//每小时开宝箱-我的-快速赚钱-开宝箱
function HourRed() {
  return {
    url: `${basicurl}WebApi/invite/openHourRed`,
    headers: {
		'Referer':basicurl+'html/rotaryTable/index.html?'+zqcookie
	},
    body: zqcookie
  }
}

//赚钱-看福利视频（5次）
function flsp() {
  return {
    url: `${basicurl}V17/NewTask/recordNum.json?`+zqcookie,
    headers: {

	}
  }
}

//首页右上角视频奖励
function sysp() {
  return {
    url: `${basicurl}v17/Rvideo/videoCallback.json`,
    headers: {
		"Token" : zqtoken

	},
	//body: zqcookie+"&request_time="+time1
	body:syspbody
  }
}

//tasklist
function tasklist() {
  return {
    url: `${basicurl}v17/NewTask/getTaskList.json?`+zqcookie,
	headers: {
		'Host': `kandian.wkandian.com`,
		'Connection': `Keep-Alive`,
		'Accept-Encoding': `gzip`,
		'User-Agent': `okhttp/3.12.2`
	}
  }
}



//userdata
function userdata(url) {

  return {
	url: url,
    headers: {
		'Host': `kandian.wkandian.com`,
		'Connection': `Keep-Alive`,
		'Accept-Encoding': `gzip`,
		'User-Agent': `okhttp/3.12.2`
	}
  }
}


function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}

function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

//随机udid 小写
function randomsi() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + S4() + S4() + S4() +  S4() + S4() + S4());
}


function getFormData(element,key,list){
    var list = list || [];
    if(typeof(element)=='object'){
      for (var idx in element)
        getFormData(element[idx],key?key+'['+idx+']':idx,list);
    } else {
      list.push(key+'='+encodeURIComponent(element));
    }
    return list.join('&');
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
