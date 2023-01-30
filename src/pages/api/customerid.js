/* eslint-disable no-undef */
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY);

export const getCustomerByID = async (req, res) => {
	const {
		query: { customid }
	} = req;
	const customer = await stripe.customers.retrieve(customid);
	res.json({ customer });
};

export default getCustomerByID;
