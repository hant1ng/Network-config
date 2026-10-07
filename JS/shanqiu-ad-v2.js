try {
  var requestUrl = $request.url;
  var body = JSON.parse($response.body);
  
  // 1. 提取 URL 请求参数
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
    // --- 【修改 VIP】 ---
    if (body.data && Array.isArray(body.data) && body.data.length > 0) {
      body.status = "1";
      let userData = body.data[0];
      
      userData.type = "9";
      userData.vipto = "2099-12-31 00:00:00";
      userData.nickname = "南通男同男童";
      userData.email = "9527";
      userData.appleid = "9527";
      userData.wxopenid = "9527";
      
      if (params.token) userData.token = params.token;
      if (params.device) userData.device = decodeURIComponent(params.device);
      if (params.uid) userData.uuid = params.uid;
    }
    
  } else if (requestUrl.indexOf('addsecond') !== -1) {
    // --- 【修改绑定】 ---
    body.status = "1";
    body.data = "绑定成功";
    
  } else if (requestUrl.indexOf('config2025') !== -1) {
    // --- 【强制注入去广告配置】 ---
    if (body.data && Array.isArray(body.data)) {
      // 这是明确能关闭广告的核心指令
      const adBlockConfig = {
        "ONLINE_REWARDAD_CONFIG": "0",          // 激励广告
        "ONLINE_INTERAD_DOWNLOAD_CONFIG": "0",  // 下载插屏广告
        "ONLINE_ENABLE_REWARDAD": "disable",    // 开启激励广告(设为disable)
        "ONLINE_ADWORDS": "0",                  // 关键词广告
        "PARAV2_SPLASHADS_CONFIG": "0",         // 开屏广告
        "ONLINE_SHOWFULLFUNC": "0",             // 限制功能开关
        "ONLINE_ADAWAY_STRING": []              // 广告域名屏蔽
      };

      // 步骤A：修改服务端已经下发的参数
      let existingKeys = {};
      for (let i = 0; i < body.data.length; i++) {
        let key = body.data[i].cokey;
        existingKeys[key] = true;
        if (adBlockConfig.hasOwnProperty(key)) {
          body.data[i].covalue = adBlockConfig[key];
        }
      }

      // 步骤B：如果服务端没下发关闭指令，我们强制补充进去！防止App读不到指令默认开启广告
      for (let key in adBlockConfig) {
        if (!existingKeys[key]) {
          body.data.push({
            "cokey": key,
            "covalue": adBlockConfig[key]
          });
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
