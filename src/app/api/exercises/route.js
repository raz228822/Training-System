// exercises.js

import { NextResponse } from "next/server";
import connectToMongoDB from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
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

  // PATCH Method for updating an exercise
  export async function PATCH(req, res) {
    try {
      const { id, exerciseNewName } = await req.json();
      
      if (!id) {
        return res.status(400).json({ error: "Exercise ID is required" });
      }
  
      const client = await connectToMongoDB();
      const db = client.db('TrainingSystemDB');
      
      const objectId = new ObjectId(id); // Convert id to ObjectId type
      
      const result = await db.collection("exercises").updateOne(
        { "_id": objectId },
        { $set: { "name": exerciseNewName } }
      );
  
      console.log("Update result:", result);
      
      client.close();
  
      if (result.modifiedCount === 1) {
        return NextResponse.json({ message: "Exercise changed successfully" }, { status: 200 })
      } else {
        return NextResponse.json({ error: "Failed to update exercise" }, { status: 404 });
      }
    } catch (e) {
      console.error("Error updating exercise:", e);
      return NextResponse.json({ error: "Error creating exercise" }, { status: 500 });
    }
  }

  // export async function PATCH(req, res) {
  //   try {
  //     const { id, exerciseNewName } = await req.json();
      
  //     if (!id) {
  //       return res.status(400).json({ error: "Exercise ID is required" });
  //     }
  
  //     const client = await connectToMongoDB();
  //     const db = client.db('TrainingSystemDB');
      
  //     const objectId = ObjectId(id); // Convert id to ObjectId type
      
  //     const result = await db.collection("exercises").updateOne(
  //       { "_id": objectId },
  //       { $set: { "name": exerciseNewName } }
  //     );
  
  //     console.log("Update result:", result);
      
  //     client.close();
  
  //     if (result.modifiedCount === 1) {
  //       return res.status(200).json({ message: "Exercise updated successfully" });
  //     } else {
  //       return res.status(404).json({ error: "Failed to update exercise" });
  //     }
  //   } catch (e) {
  //     console.error("Error updating exercise:", e);
  //     return res.status(500).json({ error: "Internal server error" });
  //   }
  // }


  // DELETE Method for deleting an exercise
  export async function DELETE(req, res) {
    try {
      const { id } = await req.json();
      const client = await connectToMongoDB();
      const db = client.db('TrainingSystemDB');
      await db.collection("exercises").deleteOne({ _id: new ObjectId(id) });
      client.close();
      return NextResponse.json({ message: "Exercise deleted successfully" }, { status: 200 });
    } catch (e) {
      console.error("Error deleting exercise:", e);
      return NextResponse.json({ error: "Error deleting exercise" }, { status: 500 });
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