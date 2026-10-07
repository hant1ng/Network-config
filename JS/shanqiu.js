/**
 * 山丘阅读去开屏广告
 * Surge 适配版
 * 仅处理开屏相关配置
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
        item.covalue = "";
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
