import Profile from "./components/Perfil/index";
import protectedRoutes from "../utils/protectedRoutePerfil";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Perfil({ sessions, users }) {
	const router = useRouter()
	useEffect(() => {
		if(!sessions) {
			router.push('/login')
		}
	}, [sessions]);
	return (
		<>
			<div
				className="bg-image"
				style={{
					backgroundImage:
						"url('https://img.freepik.com/vetores-gratis/fundo-de-formas-abstratas-brancas_79603-1362.jpg?t=st=1674611692~exp=1674612292~hmac=8e3d6d2fe5770e2ff9c599b8ac5071400f5995a8ee239c227cca6f5809510212')",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover"
				}}
			>
				<Profile session={sessions} users={users} />
			</div>
		</>
	);
}

//It set the user session "if logged" to the props of the page
export async function getServerSideProps(context) {
	const { session, users } = await protectedRoutes(context);
	if (!session) {
		return { props: { sessions: null, users: null } };
	} else {
		return {
			props: { sessions: session, users: users }
		};
	}
}
