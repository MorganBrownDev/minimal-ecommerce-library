require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const domain = process.env.DOMAIN || "http://localhost:8888";

exports.handler = async (event, context) => {
  //const {ticketID, purchaseQuantity} = JSON.parse(event.body);
  const {email} = JSON.parse(event.body);
  console.log(email)

  const checkoutItems = [ {
      price: 'price_1R0CErBFmJyup0ZDKxLGls3z',
      quantity: 1,
}];

const sessionConfig = {
  payment_method_types: ["card"],
  customer_email: email,
  line_items: checkoutItems,
  mode: "payment",
  success_url: `${domain}/tickets?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${domain}/tickets/`,
};

const session = await stripe.checkout.sessions.create(sessionConfig);

  return {
    statusCode: 200,
    body: JSON.stringify({
      id: session.id,
    }),
  };
};
