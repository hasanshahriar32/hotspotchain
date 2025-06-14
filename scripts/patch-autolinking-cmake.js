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
  // Robust regex: match any add_subdirectory line for MMKV codegen JNI
  const mmkvRegex = /^.*add_subdirectory\([^\n]*react-native-mmkv[^\n]*codegen[^\n]*jni[^\n]*\).*$/gm;
  // Robust regex: match any target_link_libraries for react_codegen_Mmkv
  const linkRegex = /^.*target_link_libraries\(react_codegen_Mmkv[^\n]*\).*$/gm;
  let patched = false;
  let newContent = content.replace(mmkvRegex, line => '# ' + line + '  # patched by patch-autolinking-cmake.js');
  if (newContent !== content) patched = true;
  let finalContent = newContent.replace(linkRegex, line => '# ' + line + '  # patched by patch-autolinking-cmake.js');
  if (finalContent !== newContent) patched = true;
  if (patched) {
    fs.writeFileSync(cmakePath, finalContent, 'utf8');
    console.log('\nPatched Android-autolinking.cmake to comment out MMKV codegen JNI and target_link_libraries for react_codegen_Mmkv.');
    printFirstLines('After patch', finalContent);
  } else {
    console.log('\nNo MMKV codegen JNI or react_codegen_Mmkv target_link_libraries line found or already patched.');
    printFirstLines('After patch (no changes)', finalContent);
  }
} else {
  console.log('Android-autolinking.cmake not found, skipping patch.');
}
