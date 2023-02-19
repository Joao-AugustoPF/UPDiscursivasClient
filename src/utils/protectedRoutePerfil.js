import axios from "axios";
import { getSession } from "next-auth/react";

async function protectedRoutes(context) {
	const session = await getSession(context);

	if (!session) {
		context.res.setHeader("Location", "/login");
		context.res.statusCode = 302;
		return { session: null, users: null };
	} else {
		const users = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/api/users/me?populate=*`,
			{
				headers: {
					Authorization: `Bearer ${session?.jwt}`
				}
			}
		);

		return { session, users: users.data };
	}
}

export default protectedRoutes;
