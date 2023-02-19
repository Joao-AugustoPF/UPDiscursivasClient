import { getSession } from "next-auth/react";
import { initializeApollo } from "./apollo";
import { QueryQuestões } from "../graphql/queries/questoes";
import axios from "axios";

async function protectedRoutes(context) {
	const session = await getSession(context);
	const apolloClient = initializeApollo(null, session);
	if (!session) {
		context.res.setHeader("Location", "/login");
		context.res.statusCode = 302;
		return { session: null, provas: null };
	}

	const users = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
		{
			headers: {
				Authorization: `Bearer ${session?.jwt}`
			}
		}
	);

	if (!users?.data.hasTrial) {
		context.res.setHeader("Location", "/assinaturas");
		context.res.statusCode = 302;
		return { session: null, provas: null };
	} else {
		const { data } = await apolloClient.query({
			query: QueryQuestões
		});

		const provas = data.questoes.data;
		return {
			session,
			provas
		};
	}
}

export default protectedRoutes;
