import { expect, Locator, Page, test } from '@playwright/test';

async function getAccessibleDescription(
  element: Locator,
  page: Page,
): Promise<string> {
  const describedById = await element.getAttribute('aria-describedby');
  return await page.locator(`[id='${describedById}']`).textContent();
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('has autofocus on email field', async ({ page }) => {
  await expect(page.getByLabel('Email')).toBeFocused();
});

test('mark required fields invalid after submit', async ({ page }) => {
  const emailField = await page.getByLabel('Email');
  const passwordField = await page.getByLabel('Password');

  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(emailField).toHaveAttribute('aria-invalid', 'true');
  const emailDescription = await getAccessibleDescription(emailField, page);
  await expect(emailDescription).toBe('Please fill out this field.');

  await expect(passwordField).toHaveAttribute('aria-invalid', 'true');
  const passwordDescription = await getAccessibleDescription(
    passwordField,
    page,
  );
  await expect(passwordDescription).toBe('Please fill out this field.');
});

test('mark email field invalid for non-valid email value', async ({ page }) => {
  const emailField = await page.getByLabel('Email');
  await emailField.type('username');
  await emailField.evaluate((e) => e.blur());

  await expect(emailField).toHaveAttribute('aria-invalid', 'true');

  const emailDescription = await getAccessibleDescription(emailField, page);
  await expect(emailDescription).toBe(
    `Please include an '@' in the email address. 'username' is missing an '@'.`,
  );
});

test('mark email field valid for valid email value', async ({ page }) => {
  const emailField = await page.getByLabel('Email');
  await emailField.type('username@gmail.com');
  await emailField.evaluate((e) => e.blur());
  await expect(emailField).not.toHaveAttribute('aria-invalid', 'true');
});

test('mark password field invalid for <8 length password', async ({ page }) => {
  const passwordField = await page.getByLabel('Password');
  passwordField.type('12345');
  await passwordField.evaluate((e) => e.blur());

  await expect(passwordField).toHaveAttribute('aria-invalid', 'true');

  const description = await getAccessibleDescription(passwordField, page);
  await expect(description).toBe(
    'Please lengthen this text to 8 characters or more (you are currently using 5 characters).',
  );
});

test('mark password field valid for >=8 length password', async ({ page }) => {
  const passwordField = await page.getByLabel('Password');
  passwordField.type('12345678');
  await passwordField.evaluate((e) => e.blur());
  await expect(passwordField).not.toHaveAttribute('aria-invalid', 'true');
});

test('invalid form not submitted to backend', async ({ page }) => {
  let signInRequestWasMade = false;

  page.on('request', (request) => {
    if (request) {
      signInRequestWasMade = true;
    }
  });

  await page.getByRole('button', { name: 'Continue' }).click();

  expect(signInRequestWasMade).toBeFalsy();
});

test('valid form submitted to backend', async ({ page }) => {
  let signInRequestWasMade = false;

  page.on('request', (request) => {
    if (request) {
      signInRequestWasMade = true;
    }
  });

  await page.getByLabel('Email').type('username@gmail.com');
  await page.getByLabel('Password').type('12345678');
  await page.getByRole('button', { name: 'Continue' }).click();

  expect(signInRequestWasMade).toBeTruthy();
});

test('should show homepage after success login', async ({ page }) => {
  await page.getByLabel('Email').type('username@gmail.com');
  await page.getByLabel('Password').type('12345678');
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByText('Logged in as')).toBeTruthy();
});
