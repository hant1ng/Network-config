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
    // --- 【修改 VIP 和个人信息】 ---
    if (body.data && Array.isArray(body.data) && body.data.length > 0) {
      body.status = "1";
      let userData = body.data[0];
      
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
    // --- 【修改云端配置 (暴力去广告)】 ---
    if (body.data && Array.isArray(body.data)) {
      // 恢复你最初的“核弹级”清空逻辑：
      // 直接把服务端下发的所有广告配置（不管旧的还是新的）全部清空
      // 仅仅保留最基础的搜索引擎配置，从根源上断绝广告加载
      body.data.length = 0;
      body.data[0] = {
        "cokey": "ONLINE_WEB_SEARCHSITE_URL",
        "covalue": "https://www.google.com/search?q=%@"
      };
    }
  }

  // 3. 统一打包返回
  $done({ body: JSON.stringify(body) });

} catch (e) {
  console.log("重写脚本执行错误: " + e);
  $done({});
}
