// scripts/patch-autolinking-cpp.js
// Removes MMKV codegen JNI includes and references from autolinking.cpp to prevent build errors in CI.

const fs = require('fs');
const path = require('path');

const cppPath = path.join(
  __dirname,
  '../android/app/build/generated/autolinking/src/main/jni/autolinking.cpp'
);

if (fs.existsSync(cppPath)) {
  let content = fs.readFileSync(cppPath, 'utf8');
  // Remove any #include <Mmkv.h> or similar lines
  let patched = content.replace(/^[ \t]*#include[ \t]+["<]Mmkv.h[">].*$/gm, '');
  // Optionally, remove any lines referencing MMKVConfig or NativeMmkvModule
  patched = patched.replace(/.*MMKVConfig.*/gm, '');
  patched = patched.replace(/.*NativeMmkvModule.*/gm, '');
  if (content !== patched) {
    fs.writeFileSync(cppPath, patched, 'utf8');
    console.log('[patchAutolinkingCpp] Patched autolinking.cpp to remove MMKV JNI references.');
  } else {
    console.log('[patchAutolinkingCpp] No MMKV JNI references found in autolinking.cpp.');
  }
} else {
  console.log('[patchAutolinkingCpp] autolinking.cpp not found, skipping.');
}
