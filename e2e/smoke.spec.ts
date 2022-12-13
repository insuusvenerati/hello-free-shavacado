import { test, expect } from "@playwright/test";

test.use({
  viewport: {
    height: 1080,
    width: 1920,
  },
});

test("smoke tests", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "Login" }).click();
  await expect(page).toHaveURL("http://localhost:3000/login");

  await page.getByLabel("Email address").click();

  await page.getByLabel("Email address").fill("rachel@remix.run");

  await page.getByLabel("Email address").press("Tab");

  await page.getByLabel("Password").fill("racheliscool");

  await page.getByRole("button", { name: "Log in" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");

  await page.getByRole("button", { name: "placeholder" }).click();

  await page.getByRole("menuitem", { name: "Favorites" }).click();
  await expect(page).toHaveURL("http://localhost:3000/user/favorites");

  await page.getByRole("menuitem", { name: "Imported" }).click();
  await expect(page).toHaveURL("http://localhost:3000/user/imported");

  await page.getByRole("menuitem", { name: "Logout" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");
});
