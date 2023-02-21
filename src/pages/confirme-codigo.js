import Auth from "../templates/Auth";
import ConfirmEmail from "../pages/components/Confirm-Email/index";
import axios from "axios";

export default function ConfirmCode({ query }) {
	return (
		<>
			<Auth title="Confirmar email">
				<ConfirmEmail query={query} />
			</Auth>
		</>
	);
}

export async function getServerSideProps(context) {
	const query = context.query;
	if (!context.query.confirmation) {
		context.res.setHeader("Location", "/");
		context.res.statusCode = 302;
		return { props: { query: null } };
	}

	if (query.confirmation) {
		let isConfirmed
		await axios
			.get(
				`${process.env.NEXT_PUBLIC_API_URL}/api/auth/email-confirmation?confirmation=${query.confirmation}`
			)
			.then(() => {
				isConfirmed = true
			})
			.catch((error) => {
				if(error.response.data.error) console.error("Not found a valid confirmation!");
				isConfirmed = false
			});

		return { props: { query: isConfirmed } };
	}
}
