/**
 * 山丘阅读去开屏广告
 * 适配 Surge
 * 目标：
 * 1. 清空自营开屏内容 adconfig
 * 2. 关闭第三方开屏配置 PARAV2_SPLASHADS_CONFIG
 */
let obj;

try {
  obj = JSON.parse($response.body || "{}");
  let modified = 0;

  if (obj && Array.isArray(obj.data)) {
    for (const item of obj.data) {
      if (!item || !item.cokey) continue;

      if (item.cokey === "adconfig") {
        item.covalue = "[]";
        modified++;
      }

      if (item.cokey === "PARAV2_SPLASHADS_CONFIG") {
        item.covalue = "0";
        modified++;
      }
    }
  }

  console.log("[ShanQiu AdBlock] modified=" + modified);

  if (modified > 0) {
    $done({ body: JSON.stringify(obj) });
  } else {
    $done({});
  }
} catch (e) {
  console.log("[ShanQiu AdBlock] error: " + e);
  $done({});
}
