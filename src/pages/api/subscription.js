/* eslint-disable no-undef */
const stripe = require("stripe")(
	process.env.NEXT_PUBLIC_STRIPE_PRODUCTION_PRIVATE_KEY
);

export const updateSubscription = async (req, res) => {
	const {
		query: { subscription, cancel }
	} = req;
	const customer = stripe.subscriptions.update(subscription, {
		cancel_at_period_end: cancel
	});
	res.json({ customer });
};

export default updateSubscription;
