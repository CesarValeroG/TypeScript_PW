import { APIRequestContext, APIResponse } from '@playwright/test';
import { EndpointManager } from '../endpoints/EndpointManager';
import { Booking } from '../models/Booking';

export class ApiClient {
    private readonly request: APIRequestContext;

    //Preemptive basic auth header, same as .auth().preemptive().basic("admin", "password123")
     private readonly authHeader =
    'Basic ' + Buffer.from('admin:password123').toString('base64');

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createBooking(booking: Booking): Promise<APIResponse> {
        return this.request.post(EndpointManager.BOOKING, { data: booking });
    }

    async getBooking(bookingId: number): Promise<APIResponse> {
        return this.request.get(EndpointManager.bookingById(bookingId));
    } 

    async updateBooking(bookingId: number, booking: Booking): Promise<APIResponse> {
        return this.request.put(EndpointManager.bookingById(bookingId), {
            data: booking,
            headers: { Authorization: this.authHeader },
        });
    }

    async deleteBooking(bookingId: number): Promise<APIResponse> {
        return this.request.delete(EndpointManager.bookingById(bookingId), {
            headers: { Authorization: this.authHeader },
        });
    }
}