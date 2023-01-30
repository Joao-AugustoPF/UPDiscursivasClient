/* eslint-disable no-undef */
const strapiUrl = process.env.NEXT_PUBLIC_API_URL;

import axios from "axios";

//Makes the sign-in
export async function signIn({ email, password }) {
	const res = await axios.post(
		`${strapiUrl}/api/auth/local`,
		{
			identifier: email,
			password
		},
		{
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ADMIN_STRAPI}`
			}
		}
	);
	return res.data;
}
