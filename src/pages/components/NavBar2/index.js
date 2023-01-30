/* eslint-disable no-undef */
import Logout from "@mui/icons-material/Logout";
import {
	Avatar,
	Divider,
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
	Tooltip
} from "@mui/material";
import { Box } from "@mui/system";
import { GraphQLClient } from "graphql-request";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import * as S from "../../../lib/NavBar/styles";
import { useEffect, useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Offcanvas from "react-bootstrap/Offcanvas";
import axios from "axios";
import { QueryUser } from "../../../graphql/queries/user";
import { MutationRegisterTrial } from "../../../graphql/mutations/registerBilling";
import Logo from "../../../../public/img/logo.png";
import { useRouter } from "next/router";
import Link from "next/link";
import Avaticon from "../../../../public/img/iconLogoTest.png";

export default function ResponsiveExample() {
	const [show, setShow] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [photo, setPhoto] = useState();

	const open = Boolean(anchorEl);

	const { data: session, loading } = useSession();

	const navigate = useRouter();

	const handleCloseMenu = () => setShow(false);
	const handleClose = () => setAnchorEl(null);
	const handleShow = () => setShow(true);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleProfile = () => {
		handleClose();
		handleCloseMenu();
		navigate.push("/perfil");
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

		console.log(user);
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
	if (session) {
		handleImg();
		//isActive();
	}

	useEffect(() => {}, [session]);

	return (
		<>
			<S.ContainerOusite>
				<S.NavMenu>
					<S.MenuImageToggle>
						<a href="/" className="ms-3">
							<Image src={Logo} width="100" height="100" />
						</a>
					</S.MenuImageToggle>
					<S.NavMenuList>
						<ul className="navbar ms-5 list-inline">
							<li className="nav-item mx-1 mt-2">
								<a
									className="text-decoration-none"
									style={{
										fontWeight: "500",
										color: "#d10d35"
									}}
									href="/assinaturas"
								>
									Assinar
								</a>
							</li>
							<li className="nav-item mx-1 mt-2">
								<a
									href="/provas"
									className="navlink text-decoration-none"
									style={{
										fontWeight: "500",
										color: "#d10d35"
									}}
								>
									Provas
								</a>
							</li>
							<li className="nav-item mx-1 mt-2">
								<a
									href="/questoes"
									className="navlink text-decoration-none"
									style={{
										fontWeight: "500",
										color: "#d10d35"
									}}
								>
									Questões
								</a>
							</li>
							<li className="nav-item mx-1 mt-2">
								<a
									className="text-decoration-none"
									style={{
										fontWeight: "500",
										color: "#d10d35"
									}}
									href="/sobre"
								>
									Sobre
								</a>
							</li>
						</ul>
					</S.NavMenuList>
				</S.NavMenu>
				<S.LateralMenu>
					<Offcanvas
						show={show}
						onHide={handleCloseMenu}
						responsive="lg"
					>
						<Offcanvas.Header closeButton>
							<a href="/">
								<Image
									src={Logo}
									alt="Bootstrap"
									width="70"
									height="70"
								/>
							</a>
							<Offcanvas.Title>UP Discursivas</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body className="ms-5">
							<ul className="navbar-nav ms-5">
								<li className="nav-item mx-1 mt-2">
									<a
										className="text-decoration-none"
										style={{
											fontWeight: "500",
											color: "#d10d35"
										}}
										href="/assinaturas"
									>
										Assinar
									</a>
								</li>
								<li className="nav-item mx-1 mt-2">
									<a
										href="/provas"
										className="navlink text-decoration-none"
										style={{
											fontWeight: "500",
											color: "#d10d35"
										}}
									>
										Provas
									</a>
								</li>
								<li className="nav-item mx-1 mt-2">
									<a
										href="/questoes"
										className="navlink text-decoration-none"
										style={{
											fontWeight: "500",
											color: "#d10d35"
										}}
									>
										Questões
									</a>
								</li>
								<li className="nav-item mx-1 mt-2">
									<a
										className="text-decoration-none"
										style={{
											fontWeight: "500",
											color: "#d10d35"
										}}
										href="/sobre"
									>
										Sobre
									</a>
								</li>
								<li className="nav-item mx-1 mt-4">
									<a
										className="text-decoration-none"
										style={{
											fontWeight: "500",
											color: "#d10d35"
										}}
										href="/perfil"
									>
										{photo ? (
											<>
												<Avatar
													sx={{
														width: 40,
														height: 40
													}}
												>
													<img
														src={photo}
														alt="imagem de um avatar"
														width="100%"
														height="100%"
													/>
												</Avatar>
											</>
										) : (
											<>
												<Avatar
													sx={{
														width: 40,
														height: 40
													}}
												>
													<Image
														src={Avaticon}
														alt="imagem de um avatar"
														width="100%"
														height="100%"
													/>
												</Avatar>
											</>
										)}
										Perfil
									</a>
								</li>
							</ul>
							{session ? <></> : <></>}
						</Offcanvas.Body>
					</Offcanvas>
				</S.LateralMenu>

				{session ? (
					<>
						<S.MenuAvatar>
							<Box className="extended-profile mt-1 me-5">
								<Tooltip title="Acessar perfil">
									<IconButton
										onClick={handleClick}
										size="small"
										sx={{ ml: 2 }}
										aria-controls={
											open ? "account-menu" : undefined
										}
										aria-haspopup="true"
										aria-expanded={
											open ? "true" : undefined
										}
									>
										{photo ? (
											<>
												<Avatar
													sx={{
														width: 40,
														height: 40
													}}
												>
													<img
														src={photo}
														alt="imagem de um avatar"
														width="100%"
														height="100%"
													/>
												</Avatar>
											</>
										) : (
											<>
												<Avatar
													sx={{
														width: 40,
														height: 40
													}}
												>
													<Image
														src={Avaticon}
														alt="imagem de um avatar"
														width="100%"
														height="100%"
													/>
												</Avatar>
											</>
										)}
									</IconButton>
								</Tooltip>
							</Box>
							<Menu
								anchorEl={anchorEl}
								id="account-menu"
								open={open}
								onClose={handleClose}
								PaperProps={{
									elevation: 0,
									sx: {
										overflow: "visible",
										filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
										mt: 1.5,
										marginRight: "200px",
										"& .MuiAvatar-root": {
											width: 32,
											height: 32,
											ml: -0.5,
											mr: 1
										},
										"&:before": {
											content: '""',
											display: "block",
											position: "absolute",
											top: 0,
											right: 14,
											width: 10,
											height: 10,
											bgcolor: "background.paper",
											transform:
												"translateY(-50%) rotate(45deg)",
											zIndex: 0
										}
									}
								}}
								transformOrigin={{
									horizontal: "right",
									vertical: "top"
								}}
								anchorOrigin={{
									horizontal: "right",
									vertical: "bottom"
								}}
							>
								<MenuItem onClick={handleProfile}>
									{session?.username}
								</MenuItem>
								<Divider />
								<MenuItem>
									<Link href="/perfil/minha-assinatura">
										<p>Assinatura</p>
									</Link>
								</MenuItem>
								<Divider />
								<MenuItem onClick={signOut}>
									<ListItemIcon>
										<Logout fontSize="small" />
									</ListItemIcon>
									Sair
								</MenuItem>
							</Menu>
						</S.MenuAvatar>
					</>
				) : (
					<S.AuthToggle>
						<a href="/login">
							<button className="btn btn-success me-2">
								Logar
							</button>
						</a>
						<a href="/registrar">
							<button className="btn btn-success me-2">
								Registrar
							</button>
						</a>
					</S.AuthToggle>
				)}
				<S.MenuToggle>
					<MenuRoundedIcon
						color="error"
						fontSize="large"
						onClick={handleShow}
					/>
				</S.MenuToggle>
			</S.ContainerOusite>
		</>
	);
}
