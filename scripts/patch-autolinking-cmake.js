// scripts/patch-autolinking-cmake.js
// Patch Android-autolinking.cmake to comment out broken MMKV codegen JNI line and target_link_libraries for react_codegen_Mmkv

const fs = require('fs');
const path = require('path');

const cmakePath = path.join(
  __dirname,
  '../android/app/build/generated/autolinking/src/main/jni/Android-autolinking.cmake'
);

function printFirstLines(label, content, n = 30) {
  console.log(`\n[patch-autolinking-cmake] ${label} (first ${n} lines):`);
  content.split('\n').slice(0, n).forEach((line, idx) => {
    console.log(String(idx + 1).padStart(2, ' ') + ': ' + line);
  });
}

if (fs.existsSync(cmakePath)) {
  let content = fs.readFileSync(cmakePath, 'utf8');
  printFirstLines('Before patch', content);

  // Remove any line referencing react-native-mmkv (add_subdirectory, AUTOLINKED_LIBRARIES, etc)
  const mmkvAnyLineRegex = /^.*react-native-mmkv.*\n?/gmi;
  // Remove any line referencing react_codegen_Mmkv or any react_codegen_* (add_subdirectory, target_link_libraries, AUTOLINKED_LIBRARIES, etc)
  const codegenAnyLineRegex = /^.*react_codegen_[A-Za-z0-9_]+.*\n?/gmi;

  let patched = false;
  let newContent = content.replace(mmkvAnyLineRegex, '');
  if (newContent !== content) patched = true;
  let finalContent = newContent.replace(codegenAnyLineRegex, '');
  if (finalContent !== newContent) patched = true;

  if (patched) {
    fs.writeFileSync(cmakePath, finalContent, 'utf8');
    console.log('\nPatched Android-autolinking.cmake to REMOVE ALL MMKV and react_codegen_* references.');
    printFirstLines('After patch', finalContent);
  } else {
    console.log('\nNo MMKV or react_codegen_* lines found or already removed.');
    printFirstLines('After patch (no changes)', finalContent);
  }
} else {
  console.log('Android-autolinking.cmake not found, skipping patch.');
}