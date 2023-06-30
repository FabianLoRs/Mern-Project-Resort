import { IAuthDocument } from '@auth/interfaces/IAuthDocument.interface';
import { AuthModel } from '@auth/models/auth.schema';
import { Generators } from '@helpers/generators/generators';

// SOLID Open/Close
// Single Responsability
class AuthService {
	public async createUser(data: IAuthDocument): Promise<void> {
		await AuthModel.create(data);
	}

	public async getUserByPhoneNumberOrEmail(phoneNumber: string, email: string): Promise<IAuthDocument> {
		const query = {
			$or: [{ phoneNumber: phoneNumber }, { email: Generators.lowerCase(email) }]
		};

		const user: IAuthDocument = (await AuthModel.findOne(query).exec()) as IAuthDocument;

		return user;
	}

	public async getUserByEmail(email: string): Promise<IAuthDocument> {
		const user: IAuthDocument = (await AuthModel.findOne({
			email: Generators.lowerCase(email)
		}).exec()) as IAuthDocument;

		return user;
	}
}

export const authService: AuthService = new AuthService();
