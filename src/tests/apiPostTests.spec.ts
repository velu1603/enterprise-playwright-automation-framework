import { test, expect } from "@playwright/test";
import {createRandomBookingBody} from "../lib/datafactory/bookingData"
import { APIActions } from "../lib/APIActions";
import logger from "../utils/LoggerUtil";


//const baseURL = "https://automationintesting.online/"
const apiActions = new APIActions();

test("New booking with full body ",{tag:['@postApi','@api']}, async ({ request }) => {
  logger.info(`Sending post request`)
    const requestBody = await createRandomBookingBody(8,'2024-03-19','2024-03-23')
    // const requestBody = {
    //     "bookingid":2,
    //     "roomid":3,
    //     "firstname":"Test",
    //     "lastname":"Last",
    //     "depositpaid":true,
    //     "email":"test@tester.com",
    //     "phone":"21234455555",
    //     "bookingdates":{
    //         "checkin":"2024-03-10",
    //         "checkout":"2024-03-12"
    //     }
    // }    
    
    logger.info(`Request body sent ${requestBody}`);
    const response = await request.post(`booking/`, {
        data: requestBody
      });

      await apiActions.verifyStatusCode(response);
      //expect(response.status()).toBe(201);

      const responseBody = await response.json();
      expect(responseBody.bookingid).toBeGreaterThan(1);      
      logger.info(`Response body  ${responseBody}`);
   
})