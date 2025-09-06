---
type: entry
title: Next.js Configuration Warning
date: 2025-08-19
time: 04:25:56
description: Fixed swcMinify configuration warning in next.config.ts by removing deprecated option
---

# Bug Fix Template

## Title
Next.js Configuration Warning Fix

## Description
Resolved the Next.js configuration warning about the deprecated `swcMinify` option in next.config.ts

## Issue
The development server was showing a warning: "Invalid next.config.ts options detected: Unrecognized key(s) in object: 'swcMinify'". This was because `swcMinify` is now enabled by default in Next.js 15 and the option has been deprecated.

## Solution
Removed the `swcMinify: true` option from next.config.ts since it's now enabled by default and no longer needed.

## Technical Details
- **Files Modified**: next.config.ts
- **Root Cause**: Deprecated configuration option in Next.js 15
- **Fix Type**: Configuration cleanup

## Testing
- [x] Development server starts without warnings
- [x] Build process works correctly
- [x] No functionality regression

## Impact
Eliminates configuration warnings during development and ensures compatibility with Next.js 15 best practices.

## Related Issues
Next.js 15 migration compatibility 