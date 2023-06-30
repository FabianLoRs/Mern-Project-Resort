import { ObjectId } from 'mongodb';

// SOLID Interface Segregation
export interface ISignupData {
	_id: ObjectId;
	name: string;
	lastname: string;
	email: string;
	password: string;
	phoneNumber: string;
}
