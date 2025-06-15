#!/bin/bash
# Print the first 30 lines of Android-autolinking.cmake for CI debug
echo '--- Android-autolinking.cmake (first 30 lines) ---'
head -n 30 android/app/build/generated/autolinking/src/main/jni/Android-autolinking.cmake || echo 'File not found'
