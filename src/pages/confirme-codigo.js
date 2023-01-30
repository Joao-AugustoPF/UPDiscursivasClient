import Auth from "../templates/Auth";
import ConfirmEmail from "../pages/components/Confirm-Email/index";

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
	console.log(context.query);
	const query = context.query;

	return {
		props: { query }
	};
}
