const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const apkPath = process.argv[2];
const token = process.env.UPLOADTHING_TOKEN;

if (!apkPath || !fs.existsSync(apkPath)) {
  console.error('APK file not found:', apkPath);
  process.exit(1);
}
if (!token) {
  console.error('UPLOADTHING_TOKEN is not set');
  process.exit(1);
}

async function upload() {
  const form = new FormData();
  form.append('files[]', fs.createReadStream(apkPath), path.basename(apkPath));

  try {
    const res = await axios.post('https://uploadthing.com/api/files', form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${token}`,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
    const url = res.data?.[0]?.url || res.data?.url;
    if (url) {
      console.log(url);
    } else {
      console.error('UploadThing response did not contain a URL:', res.data);
      process.exit(2);
    }
  } catch (err) {
    console.error('Upload failed:', err.response?.data || err.message);
    process.exit(2);
  }
}

upload();
