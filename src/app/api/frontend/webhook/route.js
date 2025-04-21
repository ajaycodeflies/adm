import { buffer } from 'micro';
import Stripe from 'stripe';
import clientPromise from "@/lib/connection";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

const connectToDatabase = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("admDigital");
    return db;
  } catch (error) {
    console.error("Failed to connect to the database", error);
    throw new Error("Database connection error");
  }
};

const webhookHandler = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf.toString(), sig, endpointSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const { customer_email, payment_intent, amount_total, metadata } = session;

      // Store the successful payment record in the database
      const db = await connectToDatabase();
      await db.collection('payments').insertOne({
        email: customer_email,
        payment_status: 'success',
        plan_id: metadata.planId,
        amount: amount_total / 100,
        transaction_id: payment_intent,
        timestamp: new Date(),
      });

      console.log('Payment recorded successfully');
    }

    if (event.type === 'checkout.session.async_payment_failed') {
      const session = event.data.object;
      const { customer_email, payment_intent, amount_total, metadata } = session;

      const db = await connectToDatabase();
      await db.collection('payments').insertOne({
        email: customer_email,
        payment_status: 'failed',
        plan_id: metadata.planId,
        amount: amount_total / 100,
        transaction_id: payment_intent,
        timestamp: new Date(),
      });

      console.log('Payment failed recorded');
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

export default webhookHandler;
