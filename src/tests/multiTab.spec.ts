import {test, expect} from "@playwright/test"
import logger from "../utils/LoggerUtil";



//  test('@multiTab Multi tabbing', async ({ browser }) => {   
//    const context = await browser.newContext()
//    const page = await context.newPage()
//    await page.goto(https://freelance-learn-automation.vercel.app/login)

// const[newPage]= await Promise.all
// (
//           [
//             context.waitForEvent("page"),
//             page.locator("(//a[contains(@href,'linkedin')])[1]").click()

//           ]
//  )
//           await expect(newPage).toHaveURL(https://www.linkedin.com/in/mukesh-otwani-93631b99/)
 
//           await page.locator('#email1').fill(Admin@email.com)
//           await newPage.close()
//           await page.locator('#password1').fill("admin1234")

//  }) 

test('@multiTab Open new tab', async({context, page})=>{
  const url = "https://www.checklyhq.com/"
    await page.goto(url)
          logger.info(`Currently in parent page : ${url}`);
          const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            page.getByRole('link',{name: 'Start for'}).nth(0).click()  
          ])
          const newUrl= newPage.url()
          logger.info(`Switched to ${newUrl}`);
          await page.screenshot({path:'screenshot-tab-old.png'})
          
          await newPage.getByLabel('email').fill('admin@admin.com')
         await newPage.screenshot({ path: 'screenshot-tab-new.png' })
         await newPage.close();
         await page.screenshot({path:'screenshot-tab-old_1.png'})  
   })
  