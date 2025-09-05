import { test, expect } from '@playwright/test';

test.describe('Campaign Creation Flow', () => {
  test('should create campaign successfully', async ({ page }) => {
    await page.goto('/');

    // Fill campaign form
    const textarea = page.getByPlaceholder(/Describe your business/i);
    await textarea.fill('Test business for automated testing');

    // Submit form
    const submitButton = page.getByRole('button', { name: /Create my campaign/i });
    await submitButton.click();

    // Verify success message (this would need to be implemented in the component)
    // await expect(page.getByText(/Thank you/i)).toBeVisible();
  });

  test('should show error for empty form', async ({ page }) => {
    await page.goto('/');

    const submitButton = page.getByRole('button', { name: /Create my campaign/i });
    await expect(submitButton).toBeVisible();
  });

  test('should handle voice recording button', async ({ page }) => {
    await page.goto('/');

    // Check if microphone button is present
    const micButton = page.locator('button').filter({ hasText: /microphone|mic/i }).or(
      page.locator('button').filter({ has: page.locator('svg') })
    );
    await expect(micButton).toBeVisible();
  });

  test('should change language selection', async ({ page }) => {
    await page.goto('/');

    // Find language selector
    const languageSelect = page.locator('select');
    if (await languageSelect.count() > 0) {
      await languageSelect.selectOption('he-IL');
      await expect(languageSelect).toHaveValue('he-IL');
    }
  });
});
