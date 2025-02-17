import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userId = 'aberkiet';
    const userPassword = '65754323';
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);

    await page.getByRole('button', { name: 'wykonaj' }).click();
    //await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();
    //await page.getByRole('link', { name: 'Przelew wykonany! Chuck' }).click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test.only('successful mobile top-up', async ({ page }) => {
    // Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userId = 'aberkiet';
    const userPassword = '65754323';
    const topupAmount = '100';
    const topupReceiver = '500 xxx xxx';
    const expectedMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`;

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.locator('#widget_1_topup_receiver').selectOption(topupReceiver);
    await page.locator('#widget_1_topup_amount').fill(topupAmount);
    await page.locator('#uniform-widget_1_topup_agreement').click();
    //await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();
    //await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 100,00PLN na numer 500 xxx xxx' );

    // Assert
    await page.getByRole('link', { name: expectedMessage }).click();
    //await expect(page.locator('#show_messages')).toHaveText('Brak wiadomości' );
  });
});
