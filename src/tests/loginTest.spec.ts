import { expect, test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "../utils/LoggerUtil";
import { decrypt, encrypt } from "../utils/CryptojsUtil";
import { encryptEnvFile } from "../utils/EncryptEnvFile";


const authFile = "src/config/auth.json";

test("Simple login test",{tag: ['@smoke', '@regression']}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername(decrypt(process.env.userid!));
  await loginPage.fillPassword(decrypt(process.env.password!));
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectServiceTitleToBeVisible();
  logger.info("Test for login is completed");
  await page.context().storageState({ path: authFile });
  logger.info("Auth state is saved");
});

// test.skip("Login with auth file", async ({ browser }) => {
//   const context = await browser.newContext({ storageState: authFile });
//   const page = await context.newPage();
//   await page.goto(
//     "https://sogetiuk2-dev-ed.develop.lightning.force.com/lightning/setup/SetupOneHome/home"
//   );
//   await expect(page.getByRole("link", { name: "Accounts" })).toBeVisible();
// });

// test("Sample env test", async ({ page }) => {
//   console.log(process.env.NODE_ENV);
//   console.log(process.env.userid);
//   console.log(process.env.password);  
// });


test.skip("Sample env test with encryption",{tag: '@encypt'}, async ({ page }) => {
  const plaintext = 'Hello, Mars!';
  const encryptedText = encrypt(plaintext);
  console.log('SALT:', process.env.SALT);
  console.log('Encrypted:', encryptedText);
  const decryptedText = decrypt(encryptedText);
  console.log('Decrypted:', decryptedText);
  encryptEnvFile();

});