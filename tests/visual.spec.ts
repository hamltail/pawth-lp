// 実行：npx playwright test tests/visual.spec.ts
// 基準画像を更新：npx playwright test tests/visual.spec.ts --update-snapshots

import { expect, test } from "@playwright/test";

test("Pawth LPの見た目が基準画像と一致する", async ({ page }) => {
  await page.goto("/");

  // スクロールで表示される要素をすべて発火させる
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let scrollY = 0;

      const interval = window.setInterval(() => {
        scrollY += window.innerHeight;
        window.scrollTo(0, scrollY);

        if (scrollY >= document.body.scrollHeight) {
          window.clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  });

  // IntersectionObserverによる表示状態が反映されるのを待つ
  await page.waitForTimeout(500);

  // スクリーンショット撮影前にページ上部へ戻す
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });

  await expect(page).toHaveScreenshot("pawth-lp.png", {
    fullPage: true,
    animations: "disabled",
  });
});
