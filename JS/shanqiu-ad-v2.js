try {
  var requestUrl = $request.url;
  var body = JSON.parse($response.body);
  
  // 1. 提取 URL 请求参数（解决 App 本地校验 device 和 token 为 null 的问题）
  var params = {};
  if (requestUrl.indexOf('?') !== -1) {
    var queryArr = requestUrl.split('?')[1].split('&');
    for (let i = 0; i < queryArr.length; i++) {
      let pair = queryArr[i].split('=');
      params[pair[0]] = pair[1];
    }
  }
  
  // 2. 路由分发
  if (requestUrl.indexOf('myinfo') !== -1) {
    // --- 【修改 VIP 和个人信息】 ---
    if (body.data && Array.isArray(body.data) && body.data.length > 0) {
      body.status = "1";
      let userData = body.data[0];
      
      // 核心会员修改
      userData.type = "9"; // 9为终身会员
      userData.vipto = "2099-12-31 00:00:00";
      userData.nickname = "南通男同男童";
      userData.email = "9527";
      userData.appleid = "9527";
      userData.wxopenid = "9527";
      
      // 强制回填请求参数（极其关键，防止 App 验签失败）
      if (params.token) userData.token = params.token;
      if (params.device) userData.device = decodeURIComponent(params.device);
      if (params.uid) userData.uuid = params.uid;
    }
    
  } else if (requestUrl.indexOf('addsecond') !== -1) {
    // --- 【修改绑定状态】 ---
    body.status = "1";
    body.data = "绑定成功";
    
  } else if (requestUrl.indexOf('config2025') !== -1) {
    // --- 【修改云端配置 (全量去广告)】 ---
    if (body.data && Array.isArray(body.data)) {
      const configMap = {
        "ONLINE_REWARDAD_CONFIG": "0",
        "ONLINE_INTERAD_DOWNLOAD_CONFIG": "0",
        "ONLINE_ENABLE_REWARDAD": "disable",
        "ONLINE_WEBSEARCHSITE_URL": "https://www.google.com/ncr",
        "ONLINE_TXTSITES": "演示样例",
        "ONLINE_WANGPANSEARCHSITE_URL": "https://www.jiumodiary.com/",
        "ONLINE_SHOWFULLFUNC": "0",
        "ONLINE_MY_SPECIAL_SITES": "留言反馈||vip/upgrade.php?iinnffoo",
        "ONLINE_SAVECOVERSITESV2": "0",
        "ONLINE_ADWORDS": "0",
        "PARAV2_SPLASHADS_CONFIG": "0",
        "ONLINE_JS_RULES": "",
        "ONLINE_WANGPAN_SEARCHSITE_URL": "https://www.jiumodiary.com/",
        "ONLINE_WEB_SEARCHSITE_URL": "https://www.google.com/search?q=%@",
        "ONLINE_NEW_REQUESTINFO_FORURL": "0",
        "ONLINE_ADAWAY_STRING": [],
        "ONLINE_TXTNOVEL_CHECKIN_URL": "http://www.txtnovel.vip/plugin.php?id=dsu_paulsign:sign&mobile=yes",
        "ONLINE_IAP_VERSION": "230510",
        "ONLINE_TXTNOVEL_URL": "http://www.txtnovel.vip"
      };

      for (let i = 0; i < body.data.length; i++) {
        let currentKey = body.data[i].cokey;
        if (configMap.hasOwnProperty(currentKey)) {
          body.data[i].covalue = configMap[currentKey];
        }
      }
    }
  }

  // 3. 统一打包返回
  $done({ body: JSON.stringify(body) });

} catch (e) {
  console.log("重写脚本执行错误: " + e);
  $done({});
}
