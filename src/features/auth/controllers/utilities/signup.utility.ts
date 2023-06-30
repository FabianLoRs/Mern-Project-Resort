import { ObjectId } from 'mongodb';
import JWT from 'jsonwebtoken';
import { IAuthDocument } from '@auth/interfaces/IAuthDocument.interface';
import { ISignupData } from '@auth/interfaces/ISignupData.interface';
import { config } from '@configs/configEnvs';
import { Generators } from '@helpers/generators/generators';

export abstract class SignUpUtility {
	protected signUpData(data: ISignupData): IAuthDocument {
		const { _id, name, lastname, email, password, phoneNumber } = data;

		return {
			_id,
			name: Generators.firstLetterUppercase(name),
			lastname: Generators.firstLetterUppercase(lastname),
			email: Generators.lowerCase(email),
			password,
			phoneNumber,
			createdAt: new Date()
		} as unknown as IAuthDocument;
	}

	protected signToken(data: IAuthDocument, userObjectId: ObjectId): string {
		return JWT.sign(
			{
				userId: userObjectId,
				name: data.name,
				lastname: data.lastname,
				email: data.email
			},
			config.JWT_TOKEN!
		);
	}
}
