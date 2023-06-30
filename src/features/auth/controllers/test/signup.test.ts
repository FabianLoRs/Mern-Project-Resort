import { Request, Response } from 'express';
import { authMockRequest, authMockResponse, IJWT } from '@root/shared/globals/mocks/auth.mock';
import { Signup } from '../signup';
import { CustomError } from '@helpers/errors/customError';
import { authService } from '@services/db/auth.service';

jest.useFakeTimers();
jest.mock('@services/db/auth.service');

describe('Signup', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	afterEach(() => {
		jest.clearAllMocks();
		jest.clearAllTimers();
	});

	it('It should throw a error if the phone number is not exist', async () => {
		// Pattern Given
		const req: Request = authMockRequest(
			{},
			{
				name: 'Miguel',
				lastname: 'Chamorro',
				email: 'miguel@gmail.com',
				phoneNumber: '',
				password: '123456'
			}
		) as unknown as Request;

		const res: Response = authMockResponse();

		// Pattern When
		await Signup.prototype.create(req, res).catch((error: CustomError) => {
			// Pattern Then
			expect(error.statusCode).toEqual(400);
			expect(error.serialzeErrors().message).toEqual('Phone number is a required field');
		});
	});

	it('Should create a user', async () => {
		// Pattern Given
		const req: Request = authMockRequest(
			{},
			{
				name: 'Miguel',
				lastname: 'Chamorro',
				email: 'miguel@gmail.com',
				phoneNumber: '912345678',
				password: '123456'
			}
		) as unknown as Request;

		const res: Response = authMockResponse();

		// Pattern When
		jest.spyOn(authService, 'getUserByPhoneNumberOrEmail').mockResolvedValue(null!);

		const authSpy = jest.spyOn(authService, 'createUser');

		// Pattern Then
		await Signup.prototype.create(req, res);

		expect(req.session?.jwt as IJWT).toBeDefined();
		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith({
			message: 'User created successfully',
			user: authSpy.mock.calls[0][0],
			token: req.session?.jwt
		});
	});
});
