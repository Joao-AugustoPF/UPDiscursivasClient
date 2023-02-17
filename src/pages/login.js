import Auth from "../templates/Auth/index";
import SignIn from "./components/Login";
import protectedRoutes from "../utils/protectedRouteLogin";

export default function Login({ session }) {
	return (
		<>
			<Auth title="Login">
				<SignIn session={session} />
			</Auth>
		</>
	);
}

export async function getServerSideProps(context) {
	const session = await protectedRoutes(context);
	if (!session) {
		return { props: {} };
	} else {
		return {
			props: { sessions: session }
		};
	}
}
