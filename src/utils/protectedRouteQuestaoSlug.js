import { getSession } from "next-auth/react";
import axios from "axios";
import { initializeApollo } from "./apollo";
import { QueryQuestão } from "../graphql/queries/questaoSlug";

async function protectedRoutes(context) {
	const session = await getSession(context);
	const apolloClient = initializeApollo(null, session);
	if (!session) {
		return;
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
		return { session: null };
	} else {
		const slug = context?.params?.slug;
		const { data } = await apolloClient.query({
			query: QueryQuestão,
			variables: { slug }
		});
		//console.log(slug);
		const posts = data?.questoes?.data;
		const perguntas = posts[0];
		return {
			perguntas
		};
	}
}

export default protectedRoutes;
