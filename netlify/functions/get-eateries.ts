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

    const eateries = await cachedDb.collection('eateries').find({}).toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(eateries),
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return {
      statusCode: 500,
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};
