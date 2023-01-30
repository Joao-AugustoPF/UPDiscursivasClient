import Auth from "../templates/Auth";
import FormSenha from "../pages/components/Esqueceu-senha/index";

export default function EsqueceuSenha() {
	return (
		<>
			<Auth title="Requisitar nova senha">
				<FormSenha />
			</Auth>
		</>
	);
}
