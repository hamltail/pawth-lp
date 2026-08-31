import { expect, test } from "@playwright/test";

test("Pawth LPの主要コンテンツが正しく表示される", async ({ page }) => {
  await page.goto("/");

  // Hero
  await expect(page.getByText("About Pawth")).toBeVisible();

  await expect(
    page.getByRole("heading", { level: 1, name: /Pawth/ }),
  ).toBeVisible();

  await expect(
    page.getByText("日々の足あとを描く、1日1投稿の小さな日記アプリ"),
  ).toBeVisible();

  await expect(
    page.getByText(
      "Pawthは、日々の歩みを可視化し、その日の記録にコミットするための日記アプリです。",
    ),
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: "GitHubを見る" }),
  ).toHaveAttribute("href", "https://github.com/hamltail/Pawth");

  await expect(
    page.getByRole("link", { name: "コンセプトを見る" }),
  ).toHaveAttribute("href", "#concept");

  // Screens
  const screensHeading = page.getByRole("heading", {
    level: 2,
    name: "Pawth の3つの画面",
  });

  await screensHeading.scrollIntoViewIfNeeded();
  await expect(screensHeading).toBeVisible();

  await expect(
    page.getByRole("heading", { level: 3, name: "カレンダー画面" }),
  ).toBeVisible();

  await expect(
    page.getByText("日々の足あとを一目で確認し、投稿のリズムを可視化します。"),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { level: 3, name: "日記一覧画面" }),
  ).toBeVisible();

  await expect(
    page.getByText("過去の投稿を振り返りやすく、内省のための一覧表示です。"),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { level: 3, name: "日記投稿モーダル" }),
  ).toBeVisible();

  await expect(
    page.getByText("1日1投稿のシンプルな入力体験で、気軽に記録できます。"),
  ).toBeVisible();

  // Concept
  const conceptHeading = page.getByRole("heading", {
    level: 2,
    name: "目的は、今日の自分にコミットすること",
  });

  await conceptHeading.scrollIntoViewIfNeeded();
  await expect(conceptHeading).toBeVisible();

  await expect(
    page.getByRole("heading", { level: 3, name: "1日1投稿まで" }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { level: 3, name: "当日内は削除不可" }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { level: 3, name: "編集は最大3回まで" }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { level: 3, name: "翌日以降は削除可" }),
  ).toBeVisible();

  // Design philosophy
  const designHeading = page.getByRole("heading", {
    level: 2,
    name: "Pawth の設計思想",
  });

  await designHeading.scrollIntoViewIfNeeded();
  await expect(designHeading).toBeVisible();

  await expect(page.getByText("SNS化しない")).toBeVisible();
  await expect(page.getByText("タイムラインなし")).toBeVisible();
  await expect(page.getByText("フォロー/フォロワーなし")).toBeVisible();
  await expect(page.getByText("内省に最適化")).toBeVisible();

  // Tech
  const techHeading = page.getByRole("heading", {
    level: 2,
    name: "開発で重視したこと",
  });

  await techHeading.scrollIntoViewIfNeeded();
  await expect(techHeading).toBeVisible();

  await expect(page.getByText("制約設計")).toBeVisible();
  await expect(page.getByText("UX改善視点")).toBeVisible();
  await expect(page.getByText("継続しやすいUI")).toBeVisible();
  await expect(page.getByText("アクセシビリティ配慮")).toBeVisible();
  await expect(
    page.getByText("ユーティリティファースト（Tailwind CSS）"),
  ).toBeVisible();
  await expect(page.getByText("自動テスト（Playwright）")).toBeVisible();
  await expect(page.getByText("開発環境の再現性（Docker）")).toBeVisible();
  await expect(page.getByText("本番運用を見据えた設計（AWS）")).toBeVisible();

  // Highlights
  const highlightsHeading = page.getByRole("heading", {
    level: 2,
    name: "単なるCRUDを超えた設計",
  });

  await highlightsHeading.scrollIntoViewIfNeeded();
  await expect(highlightsHeading).toBeVisible();

  await expect(
    page.getByText("単なるCRUDではなく、習慣化と内省を支える設計。"),
  ).toBeVisible();

  await expect(
    page.getByText("UIだけでなく、使い方の制約まで設計している。"),
  ).toBeVisible();

  await expect(page.getByText("QA・UX視点を意識した個人開発。")).toBeVisible();

  // Notice
  const notice = page.getByText("現在、本番環境の公開は停止しています。");

  await notice.scrollIntoViewIfNeeded();
  await expect(notice).toBeVisible();

  // Footer
  const footer = page.locator("footer");

  await footer.scrollIntoViewIfNeeded();
  await expect(footer).toBeVisible();

  await expect(footer).toContainText(`© ${new Date().getFullYear()} Pawth`);
});

