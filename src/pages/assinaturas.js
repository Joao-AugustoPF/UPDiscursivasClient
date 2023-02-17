/* eslint-disable no-undef */
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getStripe } from "../utils/connect/getStripe";
import Link from "next/link";
import protectedRoutes from "../utils/protectedRouteAssinar";

const Assinaturas = ({ session, users }) => {
	const [load, setLoad] = useState(false);
	const [loading, setLoading] = useState(false);

	//This handle when a user makes a payment
	const handleCheckout = async (param) => {
		setLoad(true);
		const stripe = await getStripe();
		//this sends a 'link' to the backend and it returns the id that can be used in Stripe Payment to get a payment
		const checkoutSession = await axios.post(
			`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/create-stripe-session/?keyword=${param}&customerid=${session.billingID}`
		);

		const result = await stripe.redirectToCheckout({
			sessionId: checkoutSession.data.id
		});

		if (result.error) {
			alert(result.error.message);
			return;
		}
		setLoad(false);
	};


	useEffect(() => {
		//value();
		//getUsers()
		// if (status === "loading") {
		//   setLoading(true);
		// } else if (status === "authenticated") {
		//   setLoading(false);
		// }
	}, [session]);

	return (
		<section
			className="bg-image"
			style={{
				backgroundImage:
					"url('https://img.freepik.com/vetores-gratis/fundo-de-formas-abstratas-brancas_79603-1362.jpg?t=st=1674611692~exp=1674612292~hmac=8e3d6d2fe5770e2ff9c599b8ac5071400f5995a8ee239c227cca6f5809510212')",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover"
			}}
		>
			<div className="text-center py-3 w-50 ">
				<h4>ASSINATURAS</h4>
			</div>
			<div className="w-50 m-auto p-3 rounded text-center text-white bg-danger bg-gradient">
				<h5>
					A melhor forma de você performar em sua prova discursiva,
					seja de concurso público, seja da OAB!
				</h5>
			</div>
			<div className="p-5 w-75 m-auto">
				<div className="">
					<div className="row text-center justify-content-evenly">
						<div className="col-xs-4 col-md-5">
							<div
								className="card mb-4 rounded-3 shadow"
								style={{
									backgroundColor: "#1F1D2C",
									color: "#FFFFFF7A"
								}}
							>
								<div className="card-header p-3">
									<h4 className="my-0 fw-bold text-white">
										MENSAL
									</h4>
								</div>
								<p className="">
									Correção de provas discursivas de concursos
									públicos ou OAB
								</p>
								<div className="card-body">
									<h1 className="card-title pricing-card-title text-white">
										R$19,90
										<small
											className="text-muted fw-light"
											style={{ fontSize: "23px" }}
										>
											/mês*
										</small>
									</h1>
									<p>* Cobrado R$19,90 mensalmente</p>

									{session ? (
										<>
											{users.hasTrial ? (
												<>
													<div className="bg-danger w-75 m-auto rounded">
														<Link href="/perfil/minha-assinatura">
															<h5
																disabled={
																	load
																		? true
																		: false
																}
																type="button"
																className="p-2 text-white"
																style={{
																	fontSize:
																		"16px"
																}}
															>
																Gerenciar Plano
																ativo
															</h5>
														</Link>
													</div>
												</>
											) : (
												<>
													{" "}
													<div className="bg-danger w-75 m-auto rounded">
														<h5
															disabled={
																load
																	? true
																	: false
															}
															type="button"
															onClick={() =>
																handleCheckout(
																	"mensal"
																)
															}
															className="p-2 text-white"
															style={{
																fontSize: "16px"
															}}
														>
															ASSINAR MENSAL
														</h5>
													</div>
												</>
											)}
										</>
									) : (
										<>
											<div className="bg-danger w-75 m-auto rounded">
												<Link href="/login">
													<h5
														disabled={
															load ? true : false
														}
														type="button"
														className="p-2 text-white"
														style={{
															fontSize: "16px"
														}}
													>
														Login para comprar
													</h5>
												</Link>
											</div>
										</>
									)}
									<ul
										className="list-unstyled mt-3 mb-4"
										style={{ color: "#FFFFFFCC" }}
									>
										<li>Correções ilimitadas!</li>
										<li>Corrija as provas facilmente</li>
										<li>Ciclo de cobrança mensal</li>
										<li>Flexibilidade para cancelar</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-xs-4 col-md-5">
							<div
								className="card mb-4 rounded-3 shadow"
								style={{
									backgroundColor: "#1F1D2C",
									color: "#FFFFFF7A"
								}}
							>
								<div className="card-header p-3">
									<h4 className="my-0 fw-bold text-white">
										TRIMESTRAL
									</h4>
								</div>
								<p>
									Correção de provas discursivas de concursos
									públicos ou OAB
								</p>
								<div className="card-body">
									<h1 className="card-title pricing-card-title text-white">
										R$39,90
										<small
											className="text-muted fw-light"
											style={{ fontSize: "23px" }}
										>
											/mês*
										</small>
									</h1>
									<p>* Cobrado R$39,90 trimestralmente</p>

									{session ? (
										<>
											{users.hasTrial ? (
												<>
													<div className="bg-danger w-75 m-auto rounded">
														<Link href="/perfil/minha-assinatura">
															<h5
																disabled={
																	load
																		? true
																		: false
																}
																type="button"
																className="p-2 text-white"
																style={{
																	fontSize:
																		"16px"
																}}
															>
																Gerenciar Plano
																ativo
															</h5>
														</Link>
													</div>
												</>
											) : (
												<>
													{" "}
													<div className="bg-danger w-75 m-auto rounded">
														<h5
															disabled={
																load
																	? true
																	: false
															}
															type="button"
															onClick={() =>
																handleCheckout(
																	"trimestral"
																)
															}
															className="p-2 text-white"
															style={{
																fontSize: "16px"
															}}
														>
															ASSINAR TRIMESTRAL
														</h5>
													</div>
												</>
											)}
										</>
									) : (
										<>
											<div className="bg-danger w-75 m-auto rounded">
												<Link href="/login">
													<h5
														disabled={
															load ? true : false
														}
														type="button"
														className="p-2 text-white"
														style={{
															fontSize: "16px"
														}}
													>
														Login para comprar
													</h5>
												</Link>
											</div>
										</>
									)}
									<ul
										className="list-unstyled mt-3 mb-4"
										style={{ color: "#FFFFFFCC" }}
									>
										<li>Correções ilimitadas!</li>
										<li>Corrija as provas facilmente</li>
										<li>Ciclo de cobrança trimestral</li>
										<li>Flexibilidade para cancelar</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Assinaturas;

export async function getServerSideProps(context) {
	const session = await protectedRoutes(context);
	//const apolloClient = initializeApollo(null, session);
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
