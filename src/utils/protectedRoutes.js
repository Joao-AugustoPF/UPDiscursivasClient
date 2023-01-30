import { getSession } from "next-auth/react";

async function protectedRoutes(context) {
	const session = await getSession(context);

	if (!session) {
		context.res.setHeader("Location", "/login");
		context.res.statusCode = 302;
	}

	return session;
}

export default protectedRoutes;
