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

export async function POST(req) {
    try {
        const { planId, price, customerEmail } = await req.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: price * 100,
            currency: 'usd',
            metadata: { planId },
        });

        const db = await connectToDatabase();

        await db.collection('payments').insertOne({
            email: customerEmail || '',
            payment_status: 'pending',
            plan_id: planId,
            amount: price,
            transaction_id: paymentIntent.id,
            timestamp: new Date(),
        });

        return new Response(
            JSON.stringify({ clientSecret: paymentIntent.client_secret }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error creating payment intent:', error);
        return new Response(JSON.stringify({ error: 'Payment intent creation failed.' }), {
            status: 500,
        });
    }
}
