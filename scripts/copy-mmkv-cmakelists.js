// Copies the dummy CMakeLists.txt to the MMKV codegen jni folder in node_modules
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'dummy-mmkv-codegen-cmakelists.txt');
const destDir = path.join(__dirname, '..', 'node_modules', 'react-native-mmkv', 'android', 'build', 'generated', 'source', 'codegen', 'jni');
const dest = path.join(destDir, 'CMakeLists.txt'); // Must be exactly 'CMakeLists.txt'

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(src, dest);
console.log(`[copy-mmkv-cmakelists] Copied dummy CMakeLists.txt to ${dest}`);
