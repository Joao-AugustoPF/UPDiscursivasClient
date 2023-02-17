import { getSession } from "next-auth/react";

async function protectedRoutes(context) {
	const session = await getSession(context);
	if (session) {
		console.log("in")
		context.res.setHeader("Location", "/perfil");
		context.res.statusCode = 302;
	}

	return session;
}

export default protectedRoutes;
