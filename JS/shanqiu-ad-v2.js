try {
  const requestUrl = $request.url;
  const body = JSON.parse($response.body);

  if (requestUrl.includes("config2025")) {
    if (Array.isArray(body.data)) {

      const config = {
        "ONLINE_REWARDAD_CONFIG_V735": "",
        "ONLINE_INTERAD_DOWNLOAD_CONFIG_V735": "",
        "ONLINE_ENABLE_REWARDAD_V735": "disable",
        "PARAV2_SPLASHADS_CONFIG": "",
        "adconfig": "[]"
      };

      for (const item of body.data) {
        if (
          item &&
          item.cokey &&
          Object.prototype.hasOwnProperty.call(config, item.cokey)
        ) {
          item.covalue = config[item.cokey];
        }
      }
    }
  }

  $done({
    body: JSON.stringify(body)
  });

} catch (e) {
  console.log("山丘阅读脚本错误: " + e);
  $done({});
}
