/* eslint-disable no-undef */
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY);

const createBillingSession = async (req, res) => {
	const {
		query: { customer }
	} = req;
	const session = await stripe.billingPortal.sessions.create({
		customer,
		return_url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}`
	});
	res.redirect(session.url)
};

export default createBillingSession;
