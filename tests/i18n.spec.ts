import { expect, test } from "@playwright/test";

test.describe("English locale", () => {
  test("ブラウザ言語が英語の場合は主要コンテンツを英語で表示する", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    // Hero
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Pawth/,
      }),
    ).toBeVisible();

    await expect(
      page.getByText(
        "A daily journal for leaving one small footprint each day",
        {
          exact: true,
        },
      ),
    ).toBeVisible();

    await expect(
      page.getByText(
        "Record your day, then look back on your journey through the calendar and timeline.",
        {
          exact: true,
        },
      ),
    ).toBeVisible();

    // Screens
    const screens = page.locator("#screens");

    await expect(
      screens.getByRole("heading", {
        level: 2,
        name: "What You Can Do with Pawth",
      }),
    ).toBeVisible();

    for (const title of ["Calendar", "Timeline", "Customize"]) {
      await expect(
        screens.getByRole("heading", {
          level: 3,
          name: title,
        }),
      ).toBeVisible();
    }

    // Usability
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Simple and Easy to Use",
      }),
    ).toBeVisible();

    for (const title of ["Simple UI", "Swipe Support", "Responsive Design"]) {
      await expect(
        page.getByRole("heading", {
          level: 3,
          name: title,
        }),
      ).toBeVisible();
    }

    // Theme Colors
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Make It Feel Like Yours",
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "Enlarge dark theme screen",
      }),
    ).toBeVisible();

    // Notice
    await expect(
      page.getByText("The production environment is currently offline.", {
        exact: true,
      }),
    ).toBeVisible();

    // Theme switcher
    for (const name of ["Light theme", "Dark theme", "System theme"]) {
      await expect(
        page.getByRole("button", {
          name,
          exact: true,
        }),
      ).toBeEnabled();
    }

    // Language switcher
    const footer = page.locator("footer");

    await expect(
      footer.getByRole("button", {
        name: "English",
      }),
    ).toHaveAttribute("aria-pressed", "true");

    await expect(
      footer.getByRole("button", {
        name: "日本語",
      }),
    ).toHaveAttribute("aria-pressed", "false");

    // Footer
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

    // Back to top
    await page.evaluate(() => {
      window.scrollTo(0, 1000);
    });

    await expect(
      page.getByRole("button", {
        name: "Back to top",
      }),
    ).toBeVisible();
  });

  test("Footerから日本語へ切り替え、リロード後も選択を保持する", async ({
    page,
  }) => {
    await page.goto("/");

    const footer = page.locator("footer");

    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    await footer
      .getByRole("button", {
        name: "日本語",
      })
      .click();

    await expect(page.locator("html")).toHaveAttribute("lang", "ja");

    await expect(
      page.getByText("日々の足あとを残す、1日1投稿の日記アプリ", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      footer.getByRole("button", {
        name: "日本語",
      }),
    ).toHaveAttribute("aria-pressed", "true");

    await expect(
      footer.getByRole("button", {
        name: "English",
      }),
    ).toHaveAttribute("aria-pressed", "false");

    await page.reload();

    await expect(page.locator("html")).toHaveAttribute("lang", "ja");

    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Pawthでできること",
      }),
    ).toBeVisible();

    await expect(
      page.locator("footer").getByRole("button", {
        name: "日本語",
      }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  test("日本語から英語へ戻し、リロード後も選択を保持する", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");

    await footer
      .getByRole("button", {
        name: "日本語",
      })
      .click();

    await expect(page.locator("html")).toHaveAttribute("lang", "ja");

    await footer
      .getByRole("button", {
        name: "English",
      })
      .click();

    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    await expect(
      page.getByText(
        "A daily journal for leaving one small footprint each day",
        {
          exact: true,
        },
      ),
    ).toBeVisible();

    await expect(
      footer.getByRole("button", {
        name: "English",
      }),
    ).toHaveAttribute("aria-pressed", "true");

    await page.reload();

    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "What You Can Do with Pawth",
      }),
    ).toBeVisible();

    await expect(
      page.locator("footer").getByRole("button", {
        name: "English",
      }),
    ).toHaveAttribute("aria-pressed", "true");
  });
});
