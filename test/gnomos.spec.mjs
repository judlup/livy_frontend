import { test, expect } from '@playwright/test';

test('Should validate first gnomo', async ({ page }) => {
  page.setDefaultTimeout(10000);
  await page.goto('http://localhost:3000/');
  await page.waitForSelector('.Gnomos_gnomoContainer__4SFFW.col');
  const text = await page.$eval('.Gnomo_titleLeft__22PWb', (e) => e.textContent);
  expect(text).toBe('Tobus Quickwhistle(306)');
});

test('Should validate that it return 20 gnomos', async ({ page }) => {
  page.setDefaultTimeout(10000);
  await page.goto('http://localhost:3000/');
  await page.waitForSelector('.Gnomos_gnomoContainer__4SFFW.col');
  const text = await page.$$eval('.text-dark.mt-3.border-0.Gnomo_container__8-f0t.card', (e) => e.map((el) => el.textContent));
  expect(text.length).toBe(20);
});
