//获取响应数据
var requestUrl = $request.url;
var body = JSON.parse($response.body);
var requestParams = requestUrl.split('?')[1].split('&');
//匹配请求
var resetApi = /resetvip/;
var infoApi = /myinfo/;
var addApi = /addsecond/;
var configApi = /config2025/;
//格式化请求uri参数
var params = {};
for(let i in requestParams){
  let paramKey = requestParams[i].split('=')[0];
  let paramValue = requestParams[i].split('=')[1];
  params[paramKey] = paramValue;
}
//预设vip数据
var temp = {"uuid":null,"banned":"0","headimgurl":null,"type":null,"wxunionid":null,"token":null,"vipto":null,"wxopenid":null,"nickname":null,"email":null,"appleid":null,"device":null};
temp.email = "9527";
temp.appleid = "9527";
temp.wxopenid = "9527";
temp.nickname = "南通男同男童";
temp.token = params.token;
temp.device = params.device;
temp.uuid = params.uid;

if(requestUrl.match(infoApi)){
  body.status = "1";
  temp.type = "9"; //普通会员：0-7，无法绑定Apple ID | 年费会员：8 | 终身会员：9 | 普通会员：10+，可绑定Apple ID
  temp.vipto = "2099-12-31 00:00:00";
  body.data[0] = temp;
}

//if(requestUrl.match(resetApi)

if(requestUrl.match(addApi)){
  body.status = "1";
  body.data = "绑定成功";
  }

if(requestUrl.match(configApi)){
  var cokey_1 = /ONLINE_REWARDAD_CONFIG/
  var covalue_1 = "0"

  var cokey_2 = /ONLINE_INTERAD_DOWNLOAD_CONFIG/
  var covalue_2 = "0"

  var cokey_3 = /ONLINE_ENABLE_REWARDAD/
  var covalue_3 = "disable"

  var cokey_4 = /ONLINE_WEBSEARCHSITE_URL/
  var covalue_4 = "https://www.google.com/ncr"

  var cokey_5 = /ONLINE_TXTSITES/
  var covalue_5 = "演示样例"

  var cokey_6 = /ONLINE_WANGPANSEARCHSITE_URL/
  var covalue_6 = "https://www.jiumodiary.com/"

  var cokey_7 = /ONLINE_SHOWFULLFUNC/
  var covalue_7 = "0"

  var cokey_8 = /ONLINE_MY_SPECIAL_SITES/
  var covalue_8 = "留言反馈||vip/upgrade.php?iinnffoo"

  var cokey_9 = /ONLINE_SAVECOVERSITESV2/
  var covalue_9 = "0"

  var cokey_10 = /ONLINE_ADWORDS/
  var covalue_10 = "0"

  var cokey_11 = /PARAV2_SPLASHADS_CONFIG/
  var covalue_11 = "0"

  var cokey_12 = /ONLINE_JS_RULES/
  var covalue_12 = ""

  var cokey_13 = /ONLINE_WANGPAN_SEARCHSITE_URL/
  var covalue_13 = "https://www.jiumodiary.com/"

  var cokey_14 = /ONLINE_WEB_SEARCHSITE_URL/
  var covalue_14 = "https://www.google.com/search?q=%@"

  var cokey_15 = /ONLINE_NEW_REQUESTINFO_FORURL/
  var covalue_15 = "0"

  var cokey_16 = /ONLINE_ADAWAY_STRING/
  var covalue_16 = []

  var cokey_17 = /ONLINE_TXTNOVEL_CHECKIN_URL/
  var covalue_17 = "http://www.txtnovel.vip/plugin.php?id=dsu_paulsign:sign&mobile=yes"

  var cokey_18 = /ONLINE_IAP_VERSION/
  var covalue_18 = "230510"

  var cokey_19 = /ONLINE_TXTNOVEL_URL/
  var covalue_19 = "http://www.txtnovel.vip"
  
  var data = body.data
  //for(let i = data.length - 1; i >= 0; i--){
  //  let cokey = data[i].cokey
    //if(cokey.match(cokey_1)){
    //  data[i].covalue = covalue_1
    //  continue
    //}
    //if(cokey.match(cokey_2)){
    //  data[i].covalue = covalue_2
    //  continue
    //}
    //if(cokey.match(cokey_3)){
    //  data[i].covalue = covalue_3
    //  continue
    //}
    //if(cokey.match(cokey_4)){
    //  data[i].covalue = covalue_4
    //  continue
    //}
    //if(cokey.match(cokey_5)){
    //  data[i].covalue = covalue_5
    //  continue
    //}
    //if(cokey.match(cokey_7)){
    //  data[i].covalue = covalue_7
    //  continue
    //}
    //if(cokey.match(cokey_9)){
    //  data[i].covalue = covalue_9
    //  continue
    //}
    //if(cokey.match(cokey_10)){
    //  data[i].covalue = covalue_10
    //  continue
    //}
    //if(cokey.match(cokey_11)){
    //  data[i].covalue = covalue_11
    //  continue
    //}
    //if(cokey.match(cokey_12)){
    //  data[i].covalue = covalue_12
    //  continue
    //}
    //if(cokey.match(cokey_14)){
    //  data[i].covalue = covalue_14
    //  continue
    //}
    //if(cokey.match(cokey_15)){
    //  data[i].covalue = covalue_15
    //  continue
    //}
    //if(cokey.match(cokey_16)){
    //  data[i].covalue = covalue_16
    //  continue
    //}
  //}
  data.length = 0
  data[0] = {"cokey":"ONLINE_WEB_SEARCHSITE_URL","covalue":"https://www.google.com/search?q=%@"}
}

$done({body: JSON.stringify(body)})
