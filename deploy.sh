#!/bin/bash
# =============================================================================
# Quick Deploy — Push to test or production via Coolify
# =============================================================================
# Usage:
#   ./deploy.sh test              Deploy current branch to test
#   ./deploy.sh production        Deploy main to production
#   ./deploy.sh test feature/x    Deploy specific branch to test
# =============================================================================

set -euo pipefail

TARGET="${1:-test}"
SOURCE="${2:-$(git rev-parse --abbrev-ref HEAD)}"

if [[ "$TARGET" != "test" && "$TARGET" != "production" ]]; then
    echo "Usage: $0 <test|production> [source-branch]"
    exit 1
fi

if [[ "$TARGET" == "production" && "$SOURCE" != "main" ]]; then
    echo "⚠️  Warning: Deploying '$SOURCE' to production (not main)"
    read -p "Are you sure? (y/n) " -n 1 -r
    echo
    [[ $REPLY =~ ^[Yy]$ ]] || exit 1
fi

echo "🚀 Deploying '$SOURCE' → '$TARGET'..."

STASH_NAME="deploy-stash-$(date +%s)"
git stash push -m "$STASH_NAME"
git checkout "$TARGET"
git reset --hard "$SOURCE"
git push --force-with-lease
git checkout "$SOURCE"
(git stash list | head -1 | grep -q "$STASH_NAME" && git stash pop || true)

echo "✅ Deployed! Coolify will pick up the change automatically."
