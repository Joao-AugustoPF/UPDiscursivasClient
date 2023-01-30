import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signInValidate } from "../../../utils/validations";

//Login Page
export const Login = () => {
	//Sets the user email and password
	const [values, setValues] = useState({
		email: { target: "" },
		password: { target: "" }
	});
	//-----------------------------

	//Sets the form and field error which appears in the frontend
	const [formError, setformError] = useState("");
	const [fieldError, setfieldError] = useState({});
	//-----------------------------

	const router = useRouter();

	//Session of user
	const { data: session } = useSession();

	const handleSubmit = async (event) => {
		event.preventDefault();

		//Validates if email or password is written correctly
		const errors = signInValidate({
			email: values.email.target.value,
			password: values.password.target.value
		});
		//-----------------------------

		//Set the error if has length. In other words, if has length has errors.
		if (Object.keys(errors).length) {
			setfieldError(errors);
			return;
		}

		setfieldError({});
		//-----------------------------

		//Makes the sign-in. Using Next-Auth as authentication
		const result = await signIn("credentials", {
			redirect: false,
			email: values.email.target.value,
			password: values.password.target.value
		});
		if (result.ok) {
			return;
		}
		//-------------------------------

		//Set if an error with username or password has occurred
		setformError("Usuário ou Senha inválido!");
	};

	//Handle the input from the frontend in a single function
	const handleInput = (field, value) => {
		setValues((s) => ({ ...s, [field]: value }));
	};

	useEffect(() => {
		//If user is logged send to the profile page
		if (session) {
			router.push("/perfil");
		}
	}, [session, router]);

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
						<label htmlFor="exampleInputEmail1">Email</label>
						<input
							type="email"
							name="email"
							className={`form-control ${formError && "is-invalid"} `}
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
							onChange={(v) => handleInput("email", v)}
							placeholder="Digite seu email"
							required
						/>
						<p className="text-danger">{fieldError?.email}</p>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">Senha</label>
						<input
							type="password"
							name="password"
							className={`form-control ${formError && "is-invalid"} `}
							id="exampleInputPassword1"
							onChange={(v) => handleInput("password", v)}
							placeholder="Digite sua senha"
							required
						/>
						<p className="text-danger">{fieldError?.password}</p>
					</div>
					<div className="mt-3">
						<Link href="/esqueceu-senha" passHref>
              Esqueceu a senha?
						</Link>
					</div>
					<button type="submit" className="btn btn-primary mt-4">
            Logar
					</button>
				</form>
				<div className="mt-4">
					<Link href="/registrar">Não tem uma conta ainda?</Link>
				</div>
			</div>
		</>
	);
};

export default Login;
