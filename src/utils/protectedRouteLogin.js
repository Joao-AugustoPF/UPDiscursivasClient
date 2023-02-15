import { getSession } from "next-auth/react";

async function protectedRoutes(context) {
	const session = await getSession(context);

	if (session) {
		context.res.setHeader("Location", "/perfil");
		context.res.statusCode = 200;
		return session;
	}
	return
}

export default protectedRoutes;
