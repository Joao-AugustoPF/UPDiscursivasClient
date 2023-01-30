import { getSession } from "next-auth/react";

async function protectedRoutes(context) {
	const session = await getSession(context);

	if (!session) {
		return
	}

	return session;
}

export default protectedRoutes;