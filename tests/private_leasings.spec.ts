import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/liising#kalkulaator');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Liising · LHV/);
});
