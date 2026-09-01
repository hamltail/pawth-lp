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
      page.getByText("A small journaling app for recording one entry a day", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      page.getByText(
        "Pawth is a journaling app designed to visualize your daily journey and help you commit to today's reflection.",
        {
          exact: true,
        },
      ),
    ).toBeVisible();

    await expect(
      page.getByRole("link", {
        name: "View on GitHub",
      }),
    ).toHaveAttribute("href", "https://github.com/hamltail/Pawth");

    await expect(
      page.getByRole("link", {
        name: "View Concept",
      }),
    ).toHaveAttribute("href", "#concept");

    // Screens
    const screens = page.locator("#screens");

    await expect(
      screens.getByRole("heading", {
        level: 2,
        name: "Three Screens in Pawth",
      }),
    ).toBeVisible();

    await expect(
      screens.getByRole("heading", {
        level: 3,
        name: "Calendar",
      }),
    ).toBeVisible();

    await expect(
      screens.getByRole("heading", {
        level: 3,
        name: "Journal List",
      }),
    ).toBeVisible();

    await expect(
      screens.getByRole("heading", {
        level: 3,
        name: "Journal Entry Modal",
      }),
    ).toBeVisible();

    // Concept
    const concept = page.locator("#concept");

    await expect(
      concept.getByRole("heading", {
        level: 2,
        name: "The Goal Is to Commit to Who You Are Today",
      }),
    ).toBeVisible();

    await expect(
      concept.getByRole("heading", {
        level: 3,
        name: "One Entry per Day",
      }),
    ).toBeVisible();

    await expect(
      concept.getByRole("heading", {
        level: 3,
        name: "No Deleting on the Same Day",
      }),
    ).toBeVisible();

    await expect(
      concept.getByRole("heading", {
        level: 3,
        name: "Up to Three Edits",
      }),
    ).toBeVisible();

    await expect(
      concept.getByRole("heading", {
        level: 3,
        name: "Delete from the Next Day Onward",
      }),
    ).toBeVisible();

    // Design philosophy
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Pawth's Design Philosophy",
      }),
    ).toBeVisible();

    await expect(
      page.getByText("Not a social network", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      page.getByText("No timeline", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      page.getByText("No followers or following", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      page.getByText("Optimized for self-reflection", {
        exact: true,
      }),
    ).toBeVisible();

    // Tech
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "What We Focused on in Development",
      }),
    ).toBeVisible();

    await expect(
      page.getByText("Automated testing (Playwright)", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      page.getByText("Reproducible development environment (Docker)", {
        exact: true,
      }),
    ).toBeVisible();

    // Highlights
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Design Beyond Basic CRUD",
      }),
    ).toBeVisible();

    // Notice
    await expect(
      page.getByText("The production environment is currently offline.", {
        exact: true,
      }),
    ).toBeVisible();

    // Theme switcher
    await expect(
      page.getByRole("button", {
        name: "Light theme",
      }),
    ).toBeEnabled();

    await expect(
      page.getByRole("button", {
        name: "Dark theme",
      }),
    ).toBeEnabled();

    await expect(
      page.getByRole("button", {
        name: "System theme",
      }),
    ).toBeEnabled();

    // Back to top
    await page.evaluate(() => {
      window.scrollTo(0, 1000);
    });

    await expect(
      page.getByRole("button", {
        name: "Back to top",
      }),
    ).toBeVisible();

    // Footer
    await expect(
      page.locator("footer").getByText(`© ${new Date().getFullYear()} Pawth`, {
        exact: true,
      }),
    ).toBeVisible();
  });
});
