import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />)
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				)
			};
		} finally {
			sheet.seal();
		}
	}

	return() {
		<Html lang="pt-BR">
			<Head>
				<link rel="shortcut icon" href="../../public/favicon.ico" />
				<link rel="shortcut icon" href="/img/icon-2.png" />
				<link rel="apple-touch-icon" href="/img/icon-2.png" />
				<meta
					name="description"
					content="A simple base starter to work with JS, React, NextJs and Styled Components"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>;
	}
}
