import Auth from "../templates/Auth/index";
import SignIn from "./components/Login";
import protectedRoutes from "../utils/protectedRouteLogin";

export default function Login() {
	return (
		<>
			<Auth title="Login">
				<SignIn />
			</Auth>
		</>
	);
}

export async function getServerSideProps(context) {
	await protectedRoutes(context);
}
