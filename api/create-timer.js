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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, description, startTime, years, months, days, hours, minutes, seconds } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Timer name is required' });
    }

    const total = (years || 0) + (months || 0) + (days || 0) + (hours || 0) + (minutes || 0) + (seconds || 0);
    if (total <= 0) {
      return res.status(400).json({ error: 'Duration must be greater than 0' });
    }

    const db = await connectToDatabase();
    const collection = db.collection(collectionName);

    const timer = {
      name: name.trim(),
      description: description?.trim() || '',
      startTime: startTime || Date.now(),
      years: years || 0,
      months: months || 0,
      days: days || 0,
      hours: hours || 0,
      minutes: minutes || 0,
      seconds: seconds || 0,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(timer);

    return res.status(201).json({
      success: true,
      id: result.insertedId,
      timer,
    });
  } catch (error) {
    console.error('Error creating timer:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}