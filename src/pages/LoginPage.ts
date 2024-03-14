import { Locator, Page } from "@playwright/test";
import { BasePage } from "./Base.page";
import HomePage from "./HomePage";
import logger from "../utils/LoggerUtil";

// Used super class constuctor (from Base page) => Can be implemented for other POM page classes
export default class LoginPage extends BasePage {
  // private readonly usernameInputSelector = "#username";
  // private readonly passwordInputSelector = "#password";
  // private readonly loginButtonSelector = "#Login";
  private readonly usernameInputSelector: Locator;
  private readonly passwordInputSelector: Locator;
  private readonly loginButtonSelector: Locator;

  constructor( page: Page) {
    super(page);
    this.usernameInputSelector = page.locator("#username")
    this.passwordInputSelector = page.locator("#password")
    this.loginButtonSelector = page.locator("#Login")
  }

  async quickLogin(username: string, password: string) {
    await this.navigateToLoginPage();
    await this.fillUsername(username);
    await this.fillPassword(password);
    return await this.clickLoginButton();
  }

  async navigateToLoginPage() {
    await this.page.goto("/");
    logger.info("Navigated to login.salesforce.com");
  }

  async fillUsername(username: string) {
    await this.usernameInputSelector.fill(username);
    logger.info("Filled username");
  }

  async fillPassword(password: string) {
    await this.passwordInputSelector.fill(password);
    logger.info("Filled pasword");
  }

  async clickLoginButton() {
    await 
      this.loginButtonSelector
      .click()
      .catch((error) => {
        logger.error(`Error clicking login button: ${error}`);
        throw error; // rethrow the error if needed
      })
      .then(() => logger.info("Clicked login button"));

    const homePage = new HomePage(this.page);
    return homePage;
  }
}
