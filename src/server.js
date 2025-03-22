import express, { json } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 5000;

// Allow cross-origin requests
app.use(cors());
app.use(express.json());

// MongoDB setup
const client = new MongoClient(process.env.MONGODB_URI);
await client.connect().catch((err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(1);
})

const db = client.db("vegan-pdx");
const restaurants = db.collection("restaurants");

// Example GET endpoint to fetch data
app.get('/api/restaurants', async (req, res) => {
  try {
    const results = await restaurants.find({}).toArray();
    console.log('results', results)
    res.json(results);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '..', 'dist');

  app.use(express.static(clientDist));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  })
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
