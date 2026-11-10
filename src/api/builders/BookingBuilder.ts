import { Booking } from '../models/Booking';

export class BookingBuilder {
  private readonly booking: Partial<Booking> = {};

  withFirstname(firstname: string): this {
    this.booking.firstname = firstname;
    return this;
  }

  withLastname(lastname: string): this {
    this.booking.lastname = lastname;
    return this;
  }

  withTotalprice(totalprice: number): this {
    this.booking.totalprice = totalprice;
    return this;
  }

  withDepositpaid(depositpaid: boolean): this {
    this.booking.depositpaid = depositpaid;
    return this;
  }

  withBookingdates(checkin: string, checkout: string): this {
    this.booking.bookingdates = { checkin, checkout };
    return this;
  }

  withAdditionalneeds(additionalneeds: string): this {
    this.booking.additionalneeds = additionalneeds;
    return this;
  }

  build(): Booking {
    return this.booking as Booking;
  }
}