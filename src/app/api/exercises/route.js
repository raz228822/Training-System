// exercises.js

// page.js

import { NextResponse } from "next/server";
import connectToMongoDB from "../../../lib/mongodb";
import {db} from "@/lib/mongodb"

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
      //res.status(500).json({ error: "Internal server error" });
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

export async function POST(req, res) {
  try {
      const db = await connectToMongoDB();
      const exercises = await db.collection("exercises").find().toArray();
      return NextResponse.json(exercises, {status : 200})
  } catch (e) {
      console.error("Error fetching exercises:", e);
      res.status(500).json({ error: "Internal server error" });
  }
}





/*import clientPromise from "../../lib/mongodb"

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("testDB");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let myPost = await db.collection("exercises_types").insertOne(bodyObject);
      res.json(myPost.ops[0]);
      break;
    case "GET":
      const allPosts = await db.collection("allExercises").find({}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
}*/











// import clientPromise from "../../../lib/mongodb";
// //import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req, res) {
//     try {
//         const client = await clientPromise;
//         const db = client.db("TrainingSystemDB");
//         const exercises = await db
//             .collection("exercises")
//             .find()
//             .toArray();
//         //res.json(exercises);
//         console.log(exercises)
//     } catch (e) {
//         console.error(e);
//     }
// }
