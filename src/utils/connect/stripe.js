/* eslint-disable no-undef */
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY);

export const addNewCustomer = async (email) => {
	const customer = await stripe.customers.create({
		email,
		description: "New Customer"
	});
	return customer;
};

export const getCustomerByID = async (id) => {
	const customer = await stripe.customers.retrieve(id);
	return customer;
};
