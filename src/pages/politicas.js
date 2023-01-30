import { Component } from "react";
import * as S from "../lib/Terms/styles";

//Page of politics
class Politicas extends Component {
	render() {
		return (
			<S.WrapMenu>
				<div className="d-flex justify-items-center align-items-center flex-column">
					<h1>UP Discursivas</h1>

					<h3>Politicas de Privacidade</h3>
				</div>
				<div className="d-flex flex-column text-center m-3">
					<h4>
            Como parte de nossa missão em ajudar estudantes a melhorarem seu
            desempenho em provas discursivas, a <strong>Up Discursivas</strong>{" "}
            trata algumas informações e Dados Pessoais de seus Usuários. Esta{" "}
						<strong>Política de Privacidade</strong> destina-se a ajudá-lo a
            entender melhor sobre esse tratamento. De acordo com a{" "}
						<strong>lei 13.709 - Lei Geral de Proteção de Dados (LGPD)</strong>,
            define-se como tratamento toda operação realizada com Dados
            Pessoais, como as que se referem a: coleta, produção, recepção,
            classificação, utilização, acesso, reprodução, transmissão,
            distribuição, processamento, arquivamento, armazenamento,
            eliminação, avaliação ou controle da informação, modificação,
            comunicação, transferência, difusão ou extração.
					</h4>

					<h4>
            Para fins desta <strong>Política</strong>, os termos abaixo possuem
            as seguintes definições:
					</h4>

					<p>
						<strong>a) Usuário:</strong> toda pessoa que acessa o website da Up
            Discursivas, podendo ser Visitante, Cadastrado ou Assinante.
					</p>
					<p>
						{" "}
						<strong>b) Dados pessoais:</strong> Informação relacionada a pessoa
            natural identificada ou identificável.
					</p>
					<p>
						<strong>c) Controlador:</strong> pessoa natural ou jurídica, de
            direito público ou privado, a quem competem as decisões referentes
            ao tratamento de Dados Pessoais.
					</p>
					<p>
						<strong>d) Operador:</strong> pessoa natural ou jurídica, de direito
            público ou privado, que realiza o tratamento de Dados Pessoais em
            nome do Controlador.
					</p>
					<p>
						{" "}
						<strong>e) Serviços:</strong> Os serviços e produtos oferecidos pela
            Up Discursivas sob os Termos de Uso incluem aqueles para ajudar o
            Usuário a melhorar os seus estudos.
					</p>

					<h5>
            Temos o compromisso de respeitar e proteger sua privacidade e
            envidamos nossos melhores esforços <strong>(i)</strong> para que a
            segurança sobre seus Dados Pessoais esteja incorporada em toda
            operação, <strong>(ii)</strong> para o estabelecimento de relações
            comerciais com parceiros e terceiros que garantam o tratamento de
            seus Dados Pessoais de forma segura, <strong>(iii)</strong> para dar
            transparência sobre como será realizado o tratamento de seus Dados
            Pessoais não usando de forma diferente da que tenha sido informada e
            respeitando suas escolhas.
					</h5>

					<h5>
            Esta <strong>Política de Privacidade</strong> fornece uma visão
            sobre a forma que a <strong>Up Discursivas</strong> trata suas
            informações e seus Dados Pessoais nas situações, a depender de sua
            interação conosco.
					</h5>
				</div>
			</S.WrapMenu>
		);
	}
}

export default Politicas;
