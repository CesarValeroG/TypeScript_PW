export class EndpointManager {
  static readonly BASE_URL = 'https://restful-booker.herokuapp.com';
  static readonly BOOKING = `${EndpointManager.BASE_URL}/booking`;

  // Builds the URL for a specific booking, replaces String.format(BOOKING_BY_ID, id)
  static bookingById(id: number | string): string {
    return `${EndpointManager.BOOKING}/${id}`;
  }
}