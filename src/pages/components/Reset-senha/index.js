/* eslint-disable no-undef */
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { resetValidate } from "../../../utils/validations";
import { useRouter } from "next/router";
import { FormLoading } from "../../../lib/Form/index";
import axios from "axios";

export const FormResetPassword = () => {
	//Sets the form and field error which appears in the frontend
	const [formError] = useState("");
	const [fieldError, setfieldError] = useState({});

	//Sets the user password and confirm password
	const [values, setValues] = useState({
		password: { target: "" },
		confirm_password: { target: "" }
	});

	//check if it's loading
	const [loading, setLoading] = useState(false);
	const [lengthpassword, setLengthpassword] = useState("");

	//Gets the code from URL
	const { query } = useRouter();

	//Session of user
	const { data: session } = useSession();

	const handleSubmit = async (event) => {
		event.preventDefault();

		setLoading(true);

		//Checks if the length of the password is < 6
		if (values.password.target.value.length < 6) {
			setLengthpassword(true);
			setLoading(false);
			return;
		}
		setLengthpassword(false);

		//Validates if password and confirm password is written correctly
		const errors = resetValidate({
			password: values.password.target.value,
			confirm_password: values.password.target.value
		});

		//Set the error if has length. In other words, if has length has errors.
		if (Object.keys(errors).length) {
			setfieldError(errors);
			setLoading(false);
			return;
		}

		setfieldError({});

		//Send the url of reset-password to the backend
		await axios
			.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/reset-password`, {
				code: query.code,
				password: values.password.target.value,
				passwordConfirmation: values.confirm_password.target.value
			}, {headers: {
				Authorization: `Bearer ${session?.jwt}`
			}})
			.then((response) => {
				console.log("A senha do seu usuário foi redefinida.");
				signIn("credentials", {
					email: response?.data?.user?.email,
					password: values.password.target.value,
					callbackUrl: "/"
				});
			})
			.catch((error) => {
				console.log("Ocorreu algum erro:", error.response);
				setLoading(false);
			});
	};

	//Handle the input from the frontend in a single function
	const handleInput = (field, value) => {
		setValues((s) => ({ ...s, [field]: value }));
	};

	useEffect(() => {}, [session]);

	return (
		<>
			<div>
				<form onSubmit={handleSubmit}>
					{!!formError && (
						<div className="alert alert-danger" role="alert">
							{formError}
						</div>
					)}
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">Senha</label>
						<input
							type="password"
							name="password"
							className="form-control"
							id="exampleInputPassword1"
							placeholder="Digite sua senha"
							onChange={(v) => handleInput("password", v)}
							required
						/>
						<p className="text-danger">{fieldError?.password}</p>
						{!!lengthpassword && (
							<p className="text-danger" role="alert">
                senha não pode ser menor do que 6 caracteres
							</p>
						)}
					</div>
					<div className="form-group mt-2">
						<input
							type="password"
							name="confirm_password"
							className="form-control"
							id="exampleInputPassword1"
							placeholder="Confirme sua senha"
							onChange={(v) => handleInput("confirm_password", v)}
							required
						/>
						<p className="text-danger">{fieldError?.confirm_password}</p>
					</div>
					<button
						type="submit"
						className="btn btn-primary mt-4"
						disabled={loading}
					>
						{loading ? <FormLoading /> : <span>Confirmar senha</span>}
					</button>
				</form>
			</div>
		</>
	);
};

export default FormResetPassword;
