# PricePulse Development Workflow

## Overview

This document outlines the development workflow for PricePulse, a social deals finder app.

---

## Git Workflow

### Branch Structure
```
main          → Production (auto-deploys to GitHub Pages)
├── develop   → Development (optional)
├── feat/*    → Feature branches
└── fix/*     → Bug fix branches
```

### Commit Message Format
```
<type>: <description>

Types:
- feat:     New feature
- fix:      Bug fix
- refactor: Code refactoring
- style:    UI/styling changes
- docs:     Documentation
- test:     Adding tests
- chore:    Maintenance
```

### Workflow Steps

#### 1. Create Feature Branch
```bash
git checkout -b feat/new-feature
```

#### 2. Make Changes & Test Locally
```bash
# Make your changes
npm run lint    # Check code style
npm run test    # Run tests
```

#### 3. Commit Changes
```bash
git add .
git commit -m "feat: add new feature"
```

#### 4. Push & Create PR
```bash
git push -u origin feat/new-feature
# Create PR via GitHub UI
```

#### 5. Merge to Main
- PR auto-triggers CI/CD
- Lint & tests run automatically
- Auto-deploys to GitHub Pages on success

---

## CI/CD Pipeline

### Workflow: `.github/workflows/`

#### CI Job (runs on every push)
1. Checkout code
2. Install dependencies (`npm ci`)
3. Run ESLint (`npm run lint`)
4. Run Vitest tests (`npm test`)

#### Deploy Job (runs after CI passes)
1. Checkout code
2. Deploy to GitHub Pages (`/`)
3. Site available at: `https://radziaman.github.io/pricepulse`

### Status Checks
- ✅ ESLint (warnings allowed)
- ✅ Vitest (all tests must pass)
- ✅ Deploy (only after CI passes)

---

## Local Development

### Setup
```bash
npm install          # Install dependencies
npm run dev          # Start dev server
```

### Available Scripts
| Command | Description |
|---------|-------------|
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest tests |
| `npm run test:watch` | Watch mode for tests |
| `npm run test:coverage` | Generate coverage report |

### Code Structure
```
src/
├── config/      # Constants, data
├── state/       # State management
├── services/    # Business logic
├── utils/       # Helper functions
├── components/  # UI components
└── index.js     # Entry point
```

---

## GitHub Actions Status

Check workflow status at:
```
https://github.com/radziaman/pricepulse/actions
```

---

## Deployment

### Automatic Deployment
Every push to `main` automatically:
1. Runs lint check
2. Runs tests
3. Deploys to GitHub Pages

### Manual Deployment
```bash
# Not recommended - use automatic deployment
```

### Environment
- **Production URL**: https://radziaman.github.io/pricepulse
- **GitHub Repo**: https://github.com/radziaman/pricepulse

---

## Quick Reference

### Git Commands
```bash
git status              # Check changes
git add .               # Stage all changes
git commit -m "msg"     # Commit
git push                # Push to remote
git pull                # Pull latest
git checkout -b feat/x  # Create branch
```

### GitHub Commands
```bash
gh pr create            # Create PR
gh pr merge             # Merge PR
gh run list             # List workflows
```

---

## Troubleshooting

### Lint Errors
```bash
npm run lint  # Shows all lint errors
```

### Test Failures
```bash
npm run test  # Run tests
```

### Deployment Issues
1. Check Actions tab: https://github.com/radziaman/pricepulse/actions
2. Check branch protection settings
3. Ensure GitHub Pages is enabled in repo settings

---

## Best Practices

1. **Always run lint before committing**
2. **Write tests for new features**
3. **Use descriptive commit messages**
4. **Keep branches small and focused**
5. **Review code before merging**
6. **Test locally before pushing**

---

## Support

- **Issues**: https://github.com/radziaman/pricepulse/issues
- **Discussions**: https://github.com/radziaman/pricepulse/discussions