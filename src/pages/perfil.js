import Profile from "./components/Perfil/index";
import protectedRoutes from "../utils/protectedRoutes";
import axios from "axios";

export default function Perfil({ sessions, users }) {
	return (
		<>
			<div
				className="bg-image"
				style={{backgroundImage: "url('https://img.freepik.com/vetores-gratis/fundo-de-formas-abstratas-brancas_79603-1362.jpg?t=st=1674611692~exp=1674612292~hmac=8e3d6d2fe5770e2ff9c599b8ac5071400f5995a8ee239c227cca6f5809510212')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}
			>
				<Profile session={sessions} users={users} />
			</div>
		</>
	);
}

//It set the user session "if logged" to the props of the page
export async function getServerSideProps(context) {
	const session = await protectedRoutes(context);
	if (!session) {
		return { props: {} };
	} else {
		const users = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/api/users/me?populate=*`,
			{
				headers: {
					Authorization: `Bearer ${session?.jwt}`
				}
			}
		);
		return {
			props: { sessions: session, users: users.data }
		};
	}
}
