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
		return;
	}

	if (query.confirmation) {
		await axios
			.get(
				`${process.env.NEXT_PUBLIC_API_URL}/api/auth/email-confirmation?confirmation=${query.confirmation}`
			)
			.then(() => {
				return {
					props: { query: true }
				};
			})
			.catch((error) => {
				console.log(error);
				return {
					props: { query: false }
				};
			});
	}
}
