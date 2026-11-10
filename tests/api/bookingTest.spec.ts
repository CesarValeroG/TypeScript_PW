import { test, expect } from '../../src/fixtures/BaseTest';
import { BookingBuilder } from '../../src/api/builders/BookingBuilder';
import { Booking } from '../../src/api/models/Booking';

test.describe.configure({ mode: 'serial' });

test.describe('BookingTest', () => {
  let bookingId: number;

  test('createBookingTest', async ({ apiClient }) => {
    const booking = new BookingBuilder()
      .withFirstname('Jim')
      .withLastname('Brown')
      .withTotalprice(111)
      .withDepositpaid(true)
      .withBookingdates('2018-07-01', '2019-07-20')
      .withAdditionalneeds('Breakfast')
      .build();

    const response = await apiClient.createBooking(booking);
    expect(response.status()).toBe(200);

    const body = await response.json();
    bookingId = body.bookingid;
    console.log(`Booking ID: ${bookingId}`);
  });

  test('getBookingTest', async ({ apiClient }) => {
    const response = await apiClient.getBooking(bookingId);
    expect(response.status()).toBe(200);

    const booking = (await response.json()) as Booking;
    expect(booking.firstname).toBe('Jim');
  });

  test('updateBookingTest', async ({ apiClient }) => {
    const updatedBooking = new BookingBuilder()
      .withFirstname('James')
      .withLastname('Bond')
      .withTotalprice(255)
      .withDepositpaid(false)
      .withBookingdates('2020-08-06', '2020-08-20')
      .withAdditionalneeds('Lunch')
      .build();

    const response = await apiClient.updateBooking(bookingId, updatedBooking);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.firstname).toBe('James');
  });

  test('deleteBookingTest', async ({ apiClient }) => {
    const response = await apiClient.deleteBooking(bookingId);
    expect(response.status()).toBe(201);
  });
});