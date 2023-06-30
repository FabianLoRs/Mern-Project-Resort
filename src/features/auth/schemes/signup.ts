import Joi, { ObjectSchema } from 'joi';

const signupScheme: ObjectSchema = Joi.object().keys({
	name: Joi.string().required().min(3).max(15).messages({
		'string.base': 'Name must be of type string',
		'string.min': 'Invalid Name',
		'string.max': 'Invalid Name',
		'string.empty': 'Name is a required field'
	}),
	lastname: Joi.string().required().min(3).max(15).messages({
		'string.base': 'LastName must be of type string',
		'string.min': 'Invalid LastName',
		'string.max': 'Invalid LastName',
		'string.empty': 'LastName is a required field'
	}),
	email: Joi.string().required().email().messages({
		'string.base': 'Email must be of type string',
		'string.email': 'Email must be valid',
		'string.empty': 'Email is a required field'
	}),
	password: Joi.string().required().min(4).max(8).messages({
		'string.base': 'Password must be of type string',
		'string.min': 'Invalid password',
		'string.max': 'Invalid password',
		'string.empty': 'Password is a required field'
	}),
	phoneNumber: Joi.string().required().min(9).max(12).messages({
		'string.base': 'Phone number must be of type string',
		'string.min': 'Invalid Phone number',
		'string.max': 'Invalid Phone number',
		'string.empty': 'Phone number is a required field'
	})
});

export { signupScheme };
