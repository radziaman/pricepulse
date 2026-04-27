# Contributing to PricePulse

Thank you for your interest in contributing!

## How to Contribute

### 1. Report Bugs
- Use GitHub Issues
- Include steps to reproduce
- Include screenshots if applicable

### 2. Suggest Features
- Open a GitHub Discussion
- Describe the feature
- Explain why it would be useful

### 3. Pull Requests

#### Setup
```bash
# Fork the repo
git clone https://github.com/radziaman/pricepulse.git
cd pricepulse
npm install
```

#### Create Branch
```bash
git checkout -b feat/your-feature
# or
git checkout -b fix/bug-description
```

#### Make Changes
```bash
# Make your changes
npm run lint    # Check code style
npm run test    # Run tests
```

#### Commit
```bash
git add .
git commit -m "feat: add new feature"
```

#### Push
```bash
git push -u origin your-branch-name
```

#### Create PR
- Open GitHub
- Click "Compare & pull request"
- Fill in the template
- Submit

## Code Style

- Use ESLint for code style
- Run `npm run lint` before committing
- Warnings are okay, no errors allowed

## Testing

- Run `npm run test` before submitting PR
- All tests must pass

## Commit Messages

Use conventional commits:
```
feat: add new feature
fix: resolve bug
refactor: improve code
style: update styling
docs: update documentation
```

## Review Process

1. Automated checks run (lint + tests)
2. Maintainer reviews
3. Request changes if needed
4. Merge when approved

## Questions?

- Open an issue
- Start a discussion

Thank you for contributing! 🚀