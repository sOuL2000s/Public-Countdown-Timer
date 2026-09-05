import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'timer_app';
const collectionName = 'timers';

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
  });

  await client.connect();
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return db;
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);

    // Get only active timers (where timer hasn't expired)
    const now = Date.now();
    const timers = await collection
      .find({})
      .sort({ startTime: -1 })
      .limit(100)
      .toArray();

    // Filter out expired timers in memory (they'll be cleaned up by cleanup endpoint)
    const activeTimers = timers.filter(timer => {
      const totalMs = (timer.years || 0) * 365.25 * 24 * 60 * 60 * 1000 +
        (timer.months || 0) * 30.44 * 24 * 60 * 60 * 1000 +
        (timer.days || 0) * 24 * 60 * 60 * 1000 +
        (timer.hours || 0) * 60 * 60 * 1000 +
        (timer.minutes || 0) * 60 * 1000 +
        (timer.seconds || 0) * 1000;
      const elapsed = now - timer.startTime;
      return elapsed < totalMs;
    });

    return res.status(200).json(activeTimers);
  } catch (error) {
    console.error('Error fetching timers:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}