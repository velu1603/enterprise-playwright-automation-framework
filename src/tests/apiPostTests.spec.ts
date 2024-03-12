import { test, expect } from "@playwright/test";
import {createRandomBookingBody} from "../lib/datafactory/bookingData"


const baseURL = "https://automationintesting.online/"

test("@POST new booking with full body @happy", async ({ request }) => {
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
    console.log(requestBody)
    const response = await request.post(`${baseURL}booking/`, {
        data: requestBody
      });

      expect(response.status()).toBe(201);

      const body = await response.json();
      expect(body.bookingid).toBeGreaterThan(1);
      console.log(body)
   
})