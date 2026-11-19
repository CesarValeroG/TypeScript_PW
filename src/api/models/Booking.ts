import { BookingDates } from './BookingDates';

export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds: string;
}
// In Java, a POJO is a class with private fields, getters/setters and a constructor,
// and Jackson/Gson converts JSON <-> object at runtime.
// In TypeScript, an interface only describes the shape of the data (compile time only).
// response.json() already returns a plain object, so no class or getters/setters are needed.