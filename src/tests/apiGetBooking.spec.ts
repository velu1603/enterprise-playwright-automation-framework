import { test, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil";

const baseURL = "https://automationintesting.online/"
const savedToken= "STbg2e7upZNg4ULF"

test.skip("@apiTest GET booking summary", async ({request})=>{
    const response = await request.get("https://automationintesting.online/booking/summary?roomid=1");
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(JSON.stringify(body));
    logger.info(`Response body returned is ${JSON.stringify(body)}`);    
})

test.describe("@apiTest booking/summary?roomid={id}", async () => {
    test("GET booking summary with specific room id", async ({ request }) => {
      const response = await request.get(`${baseURL}booking/summary?roomid=1`);
  
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.bookings.length).toBeGreaterThanOrEqual(1);
      expect(isValidDate(body.bookings[0].bookingDates.checkin)).toBe(true);
      expect(isValidDate(body.bookings[0].bookingDates.checkout)).toBe(true);
    });
  });

  test.only("@apiTest GET all bookings with details", async ({ request }) => {
    const response = await request.get(`${baseURL}booking/`, {
      headers: { cookie: `token=${savedToken}` },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.bookings.length).toBeGreaterThanOrEqual(1);
    expect(body.bookings[0].bookingid).toBe(1);
    expect(body.bookings[0].roomid).toBe(1);
    expect(body.bookings[0].firstname).toBe("James");
    expect(body.bookings[0].lastname).toBe("Dean");
    expect(body.bookings[0].depositpaid).toBe(true);
    expect(isValidDate(body.bookings[0].bookingdates.checkin)).toBe(true);
    expect(isValidDate(body.bookings[0].bookingdates.checkout)).toBe(true);
  });
  
  export function isValidDate(date: string) {
    if (Date.parse(date)) {
      return true;
    } else {
      return false;
    }
  }
function auth(arg0: string, arg1: string) {
  throw new Error("Function not implemented.");
}

