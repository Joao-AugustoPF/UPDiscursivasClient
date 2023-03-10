import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	styled,
	useMediaQuery,
	useTheme
} from "@mui/material";
import { red } from "@mui/material/colors";
import Link from "next/link";
import SendIcon from "@mui/icons-material/Send";
import protectedRoutes from "../../utils/protectedRoutes";
import axios from "axios";
import { useState } from "react";
import { MutationRegisterInfoUser } from "../../graphql/mutations/user";
import { MutationSettingPlan } from "../../graphql/mutations/registerBilling";
import { print } from "graphql";

export default function MinhaAssinatura({ session, users }) {
	const ColorButton = styled(Button)(({ theme }) => ({
		color: theme.palette.getContrastText(red[500]),
		backgroundColor: red[500],
		"&:hover": {
			backgroundColor: red[700]
		}
	}));

	const data = new Date(users?.endDate);
	const month = data?.getUTCMonth() + 1;
	const dataObj = {
		day: data?.getUTCDate().toString().padStart(2, "0"),
		month: month?.toString().padStart(2, "0"),
		year: data?.getFullYear()
	};

	const [open, setOpen] = useState(false);
	const [openreactivate, setOpenReactivate] = useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleClickOpenReactivate = () => {
		setOpenReactivate(true);
	};

	const handleCloseReactivate = () => {
		setOpenReactivate(false);
	};

	const OnCancelPlan = async (cancel) => {
		if (cancel === true) {
			const CancelPlan = await axios.post(
				`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/subscription?subscription=${users?.subscriptionid}&cancel=${cancel}`
			);
			const usuario = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/graphql`,
				{
					query: print(MutationSettingPlan),
					variables: {
						id: session?.id,
						data: {
							subiscancel: true
						}
					}
				}
			);
			setOpen(false);
			window.location.reload();
		} else {
			const CancelPlan = await axios.post(
				`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/subscription?subscription=${users?.subscriptionid}&cancel=${cancel}`
			);
			const usuario = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/graphql`,
				{
					query: print(MutationSettingPlan),
					variables: {
						id: session?.id,
						data: {
							subiscancel: false
						}
					}
				}
			);
			setOpenReactivate(false);
			window.location.reload();
		}

		//window.location.reload()
	};
	return (
		<div
			className="bg-image"
			style={{
				backgroundImage:
					"url('https://img.freepik.com/vetores-gratis/fundo-de-formas-abstratas-brancas_79603-1362.jpg?t=st=1674611692~exp=1674612292~hmac=8e3d6d2fe5770e2ff9c599b8ac5071400f5995a8ee239c227cca6f5809510212')",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover"
			}}
		>
			<div className="p-5 w-100">
				<div className="container w-100">
					<div className="d-flex justify-content-start">
						<h4>MINHA ASSINATURA</h4>
					</div>
					<div className="d-flex justify-content-end mb-4">
						<Link href="/perfil">
							<ColorButton
								variant="contained"
								startIcon={<SendIcon />}
							>
								VOLTAR
							</ColorButton>
						</Link>
					</div>
					<div className="p-3 border bg-danger bg-gradient text-white">
						<div className="d-flex justify-content-between">
							<h6>ASSINATURA</h6>
						</div>
					</div>

					{users?.hasTrial ? (
						<>
							<div className="row w-100 align-items-start ms-0 p-3 bg-black bg-opacity-75 text-white">
								<div className="col text-center">
									<p className="my-auto">
										Voc?? possui uma assinatura ativa!
									</p>
								</div>
							</div>
							<div className="row w-100 align-items-start ms-0 p-3 bg-black bg-opacity-50 text-white">
								<div className="col text-center">
									<h5 className="my-auto">
										Assinatura: {users?.plan}
									</h5>
								</div>
								<div className="col text-center">
									<h5 className="my-auto">
										Data de t??rmino: {dataObj.day}/
										{dataObj.month}/{dataObj.year}
									</h5>
								</div>
							</div>
							<div className="row w-100 align-items-start ms-0 p-3 bg-black bg-opacity-75 text-white">
								<div className="col text-center">
									<p>GIF ou v??deo mostrando funcionando</p>
								</div>
							</div>
							<div className="row w-100 align-items-start ms-0 p-3 bg-black bg-opacity-50 text-white">
								<div className="col text-center">
									<h5>
										Com essa assinatura voc?? tem: corre????es
										ilimitadas, ciclo de cobran??a,
										flexibilidade para cancelar...
									</h5>
								</div>
							</div>
							<div className="row w-100 align-items-start ms-0 p-3 bg-black bg-opacity-75 text-white text-center">
								{users?.subiscancel ? (
									<>
										<p style={{ fontSize: "12px" }}>
											* Cobran??a autom??tica da assinatura
											foi cancelada
										</p>
									</>
								) : (
									<></>
								)}
								<div className="col text-center">
									<Link href="#">
										{users?.subiscancel ? (
											<>
												<ColorButton
													variant="contained"
													onClick={
														handleClickOpenReactivate
													}
												>
													REATIVAR COBRAN??A
												</ColorButton>

												<Dialog
													fullScreen={fullScreen}
													open={openreactivate}
													onClose={
														handleCloseReactivate
													}
													aria-labelledby="responsive-dialog-title"
												>
													<DialogTitle id="responsive-dialog-title">
														{
															"Tem certeza que deseja reativar a cobran??a da assinatura?"
														}
													</DialogTitle>
													<DialogContent>
														<DialogContentText>
															Reativando a
															cobran??a de
															assinatura, voc??
															ser?? cobrado no
															final do m??s em que
															est?? programado para
															cobran??a.
														</DialogContentText>
													</DialogContent>
													<DialogActions>
														<Button
															autoFocus
															onClick={
																handleCloseReactivate
															}
														>
															Sair
														</Button>
														<Button
															onClick={() =>
																OnCancelPlan(
																	false
																)
															}
															autoFocus
														>
															Reativar cobran??a
														</Button>
													</DialogActions>
												</Dialog>
											</>
										) : (
											<>
												<ColorButton
													variant="contained"
													onClick={handleClickOpen}
												>
													CANCELAR ASSINATURA
												</ColorButton>

												<Dialog
													fullScreen={fullScreen}
													open={open}
													onClose={handleClose}
													aria-labelledby="responsive-dialog-title"
												>
													<DialogTitle id="responsive-dialog-title">
														{
															"Tem certeza que deseja cancelar a assinatura?"
														}
													</DialogTitle>
													<DialogContent>
														<DialogContentText>
															Cancelando a
															assinatura agora n??o
															ser?? efetuado o
															pagamento autom??tico
															final do m??s. Voc??
															pode alterar a
															cobran??a antes do
															t??rmino do plano
															para cobrar
															novamente.
														</DialogContentText>
													</DialogContent>
													<DialogActions>
														<Button
															autoFocus
															onClick={
																handleClose
															}
														>
															sair
														</Button>
														<Button
															onClick={() =>
																OnCancelPlan(
																	true
																)
															}
															autoFocus
														>
															Cancelar
														</Button>
													</DialogActions>
												</Dialog>
											</>
										)}
									</Link>
									<div style={{ fontSize: "12px" }}>
										<p style={{ marginBottom: "0px" }}>
											*N??o ser?? cobrado mensalmente ap??s
											cancelamento
										</p>
										<p>
											*Se tiver interesse em mudar de
											plano, espere o prazo do plano atual
											terminar e efetue o pagamento do
											novo
										</p>
									</div>
								</div>
							</div>
						</>
					) : (
						<>
							<div className="row w-100 align-items-start ms-0 p-3 bg-black bg-opacity-75 text-white">
								<div className="col text-center">
									<p className="my-auto">
										Voc?? n??o possui nenhuma assinatura ativa
										no momento.
									</p>
								</div>
							</div>
							<div className="row w-100 align-items-start ms-0 p-3 bg-black bg-opacity-75 text-white">
								<div className="col text-center">
									<h5 className="my-auto">
										SEJA ASSINANTE DA UP DISCURSIVAS!
									</h5>
								</div>
							</div>
							<div className="row w-100 align-items-start ms-0 p-3 bg-black bg-opacity-75 text-white">
								<div className="col text-center">
									<h5 className="my-auto">Plano Mensal</h5>
									<p>R$ 19,90 /m??s</p>
									<p>*Sai por R$ 0,66 /dia</p>
								</div>
								<div className="col text-center">
									<h5 className="my-auto">
										Plano Trimestral
									</h5>
									<p>R$ 39,90 /m??s</p>
									<p>*Sai por R$ 0,44 /dia</p>
								</div>
							</div>
							<div className="row w-100 align-items-start ms-0 p-3 bg-black bg-opacity-75 text-white">
								<div className="col text-center">
									<p>
										A melhor forma de voc?? performar em sua
										prova discursiva, seja de concurso
										p??blico, seja da OAB!
									</p>
								</div>
							</div>
							<div className="row w-100 align-items-start ms-0 p-3 bg-black bg-opacity-75 text-white">
								<div className="col text-center">
									<Link href="/assinaturas">
										<h4 style={{ cursor: "pointer" }}>
											Assinar Agora
										</h4>
									</Link>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await protectedRoutes(context);
	if (!session) {
		return { props: {} };
	} else {
		const users = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
			{
				headers: {
					Authorization: `Bearer ${session?.jwt}`
				}
			}
		);
		return {
			props: { session: session, users: users.data }
		};
	}
}
