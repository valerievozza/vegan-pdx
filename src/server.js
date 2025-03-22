import express, { json } from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Allow cross-origin requests
app.use(cors());
app.use(json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useUnifiedTopology: true
});

await client.connect().catch((err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(1);
})

const collection = client.db("vegan-pdx").collection("restaurants");

// Example GET endpoint to fetch data
app.get('/api/restaurants', async (req, res) => {
  try {
    const results = await collection.find({}).toArray();
    console.log('results', results)
    res.json(results);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
