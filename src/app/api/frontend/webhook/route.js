import { buffer } from 'micro';
import Stripe from 'stripe';
import clientPromise from "@/lib/connection";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

export const config = {
  api: {
    bodyParser: false,
  },
};

const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const reqBuffer = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    const { id: paymentIntentId, amount_received, metadata } = paymentIntent;

    try {
      const db = await connectToDatabase();
      
      const payment = await db.collection('payments').findOne({ transaction_id: paymentIntentId });

      if (payment) {
        await db.collection('payments').updateOne(
          { transaction_id: paymentIntentId },
          { $set: { payment_status: 'succeeded', amount_received: amount_received / 100 } }
        );
        
        console.log("Payment status updated to 'succeeded'");
      } else {
        console.log("Payment record not found for payment intent");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      return res.status(500).send('Error updating payment status.');
    }
  }

  res.json({ received: true });
};

export default handleWebhook;
