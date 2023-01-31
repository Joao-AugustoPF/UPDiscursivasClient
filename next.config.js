/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: `${process.env.NEXT_PUBLIC_API_URL}`,
				port: `${1337}`,
				pathname: "/uploads/**"
			}
		]
	},
	pageExtensions: ["js"]
};

module.exports = nextConfig;
