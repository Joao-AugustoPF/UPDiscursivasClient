import Auth from "../templates/Auth";
import FormResetPassword from "../pages/components/Reset-senha/index";

export default function ResetSenha() {
	return (
		<>
			<Auth title="Reset nova senha">
				<FormResetPassword />
			</Auth>
		</>
	);
}
