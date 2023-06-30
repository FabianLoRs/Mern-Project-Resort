import Joi, { ObjectSchema } from 'joi';

const reservationScheme: ObjectSchema = Joi.object().keys({
	category: Joi.string().required().min(4).messages({
		'string.base': 'Category must be of type string',
		'string.min': 'Invalid Category',
		'string.empty': 'Category is a required field'
	}),
	nights: Joi.string().required().min(1).messages({
		'string.base': 'Nights must be of type string',
		'string.min': 'Invalid Nights',
		'string.empty': 'Nights is a required field'
	}),
	beds: Joi.string().required().min(1).messages({
		'string.base': 'Beds must be of type string',
		'string.min': 'Invalid Beds',
		'string.empty': 'Beds is a required field'
	})
});

export { reservationScheme };
