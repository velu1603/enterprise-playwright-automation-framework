import { defineConfig, devices } from "@playwright/test";
import { testConfig } from "../testConfig";
import { testPlanFilter } from "allure-playwright/dist/testplan";
const ENV = process.env.npm_config_ENV;

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

if (!ENV || ![`qa`, `dev`, `qaApi`, `devApi`].includes(ENV)) {
  console.log(`Please provide a correct environment value after command like "--ENV=qa|dev|qaApi|devApi"`);
  process.exit();
}

if (!process.env.NODE_ENV) {
  require("dotenv").config({ path: `${__dirname}//src//config//.env` });
} else {
  require("dotenv").config({
    path: `${__dirname}//src//config//.env.${process.env.NODE_ENV}`,
  });
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 60000,

  testDir: "./src/tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html"],
    [
      "allure-playwright",
      {
        detail: true,
        outputFolder: "allure-results",
        suiteTitle: true,
        categories: [
          {
            name: "Outdated tests",
            messageRegex: ".*FileNotFound.*",
          },
        ],
        environmentInfo: {
          framework: "playwright",
        },
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    baseURL: "https://login.salesforce.com",
    // baseURL: "https://reqres.in",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    screenshot: "on",
    video: "on"
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], 
      viewport: { width: 1500, height: 730 },    
      headless:false 
    }, 
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    // /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
    {
      name: `API`,
      use: {
        baseURL: testConfig[ENV]
      }
    }
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
