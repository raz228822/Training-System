// exercises.js

import { NextResponse } from "next/server";
import connectToMongoDB from "../../../lib/mongodb";
//import {db} from "@/lib/mongodb"

// Connecting to DB each GET call
  export async function GET(req, res) {
  try {
      const client = await connectToMongoDB();
      const db = client.db('TrainingSystemDB');
      const exercises = await db.collection("exercises").find().toArray();
      client.close()
      return NextResponse.json(exercises, {status : 200})
  } catch (e) {
      console.error("Error fetching exercises:", e);
      return NextResponse.json({ error: "Internal server error" }, {status : 500});
  }
}

  export async function POST(req, res) {
  try {
      // Assuming req.body contains the exercise data to be inserted
      //const { locked, state, supportBYOB } = req.body
      const exerciseData = await req.json()
      const client = await connectToMongoDB();
      const db = client.db('TrainingSystemDB');
      await db.collection("exercises").insertOne(exerciseData);
      client.close();
      return NextResponse.json({ message: "Exercise created successfully" }, { status: 201 })
  } catch (e) {
      console.error("Error creating exercise:", e);
      return NextResponse.json({ error: "Error creating exercise" }, { status: 500 });
  }
}

// // Calling GET while having db connection on
// export async function GET(req, res) {
//   try {
//       const exercises = await db.collection("exercises").find().toArray();
//       return NextResponse.json(exercises, {status : 200})
//   } catch (e) {
//       console.error("Error fetching exercises:", e);
//       res.status(500).json({ error: "Internal server error" });
//   }
// }

// export async function POST(req, res) {
//   try {
//       const client = await connectToMongoDB();
//       const db = await client.db('TrainingSystemDB')
//       const exercises = await db.collection("exercises").find().toArray();
//       client.close();
//       return NextResponse.json(exercises, {status : 200})
//   } catch (e) {
//       console.error("Error fetching exercises:", e);
//       return NextResponse.status(500).json({ error: "Internal server error" });
//   }
// }