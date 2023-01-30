/* eslint-disable no-undef */
import Link from "next/link";
import { useEffect, useState } from "react";
import { forgotValidate } from "../../../utils/validations";
import axios from "axios";

//This is how the password is reset
export const FormForgotPassword = () => {
	const [success, setSuccess] = useState(false);

	//Maybe next it will be added to have a formError
	const [formError] = useState("");
	const [values, setValues] = useState({
		email: { target: "" }
	});

	const [fieldError, setfieldError] = useState({});

	const handleSubmit = async (event) => {
		event.preventDefault();

		//The validation if the email is correct
		const errors = forgotValidate({
			email: values.email.target.value
		});

		//Set the error if has length. In other words, if has length has errors.
		if (Object.keys(errors).length) {
			setfieldError(errors);
			return;
		}

		setfieldError({});
		console.log(process.env.NEXT_PUBLIC_API_ADMIN_STRAPI);
		//Send the url of forgot-password to the backend
		await axios
			.post(
				`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
				{
					email: values.email.target.value // user's email
				}
			)
			.then(() => {
				console.log("O usuário recebeu um email!");
				setSuccess(true);
			})
			.catch((error) => {
				console.log("Ocorreu algum erro:", error.response);
			});
		console.log("opa")
	};

	//Handle the input from the frontend in a single function
	const handleInput = (field, value) => {
		setValues((s) => ({ ...s, [field]: value }));
	};

	useEffect(() => {}, []);

	return (
		<>
			<div>
				{success ? (
					<div>
						<h4 className="text-success">
							Clique no link enviado para seu email para resetar
							sua senha!
						</h4>
					</div>
				) : (
					<>
						{!!formError && (
							<div className="alert alert-danger" role="alert">
								{formError}
							</div>
						)}
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label htmlFor="exampleInputEmail1">
									Email
								</label>
								<input
									type="email"
									name="email"
									className={`form-control ${
										formError && "is-invalid"
									} `}
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									onChange={(v) => handleInput("email", v)}
									placeholder="Digite seu email"
									required
								/>
								<p className="text-danger">
									{fieldError?.email}
								</p>
							</div>
							<button
								type="submit"
								className="btn btn-primary mt-4"
							>
								Enviar E-mail
							</button>
						</form>
						<div className="mt-4">
							<Link href="/registrar">
								Não tem uma conta ainda?
							</Link>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default FormForgotPassword;
