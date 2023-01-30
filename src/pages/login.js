import Auth from "../templates/Auth/index";
import SignIn from "./components/Login";

export default function Login() {
	return (
		<>
			<Auth title="Login">
				<SignIn />
			</Auth>
		</>
	);
}
