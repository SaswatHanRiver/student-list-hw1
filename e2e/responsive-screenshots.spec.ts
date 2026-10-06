import { test, expect, type Page } from "@playwright/test";

// WM breakpoints, biggest to smallest
const WIDTHS = [1920, 1600, 1366, 1280, 1024, 991, 768, 640, 480, 375];
const HEIGHT = 900;

// Every state the screen can show, and the test id that proves it rendered
const STATES = [
  { name: "filled", query: "", testId: "state-filled" },
  { name: "loading", query: "?state=loading", testId: "state-loading" },
  { name: "empty", query: "?state=empty", testId: "state-empty" },
  { name: "error", query: "?state=error", testId: "state-error" },
];

// Smallest clickable size we accept (WCAG 2.2 target size minimum)
const MIN_TARGET_PX = 24;

// True if the page itself can scroll sideways
async function hasSidewaysScroll(page: Page): Promise<boolean> {
  return page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
}

for (const state of STATES) {
  for (const width of WIDTHS) {
    test(`${state.name} @ ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: HEIGHT });
      await page.goto(`/students/list${state.query}`);

      // The right state is on screen, with the right heading
      await expect(page.getByTestId(state.testId)).toBeVisible();
      await expect(page.getByRole("heading", { level: 1, name: "Students" })).toBeVisible();

      // No sideways scroll at this width
      expect(await hasSidewaysScroll(page), "page scrolls sideways").toBe(false);

      // Every visible button / input / select is big enough to tap
      const controls = page.locator("button:visible, input:visible, select:visible");
      const count = await controls.count();
      for (let index = 0; index < count; index++) {
        const box = await controls.nth(index).boundingBox();
        if (box) {
          expect(box.height, `control ${index} too short`).toBeGreaterThanOrEqual(MIN_TARGET_PX);
          expect(box.width, `control ${index} too narrow`).toBeGreaterThanOrEqual(MIN_TARGET_PX);
        }
      }

      await page.screenshot({ path: `screenshots/${state.name}/${state.name}-${width}.png`, fullPage: true });
    });
  }
}
