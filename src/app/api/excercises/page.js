// src/app/api/exercises/page.js

import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { type } = req.body;

    if (!type) {
      return res.status(400).json({ error: 'Missing exercise type' });
    }

    let client;

    try {
      client = await MongoClient.connect('mongodb://localhost:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const db = client.db('mongodbVSCodePlaygroundDB'); // Change to your database name
      const exercisesCollection = db.collection('excersices_types');

      const newExercise = { type };
      const result = await exercisesCollection.insertOne(newExercise);

      res.status(201).json({ message: 'Exercise added successfully', id: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      if (client) {
        client.close();
      }
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
