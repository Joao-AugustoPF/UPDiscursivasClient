/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { QueryProvas } from "../graphql/queries/provas";
import { initializeApollo } from "../utils/apollo";
import { InputBase, MenuItem, Select, styled } from "@mui/material";
import * as S from "../lib/Provas/styles";
import Link from "next/link";
import protectedRoutes from "../utils/protectedRouteProva";
import axios from "axios";

export default function Provas({ session, provas }) {
	const [yrn, setYrn] = useState();
	const [inputty, setinputty] = useState("");
	const [inputBanca, setInputBanca] = useState("");
	const [inputOrgao, setInputOrgao] = useState("");
	const [inputDisciplina, setInputDisciplina] = useState("");
	const [inputCargo, setInputCargo] = useState("");

	//This is the Array -> JSON of the filters. Why not set them directly? When needed we just have to add one more here, not go to the code ----
	const nomeprova = [
		{ title: "Advogado" },
		{ title: "Defensor_Publico" },
		{ title: "Delegado" },
		{ title: "OAB" },
		{ title: "Juiz" },
		{ title: "Procurador_Estadual" },
		{ title: "Procurador_Municipal" },
		{ title: "Promotor" }
	];

	const nomedisciplina = [
		{ title: "Direito_Administrativo" },
		{ title: "Direito_Ambiental" },
		{ title: "Direito_Civil" },
		{ title: "Direito_Constitucional" },
		{ title: "Direito_Empresarial" },
		{ title: "Direito_Penal" },
		{ title: "Direito_Processual Civil" },
		{ title: "Direito_Processual Penal" },
		{ title: "Direito_Processual do Trabalho" },
		{ title: "Direito_do_Trabalho" },
		{ title: "Direito_Tributario" }
	];

	const nomebanca = [
		{ title: "FGV" },
		{ title: "Quadrix" },
		{ title: "Fepese" }
	];

	const nomeorgao = [
		{ title: "CAU_SC" },
		{ title: "CRM_SC" },
		{ title: "Governo_de_Santa_Catarina" },
		{ title: "OAB" },
		{ title: "Prefeitura_de_Florianopolis" }
	];

	const nomecargo = [
		{ title: "Advogado" },
		{ title: "Advogado_Geral_da_Uniao" },
		{ title: "Delegado_de_Policia_Civil" },
		{ title: "Delegado_Federal" },
		{ title: "Defensor_Publico" },
		{ title: "Defensor_Publico_da_Uniao" },
		{ title: "Juiz_de_Direito" },
		{ title: "Juiz_Federal" },
		{ title: "Juiz_do_Trabalho" },
		{ title: "Procurador_Estadual" },
		{ title: "Procurador_Federal" },
		{ title: "Procurador_Legislativo" },
		{ title: "Procurador_Municipal" },
		{ title: "Promotor_de_Justiça" }
	];

	const anos = [
		{ title: "2000" },
		{ title: "2001" },
		{ title: "2002" },
		{ title: "2003" },
		{ title: "2004" },
		{ title: "2005" },
		{ title: "2006" },
		{ title: "2007" },
		{ title: "2008" },
		{ title: "2009" },
		{ title: "2010" },
		{ title: "2011" },
		{ title: "2012" },
		{ title: "2013" },
		{ title: "2014" },
		{ title: "2015" },
		{ title: "2016" },
		{ title: "2017" },
		{ title: "2018" },
		{ title: "2019" },
		{ title: "2020" },
		{ title: "2021" },
		{ title: "2022" }
	];

	//--------------

	const data = provas;

	//This handle the input from the fronted by the user. Why repeat code? to have more control of it. -----
	const handleInputTy = (value) => {
		setinputty(value.target.value);
	};

	const handleInputBanca = (value) => {
		setInputBanca(value.target.value);
	};

	const handleInputOrgao = (value) => {
		setInputOrgao(value.target.value);
	};

	const handleInputDisciplina = (value) => {
		setInputDisciplina(value.target.value);
	};

	const handleInputCargo = (value) => {
		setInputCargo(value.target.value);
	};

	const handleYrN = (value) => {
		setYrn(value.target.value);
	};

	//--------------

	//This sets how much "Tests" gonna appear on the page. But When clicked add more 5 "Tests" if exists
	const [index, setIndex] = useState(6);
	const initialPosts = data?.slice(0, index);
	const [isCompleted, setIsCompleted] = useState(false);

	const loadMore = () => {
		setIndex(index + 5);
		if (index >= data?.length) {
			setIsCompleted(true);
		} else {
			setIsCompleted(false);
		}
	};

	//---------------

	useEffect(() => {
		//value();
	}, [session]);

	return (
		<div className="w-100">
			{session ? (
				<>
					<div>
						<div className="d-flex m-auto col-md-4 w-75 p-4">
							<div className="input-group-prepend">
								<span
									className="input-group-text"
									id="basic-addon1"
								>
									Pesquisar
								</span>
							</div>
							<input
								type="text"
								className="form-control"
								placeholder="Ex.: nome da prova"
								aria-label="Small"
								value={inputty.replace(/_/g, " ")}
								aria-describedby="basic-addon1 inputGroup-sizing-sm"
								onChange={handleInputTy}
							/>
						</div>

						<S.WrapMenu>
							<div>
								<div className="d-flex flex-column justify-content-center align-items-center mx-4">
									<label>Nome da prova:</label>
									<Select
										labelId="demo-simple-select-helper-label"
										id="demo-simple-select-helper"
										value={inputty}
										label="Nome da prova"
										onChange={handleInputTy}
										style={{ width: "180px" }}
									>
										<MenuItem value="">
											<em>Todos</em>
										</MenuItem>

										{true &&
											nomeprova.map((item, index) => {
												return (
													<MenuItem
														key={index}
														value={item.title}
													>
														{item.title.replace(
															/_/g,
															" "
														)}
													</MenuItem>
												);
											})}
									</Select>
								</div>

								<div className="d-flex flex-column justify-content-center align-items-center">
									<label>Disciplina:</label>
									<Select
										labelId="demo-simple-select-helper-label"
										id="demo-simple-select-helper"
										value={inputDisciplina}
										label="Disciplina"
										onChange={handleInputDisciplina}
										style={{ width: "180px" }}
									>
										<MenuItem value="">
											<em>Todos</em>
										</MenuItem>

										{true &&
											nomedisciplina.map(
												(item, index) => {
													return (
														<MenuItem
															key={index}
															value={item.title}
														>
															{item.title.replace(
																/_/g,
																" "
															)}
														</MenuItem>
													);
												}
											)}
									</Select>
								</div>
								<div className="d-flex flex-column justify-content-center align-items-center">
									<label>Banca:</label>
									<Select
										labelId="demo-simple-select-helper-label"
										id="demo-simple-select-helper"
										value={inputBanca}
										label="Banca"
										onChange={handleInputBanca}
										style={{ width: "180px" }}
									>
										<MenuItem value="">
											<em>Todos</em>
										</MenuItem>

										{true &&
											nomebanca.map((item, index) => {
												return (
													<MenuItem
														key={index}
														value={item.title}
													>
														{item.title.replace(
															/_/g,
															" "
														)}
													</MenuItem>
												);
											})}
									</Select>
								</div>
							</div>

							{/**/}

							<div className="">
								<div className="d-flex flex-column justify-content-center align-items-center mx-4">
									<label>Orgão:</label>
									<Select
										labelId="demo-simple-select-helper-label"
										id="demo-simple-select-helper"
										value={inputOrgao}
										label="Orgão"
										onChange={handleInputOrgao}
										style={{ width: "180px" }}
									>
										<MenuItem value="">
											<em>Todos</em>
										</MenuItem>

										{true &&
											nomeorgao.map((item, index) => {
												return (
													<MenuItem
														key={index}
														value={item.title}
													>
														{item.title.replace(
															/_/g,
															" "
														)}
													</MenuItem>
												);
											})}
									</Select>
								</div>

								<div className="d-flex flex-column justify-content-center align-items-center">
									<label>Cargo:</label>

									<Select
										labelId="demo-simple-select-helper-label"
										id="demo-simple-select-helper"
										value={inputCargo}
										label="Cargo"
										onChange={handleInputCargo}
										style={{ width: "180px" }}
									>
										<MenuItem value="">
											<em>Todos</em>
										</MenuItem>

										{true &&
											nomecargo.map((item, index) => {
												return (
													<MenuItem
														key={index}
														value={item.title}
													>
														{item.title.replace(
															/_/g,
															" "
														)}
													</MenuItem>
												);
											})}
									</Select>
								</div>

								<div className="d-flex flex-column justify-content-center align-items-center">
									<label>Ano:</label>
									<Select
										labelId="demo-simple-select-helper-label"
										id="demo-simple-select-helper"
										value={yrn}
										label="Ano"
										onChange={handleYrN}
										style={{ width: "180px" }}
									>
										<MenuItem value="">
											<em>Todos</em>
										</MenuItem>

										{true &&
											anos.map((item, index) => {
												return (
													<MenuItem
														key={index}
														value={item.title}
													>
														{item.title}
													</MenuItem>
												);
											})}
									</Select>
								</div>
							</div>
						</S.WrapMenu>
					</div>

					{initialPosts
						?.filter((val) => {
							if (inputty === "") {
								return val;
							} else if (
								val.attributes.title
									.toLowerCase()
									.includes(inputty.toLowerCase())
							) {
								return val;
							}

							if (inputBanca === "") {
								return val;
							} else if (
								val.attributes.banca
									.toLowerCase()
									.includes(inputBanca.toLowerCase())
							) {
								return val;
							}
						})
						.map((name, index) => {
							return (
								<div key={index}>
									{name?.attributes?.title
										.toLowerCase()
										.includes(inputty.toLowerCase()) &&
									(name?.attributes?.ano === Number(yrn) ||
										yrn === "" ||
										yrn === undefined) &&
									name?.attributes?.banca
										?.toLowerCase()
										?.includes(inputBanca?.toLowerCase()) &&
									name?.attributes?.orgao
										?.toLowerCase()
										?.includes(inputOrgao?.toLowerCase()) &&
									name?.attributes?.disciplina
										?.toLowerCase()
										?.includes(
											inputDisciplina?.toLowerCase()
										) &&
									name?.attributes?.cargo
										?.toLowerCase()
										?.includes(
											inputCargo?.toLowerCase()
										) ? (
										<>
											<div className="card m-auto mb-4 w-50">
												<div className="card-header d-flex justify-content-between bg-danger bg-gradient text-white">
													{name?.attributes.title}
													<div className="d-flex justify-content-end">
														<p>
															Ano:{" "}
															<strong>
																{
																	name
																		?.attributes
																		.ano
																}
															</strong>
														</p>
													</div>
												</div>

												<div className="card-body bg-secondary bg-opacity-50">
													<div className="d-flex">
														<p className="col-md-7">
															<strong>
																Banca:
															</strong>{" "}
															{
																name.attributes
																	.banca
															}
														</p>
														<p className="col-md-7">
															<strong>
																Cargo:
															</strong>{" "}
															{name?.attributes.cargo.replace(
																/_/g,
																" "
															)}
														</p>
													</div>
													<div className="d-flex">
														<p className="col-md-7">
															<strong>
																Disciplina:
															</strong>{" "}
															{name?.attributes.disciplina.replace(
																/_/g,
																" "
															)}
														</p>
														<p className="col-md-7">
															<strong>
																Orgão:
															</strong>{" "}
															{name?.attributes.orgao.replace(
																/_/g,
																" "
															)}
														</p>
													</div>
													<div className="text-center py-1">
														<Link
															href={`/provas/${name?.attributes.slug}`}
														>
															<a className="btn btn-danger mt-3 mb-3">
																Corrigir
															</a>
														</Link>
													</div>
												</div>
											</div>
										</>
									) : (
										<></>
									)}
								</div>
							);
						})}
					<div className="d-flex justify-content-center m-5">
						{isCompleted ? (
							<button
								onClick={loadMore}
								type="button"
								className="btn btn-danger disabled"
							>
								Não há mais provas
							</button>
						) : (
							<button
								onClick={loadMore}
								type="button"
								className="btn btn-danger"
							>
								Carregar Mais +
							</button>
						)}
					</div>
				</>
			) : (
				<>
					<div style={{ height: "100vw" }}></div>
				</>
			)}
		</div>
	);
}

//Get the session and the "Tests" from the backend
export async function getServerSideProps(context) {
	const { session, provas } = await protectedRoutes(context);
	return {
		props: { session: session, provas: provas }
	};
}
