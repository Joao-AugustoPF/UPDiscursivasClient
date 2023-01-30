/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
				port: `${process.env.PORT}`,
				pathname: "/uploads/**"
			}
		]
	},
	pageExtensions: ["js"]
};

module.exports = nextConfig;
