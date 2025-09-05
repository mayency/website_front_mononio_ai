#!/bin/bash
# fix-cls-precise.sh - More precise CLS fixes

echo "🔧 Applying precise CLS fixes..."

# 1. Fix the will-change issue from previous script
echo "Fixing will-change properties..."
find app -name "*.tsx" -type f -exec sed -i '' 's/animate- will-change-transform/animate-/g' {} \;

# 2. Add proper will-change to animated elements
echo "Adding proper will-change properties..."
find app -name "*.tsx" -type f -exec sed -i '' 's/className="\([^"]*\)animate-\([^"]*\)"/className="\1animate-\2" style={{ willChange: "transform, opacity" }}/g' {} \;

# 3. Fix Image loading attributes
echo "Fixing Image loading attributes..."
find app -name "*.tsx" -type f -exec sed -i '' 's/loading="eager" priority/loading="lazy"/g' {} \;

# 4. Add proper min-height to sections that don't have it
echo "Adding minimum heights to sections..."
find app -name "*.tsx" -type f -exec sed -i '' 's/<section className="/<section style={{ minHeight: "200px" }} className="/g' {} \;

echo "✅ Precise CLS fixes applied!"
