import { NextResponse } from "next/server";
import clientPromise from "@/lib/connection";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const plans = await db
      .collection("plans")
      .find({ status: 1, type: "subscription" })
      .toArray();
    const formattedPlans = plans.map((plan) => ({
      ...plan,
      _id: plan._id.toString(),
    }));

    return NextResponse.json({ success: true, plans: formattedPlans });
    
  } catch (error) {
    console.error("Error fetching plan data:", error);
    return NextResponse.json({ success: false, error: "Failed to load data." }, { status: 500 });
  }
}
