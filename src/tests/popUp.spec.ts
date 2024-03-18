import {test, expect} from "@playwright/test"

// test('@popUp Handle Modal Popup', async({page})=>{
    
//     await page.goto(http://autopract.com/selenium/popup/)
    
//     // Click on JQuery Popup Modal button
//     await page.locator('a.open-button').click()

//     //Print Popup Content
//     console.log(await page.locator('div.popup-content').textContent())

//     //close the popup
//     await page.locator('a.close-button').click()
// }) 

test('Browser Window Based Popup using Popup Event',{tag: ['@popUp', '@regression']}, async({page})=>{
    await page.goto("http://autopract.com/selenium/popup/")

    const [myPopup] = await Promise.all([
        page.waitForEvent('popup'),
        // Click - Open Link in Popup
        page.locator("a[target='popup']").click() 
      ])
      
      await myPopup.waitForLoadState();

      // title of popup
      console.log(await myPopup.title());
      // title of existing page
      console.log(await page.title());
})
