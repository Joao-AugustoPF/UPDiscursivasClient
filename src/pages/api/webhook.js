/* eslint-disable no-undef */
import { print } from "graphql";
import { MutationSettingPlan } from "../../graphql/mutations/registerBilling";
import Cors from "micro-cors";
import getRawBody from "raw-body";
const stripe = require("stripe")(
	process.env.NEXT_PUBLIC_STRIPE_PRODUCTION_PRIVATE_KEY
);
const axios = require("axios");
const { buffer } = require("micro");

const endpointSecret = process.env.NEXT_PUBLIC_ENDPOINT_SECRET;
const cors = Cors({
	allowMethods: ["POST", "HEAD"]
});

export const config = {
	api: {
		bodyParser: false
	}
};

async function Webhook(req, res) {
	if (req.method === "POST") {
		const sig = req.headers["stripe-signature"];
		//const reqBuffer = await buffer(req.body);
		const rawBody = await getRawBody(req);

		let event;

		try {
			event = await stripe.webhooks.constructEvent(
				rawBody,
				sig,
				endpointSecret
			);
		} catch (err) {
			res.json({ error: `Webhook Error: ${err.message}` });
			return;
		}
		const data = event.data.object;
		const users = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/api/users`,
			{
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ADMIN_STRAPI}`
				}
			}
		);

		let user = "";
		users.data.map((value) => {
			if (value.billingID === data.customer) {
				user = value;
			}
		});

		console.log(event.type);

		let typeSubscription = "";
		switch (event.type) {
			case "invoice.paid": {
				console.log(data.lines.data[0]);
				if (data.paid === true) {
					const usuario = await axios.post(
						`${process.env.NEXT_PUBLIC_API_URL}/graphql`,
						{
							query: print(MutationSettingPlan),
							variables: {
								id: user.id,
								data: {
									hasTrial: true,
									plan:
										data.lines.data[0].plan
											.interval_count === 1
											? "mensal"
											: "trimestral",
									endDate: new Date(
										data.lines.data[0].period.end * 1000
									),
									subscriptionid:
										data.lines.data[0].subscription,
									subiscancel: false
								}
							}
						},
						{
							headers: {
								Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ADMIN_STRAPI}`
							}
						}
					);
					console.log(
						usuario.data.data.updateUsersPermissionsUser[0]
					);
				}
				break;
			}

			case "customer.subscription.deleted": {
				const usuario = await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}/graphql`,
					{
						query: print(MutationSettingPlan),
						variables: {
							id: user.id,
							data: {
								hasTrial: false,
								plan: null,
								endDate: null,
								subscriptionid: null,
								subiscancel: false
							}
						}
					},
					{
						headers: {
							Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ADMIN_STRAPI}`
						}
					}
				);
				console.log(usuario.data.data.updateUsersPermissionsUser);
				break;
			}
			default:
				console.log("Default");
		}
		res.status(200).json({ sucess: true });
	}
}

export default cors(Webhook);
