import Email from "@/app/model/Email";
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

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address.',
      });
    }

    try {
      await connectToDatabase();

      // Save email to the database
      // const existingEmail = await Email.findOne({ email });
      // if (existingEmail) {
      //   return res.status(400).json({
      //     success: false,
      //     message: 'Email already exists.',
      //   });
      // }

      const newEmail = new Email({ email });
      await newEmail.save();

      res.status(200).json({
        success: true,
        message: 'Email saved successfully!',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Something went wrong. Please try again later.',
      });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
