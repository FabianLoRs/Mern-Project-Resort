import { ObjectId } from 'mongodb';
import { IAuthDocument } from '@auth/interfaces/IAuthDocument.interface';

export interface IReservationData {
	_id: ObjectId;
	guests: IAuthDocument;
	room: number;
	category: string;
	nights: string;
	beds: string;
}
