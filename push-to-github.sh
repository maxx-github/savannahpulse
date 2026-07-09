#!/bin/bash

# SavannahPulse GitHub Push Script
# This script safely pushes your project to an existing GitHub repository

echo "🦁 SavannahPulse - Pushing to GitHub..."
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .gitignore exists
if [ ! -f ".gitignore" ]; then
    echo -e "${RED}❌ .gitignore file not found!${NC}"
    echo "Please create a .gitignore file first."
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}📦 Initializing git repository...${NC}"
    git init
fi

# Add all files (git will respect .gitignore)
echo -e "${YELLOW}📝 Adding files to staging...${NC}"
git add .

# Show what will be committed
echo ""
echo -e "${GREEN}Files to be committed:${NC}"
git status --short
echo ""

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo -e "${YELLOW}⚠️  No changes to commit. Your repository is up to date.${NC}"
    exit 0
fi

# Prompt for commit message
read -p "Enter commit message (or press Enter for default): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Update SavannahPulse - $(date +%Y-%m-%d)"
fi

# Commit changes
echo ""
echo -e "${YELLOW}💾 Committing changes...${NC}"
git commit -m "$commit_msg"

# Check if remote exists
if ! git remote | grep -q "origin"; then
    echo ""
    echo -e "${RED}❌ No remote repository configured!${NC}"
    echo ""
    echo "Please add your GitHub repository URL:"
    echo "  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
    echo ""
    exit 1
fi

# Get current branch
current_branch=$(git branch --show-current)
if [ -z "$current_branch" ]; then
    current_branch="main"
    git branch -M main
fi

echo ""
echo -e "${YELLOW}🚀 Pushing to GitHub (branch: $current_branch)...${NC}"

# Push to GitHub
if git push -u origin "$current_branch"; then
    echo ""
    echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
    echo ""
    echo "Your repository URL:"
    git remote get-url origin
    echo ""
else
    echo ""
    echo -e "${RED}❌ Failed to push to GitHub!${NC}"
    echo ""
    echo "Common issues:"
    echo "  - Check your internet connection"
    echo "  - Verify your GitHub credentials"
    echo "  - Make sure the repository exists"
    echo ""
    exit 1
fi