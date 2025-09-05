#!/bin/bash
# fix-cls.sh

echo "🔧 Applying CLS fixes..."

# 1. Backup existing files
echo "Creating backups..."
cp app/globals.css app/globals.css.backup
cp app/components/AnimatedHero.tsx app/components/AnimatedHero.tsx.backup 2>/dev/null || true
cp app/components/LogoCloud.tsx app/components/LogoCloud.tsx.backup 2>/dev/null || true

# 2. Add will-change to all animated elements
echo "Adding will-change properties..."
find app -name "*.tsx" -type f -exec sed -i '' 's/className="\([^"]*\)animate-/className="\1animate- will-change-transform /g' {} \;

# 3. Add min-height to sections
echo "Adding minimum heights..."
find app -name "*.tsx" -type f -exec sed -i '' 's/<section className="/<section style={{ minHeight: "200px" }} className="/g' {} \;

# 4. Fix image loading
echo "Optimizing image loading..."
find app -name "*.tsx" -type f -exec sed -i '' 's/<Image/<Image loading="eager" priority/g' {} \;

echo "✅ CLS fixes applied!"
