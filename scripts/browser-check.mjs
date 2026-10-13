// Optional QA, kept outside CI to avoid installing a browser for every weekly update.
// npm install --no-save --package-lock=false playwright axe-core
// npx playwright install chromium
// QA_URL=http://localhost:4321/your-base/ node scripts/browser-check.mjs
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import assert from "node:assert/strict";
const require = createRequire(import.meta.url);
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || "playwright"
);
const axePath =
  process.env.AXE_SCRIPT || require.resolve("axe-core/axe.min.js");
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROMIUM_PATH
    ? { executablePath: process.env.CHROMIUM_PATH }
    : {}),
  args: process.env.QA_NO_SANDBOX === "1" ? ["--no-sandbox"] : [],
});
const root = (process.env.QA_URL || "http://localhost:4321/").replace(
  /\/?$/,
  "/",
);
const output = "work/browser";
await mkdir(output, { recursive: true });
const results = [];
try {
  for (const width of [375, 768, 1024, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const route of [
      "",
      "equips/",
      "equips/equip-a/",
      "equips/equip-b/",
      "calendari/",
      "diari/",
    ]) {
      const response = await page.goto(root + route);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(response.status(), 200);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
      );
      assert.equal(await page.locator("html").getAttribute("lang"), "ca");
      assert.equal(await page.locator("h1").count(), 1);
      const links = await page
        .locator("a[href]")
        .evaluateAll((links) =>
          links
            .map((a) => a.href)
            .filter((h) => h.startsWith(location.origin) && !h.includes("#")),
        );
      for (const link of new Set(links))
        assert.equal((await page.request.get(link)).ok(), true, link);
      for (const image of await page.locator("img").all())
        assert.equal(
          await image.evaluate((i) => i.complete && i.naturalWidth > 0),
          true,
        );
      await page.screenshot({
        path: `${output}/${route ? route.replaceAll("/", "-") : "home"}-${width}.png`,
        fullPage: true,
      });
      const entry = {
        width,
        route,
        browserErrors: [...errors],
        violations: [],
      };
      if (width === 375 || width === 1440) {
        await page.addScriptTag({ path: axePath });
        const audit = await page.evaluate(() =>
          axe.run(document, {
            runOnly: {
              type: "tag",
              values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
            },
          }),
        );
        entry.violations = audit.violations.map((v) => v.id);
        assert.deepEqual(entry.violations, []);
      }
      assert.deepEqual(errors, []);
      results.push(entry);
    }
    if (width === 375) {
      await page.goto(root);
      await page.keyboard.press("Tab");
      assert.equal(
        await page.locator(":focus").textContent(),
        "Salta al contingut",
      );
      await page.keyboard.press("Enter");
      assert.equal(
        await page.evaluate(() => document.activeElement.id),
        "main",
      );
    }
    await page.close();
  }
  await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2));
  console.log(
    `PASS: ${results.length} responsive views, links, images, keyboard skip and 12 automated WCAG audits.`,
  );
} finally {
  await browser.close();
}
