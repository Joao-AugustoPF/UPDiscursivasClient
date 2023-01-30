/* eslint-disable no-undef */
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useMemo } from "react";

let apolloClient;

//Set the apollo url to the correct URL
function createApolloClient(session) {
	const httpLink = new HttpLink({
		uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`
	});

	const authLink = setContext((_, { headers }) => {
		return {
			headers: {
				...headers,
				authorization: session?.jwt ? `Bearer ${session?.jwt}` : ""
			}
		};
	});

	return new ApolloClient({
		ssrMode: typeof window === "undefined",
		link: authLink.concat(httpLink),
		cache: new InMemoryCache()
	});
}

export function initializeApollo(initialState = {}, session) {
	const apolloClientGlobal = apolloClient ?? createApolloClient(session);

	if (initialState) {
		apolloClientGlobal.cache.restore(initialState);
	}

	if (typeof window === "undefined") return apolloClientGlobal;

	apolloClient = apolloClient ?? apolloClientGlobal;

	return apolloClient;
}

export function useApollo(initialState = {}, session) {
	const store = useMemo(
		() => initializeApollo(initialState, session),
		[initialState, session]
	);
	return store;
}
