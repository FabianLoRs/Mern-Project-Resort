import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { joiValidation } from '@decorators/joi-validation.decorators';
import { SignUpUtility } from './utilities/signup.utility';
import { signupScheme } from '@auth/schemes/signup';
import { authService } from '@services/db/auth.service';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { IAuthDocument } from '@auth/interfaces/IAuthDocument.interface';
import { Generators } from '@helpers/generators/generators';
import HTTP_STATUS from 'http-status-codes';

export class Signup extends SignUpUtility {
	@joiValidation(signupScheme)
	public async create(req: Request, res: Response): Promise<void> {
		const { name, lastname, email, password, phoneNumber } = req.body;

		const checkIfUserExist = await authService.getUserByPhoneNumberOrEmail(phoneNumber, email);

		console.log(checkIfUserExist, 'esto es checkIfUserExist');

		if (checkIfUserExist) {
			throw new BadRequestError('Invalid credentials for this user');
		}

		const authObjectId: ObjectId = new ObjectId();
		const userObjectId: ObjectId = new ObjectId();

		const passwordHash = await Generators.hash(password);

		const authData: IAuthDocument = Signup.prototype.signUpData({
			_id: authObjectId,
			name,
			lastname,
			email,
			password: passwordHash,
			phoneNumber
		});

		await authService.createUser(authData);

		const userJwt: string = Signup.prototype.signToken(authData, userObjectId);
		console.log(userJwt, 'esto es userJwt');
		req.session = { jwt: userJwt };

		res.status(HTTP_STATUS.CREATED).json({ message: 'User created successfully', user: authData, token: userJwt });
	}
}
