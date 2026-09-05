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
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);

    // Find all timers
    const timers = await collection.find({}).toArray();
    const now = Date.now();
    const expiredIds = [];

    // Check each timer to see if it's expired
    for (const timer of timers) {
      const totalMs = (timer.years || 0) * 365.25 * 24 * 60 * 60 * 1000 +
        (timer.months || 0) * 30.44 * 24 * 60 * 60 * 1000 +
        (timer.days || 0) * 24 * 60 * 60 * 1000 +
        (timer.hours || 0) * 60 * 60 * 1000 +
        (timer.minutes || 0) * 60 * 1000 +
        (timer.seconds || 0) * 1000;
      const elapsed = now - timer.startTime;

      if (elapsed >= totalMs) {
        expiredIds.push(timer._id);
      }
    }

    // Delete expired timers
    let deletedCount = 0;
    if (expiredIds.length > 0) {
      const result = await collection.deleteMany({
        _id: { $in: expiredIds }
      });
      deletedCount = result.deletedCount;
    }

    return res.status(200).json({
      success: true,
      deletedCount,
      message: `Removed ${deletedCount} expired timer${deletedCount !== 1 ? 's' : ''}`
    });
  } catch (error) {
    console.error('Error cleaning up timers:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}