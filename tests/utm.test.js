const assert = require("assert");
const UTM = require("../utm.js");

assert.strictEqual(UTM.normalise("  Black Friday Sale!! "), "black-friday-sale");
assert.strictEqual(UTM.campaignName({ yearMonth: "2026-11", market: "AU", theme: "Spring_Sale" }), "2026-11_au_spring-sale");
assert.strictEqual(UTM.campaignName({ yearMonth: "2026-11", market: "AU", theme: "Black Friday", objective: "prospecting" }),
  "2026-11_au_black-friday_prospecting");

let r = UTM.buildUtmUrl({ url: "https://example.com/landing?ref=1", source: "Instagram", medium: "paid-social",
  campaign: "2026-11_au_black-friday_prospecting", content: "Video A" });
assert.deepStrictEqual(r.errors, []);
assert.strictEqual(r.url, "https://example.com/landing?ref=1&utm_source=instagram&utm_medium=paid-social&utm_campaign=2026-11_au_black-friday_prospecting&utm_content=video-a");
assert.ok(r.warnings.some(w => w.includes("utm_source normalised")));

r = UTM.buildUtmUrl({ url: "not a url", source: "", medium: "email", campaign: "x" });
assert.ok(r.errors.length === 2);

r = UTM.buildUtmUrl({ url: "https://example.com", source: "fb", medium: "facebook-ads", campaign: "test" });
assert.ok(r.warnings.some(w => w.includes("not in the standard list")));

console.log("All UTM tests passed");
