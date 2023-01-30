/* eslint-disable no-undef */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { MutationSetPhoto } from "../../../graphql/mutations/user";
import { QueryUser } from "../../../graphql/queries/user";
import { GraphQLClient } from "graphql-request";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Image from "next/image";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import SendIcon from "@mui/icons-material/Send";

import Avaticon from "../../../../public/img/iconLogoTest.png";

import Link from "next/link";
import {
	Autocomplete,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	styled,
	TextField
} from "@mui/material";
import { Stack } from "@mui/system";
import { MutationRegisterInfoUser } from "../../../graphql/mutations/user";
import { print } from "graphql";
import { purple, red } from "@mui/material/colors";

export default function Perfil({ session, users }) {
	const router = useRouter();

	const [files, setFiles] = useState();
	const [photo, setPhoto] = useState();
	const [dataUser, setDataUser] = useState();

	const [gender, setGender] = useState();
	const [DDD, setDDD] = useState();
	const [phone, setPhone] = useState();
	const [birthday, setBirthday] = useState();
	const [username, setUsername] = useState();

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const data = new Date(users?.nascimento);
	const month = data?.getUTCMonth() + 1;
	const dataObj = {
		day: data?.getUTCDate().toString().padStart(2, "0"),
		month: month?.toString().padStart(2, "0"),
		year: data?.getFullYear()
	};

	const handleUsername = (value) => {
		setUsername(value.target.value);
	};

	const handleGender = (value) => {
		setGender(value.target.value);
	};

	const handleDDD = (value) => {
		setDDD(value.target.value);
	};

	const handlePhone = async (value) => {
		setPhone(value.target.value);
	};

	const handleBirthday = (value) => {
		setBirthday(value.target.value);
	};

	const handleSubmit = async (value) => {
		if (!username && !gender && !DDD && !phone) {
			return;
		} else {
			const sendInfo = async () => {
				const usuario = await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}/graphql`,
					{
						query: print(MutationRegisterInfoUser),
						variables: {
							id: session?.id,
							data: {
								username: username
									? username
									: session?.username,
								genero: gender ? gender : session?.gender,
								// nascimento: birthday
								// 	? birthday
								// 	: session?.nascimento,
								ddd: DDD ? +DDD : session?.ddd,
								telefone: phone ? +phone : session?.telefone
							}
						}
					},
					{
						headers: {
							Authorization: `Bearer ${session?.jwt}`
						}
					}
				);

				console.log(usuario);
			};

			await sendInfo();
		}
	};

	const ColorButton = styled(Button)(({ theme }) => ({
		color: theme.palette.getContrastText(red[500]),
		backgroundColor: red[500],
		"&:hover": {
			backgroundColor: red[700]
		}
	}));

	const CssTextField = styled(TextField)({
		"& label.Mui-focused": {
			color: "white"
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "white",
			color: "white"
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: "white",
				color: "white"
			},
			"&:hover fieldset": {
				borderColor: "red",
				color: "white"
			},
			"&.Mui-focused fieldset": {
				borderColor: "red",
				color: "white"
			}
		}
	});

	const CssFormControl = styled(FormControl)({
		"& label.Mui-focused": {
			color: "white"
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "white",
			color: "white"
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: "white",
				color: "white"
			},
			"&:hover fieldset": {
				borderColor: "red",
				color: "white"
			},
			"&.Mui-focused fieldset": {
				borderColor: "red",
				color: "white"
			}
		}
	});

	//console.log(users)

	const DifferenceTIme =
		new Date(users?.endDate).getTime() - new Date().getTime();
	const DaysLeft = Math.round(DifferenceTIme / (1000 * 3600 * 24));
	const uploadImage = async (e) => {
		e.preventDefault();

		const user = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/api/users/me?populate=*`,
			{
				headers: {
					Authorization: `Bearer ${session?.jwt}`
				}
			}
		);

		//Creates a form data to set the photo to backend.
		const formData = new FormData();
		formData.append("files", e.target.files[0]);

		const idPhoto = user?.data?.photo?.id;

		//Checks if the user already has a photo in the backend and updates it.
		if (idPhoto) {
			axios
				.post(
					`${process.env.NEXT_PUBLIC_API_URL}/api/upload?id=${idPhoto}`,
					formData,
					{
						headers: {
							Authorization: `Bearer ${session?.jwt}`
						}
					}
				)
				.then(() => {
					window.location.reload();
				})
				.catch((error) => {
					console.log(error);
				});
			return;
		}
		//-----------------------------------

		//Creates a photo in the backend if the user hasn't photo yet.
		axios
			.post(`${process.env.NEXT_PUBLIC_API_URL}/api/upload/`, formData, {
				headers: {
					Authorization: `Bearer ${session?.jwt}`
				}
			})
			.then(async (response) => {
				await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}/graphql`,
					{
						query: print(MutationRegisterInfoUser),
						variables: {
							id: session?.id,
							data: {
								photo: response?.data[0]?.id
							}
						}
					},
					{
						headers: {
							Authorization: `Bearer ${session?.jwt}`
						}
					}
				);
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
		//-----------------------------------
	};

	const handleImg = async () => {
		//Why use GraphQLClient instead of Apollo? As we have the protected routes, the apollo query wasn't returning properly. So we had to use graphql-request with the headers
		const user = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/api/users/me?populate=*`,
			{
				headers: {
					Authorization: `Bearer ${session?.jwt}`
				}
			}
		);

		//---------------------------------------------
		//---------------------------------------------

		//Checks if the user already has photo in the backend
		if (user?.data?.photo?.url) {
			//Sets the photo to UseState which is then used in the frontend
			setPhoto(`${user?.data?.photo?.url}`);
			//---------------------------------------------
			return;
		}
	};

	handleImg();

	useEffect(() => {
		//handleImg();
	}, [session, router]);

	return (
		<div className="p-5 w-100">
			<div className="container w-100">
				<div className="d-flex justify-content-start">
					<h4>PERFIL</h4>
				</div>
				<div className="p-3 border bg-danger bg-gradient text-white">
					<div className="d-flex justify-content-between">
						<h6>DADOS PESSOAIS</h6>
						<Link href="/perfil/minha-assinatura">
							<h6 style={{ cursor: "pointer" }}>
								MINHA ASSINATURA
							</h6>
						</Link>
					</div>
				</div>
				<div className="mt-3">
					<div className="text-center">
						{photo ? (
							<>
								<img
									src={photo}
									className="rounded-circle"
									width="100"
									height="100"
								/>
							</>
						) : (
							<>
								<Image
									src={Avaticon}
									width="100"
									height="100"
									className="rounded-circle"
								/>
							</>
						)}
						<p>100x100</p>
					</div>
					<div className="input-group mb-3 mt-3">
						<div className="custom-file m-auto">
							<input
								type="file"
								className="input-group-text w-100 m-auto bg-black bg-opacity-75 text-white"
								onChange={uploadImage}
								id="inputGroupFile01"
							/>
						</div>
					</div>
				</div>
				<div className="row align-items-start ms-0 p-3 bg-black bg-opacity-75 text-white">
					<div className="p-2 col-4 my-auto">Nome:</div>
					<div className="p-2 col-6">
						<CssTextField
							id="custom-css-outlined-input"
							defaultValue={users?.username}
							onChange={handleUsername}
							sx={{ input: { color: "white" } }}
						/>
					</div>
				</div>
				<div className="row align-items-start ms-0 p-3 bg-black bg-opacity-50 text-white">
					<div className="p-2 col-4 my-auto">E-mail:</div>
					<div className="p-2 col-6">
						<CssTextField
							id="outlined-read-only-input"
							defaultValue={session?.user?.email}
							InputProps={{
								readOnly: true
							}}
							sx={{ input: { color: "white" } }}
							helperText="*E-mail não é editável!"
						/>
					</div>
				</div>
				{/* <div className="row align-items-start ms-0 p-3 bg-black bg-opacity-75 text-white">
					<div className="p-2 col-4 my-auto">Data de nascimento:</div>
					<div className="p-2 col-3">
						<Stack component="form" noValidate spacing={3}>
							<CssTextField
								id="date"
								type="date"
								defaultValue={users?.nascimento}
								value={birthday}
								sx={{ width: 220, input: { color: "white" } }}
								InputLabelProps={{
									shrink: true
								}}
								onChange={handleBirthday}
							/>
						</Stack>
					</div>
				</div> */}
				<div className="row align-items-start ms-0 p-3 bg-black bg-opacity-75 text-white">
					<div className="p-2 col-4 my-auto">Gênero:</div>
					<div className="p-2 col-3">
						<CssFormControl fullWidth>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								className="text-white"
								value={gender}
								defaultValue={users?.genero}
								onChange={handleGender}
							>
								<MenuItem value={"Masculino"}>
									Masculino
								</MenuItem>
								<MenuItem value={"Feminino"}>Feminino</MenuItem>
								<MenuItem value={"Outro"}>Outro</MenuItem>
							</Select>
						</CssFormControl>
					</div>
				</div>
				<div className="row align-items-start ms-0 p-3 bg-black bg-opacity-50 text-white">
					<div className="p-2 col-3 my-auto">Telefone:</div>
					<div className="p-2 col-2">
						<CssTextField
							id="outlined-helperText"
							type="number"
							className="text-white"
							defaultValue={users?.ddd}
							value={DDD}
							onChange={handleDDD}
							sx={{ input: { color: "white" } }}
						/>
					</div>
					<div className="p-2 col-3">
						<CssTextField
							id="outlined-helperText"
							type="number"
							className="text-white"
							value={phone}
							inputProps={{
								inputMode: "numeric",
								pattern: "[0-9]*",
								maxLength: 9
							}}
							InputProps={{ maxLength: 9 }}
							defaultValue={users?.telefone}
							onChange={handlePhone}
							sx={{ input: { color: "white" } }}
						/>
					</div>
				</div>

				<ColorButton
					variant="contained"
					className="mt-4"
					onClick={handleSubmit}
					endIcon={<SendIcon />}
				>
					Salvar
				</ColorButton>
			</div>
		</div>
	);
}
