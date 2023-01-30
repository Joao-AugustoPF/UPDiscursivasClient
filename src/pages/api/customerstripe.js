/* eslint-disable no-undef */
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY);

export const AddNewCustomer = async (req, res) => {
	const {
		query: { name, email }
	} = req;
	const customer = await stripe.customers.create({
		email: email,
		description: name
	});
	res.json({ customer: customer });
};

export default AddNewCustomer;
