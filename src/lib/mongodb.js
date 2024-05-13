// mongodb.js

import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://raz228822:123raz123@trainingsystemdb.3whrhyu.mongodb.net/?retryWrites=true&w=majority&appName=TrainingSystemDB';

const client = new MongoClient(uri);

// try {
//   await client.connect();
// }
// catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     throw error;
// }

// export const db = client.db('TrainingSystemDB')


// Creating a connection each GET / POST call
export default async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}





// // mongodb.js

// import { MongoClient } from 'mongodb'

// // const uri = process.env.MONGODB_URI
// const uri = 'mongodb+srv://raz228822:123raz123@trainingsystemdb.3whrhyu.mongodb.net/?retryWrites=true&w=majority&appName=TrainingSystemDB'

// const client = new MongoClient(uri)
// await client.connect()

// export const db = client.db('TrainingSystemDB')








/*

// mongodb.js

import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
// const client = new MongoClient(uri)
// await client.connect()

//export const db = client.db('TrainingSystem')

//const uri = 'mongodb+srv://raz228822:123raz123@trainingsystem.tk0rfnb.mongodb.net/'
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
    clientPromise = global._mongoClientPromise
  }

} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

//export const db = clientPromise.db('TrainingSystem')

export default clientPromise

*/