import { Handler } from '@netlify/functions';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);
let cachedDb: ReturnType<typeof client.db>;

export const handler: Handler = async () => {
  try {
    if (!cachedDb) {
      await client.connect();
      cachedDb = client.db('vegan-pdx');
    }

    const restaurants = await cachedDb.collection('restaurants').find({}).toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(restaurants),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
