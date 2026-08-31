import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("重大なアクセシビリティ違反がない", async ({ page }) => {
  await page.goto("/");

  const accessibilityScanResults = await new AxeBuilder({ page })
    .disableRules(["color-contrast"])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
