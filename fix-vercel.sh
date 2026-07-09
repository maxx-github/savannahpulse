#!/bin/bash

echo "🔧 Fixing Vercel deployment issues..."
echo ""

# 1. Update package.json - Replace ESLint 8 with ESLint 9
echo "📝 Step 1: Updating package.json..."
sed -i 's/"eslint": "\^8\.[0-9]\.[0-9]"/"eslint": "^9.0.0"/g' package.json
sed -i 's/"eslint-config-next": "\^[0-9]\{2\}\.[0-9]\.[0-9]"/"eslint-config-next": "^16.0.0"/g' package.json
echo "✅ Updated ESLint to v9"

# 2. Create .npmrc file
echo ""
echo "📝 Step 2: Creating .npmrc..."
echo "legacy-peer-deps=true" > .npmrc
echo "✅ Created .npmrc"

# 3. Clean up
echo ""
echo "📝 Step 3: Cleaning up..."
rm -rf node_modules
rm -f package-lock.json
echo "✅ Deleted node_modules and package-lock.json"

# 4. Add changes to git
echo ""
echo "📝 Step 4: Adding changes to git..."
git add .
echo "✅ Files staged"

# 5. Commit
echo ""
echo "📝 Step 5: Committing changes..."
git commit -m "Fix: Upgrade ESLint to v9 and add .npmrc for Vercel deployment"
echo "✅ Changes committed"

# 6. Push to GitHub
echo ""
echo "📝 Step 6: Pushing to GitHub..."
git push
echo "✅ Pushed to GitHub"

echo ""
echo "🎉 All done!"
echo ""
echo "Vercel will automatically redeploy with the fixed dependencies."
echo "Check your Vercel dashboard in 2-3 minutes!"