/**
 * 山丘阅读去开屏广告 v2
 * Surge
 */
let obj;
try {
  obj = JSON.parse($response.body || "{}");
  let changed = 0;

  if (obj && Array.isArray(obj.data)) {
    for (const item of obj.data) {
      if (!item || !item.cokey) continue;

      if (item.cokey === "adconfig") {
        item.covalue = "[]";
        changed++;
      }

      if (item.cokey === "PARAV2_SPLASHADS_CONFIG") {
        item.covalue = "";
        changed++;
      }
    }
  }

  console.log("[ShanQiu AdBlock v2] changed=" + changed);
  $done(changed ? { body: JSON.stringify(obj) } : {});
} catch (e) {
  console.log("[ShanQiu AdBlock v2] error=" + e);
  $done({});
}
