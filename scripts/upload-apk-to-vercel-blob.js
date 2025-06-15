// Usage: node scripts/upload-apk-to-vercel-blob.js <apkPath>
// Requires: VERCEL_BLOB_TOKEN in env

const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

async function main() {
  const apkPath = process.argv[2];
  if (!apkPath || !fs.existsSync(apkPath)) {
    console.error('APK file not found:', apkPath);
    process.exit(1);
  }
  const fileStream = fs.createReadStream(apkPath);
  const fileName = path.basename(apkPath);

  const { url } = await put(fileName, fileStream, {
    access: 'public',
    token: process.env.VERCEL_BLOB_TOKEN,
  });

  // Output the URL for GitHub Actions to pick up
  console.log(url);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
