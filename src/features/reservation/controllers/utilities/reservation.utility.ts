import { IReservationDocument } from '@reservation/interfaces/IReservationDocument.interface';
import { IReservationData } from '@reservation/interfaces/IReservationData.interface';
import { Generators } from '@helpers/generators/generators';

export abstract class ReservationUtility {
	protected reservationData(data: IReservationData): IReservationDocument {
		const { _id, guests, room, category, nights, beds } = data;

		return {
			_id,
			guests,
			room,
			category: Generators.firstLetterUppercase(category),
			nights,
			beds,
			createdAt: new Date()
		} as unknown as IReservationDocument;
	}
}
