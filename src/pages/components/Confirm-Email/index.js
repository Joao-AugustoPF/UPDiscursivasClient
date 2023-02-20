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

	const handleConfirmation = async () => {
		if (query.confirmation) {
			try {
				await axios
					.get(
						`${process.env.NEXT_PUBLIC_API_URL}/api/auth/email-confirmation?confirmation=${query.confirmation}`
					)
			} catch (error) {
				console.log(error);
				setSuccess(false);
				return
			}
			setSuccess(true)
			router.push('/login')
		}
	};
	handleConfirmation();
	useEffect(() => {
		if (!query.confirmation) {
			router.push("/");
		}
	}, []);
	return (
		<>
			{success ? (
				<>
					<div>
						<h4 className="text-success">E-mail confirmado!</h4>
					</div>
				</>
			) : (
				<>
					<div>
						<h5 className="text-warning">Aguardando confirmação de e-mail...</h5>
					</div>
				</>
			)}
		</>
	);
}
