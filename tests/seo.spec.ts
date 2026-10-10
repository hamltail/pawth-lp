import { expect, test } from "@playwright/test";

const SITE_URL = "https://pawth-lp.hamltail.dev";

test("日本語のSEOメタデータが正しく設定される", async ({ page }) => {
  await page.context().addCookies([
    {
      name: "NEXT_LOCALE",
      value: "ja",
      url: "http://localhost:3000",
    },
  ]);

  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("lang", "ja");

  await expect(page).toHaveTitle(
    "Pawth | 日々の足あとを描く、小さなWeb日記アプリ",
  );

  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "1日1投稿で日々の記録を残すWeb日記アプリ「Pawth」。カレンダーやタイムラインから、これまでの歩みを振り返ることができます。",
  );

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    SITE_URL,
  );

  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Pawth | 日々の足あとを描く、小さなWeb日記アプリ",
  );

  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    "content",
    "ja_JP",
  );

  // 開発環境と本番環境でドメインやクエリ文字列が異なるため、
  // URLのパスを検証する
  const ogImageUrl = await page
    .locator('meta[property="og:image"]')
    .getAttribute("content");

  expect(ogImageUrl).not.toBeNull();
  expect(new URL(ogImageUrl!).pathname).toBe("/opengraph-image");

  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );

  const twitterImageUrl = await page
    .locator('meta[name="twitter:image"]')
    .getAttribute("content");

  expect(twitterImageUrl).not.toBeNull();
  expect(new URL(twitterImageUrl!).pathname).toBe("/opengraph-image");
});

test("英語のSEOメタデータが正しく設定される", async ({ page }) => {
  await page.context().addCookies([
    {
      name: "NEXT_LOCALE",
      value: "en",
      url: "http://localhost:3000",
    },
  ]);

  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("lang", "en");

  await expect(page).toHaveTitle("Pawth | A Small Daily Journaling App");

  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "A daily journaling app for recording one entry a day and looking back through your calendar and timeline.",
  );

  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Pawth | A Small Daily Journaling App",
  );

  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    "content",
    "en_US",
  );

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    SITE_URL,
  );
});

test("robots.txtとsitemap.xmlが正しく配信される", async ({ request }) => {
  const robots = await request.get("/robots.txt");

  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);

  const sitemap = await request.get("/sitemap.xml");

  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain(`${SITE_URL}/`);

  const ogImage = await request.get("/opengraph-image");

  expect(ogImage.ok()).toBeTruthy();
  expect(ogImage.headers()["content-type"]).toContain("image/png");
});
