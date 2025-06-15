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
  // Remove any add_subdirectory line for MMKV codegen JNI (Windows or Unix path)
  const mmkvAddSubdirRegex = /^.*add_subdirectory\([^\n]*react-native-mmkv[\\/]+android[\\/]+build[\\/]+generated[\\/]+source[\\/]+codegen[\\/]+jni[^\n]*\).*\n?/gmi;
  // Remove any target_link_libraries line for react_codegen_* (if present)
  const mmkvTargetLinkRegex = /^.*target_link_libraries\((react_codegen_[A-Za-z0-9_]+)[^\n]*\).*\n?/gmi;
  // Remove any line in AUTOLINKED_LIBRARIES block referencing react_codegen_*
  const mmkvLibRefRegex = /^\s*react_codegen_[A-Za-z0-9_]+\s*\n?/gmi;

  let patched = false;
  let newContent = content.replace(mmkvAddSubdirRegex, '');
  if (newContent !== content) patched = true;
  let nextContent = newContent.replace(mmkvTargetLinkRegex, '');
  if (nextContent !== newContent) patched = true;
  let finalContent = nextContent.replace(mmkvLibRefRegex, '');
  if (finalContent !== nextContent) patched = true;

  if (patched) {
    fs.writeFileSync(cmakePath, finalContent, 'utf8');
    console.log('\nPatched Android-autolinking.cmake to REMOVE MMKV codegen JNI and react_codegen_* references.');
    printFirstLines('After patch', finalContent);
  } else {
    console.log('\nNo MMKV codegen JNI or react_codegen_* lines found or already removed.');
    printFirstLines('After patch (no changes)', finalContent);
  }
} else {
  console.log('Android-autolinking.cmake not found, skipping patch.');
}
