const { MongoClient } = require('mongodb');

const [,, downloadUrl, releaseType, tag] = process.argv;
const mongoUrl = process.env.MONGODB_URL;

if (!downloadUrl || !releaseType || !mongoUrl) {
  console.error('Usage: node save-release-to-mongodb.js <downloadUrl> <releaseType> [tag]');
  process.exit(1);
}

(async () => {
  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    const db = client.db(); // Use default DB from connection string
    const collection = db.collection('releases');
    const doc = {
      url: downloadUrl,
      type: releaseType,
      tag: tag || null,
      createdAt: new Date()
    };
    await collection.insertOne(doc);
    console.log('Release info saved to MongoDB');
  } catch (err) {
    console.error('MongoDB error:', err);
    process.exit(2);
  } finally {
    await client.close();
  }
})();
