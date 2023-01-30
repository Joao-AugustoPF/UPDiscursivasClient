/* eslint-disable no-undef */

export const Session = async (req, res) => {
	const {
		query: { name, email }
	} = req;
	const customer = await stripe.customers.create({
		email: email,
		description: name
	});
	res.json({ customer: customer });
};

export default Session;
