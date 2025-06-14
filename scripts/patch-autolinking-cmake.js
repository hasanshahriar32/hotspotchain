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
  // Match any add_subdirectory line for MMKV codegen JNI (Windows or Unix path)
  const mmkvAddSubdirRegex = /^.*add_subdirectory\([^\n]*react-native-mmkv[\\/]+android[\\/]+build[\\/]+generated[\\/]+source[\\/]+codegen[\\/]+jni[^\n]*\).*$/gmi;
  // Match any target_link_libraries line for react_codegen_RNMmkvSpec (or similar)
  const mmkvTargetLinkRegex = /^.*target_link_libraries\((react_codegen_[A-Za-z0-9_]+)[^\n]*\).*$/gmi;
  // Match any line in AUTOLINKED_LIBRARIES block referencing react_codegen_RNMmkvSpec (or similar)
  const mmkvLibRefRegex = /^\s*react_codegen_[A-Za-z0-9_]+\s*$/gmi;

  let patched = false;
  let newContent = content.replace(mmkvAddSubdirRegex, line => '# ' + line + '  # patched by patch-autolinking-cmake.js');
  if (newContent !== content) patched = true;
  let nextContent = newContent.replace(mmkvTargetLinkRegex, line => '# ' + line + '  # patched by patch-autolinking-cmake.js');
  if (nextContent !== newContent) patched = true;
  // Patch AUTOLINKED_LIBRARIES block
  let finalContent = nextContent.replace(mmkvLibRefRegex, line => {
    if (line.trim().startsWith('#')) return line; // already commented
    if (line.trim().startsWith('react_codegen_')) return '# ' + line + '  # patched by patch-autolinking-cmake.js';
    return line;
  });
  if (finalContent !== nextContent) patched = true;

  if (patched) {
    fs.writeFileSync(cmakePath, finalContent, 'utf8');
    console.log('\nPatched Android-autolinking.cmake to comment out MMKV codegen JNI and react_codegen_* references.');
    printFirstLines('After patch', finalContent);
  } else {
    console.log('\nNo MMKV codegen JNI or react_codegen_* lines found or already patched.');
    printFirstLines('After patch (no changes)', finalContent);
  }
} else {
  console.log('Android-autolinking.cmake not found, skipping patch.');
}
