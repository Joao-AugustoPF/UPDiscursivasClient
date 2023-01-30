/* eslint-disable no-undef */
import emailjs from "@emailjs/browser";
import { Button, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useRef, useState } from "react";

//About Page
const About = () => {
	const form = useRef();
	const sendEmail = (e) => {
		e.preventDefault();
		//This's how the email from about page is sent
		emailjs
			.sendForm(
				process.env.NEXT_PUBLIC_SERVICE_EMAIL,
				process.env.NEXT_PUBLIC_TEMPLATE_EMAIL,
				form.current,
				process.env.NEXT_PUBLIC_ID_EMAIL
			)
			.then(
				() => {
					alert("Mensagem enviada com sucesso!");
					window.location.reload(false);
				},
				() => {
					alert("Falhou ao enviar a mensagem, tente novamente.");
				}
			);
		//----------------------------------
	};

	//Handle the input from the frontend

	const [name, setName] = useState("");
	const handleChangeName = (e) => {
		setName(e.target.value);
	};

	const [email, setEmail] = useState("");
	const handleChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const [titulo, setTitulo] = useState("");
	const handleChangeSubject = (e) => {
		setTitulo(e.target.value);
	};

	const [mensagem, setMensagem] = useState("");
	const handleChangeMensagem = (e) => {
		setMensagem(e.target.value);
	};

	//-------------------------------

	return (
		<div className="d-flex flex-column justify-content-center align-items-center">
			<div className="d-flex flex-column justify-content-center align-items-center">
				<h1>UP Discursivas</h1>

				<h3 className="m-5">Sobre nós</h3>
			</div>

			<div className="w-50">
				<h4>
          A <strong>UP DISCURSIVAS</strong> é uma plataforma para auxiliar você
          a aprimorar suas respostas em peças e questões discursivas, seja em
          provas de concurso público, seja em provas da <strong>OAB</strong>.
          Com a <strong>UP DISCURSIVAS</strong>, você pode treinar a resolução
          de peças e questões discursivas, obtendo seu percentual de desempenho,
          quais itens deveriam constar na resposta, além de nota explicativa com
          doutrina, jurisprudência e texto de lei!
				</h4>
			</div>

			<div className="m-5">
				<h1>Contato</h1>
			</div>

			<div className="w-100">
				<form
					className="d-flex flex-column justify-content-center align-items-center"
					ref={form}
					onSubmit={sendEmail}
				>
					<TextField
						name="name"
						onChange={handleChangeName}
						value={name}
						id="outlined-basic"
						label="Nome"
						variant="outlined"
						className="m-2 w-50"
						required
					/>
					<TextField
						name="email"
						type="email"
						onChange={handleChangeEmail}
						value={email}
						id="outlined-basic"
						label="Seu e-mail"
						variant="outlined"
						className="m-2 w-50"
						required
					/>
					<TextField
						name="subject"
						onChange={handleChangeSubject}
						value={titulo}
						id="outlined-basic"
						label="Titulo"
						variant="outlined"
						className="m-2 w-50"
						required
					/>
					<div className="m-2 w-50">
						<textarea
							className="form-control"
							onChange={handleChangeMensagem}
							value={mensagem}
							id="exampleFormControlTextarea1"
							rows="3"
							placeholder="Mensagem"
							required
						></textarea>
					</div>
					<Stack spacing={1}>
						<Button
							color="success"
							type="submit"
							value="SEND"
							variant="contained"
							endIcon={<SendIcon />}
							className="mt-3 mb-5"
						>
              Enviar
						</Button>
					</Stack>
				</form>
			</div>
		</div>
	);
};

export default About;
