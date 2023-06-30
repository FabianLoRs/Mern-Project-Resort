import { IReservationDocument } from '@reservation/interfaces/IReservationDocument.interface';
import { ReservationSchema } from '@reservation/models/reservation.schema';

// SOLID Open/Close
// Single Responsability
class ReservationService {
	public async createReservation(data: IReservationDocument): Promise<IReservationDocument> {
		const reservation: IReservationDocument = await ReservationSchema.create(data);

		return reservation;
	}

	public async getReservationById(reservationId: string): Promise<IReservationDocument> {
		const reservation: IReservationDocument = (await ReservationSchema.findById({ _id: reservationId }).populate([
			{ path: 'guests', select: 'name lastname' }
		])) as unknown as IReservationDocument;

		return reservation;
	}

	public async editReservation(id: string, extendNights: string): Promise<IReservationDocument> {
		const reservation: IReservationDocument = (await ReservationSchema.updateOne(
			{ _id: id },
			{ $set: { nights: extendNights } }
		)) as unknown as IReservationDocument;

		return reservation;
	}

	public async deleteReservation(reservationId: string): Promise<void> {
		await ReservationSchema.deleteOne({ _id: reservationId });
	}
}

export const reservationService: ReservationService = new ReservationService();
