/* eslint-disable no-undef */
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PRODUCTION_PRIVATE_KEY);

async function CreateStripeSession(req, res) {
	const {
		query: { keyword, customerid }
	} = req;
	let param = "";
	if (keyword === "mensal") {
		param = process.env.NEXT_PUBLIC_MENSAL_STRIPE;
	} else if (keyword === "trimestral") {
		param = process.env.NEXT_PUBLIC_TRIMESTRAL_STRIPE;
	}
	const session = await stripe.checkout.sessions.create({
		customer: customerid,
		payment_method_types: ["card", "boleto"],
		line_items: [{ price: param, quantity: 1 }],
		mode: "subscription",
		success_url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/perfil/minha-assinatura`,
		cancel_url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/`
	});
	res.json({ id: session.id, billingID: customerid, keyword: keyword });
}

export default CreateStripeSession;
