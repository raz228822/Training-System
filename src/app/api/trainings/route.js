// trainings.js

import { NextResponse } from "next/server";
import connectToMongoDB from "../../../lib/mongodb";
//import {db} from "@/lib/mongodb"

// Connecting to DB each GET call
export async function GET(req, res) {
    try {
        const client = await connectToMongoDB();
        const db = client.db('TrainingSystemDB');
        const trainings = await db.collection("trainings").find().toArray();
        client.close()
        return NextResponse.json(trainings, {status : 200})
    } catch (e) {
        console.error("Error fetching trainings:", e);
        return NextResponse.json({ error: "Internal server error" }, {status : 500});
    }
  }

  export async function POST(req, res) {
    try {
        // Assuming req.body contains the exercise data to be inserted
        //const { locked, state, supportBYOB } = req.body
        const trainingData = await req.json()
        const client = await connectToMongoDB();
        const db = client.db('TrainingSystemDB');
        await db.collection("trainings").insertOne(trainingData);
        client.close();
        return NextResponse.json({ message: "Exercise created successfully" }, { status: 201 })
    } catch (e) {
        console.error("Error creating exercise:", e);
        return NextResponse.json({ error: "Error creating exercise" }, { status: 500 });
    }
  }