let obj;

try {
    obj = JSON.parse($response.body);

    if (Array.isArray(obj.data)) {
        for (const item of obj.data) {
            if (item.cokey === "adconfig") {
                console.log("找到 adconfig");
                item.covalue = "[]";
                console.log("已清空 adconfig");
            }
        }
    }

    $done({
        body: JSON.stringify(obj)
    });

} catch (e) {
    console.log("山丘去广告脚本错误: " + e);
    $done({});
}
