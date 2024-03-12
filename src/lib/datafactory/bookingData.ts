import { faker } from "@faker-js/faker";

export async function createRandomBookingBody(roomId: number, checkInString: string, checkOutString: string,bookingId?: number) {
    const bookingBody ={
        roomid: roomId,
        bookingid: bookingId,
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        depositpaid: Math.random() < 0.5,
        email: faker.internet.email(),
        phone: faker.phone.number(),
        //phone: faker.string.numeric(1365968974),
        bookingdates:{
            checkin: checkInString,
            checkout: checkOutString
        }, 
    }
    return bookingBody;
}