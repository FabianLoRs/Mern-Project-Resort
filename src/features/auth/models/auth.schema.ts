import { IAuthDocument } from '@auth/interfaces/IAuthDocument.interface';
import { Schema, Model, model } from 'mongoose';
import { compare } from 'bcryptjs';

// Design Patern AAA y Security for Design
const authSchema: Schema = new Schema(
	{
		name: { type: 'String' },
		lastname: { type: 'String' },
		email: { type: 'String' },
		password: { type: 'String' },
		phoneNumber: { type: 'String' },
		createdAt: { type: Date, default: Date.now() }
	},
	{
		toJSON: {
			transform(_doc, ret) {
				delete ret.password;
				return ret;
			}
		}
	}
);

authSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
	const hashedPassword: string = (this as IAuthDocument).password!;
	return compare(password, hashedPassword);
};

const AuthModel: Model<IAuthDocument> = model<IAuthDocument>('Auth', authSchema, 'Auth');
export { AuthModel };
