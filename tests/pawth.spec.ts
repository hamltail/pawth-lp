import { expect, test } from "@playwright/test";

test("Pawth LPの主要コンテンツが正しく表示される", async ({ page }) => {
  await page.goto("/");

  // Hero
  const hero = page.locator("section").first();

  await expect(hero.getByText("About Pawth", { exact: true })).toBeVisible();

  await expect(
    hero.getByRole("heading", {
      level: 1,
      name: /Pawth/,
    }),
  ).toBeVisible();

  await expect(
    hero.getByText("日々の足あとを描く、小さなWeb日記アプリ", {
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    hero.getByText(
      "その日の記録を残し、カレンダーやタイムラインからこれまでの歩みを振り返ることができます。",
      { exact: true },
    ),
  ).toBeVisible();

  // Screens
  const screens = page.locator("#screens");

  await screens.scrollIntoViewIfNeeded();

  await expect(
    screens.getByText("App Screens", {
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    screens.getByRole("heading", {
      level: 2,
      name: "Pawthでできること",
    }),
  ).toBeVisible();

  const screenItems = [
    {
      title: "カレンダー",
      imageAlt: "Pawthのカレンダー画面",
      buttonLabel: "カレンダー画面を拡大表示",
    },
    {
      title: "タイムライン",
      imageAlt: "Pawthのタイムライン画面",
      buttonLabel: "タイムライン画面を拡大表示",
    },
    {
      title: "カスタマイズ",
      imageAlt: "Pawthのプロフィール設定画面",
      buttonLabel: "プロフィール設定画面を拡大表示",
    },
  ];

  const screenCards = screens.locator("article");

  await expect(screenCards).toHaveCount(screenItems.length);

  for (const [index, item] of screenItems.entries()) {
    const card = screenCards.nth(index);

    await expect(
      card.getByRole("heading", {
        level: 3,
        name: item.title,
      }),
    ).toBeVisible();

    await expect(
      card.getByRole("button", {
        name: item.buttonLabel,
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      card.getByRole("img", {
        name: item.imageAlt,
      }),
    ).toBeVisible();
  }

  // Usability
  const usabilityHeading = page.getByRole("heading", {
    level: 2,
    name: "シンプルで、使いやすく",
  });

  await usabilityHeading.scrollIntoViewIfNeeded();
  await expect(usabilityHeading).toBeVisible();

  for (const title of ["シンプルなUI", "スワイプ対応", "レスポンシブ対応"]) {
    await expect(
      page.getByRole("heading", {
        level: 3,
        name: title,
      }),
    ).toBeVisible();
  }

  await expect(
    page.getByRole("img", {
      name: "スマートフォンで表示したPawthのカレンダー画面",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("img", {
      name: "スマートフォンで表示したPawthのタイムライン画面",
    }),
  ).toBeVisible();

  // Theme Colors
  const themeColorsHeading = page.getByRole("heading", {
    level: 2,
    name: "見た目も、自分らしく",
  });

  await themeColorsHeading.scrollIntoViewIfNeeded();
  await expect(themeColorsHeading).toBeVisible();

  await expect(
    page.getByRole("button", {
      name: "ダークテーマの画面を拡大表示",
    }),
  ).toBeVisible();

  // Notice
  const notice = page.getByText("現在、本番環境の公開は停止しています。", {
    exact: true,
  });

  await notice.scrollIntoViewIfNeeded();
  await expect(notice).toBeVisible();

  // Footer
  const footer = page.locator("footer");

  await footer.scrollIntoViewIfNeeded();

  await expect(
    footer.getByRole("link", {
      name: "GitHub",
      exact: true,
    }),
  ).toHaveAttribute("href", "https://github.com/hamltail/Pawth#readme");

  await expect(
    footer.getByText(`© ${new Date().getFullYear()} Pawth`, {
      exact: false,
    }),
  ).toBeVisible();

  await expect(
    footer.getByRole("link", {
      name: "Animal Corporation",
      exact: true,
    }),
  ).toHaveAttribute("href", "https://animal.hamltail.dev/");

  // Theme switcher
  const themeToggle = page.getByRole("button", {
    name: "テーマを変更",
    exact: true,
  });

  await expect(themeToggle).toBeEnabled();
  await expect(themeToggle).toHaveAttribute("aria-expanded", "false");

  await themeToggle.click();

  await expect(themeToggle).toHaveAttribute("aria-expanded", "true");

  const themeOptions = page.getByRole("group", {
    name: "テーマを変更",
  });

  for (const name of ["ライトテーマ", "ダークテーマ", "システムテーマ"]) {
    const button = themeOptions.getByRole("button", {
      name,
      exact: true,
    });

    await expect(button).toBeEnabled();
    await expect(button).toHaveAttribute("aria-pressed");
  }

  await page.keyboard.press("Escape");

  await expect(themeToggle).toHaveAttribute("aria-expanded", "false");

  // Back to top
  await expect(
    page.getByRole("button", {
      name: "ページ上部へ戻る",
    }),
  ).toBeVisible();
});

test("6つの画面画像をそれぞれモーダルで表示できる", async ({ page }) => {
  await page.goto("/");

  const images = [
    {
      buttonLabel: "カレンダー画面を拡大表示",
      caption: "Pawthのカレンダー画面",
    },
    {
      buttonLabel: "タイムライン画面を拡大表示",
      caption: "Pawthのタイムライン画面",
    },
    {
      buttonLabel: "プロフィール設定画面を拡大表示",
      caption: "Pawthのプロフィール設定画面",
    },
    {
      buttonLabel: "スマートフォンのカレンダー画面を拡大表示",
      caption: "スマートフォンで表示したPawthのカレンダー画面",
    },
    {
      buttonLabel: "スマートフォンのタイムライン画面を拡大表示",
      caption: "スマートフォンで表示したPawthのタイムライン画面",
    },
    {
      buttonLabel: "ダークテーマの画面を拡大表示",
      caption: "ダークテーマで表示されたPawthのカレンダー画面",
    },
  ];

  for (const image of images) {
    const imageButton = page.getByRole("button", {
      name: image.buttonLabel,
      exact: true,
    });

    await imageButton.scrollIntoViewIfNeeded();
    await imageButton.click();

    const dialog = page.getByRole("dialog");

    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await expect(dialog).toHaveAttribute(
      "aria-labelledby",
      "image-modal-title",
    );

    await expect(
      dialog.getByText(image.caption, {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      dialog.getByRole("img", {
        name: image.caption,
      }),
    ).toBeVisible();

    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

    await page
      .getByRole("button", {
        name: "Close image preview",
      })
      .click();

    await expect(dialog).not.toBeVisible();
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  }
});

test("画像モーダルをEscapeキーで閉じられる", async ({ page }) => {
  await page.goto("/");

  const imageButton = page.getByRole("button", {
    name: "タイムライン画面を拡大表示",
    exact: true,
  });

  await imageButton.scrollIntoViewIfNeeded();
  await imageButton.click();

  const dialog = page.getByRole("dialog");

  await expect(dialog).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

  await page.keyboard.press("Escape");

  await expect(dialog).not.toBeVisible();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("画像モーダルの背景をクリックすると閉じられる", async ({ page }) => {
  await page.goto("/");

  const imageButton = page.getByRole("button", {
    name: "カレンダー画面を拡大表示",
    exact: true,
  });

  await imageButton.scrollIntoViewIfNeeded();
  await imageButton.click();

  const dialog = page.getByRole("dialog");

  await expect(dialog).toBeVisible();

  const modal = page.locator("#image-modal");
  const backdrop = modal.locator('[aria-hidden="true"]');

  await backdrop.click({
    position: {
      x: 10,
      y: 10,
    },
  });

  await expect(dialog).not.toBeVisible();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("テーマを切り替えられる", async ({ page }) => {
  await page.goto("/");

  const themeToggle = page.getByRole("button", {
    name: "テーマを変更",
    exact: true,
  });

  const themeOptions = page.getByRole("group", {
    name: "テーマを変更",
  });

  const lightButton = themeOptions.getByRole("button", {
    name: "ライトテーマ",
    exact: true,
  });

  const darkButton = themeOptions.getByRole("button", {
    name: "ダークテーマ",
    exact: true,
  });

  const systemButton = themeOptions.getByRole("button", {
    name: "システムテーマ",
    exact: true,
  });

  await expect(themeToggle).toBeEnabled();
  await expect(themeToggle).toHaveAttribute("aria-expanded", "false");

  // ダークテーマ
  await themeToggle.click();
  await darkButton.click();

  await expect(themeToggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("html")).toHaveClass(/dark/);

  await themeToggle.click();

  await expect(darkButton).toHaveAttribute("aria-pressed", "true");
  await expect(lightButton).toHaveAttribute("aria-pressed", "false");
  await expect(systemButton).toHaveAttribute("aria-pressed", "false");

  // ライトテーマ
  await lightButton.click();

  await expect(themeToggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("html")).not.toHaveClass(/dark/);

  await themeToggle.click();

  await expect(lightButton).toHaveAttribute("aria-pressed", "true");
  await expect(darkButton).toHaveAttribute("aria-pressed", "false");
  await expect(systemButton).toHaveAttribute("aria-pressed", "false");

  // システムテーマ
  await systemButton.click();

  await expect(themeToggle).toHaveAttribute("aria-expanded", "false");

  await themeToggle.click();

  await expect(systemButton).toHaveAttribute("aria-pressed", "true");
  await expect(lightButton).toHaveAttribute("aria-pressed", "false");
  await expect(darkButton).toHaveAttribute("aria-pressed", "false");

  // Escキーで閉じられる
  await page.keyboard.press("Escape");
  await expect(themeToggle).toHaveAttribute("aria-expanded", "false");

  // パネル外クリックで閉じられる
  await themeToggle.click();
  await page.locator("h1").click();

  await expect(themeToggle).toHaveAttribute("aria-expanded", "false");
});
