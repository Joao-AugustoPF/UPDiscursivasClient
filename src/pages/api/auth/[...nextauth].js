/* eslint-disable no-undef */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "../../../services/auth";

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			name: "Sign in with Email",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials) {
				/**
				 * This function is used to define if the user is authenticated or not.
				 * If authenticated, the function should return an object contains the user data.
				 * If not, the function should return `null`.
				 */
				// Return null if user data could not be retrieved
				if (credentials == null) return null;
				/**
				 * credentials is defined in the config above.
				 * We can expect it contains two properties: `email` and `password`
				 */
				try {
					const { user, jwt } = await signIn({
						email: credentials.email,
						password: credentials.password
					});
					return { ...user, jwt };
				} catch (error) {
					// Sign In Fail
					console.log(error);
					return null;
				}
			}
		})
	],
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24 * 30
	},
	callbacks: {
		session: async ({ session, token }) => {
			session.id = token.id;
			session.jwt = token.jwt;
			session.username = token.username;
			session.photo = token.photo;
			session.plan = token.plan;
			session.hasTrial = token.hasTrial;
			session.endDate = token.endDate;
			session.billingID = token.billingID;
			return Promise.resolve(session);
		},
		jwt: async ({ token, user }) => {
			const isSignIn = user ? true : false;
			if (isSignIn) {
				token.id = user.id;
				token.username = user.username;
				token.phot = user.photo;
				token.jwt = user.jwt;
				token.plan = user.plan;
				token.hasTrial = user.hasTrial;
				token.endDate = user.endDate;
				token.billingID = user.billingID;
			}
			return Promise.resolve(token);
		}
	},
	secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
