import clientPromise from "@/lib/connection";

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

export async function GET(request) {
    try {
      const db = await connectToDatabase();
  
      // Count documents in respective collections
      const lessonsCount = await db.collection("lessons").countDocuments();
      const usersCount = await db.collection("users").countDocuments();
      const questionsCount = await db.collection("questions").countDocuments();
      const pagesCount = await db.collection("pages").countDocuments();
  
      return new Response(
        JSON.stringify({ lessonsCount, usersCount, questionsCount, pagesCount }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error fetching counts:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
        status: 500,
      });
    }
  }
