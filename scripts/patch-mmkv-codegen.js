const fs = require('fs');
const path = require('path');

const mmkvPkg = path.join(__dirname, '../node_modules/react-native-mmkv/package.json');
if (fs.existsSync(mmkvPkg)) {
  const pkg = JSON.parse(fs.readFileSync(mmkvPkg, 'utf8'));
  pkg.codegenConfig = { android: { cmake: false } };
  fs.writeFileSync(mmkvPkg, JSON.stringify(pkg, null, 2));
  console.log('Patched react-native-mmkv/package.json to disable codegen CMake.');
} else {
  console.log('react-native-mmkv not found, skipping codegen patch.');
}
