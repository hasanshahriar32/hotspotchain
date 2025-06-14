// scripts/patch-autolinking-cmake.js
// Patch Android-autolinking.cmake to comment out broken MMKV codegen JNI line

const fs = require('fs');
const path = require('path');

const cmakePath = path.join(
  __dirname,
  '../android/app/build/generated/autolinking/src/main/jni/Android-autolinking.cmake'
);

if (fs.existsSync(cmakePath)) {
  let content = fs.readFileSync(cmakePath, 'utf8');
  const mmkvRegex = /^(\s*)add_subdirectory\(([^)]*react-native-mmkv[^)]*codegen[^)]*jni[^)]*)\)/gm;
  let patched = false;
  content = content.replace(mmkvRegex, '$1# add_subdirectory($2)  # patched by patch-autolinking-cmake.js');
  if (content !== fs.readFileSync(cmakePath, 'utf8')) {
    fs.writeFileSync(cmakePath, content, 'utf8');
    patched = true;
  }
  console.log(
    patched
      ? 'Patched Android-autolinking.cmake to comment out MMKV codegen JNI.'
      : 'No MMKV codegen JNI add_subdirectory line found or already patched.'
  );
} else {
  console.log('Android-autolinking.cmake not found, skipping patch.');
}
