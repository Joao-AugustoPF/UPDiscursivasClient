import Joi from "joi";

const fieldsValidations = {
	username: Joi.string().min(4).required().messages({ "string.min": `"Nome" não pode ter menos de 4 caracteres` }),
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	password: Joi.string().required(),
	confirm_password: Joi.string()
		.valid(Joi.ref("password"))
		.required()
		.messages({ "any.only": "Confirmação de senha não bate com a Senha" })
};

function getFieldErrors(objError) {
	const errors = {};

	if (objError.error) {
		objError.error.details.forEach((err) => {
			errors[err.path.join(".")] = err.message;
		});
	}
	return errors;
}

export function signUpValidate(values) {
	const schema = Joi.object(fieldsValidations);

	return getFieldErrors(schema.validate(values, { abortEarly: false }));
}

export function signInValidate(values) {
	const { email, password } = fieldsValidations;
	const schema = Joi.object({ email, password });

	return getFieldErrors(schema.validate(values, { abortEarly: false }));
}

export function forgotValidate(values) {
	const { email } = fieldsValidations;
	const schema = Joi.object({ email });

	return getFieldErrors(schema.validate(values, { abortEarly: false }));
}

export function resetValidate(values) {
	const { password, confirm_password } = fieldsValidations;
	const schema = Joi.object({ password, confirm_password });

	return getFieldErrors(schema.validate(values, { abortEarly: false }));
}
