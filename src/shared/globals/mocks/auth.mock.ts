import { Response } from 'express';
import { IAuthPayload } from '@auth/interfaces/IAuthPayload.interface';

export const authMockRequest = (
	sessionData: IJWT,
	body: IAuthMock,
	currentUser?: IAuthPayload | null,
	params?: unknown
) => ({
	sessionData: sessionData,
	body,
	currentUser,
	params
});

export const authMockResponse = (): Response => {
	const res: Response = {} as Response;
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res;
};

export interface IJWT {
	jwt?: string;
}

export interface IAuthMock {
	_id?: string;
	name?: string;
	lastname?: string;
	email?: string;
	password?: string;
	phoneNumber?: string;
	createdAt?: Date | string;
}
