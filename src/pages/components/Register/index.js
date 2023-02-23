/* eslint-disable no-undef */
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { MutationRegister } from "../../../graphql/mutations/register";
import axios from "axios";
import { print } from "graphql";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
	MutationRegisterBilling,
	MutationSettingPlan
} from "../../../graphql/mutations/registerBilling";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { signUpValidate } from "../../../utils/validations";
import { GraphQLClient } from "graphql-request";

//Register Page

//Loads the stripe outside the component
const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PRODUCTION_PUBLIC_KEY
);

export const Register = () => {
	//Sets the form and field error which appears in the frontend
	const [fieldError, setfieldError] = useState({});
	const [formError, setformError] = useState("");
	const [lengthpassword, setLengthpassword] = useState("");
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	//Sets the username, email, password and confirm password
	const [values, setValues] = useState({
		username: { target: "" },
		email: { target: "" },
		password: { target: "" },
		confirm_password: { target: "" }
	});

	//Session of user
	const router = useRouter();

	const { data: session } = useSession();

	//Creates the user in the backend
	const [createUser, { error }] = useMutation(MutationRegister, {
		onError: () => {
			setformError("Nome ou Email em uso.");
			return;
		},
		onCompleted: async (user) => {
			//If all succeeds it makes the sign-in
			if (!error) {
				await axios
					.post(
						`${process.env.NEXT_PUBLIC_API_URL}/api/auth/send-email-confirmation`,
						{
							email: values.email.target.value // user's email
						}
					)
					.then(async () => {
						console.log("O usuário recebeu um email");
						const customerInfo = await axios.post(
							`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/customerstripe/?email=${values.email.target.value}&name=${values.username.target.value}`,
							{
								headers: {
									Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ADMIN_STRAPI}`
								}
							}
						);

						await axios.post(
							`${process.env.NEXT_PUBLIC_API_URL}/graphql`,
							{
								query: print(MutationSettingPlan),
								variables: {
									id: user?.register?.user?.id,
									data: {
										billingID:
											customerInfo?.data?.customer?.id
									}
								}
							},
							{
								headers: {
									Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ADMIN_STRAPI}`
								}
							}
						);
					})
					.catch((error) => {
						console.error("Ocorreu algum erro:", error);
					});

				setSuccess(true);
			}
		}
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		setformError("");

		//Checks if the length of the password is < 6
		if (values.password.target.value.length < 6) {
			setLengthpassword(true);
			return;
		}
		setLengthpassword(false);

		//Validates if username, email, password and confirm password is written correctly
		const errors = signUpValidate({
			username: values.username.target.value,
			email: values.email.target.value,
			password: values.password.target.value,
			confirm_password: values.confirm_password.target.value
		});

		//Set the error if has length. In other words, if has length has errors.
		console.log(errors);
		if (Object.keys(errors).length) {
			setfieldError(errors);
			console.log(fieldError);
			return;
		}

		try {
			//Gets the user info that was created before
			//Creates the user in the backend
			setLoading(true);
			await createUser({
				variables: {
					input: {
						username: values.username.target.value,
						email: values.email.target.value,
						password: values.password.target.value
					}
				}
			});
		} catch (error) {
			console.log(error);
			setLoading(false);
			return;
		}
	};

	//Handle the input from the frontend in a single function
	const handleInput = (field, value) => {
		setValues((s) => ({ ...s, [field]: value }));
	};

	useEffect(() => {
		if (session) {
			router.push("/perfil");
		}
	}, [session, router]);

	return (
		<>
			<Elements stripe={stripePromise}>
				{success ? (
					<>
						<div>
							<h4 className="text-success">
								Clique no link enviado do seu email para
								confirmar o registro!
							</h4>
						</div>
					</>
				) : (
					<>
						{loading ? (
							<>
								<div>
									<h4 className="text-warning">
										Enviando as informações e aguardando
										envio de E-mail...
									</h4>
								</div>
							</>
						) : (
							<>
								<div>
									{!!formError && (
										<div
											className="alert alert-danger"
											role="alert"
										>
											{formError}
										</div>
									)}
									<form onSubmit={handleSubmit}>
										<div className="form-group">
											<label htmlFor="exampleInputName">
												Nome
											</label>
											<input
												className="form-control"
												name="username"
												type="text"
												placeholder="Digite seu nome"
												onChange={(v) =>
													handleInput("username", v)
												}
												style={{borderColor: "#d20c33"}}
												required
											/>
											<p className="text-danger">
												{fieldError?.username}
											</p>
											<label htmlFor="exampleInputEmail1">
												Email
											</label>
											<input
												type="email"
												name="email"
												className="form-control"
												id="exampleInputEmail1"
												aria-describedby="emailHelp"
												placeholder="Digite seu email"
												onChange={(v) =>
													handleInput("email", v)
												}
												style={{borderColor: "#d20c33"}}
												required
											/>
											<p className="text-danger">
												{fieldError?.email}
											</p>
										</div>
										<div className="form-group">
											<label htmlFor="exampleInputPassword1">
												Senha
											</label>
											<input
												type="password"
												name="password"
												className="form-control"
												id="exampleInputPassword1"
												placeholder="Digite sua senha"
												onChange={(v) =>
													handleInput("password", v)
												}
												style={{borderColor: "#d20c33"}}
												required
											/>
											<p className="text-danger">
												{fieldError?.password}
											</p>
											{!!lengthpassword && (
												<p
													className="text-danger"
													role="alert"
												>
													senha não pode ser menor do
													que 6 caracteres
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
												onChange={(v) =>
													handleInput(
														"confirm_password",
														v
													)
												}
												style={{borderColor: "#d20c33"}}
												required
											/>
											<p className="text-danger">
												{fieldError?.confirm_password}
											</p>
										</div>
										<div className="mt-3">
											<Link href="/login">
												<p
													style={{
														cursor: "pointer",
														color: "#d20c33",
														textDecorationLine:
															"underline"
													}}
												>
													Já possui uma conta?
												</p>
											</Link>
										</div>
										<button
											type="submit"
											className="btn btn-danger mt-4"
										>
											Registrar
										</button>
									</form>
								</div>
							</>
						)}
					</>
				)}
			</Elements>
		</>
	);
};

export default Register;
