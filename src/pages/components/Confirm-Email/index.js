import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormLoading } from "../../../lib/Form";

export default function ConfirmCode({ query }) {
	const router = useRouter();
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [emailuse, setemailUsed] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [loading, setLoading] = useState(false);
	const [oninput, setOnInput] = useState(false);
	const [values, setValues] = useState();


	const handleSubmit = async (event) => {
		event.preventDefault();

		setLoading(true);
		console.log(values);
		//Send the url of forgot-password to the backend
		await axios
			.post(
				`${process.env.NEXT_PUBLIC_API_URL}/api/auth/send-email-confirmation`,
				{
					email: values // user's email
				}
			)
			.then(() => {
				console.log("O usuário recebeu um email!");
				//setSuccess(true);
				setOnInput(true);
			})
			.catch((error) => {
				console.log("Ocorreu algum erro:", error);
				if (error.response.data === "Method Not Allowed") {
					setemailUsed("E-mail já confirmado!");
				}
				setemailUsed("E-mail já confirmado!");
				setLoading(false);
			});
		console.log("opa");
	};

	useEffect(() => {
		// if (!query.confirmation) {
		// 	router.push("/");
		// }
	}, []);
	return (
		<>
			{oninput && (
				<>
					<div>
						<h4 className="text-warning">
							E-mail enviado para confirmação!
						</h4>
					</div>
				</>
			)}
			{success || query.success ? (
				<>
					<div>
						<h4 className="text-success">
							Email: {query?.email} confirmado com sucesso!
						</h4>
					</div>
				</>
			) : (
				<>
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="exampleInputEmail1">E-mail</label>
							<input
								type="email"
								name="email"
								className="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Digite seu email"
								onChange={(v) => setValues(v.target.value)}
								required
							/>
						</div>

						<button
							type="submit"
							className="btn btn-primary mt-4"
							disabled={loading}
						>
							{loading ? (
								<FormLoading />
							) : (
								<span>Enviar E-mail</span>
							)}
						</button>
					</form>
					<p>{error}</p>
					<p>{emailuse}</p>
				</>
			)}
			<div></div>
		</>
	);
}
