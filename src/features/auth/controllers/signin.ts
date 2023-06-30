import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { joiValidation } from '@decorators/joi-validation.decorators';
import { authService } from '@services/db/auth.service';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { signinScheme } from '@auth/schemes/signin';
import { IAuthDocument } from '@auth/interfaces/IAuthDocument.interface';
import { config } from '@configs/configEnvs';
import HTTP_STATUS from 'http-status-codes';

export class Signin {
	@joiValidation(signinScheme)
	public async read(req: Request, res: Response): Promise<void> {
		const { email, password } = req.body;

		const existingUser: IAuthDocument = await authService.getUserByEmail(email);

		if (!existingUser) {
			throw new BadRequestError('Invalid credentials');
		}

		const passwordMatch: boolean = await existingUser.comparePassword(password);

		if (!passwordMatch) {
			throw new BadRequestError('Invalid credentials');
		}

		const userJwt: string = JWT.sign(
			{
				userId: existingUser._id,
				name: existingUser.name,
				lastname: existingUser.lastname,
				email: existingUser.email
			},
			config.JWT_TOKEN!
		);

		req.session = { jwt: userJwt };
		res.status(HTTP_STATUS.OK).json({ message: 'User login successfully', user: existingUser, token: userJwt });
	}
}
