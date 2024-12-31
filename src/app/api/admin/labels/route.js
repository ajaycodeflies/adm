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
        const { label } = await req.json();

        if (!label || typeof label !== "string") {
            return NextResponse.json(
                { success: false, message: "Invalid label data" },
                { status: 400 }
            );
        }

        const result = await db.collection("labels").insertOne({
            label,
            createdAt: new Date(),
        });

        // Return the label with the inserted _id
        return NextResponse.json(
            { success: true, message: "Label saved successfully", labels: [{ _id: result.insertedId, label }] },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving label:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}


export async function GET(req) {
  try {
    const db = await connectToDatabase();
    const labels = await db.collection("labels").find().toArray();
    
    return NextResponse.json({ success: true, labels }, { status: 200 });
  } catch (error) {
    console.error("Error fetching labels:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const db = await connectToDatabase();

    const url = new URL(req.url);
    const labelId = url.searchParams.get("id");

    if (!labelId) {
      return NextResponse.json({ error: "Label ID is required." }, { status: 400 });
    }

    if (!ObjectId.isValid(labelId)) {
      return NextResponse.json({ error: "Invalid Label ID." }, { status: 400 });
    }

    const deletedLabel = await db.collection("labels").findOneAndDelete({
      _id: new ObjectId(labelId),
    });

    return NextResponse.json(
      { message: "Label deleted successfully.", label: deletedLabel.value },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting label:", error);
    return NextResponse.json(
      { error: "Failed to delete label." },
      { status: 500 }
    );
  }
}


// New PUT method for updating the label
export async function PUT(req) {
  try {
    const db = await connectToDatabase();
    const { labelId, label} = await req.json();

    if (!labelId || !ObjectId.isValid(labelId)) {
      return NextResponse.json({ error: "Invalid Label ID." }, { status: 400 });
    }

    // Update the label in the database
    const updatedlabel = await db.collection("labels").findOneAndUpdate(
      { _id: new ObjectId(labelId) },
      {
        $set: {
          label: label,
          updated_at: new Date(),
        },
      },
      { returnDocument: "after" }
    );
    
    return NextResponse.json(
      { success: true, message: "Label updated successfully.", label: updatedlabel },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating label:", error);
    return NextResponse.json({ error: "Failed to update label." }, { status: 500 });
  }
}