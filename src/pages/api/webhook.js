/* eslint-disable no-undef */
import { print } from "graphql";
import gql from "graphql-tag";
import { MutationSettingPlan } from "../../graphql/mutations/registerBilling";
const stripe = require("stripe")(
	process.env.NEXT_PUBLIC_STRIPE_PRODUCTION_PRIVATE_KEY
);
const axios = require("axios");
const { buffer } = require("micro");
export const config = {
	api: {
		bodyParser: false
	}
};

const QURI = gql`
	mutation MutationRegisterPlan($id: ID!, $data: UsersPermissionsUserInput!) {
		updateUsersPermissionsUser(id: $id, data: $data) {
			data {
				id
				attributes {
					username
					hasTrial
					plan
					endDate
				}
			}
		}
	}
`;

async function Webhook(req, res) {
	const endpointSecret = process.env.NEXT_PUBLIC_ENDPOINT_SECRET;
	// const endpoint = await stripe.webhookEndpoints.create({
	//   url: 'https://up-discursivas-client.vercel.app/api/webhook',
	//   enabled_events: [
	//     "payment_intent.succeeded",
	//     "charge.customer.created",
	//     "invoice.paid",
	//     "customer.subscription.created",
	//     "customer.subscription.updated",
	//   ],
	// });

	const sig = req.headers["stripe-signature"];

	const reqBuffer = await buffer(req);
	let event;

	try {
		event = await stripe.webhooks.constructEvent(
			reqBuffer,
			sig,
			endpointSecret
		);
	} catch (err) {
		res.json({error: `Webhook Error: ${err.message}`})
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
									data.lines.data[0].plan.interval_count === 1
										? "mensal"
										: "trimestral",
								endDate: new Date(
									data.lines.data[0].period.end * 1000
								),
								subscriptionid: data.lines.data[0].subscription,
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
				console.log(usuario.data.data.updateUsersPermissionsUser[0]);
				res.status(200).json({sucess: true});
			}
			res.status(200).json({sucess: true});
			break;
		}

		case "customer.subscription.updated": {
			// started trial
			// let subscrpitionType = "";
			// if (data.amount === 1990) {
			//   subscrpitionType = "mensal";
			//   return;
			// }

			console.log(data.lines);

			// if (data.amount === 3990) {
			//   subscrpitionType = "trimestral";
			// }

			// const usuario = await axios.post(
			//   `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
			//   {
			//     query: print(QURI),
			//     variables: {
			//       id: user.id,
			//       data: {
			//         hasTrial: true,
			//         plan: subscrpitionType,
			//         endDate: new Date(data.current_period_end * 1000),
			//       },
			//     },
			//   },
			// );
			// console.log(usuario);

			// const isOnTrial = data.status === "trialing";

			// if (isOnTrial) {
			//   const usuario = await axios.post(
			//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
			//     {
			//       query: print(QURI),
			//       variables: {
			//         id: user.id,
			//         data: {
			//           hasTrial: true,
			//           plan: subscrpitionType,
			//           endDate: new Date(data.current_period_end * 1000),
			//         },
			//       },
			//     },
			//   );
			//   console.log(usuario);
			// } else if (data.status === "active") {
			//   const usuario = await axios.post(
			//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
			//     {
			//       query: print(QURI),
			//       variables: {
			//         id: user.id,
			//         data: {
			//           hasTrial: true,
			//           endDate: new Date(data.current_period_end * 1000),
			//         },
			//       },
			//     },
			//   );
			//   console.log(usuario);
			// }

			// if (data.canceled_at) {
			//   // cancelled
			//   console.log(
			//     "You just canceled the subscription -> " + data.canceled_at,
			//   );
			//   const usuario = await axios.post(
			//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
			//     {
			//       query: print(QURI),
			//       variables: {
			//         id: user.id,
			//         data: {
			//           hasTrial: false,
			//           plan: "none",
			//           endDate: null,
			//         },
			//       },
			//     },
			//   );
			//   console.log(usuario);
			// }
			// console.log("actual", user.hasTrial, data.current_period_end, user.plan);

			//console.log("customer changed", JSON.stringify(data));
			break;
		}

		case "customer.subscription.deleted": {
			const usuario = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/graphql`,
				{
					query: print(QURI),
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
			res.status(200).json({sucess: true});
			break;
		}
		default:
			console.log("");
			res.status(200).json({sucess: true});
	}

	// Return a 200 response to acknowledge receipt of the event
	//ctx.send();
}

export default Webhook;
