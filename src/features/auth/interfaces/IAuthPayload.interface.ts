declare global {
	namespace Express {
		interface Request {
			currentUser?: IAuthPayload;
		}
	}
}

export interface IAuthPayload {
	userId: string;
	name: string;
	lastname: string;
	email: string;
	iat?: number;
}
