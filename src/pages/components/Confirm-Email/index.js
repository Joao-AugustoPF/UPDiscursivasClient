import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormLoading } from "../../../lib/Form";

export default function ConfirmCode({ query }) {
	const router = useRouter();
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const handleConfirmation = async () => {
		if (query.confirmation) {
			setSuccess(true);
			await axios
				.get(
					`${process.env.NEXT_PUBLIC_API_URL}/api/auth/email-confirmation?confirmation=${query.confirmation}`
				)
				.then(() => {
					setSuccess(true);
					router.push("/login");
				})
				.catch(() => {
					console.log(error);
					return;
				});
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
						<h5 className="text-warning">
							Aguardando confirmação de e-mail...
						</h5>
					</div>
				</>
			)}
		</>
	);
}
