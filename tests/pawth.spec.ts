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
    hero.getByText("日々の足あとを描く、1日1投稿の小さな日記アプリ", {
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    hero.getByText(
      "Pawthは、日々の歩みを可視化し、その日の記録にコミットするための日記アプリです。",
      { exact: true },
    ),
  ).toBeVisible();

  const githubLink = hero.getByRole("link", {
    name: "GitHubを見る",
  });

  await expect(githubLink).toHaveAttribute(
    "href",
    "https://github.com/hamltail/Pawth",
  );
  await expect(githubLink).toHaveAttribute("target", "_blank");
  await expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

  await expect(
    hero.getByRole("link", {
      name: "コンセプトを見る",
    }),
  ).toHaveAttribute("href", "#concept");

  await expect(
    hero
      .getByRole("img", {
        name: "Pawth イメージ画像",
      })
      .first(),
  ).toBeVisible();

  // Screens
  const screens = page.locator("#screens");

  await screens.scrollIntoViewIfNeeded();

  await expect(
    screens.getByText("アプリ画面紹介", {
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    screens.getByRole("heading", {
      level: 2,
      name: "Pawth の3つの画面",
    }),
  ).toBeVisible();

  const screenItems = [
    {
      title: "カレンダー画面",
      description: "日々の足あとを一目で確認し、投稿のリズムを可視化します。",
      imageAlt: "カレンダー画面",
      buttonLabel: "カレンダー画面を拡大表示",
    },
    {
      title: "日記一覧画面",
      description: "過去の投稿を振り返りやすく、内省のための一覧表示です。",
      imageAlt: "日記一覧画面",
      buttonLabel: "日記一覧画面を拡大表示",
    },
    {
      title: "日記投稿モーダル",
      description: "1日1投稿のシンプルな入力体験で、気軽に記録できます。",
      imageAlt: "日記投稿モーダル画面",
      buttonLabel: "日記投稿モーダル画面を拡大表示",
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
      card.getByText(item.description, {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      card.getByRole("button", {
        name: item.buttonLabel,
      }),
    ).toBeVisible();

    await expect(
      card.getByRole("img", {
        name: item.imageAlt,
      }),
    ).toBeVisible();
  }

  // Concept
  const concept = page.locator("#concept");

  await concept.scrollIntoViewIfNeeded();

  await expect(
    concept.getByText("コンセプト", {
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    concept.getByRole("heading", {
      level: 2,
      name: "目的は、今日の自分にコミットすること",
    }),
  ).toBeVisible();

  const conceptItems = [
    {
      title: "1日1投稿まで",
      description: "毎日の記録に制約を設けることで、投稿の価値を高めます。",
    },
    {
      title: "当日内は削除不可",
      description: "今日の記録はその日の自分への約束として残します。",
    },
    {
      title: "編集は最大3回まで",
      description: "振り返りを促しつつ、過度な修正を防ぎます。",
    },
    {
      title: "翌日以降は削除可",
      description: "時間を置いた判断で整理できる柔軟性を残します。",
    },
  ];

  const conceptCards = concept.locator("article");

  await expect(conceptCards).toHaveCount(conceptItems.length);

  for (const [index, item] of conceptItems.entries()) {
    const card = conceptCards.nth(index);

    await expect(
      card.getByRole("heading", {
        level: 3,
        name: item.title,
      }),
    ).toBeVisible();

    await expect(
      card.getByText(item.description, {
        exact: true,
      }),
    ).toBeVisible();
  }

  // Design philosophy
  const designHeading = page.getByRole("heading", {
    level: 2,
    name: "Pawth の設計思想",
  });

  await designHeading.scrollIntoViewIfNeeded();
  await expect(designHeading).toBeVisible();

  const designSection = designHeading.locator("..").locator("..");

  await expect(
    designSection.getByText("非採用機能", {
      exact: true,
    }),
  ).toBeVisible();

  const excludedFeatures = [
    "SNS化しない",
    "タイムラインなし",
    "フォロー/フォロワーなし",
    "内省に最適化",
  ];

  const excludedFeatureItems = designSection.locator("li");

  await expect(excludedFeatureItems).toHaveCount(excludedFeatures.length);

  for (const [index, feature] of excludedFeatures.entries()) {
    await expect(excludedFeatureItems.nth(index)).toHaveText(feature);
  }

  // Tech
  const techHeading = page.getByRole("heading", {
    level: 2,
    name: "開発で重視したこと",
  });

  await techHeading.scrollIntoViewIfNeeded();
  await expect(techHeading).toBeVisible();

  const techSection = techHeading.locator("..").locator("..");

  await expect(
    techSection.getByText("技術・設計ポイント", {
      exact: true,
    }),
  ).toBeVisible();

  const technologies = [
    "制約設計",
    "UX改善視点",
    "継続しやすいUI",
    "アクセシビリティ配慮",
    "ユーティリティファースト（Tailwind CSS）",
    "自動テスト（Playwright）",
    "開発環境の再現性（Docker）",
    "本番運用を見据えた設計（AWS）",
  ];

  for (const technology of technologies) {
    await expect(
      techSection.getByText(technology, {
        exact: true,
      }),
    ).toBeVisible();
  }

  // Highlights
  const highlightsHeading = page.getByRole("heading", {
    level: 2,
    name: "単なるCRUDを超えた設計",
  });

  await highlightsHeading.scrollIntoViewIfNeeded();
  await expect(highlightsHeading).toBeVisible();

  const highlightsSection = highlightsHeading.locator("..").locator("..");

  await expect(
    highlightsSection.getByText("ポートフォリオとしての見どころ", {
      exact: true,
    }),
  ).toBeVisible();

  const highlights = [
    "単なるCRUDではなく、習慣化と内省を支える設計。",
    "UIだけでなく、使い方の制約まで設計している。",
    "QA・UX視点を意識した個人開発。",
  ];

  for (const highlight of highlights) {
    await expect(
      highlightsSection.getByText(highlight, {
        exact: true,
      }),
    ).toBeVisible();
  }

  // Notice
  const notice = page.getByText("現在、本番環境の公開は停止しています。", {
    exact: true,
  });

  await notice.scrollIntoViewIfNeeded();
  await expect(notice).toBeVisible();

  // Footer
  const footer = page.locator("footer");

  await footer.scrollIntoViewIfNeeded();
  await expect(footer).toBeVisible();

  await expect(
    footer.getByText(`© ${new Date().getFullYear()} Pawth`, {
      exact: true,
    }),
  ).toBeVisible();

  // Theme switcher
  const lightButton = page.getByRole("button", {
    name: "ライトテーマ",
  });
  const darkButton = page.getByRole("button", {
    name: "ダークテーマ",
  });
  const systemButton = page.getByRole("button", {
    name: "システムテーマ",
  });

  await expect(lightButton).toBeEnabled();
  await expect(darkButton).toBeEnabled();
  await expect(systemButton).toBeEnabled();

  await expect(lightButton).toHaveAttribute("aria-pressed");
  await expect(darkButton).toHaveAttribute("aria-pressed");
  await expect(systemButton).toHaveAttribute("aria-pressed");

  // Back to top
  await expect(
    page.getByRole("button", {
      name: "ページ上部へ戻る",
    }),
  ).toBeVisible();
});

test("3つの画面画像をそれぞれモーダルで表示できる", async ({ page }) => {
  await page.goto("/");

  const screens = [
    {
      buttonLabel: "カレンダー画面を拡大表示",
      caption: "カレンダー画面",
    },
    {
      buttonLabel: "日記一覧画面を拡大表示",
      caption: "日記一覧画面",
    },
    {
      buttonLabel: "日記投稿モーダル画面を拡大表示",
      caption: "日記投稿モーダル画面",
    },
  ];

  for (const screen of screens) {
    const imageButton = page.getByRole("button", {
      name: screen.buttonLabel,
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
      dialog.getByText(screen.caption, {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      dialog.getByRole("img", {
        name: screen.caption,
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
    name: "日記一覧画面を拡大表示",
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
  });

  await imageButton.scrollIntoViewIfNeeded();
  await imageButton.click();

  const dialog = page.getByRole("dialog");

  await expect(dialog).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

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

  const lightButton = page.getByRole("button", {
    name: "ライトテーマ",
  });
  const darkButton = page.getByRole("button", {
    name: "ダークテーマ",
  });
  const systemButton = page.getByRole("button", {
    name: "システムテーマ",
  });

  await expect(lightButton).toBeEnabled();
  await expect(darkButton).toBeEnabled();
  await expect(systemButton).toBeEnabled();

  await darkButton.click();

  await expect(darkButton).toHaveAttribute("aria-pressed", "true");
  await expect(lightButton).toHaveAttribute("aria-pressed", "false");
  await expect(systemButton).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator("html")).toHaveClass(/dark/);

  await lightButton.click();

  await expect(lightButton).toHaveAttribute("aria-pressed", "true");
  await expect(darkButton).toHaveAttribute("aria-pressed", "false");
  await expect(systemButton).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator("html")).not.toHaveClass(/dark/);

  await systemButton.click();

  await expect(systemButton).toHaveAttribute("aria-pressed", "true");
  await expect(lightButton).toHaveAttribute("aria-pressed", "false");
  await expect(darkButton).toHaveAttribute("aria-pressed", "false");
});

test("テーマ設定がリロード後も保持される", async ({ page }) => {
  await page.goto("/");

  const darkButton = page.getByRole("button", {
    name: "ダークテーマ",
  });

  await darkButton.click();

  await expect(darkButton).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveClass(/dark/);

  await page.reload();

  await expect(
    page.getByRole("button", {
      name: "ダークテーマ",
    }),
  ).toHaveAttribute("aria-pressed", "true");

  await expect(page.locator("html")).toHaveClass(/dark/);
});

test("ライトテーマ設定がリロード後も保持される", async ({ page }) => {
  await page.goto("/");

  const lightButton = page.getByRole("button", {
    name: "ライトテーマ",
  });

  await lightButton.click();

  await expect(lightButton).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).not.toHaveClass(/dark/);

  await page.reload();

  await expect(
    page.getByRole("button", {
      name: "ライトテーマ",
    }),
  ).toHaveAttribute("aria-pressed", "true");

  await expect(page.locator("html")).not.toHaveClass(/dark/);
});

test("コンセプトへのアンカーリンクで移動できる", async ({ page }) => {
  await page.goto("/");

  await page
    .getByRole("link", {
      name: "コンセプトを見る",
    })
    .click();

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

  await expect(backToTopButton).not.toBeVisible();
});

test("画面カードはスクロールすると表示アニメーション状態になる", async ({
  page,
}) => {
  await page.goto("/");

  const screens = page.locator("#screens");
  const screenCards = screens.locator("article");

  await screens.scrollIntoViewIfNeeded();

  await expect(screenCards).toHaveCount(3);

  for (const card of await screenCards.all()) {
    await expect(card).toHaveClass(/is-visible/);
  }
});
