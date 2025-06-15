# MMKV Android CI Build Debug Log

This log documents all steps, changes, and observations made while attempting to resolve persistent Android CI build failures related to react-native-mmkv and CMake/codegen issues.

## 2025-06-15

### Problem
- CI build fails with C++/CMake errors for react-native-mmkv, e.g.:
  - `Cannot find react-native-mmkv spec! Try cleaning your cache and re-running CodeGen!`
  - `fatal error: 'jsi/jsi.h' file not found`
  - `fatal error: 'Mmkv.h' file not found`
- The Gradle-based patch for autolinking CMake is working, but the build still attempts to build MMKV codegen JNI, leading to missing headers/specs.

### Actions Taken
- Removed Node.js patch steps from workflow, relying on Gradle patch.
- Confirmed Gradle patch is running and patching the CMake file.
- CI still fails with missing MMKV spec/headers.

### Next Steps
- Investigate why MMKV JNI codegen is still being built.
- Consider restoring or improving the dummy CMakeLists.txt workaround for MMKV codegen JNI.
- Ensure the dummy CMakeLists.txt is copied to the correct node_modules path before Gradle build.
- Add debug steps to CI to confirm presence and contents of dummy CMakeLists.txt.
- Update this log after each change.

## 2025-06-15 (cont'd)

### Actions Taken
- Added debug steps to the workflow to list the MMKV codegen JNI directory and show the contents of the dummy CMakeLists.txt before the Gradle build.
- Fixed YAML syntax errors by wrapping shell commands in double quotes to ensure correct parsing.
- Next: Commit and push these changes, then re-run CI to check if the dummy CMakeLists.txt is present and if the build proceeds past the previous C++/CMake errors.

## 2025-06-15 (cont'd)

### Actions Taken
- Created `scripts/patch-autolinking-cpp.js` to remove MMKV JNI includes and references from the generated autolinking.cpp.
- Added a workflow step to run this patch script after preBuild, and a debug step to show the patched autolinking.cpp.
- Next: Commit and push these changes, then re-run CI to check if the build proceeds past the previous C++/CMake errors.

## 2025-06-15 (cont'd)

### Actions Taken
- Updated the dummy CMakeLists.txt to add `return()` as the first line, ensuring CMake does not attempt to build any MMKV JNI sources.
- Next: Commit and push these changes, then re-run CI to check if the build proceeds past the previous C++/CMake errors.

---
