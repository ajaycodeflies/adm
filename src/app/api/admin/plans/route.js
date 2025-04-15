import { NextResponse } from "next/server";
import clientPromise from "@/lib/connection";
import { ObjectId } from "mongodb";

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
    const db = await connectToDatabase();
    const plan = await req.json();

    await db.collection("plans").insertOne({
      plan_name: plan.planName,
      price: plan.price,
      original_price: plan.originalPrice,
      per_day_price: plan.perDayPrice,
      per_day_off: plan.perDayOff,
      status: plan.status,
      is_popular: plan.isPopular,
      type: "subscription",
      created_at: new Date(),
    });

    return NextResponse.json({ success: true, message: "Plans saved successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error saving plans:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET(req) {
  try {
    const db = await connectToDatabase();
    const plans = await db.collection("plans").find({ type: "subscription" }).toArray();
    return NextResponse.json({ success: true, plans }, { status: 200 });
  } catch (error) {
    console.error("Error fetching plans:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    const db = await connectToDatabase();

    const url = new URL(req.url);
    const planId = url.searchParams.get("id");

    if (!planId) {
      return NextResponse.json({ error: "Plan ID is required." }, { status: 400 });
    }

    if (!ObjectId.isValid(planId)) {
      return NextResponse.json({ error: "Invalid Plan ID." }, { status: 400 });
    }

    const deletedPlan = await db.collection("plans").findOneAndDelete({
      _id: new ObjectId(planId),
    });

    return NextResponse.json(
      { message: "Plan deleted successfully.", plan: deletedPlan.value },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting plan:", error);
    return NextResponse.json(
      { error: "Failed to delete plan." },
      { status: 500 }
    );
  }
}

// New PUT method for updating the plan
export async function PUT(req) {
  try {
    const db = await connectToDatabase();
    const { planId, planName, price, originalPrice, perDayPrice, perDayOff, status, isPopular } = await req.json();

    console.log(req.body);
    
    if (!planId || !ObjectId.isValid(planId)) {
      return NextResponse.json({ error: "Invalid Plan ID." }, { status: 400 });
    }

    // Update the plan in the database
    const updatedPlan = await db.collection("plans").findOneAndUpdate(
      { _id: new ObjectId(planId) },
      {
        $set: {
          plan_name: planName,
          price: price,
          original_price: originalPrice,
          per_day_price: perDayPrice,
          per_day_off: perDayOff,
          status: status,
          is_popular: isPopular,
          updated_at: new Date(),
        },
      },
      { returnDocument: "after" }
    );
    
    return NextResponse.json(
      { success: true, message: "Plan updated successfully.", plan: updatedPlan },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating plan:", error);
    return NextResponse.json({ error: "Failed to update plan." }, { status: 500 });
  }
}
