import { test } from "../fixtures/loginFixture";

test("Fixture test",{tag: '@fixtureTests'}, async ({ homePage }) => {
  await homePage.expectServiceTitleToBeVisible();
});