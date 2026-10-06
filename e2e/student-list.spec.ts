import { test, expect } from "@playwright/test";

// Behaviour of the Students list with mock data (24 students, 10 per page)
test.describe("Students list", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/students/list");
    await expect(page.getByTestId("state-filled")).toBeVisible();
  });

  test("opens with title, first page and summary", async ({ page }) => {
    await expect(page).toHaveTitle("Students | Riverside Academy Admin");
    await expect(page.getByTestId("state-filled").locator("tr")).toHaveCount(10);
    await expect(page.getByText("Showing 1-10 of 24")).toBeVisible();
  });

  test("next page shows the remaining rows", async ({ page }) => {
    // Scope to the pagination bar (the Next.js dev tools also has a "Next" button)
    const pagination = page.getByRole("navigation", { name: "Pagination" });
    await pagination.getByRole("button", { name: "3", exact: true }).click();
    await expect(page.getByText("Showing 21-24 of 24")).toBeVisible();
    await expect(pagination.getByRole("button", { name: "Next", exact: true })).toBeDisabled();
  });

  test("search by name finds one student", async ({ page }) => {
    await page.getByLabel("Search").fill("ishita");
    await expect(page.getByText("Showing 1-1 of 1")).toBeVisible();
    await expect(page.getByText("Ishita Chatterjee")).toBeVisible();
  });

  test("search with no match shows no-results, Clear filters brings rows back", async ({ page }) => {
    await page.getByLabel("Search").fill("zzzz");
    await expect(page.getByTestId("state-no-results")).toBeVisible();
    await page.getByRole("button", { name: "Clear filters" }).click();
    await expect(page.getByText("Showing 1-10 of 24")).toBeVisible();
  });

  test("status filter shows only that status", async ({ page }) => {
    await page.getByLabel("Status").selectOption("GRADUATED");
    await expect(page.getByText("Showing 1-4 of 4")).toBeVisible();
  });
});

test("error state recovers with Try again", async ({ page }) => {
  await page.goto("/students/list?state=error");
  await expect(page.getByTestId("state-error")).toBeVisible();
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(page.getByTestId("state-filled")).toBeVisible();
});