test("画像モーダルを開閉できる", async ({ page }) => {
  await page.goto("/");

  const imageButton = page.getByRole("button", {
    name: "カレンダー画面を拡大表示",
  });

  await imageButton.scrollIntoViewIfNeeded();
  await imageButton.click();

  const dialog = page.getByRole("dialog");

  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("カレンダー画面");

  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

  await page.getByRole("button", { name: "Close image preview" }).click();

  await expect(dialog).not.toBeVisible();
});

test("画像モーダルをEscapeキーで閉じられる", async ({ page }) => {
  await page.goto("/");

  const imageButton = page.getByRole("button", {
    name: "日記一覧画面を拡大表示",
  });

  await imageButton.scrollIntoViewIfNeeded();
  await imageButton.click();

  const dialog = page.getByRole("dialog");

  await expect(dialog).toBeVisible();

  await page.keyboard.press("Escape");

  await expect(dialog).not.toBeVisible();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("テーマを切り替えられる", async ({ page }) => {
  await page.goto("/");

  const lightButton = page.getByRole("button", {
    name: "ライトテーマ",
  });
  const darkButton = page.getByRole("button", {
    name: "ダークテーマ",
  });
  const systemButton = page.getByRole("button", {
    name: "システムテーマ",
  });

  await darkButton.click();

  await expect(darkButton).toHaveAttribute("aria-pressed", "true");
  await expect(lightButton).toHaveAttribute("aria-pressed", "false");
  await expect(systemButton).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator("html")).toHaveClass(/dark/);

  await lightButton.click();

  await expect(lightButton).toHaveAttribute("aria-pressed", "true");
  await expect(darkButton).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator("html")).not.toHaveClass(/dark/);

  await systemButton.click();

  await expect(systemButton).toHaveAttribute("aria-pressed", "true");
});

test("テーマ設定がリロード後も保持される", async ({ page }) => {
  await page.goto("/");

  const darkButton = page.getByRole("button", {
    name: "ダークテーマ",
  });

  await darkButton.click();

  await expect(page.locator("html")).toHaveClass(/dark/);

  await page.reload();

  await expect(
    page.getByRole("button", { name: "ダークテーマ" }),
  ).toHaveAttribute("aria-pressed", "true");

  await expect(page.locator("html")).toHaveClass(/dark/);
});

test("コンセプトへのアンカーリンクで移動できる", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "コンセプトを見る" }).click();

  await expect(page).toHaveURL(/#concept$/);

  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "目的は、今日の自分にコミットすること",
    }),
  ).toBeVisible();
});

test("スクロールするとページ上部へ戻るボタンが表示される", async ({ page }) => {
  await page.goto("/");

  const backToTopButton = page.getByRole("button", {
    name: "ページ上部へ戻る",
  });

  await expect(backToTopButton).not.toBeVisible();

  await page.evaluate(() => {
    window.scrollTo(0, 1000);
  });

  await expect(backToTopButton).toBeVisible();

  await backToTopButton.click();

  await expect
    .poll(async () => page.evaluate(() => Math.round(window.scrollY)))
    .toBe(0);
});

test("画面カードはスクロールすると表示アニメーション状態になる", async ({
  page,
}) => {
  await page.goto("/");

  const screenCard = page
    .getByRole("heading", {
      level: 3,
      name: "カレンダー画面",
    })
    .locator("..")
    .locator("..");

  await screenCard.scrollIntoViewIfNeeded();

  await expect(screenCard).toHaveClass(/is-visible/);
});
