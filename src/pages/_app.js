import Head from "next/head";
import GlobalStyles from "../styles/global";
import Footer from "./components/Footer";
import NextNprogress from "nextjs-progressbar";
import NavBar from "../pages/components/NavBar2/index";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../utils/apollo";
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps }) {
	const client = useApollo(pageProps.initialApolloState);

	return (
		<>
			<SessionProvider session={pageProps.session}>
				<ApolloProvider client={client}>
					<Head>
						<title>UP Discursivas</title>
						<link
							href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
							rel="stylesheet"
						/>
						<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" />

						<link
							href="https://fonts.googleapis.com/css2?family=Sora&display=swap"
							rel="stylesheet"
						/>
						<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" />
						<link
							href="https://getbootstrap.com/docs/5.2/assets/css/docs.css"
							rel="stylesheet"
						/>
					</Head>
					<GlobalStyles />
					<NextNprogress
						color="#d10d35"
						startPosition={0.3}
						stopDelayMs={200}
						height={3}
					/>
					<NavBar />
					<Component {...pageProps} />
					<Footer />
				</ApolloProvider>
			</SessionProvider>
		</>
	);
}

export default App;
