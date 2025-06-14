// scripts/patch-autolinking-cmake.js
// Patch Android-autolinking.cmake to comment out broken MMKV codegen JNI line and target_link_libraries for react_codegen_Mmkv

const fs = require('fs');
const path = require('path');

const cmakePath = path.join(
  __dirname,
  '../android/app/build/generated/autolinking/src/main/jni/Android-autolinking.cmake'
);

if (fs.existsSync(cmakePath)) {
  let content = fs.readFileSync(cmakePath, 'utf8');
  // Patch add_subdirectory for MMKV codegen JNI
  const mmkvRegex = /^(\s*)add_subdirectory\([^\n]*react-native-mmkv[^\n]*codegen[^\n]*jni[^\n]*\)/gm;
  // Patch target_link_libraries for react_codegen_Mmkv
  const linkRegex = /^(\s*)target_link_libraries\(react_codegen_Mmkv[^\n]*\)/gm;
  let patched = false;
  let newContent = content.replace(mmkvRegex, '$1# add_subdirectory(...)  # patched by patch-autolinking-cmake.js');
  if (newContent !== content) patched = true;
  let finalContent = newContent.replace(linkRegex, '$1# target_link_libraries(react_codegen_Mmkv ...)  # patched by patch-autolinking-cmake.js');
  if (finalContent !== newContent) patched = true;
  if (patched) {
    fs.writeFileSync(cmakePath, finalContent, 'utf8');
    console.log('Patched Android-autolinking.cmake to comment out MMKV codegen JNI and target_link_libraries for react_codegen_Mmkv.');
  } else {
    console.log('No MMKV codegen JNI or react_codegen_Mmkv target_link_libraries line found or already patched.');
  }
} else {
  console.log('Android-autolinking.cmake not found, skipping patch.');
}
