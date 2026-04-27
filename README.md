# PricePulse | Find. Share. Save. 🔥

A modern social deals finder app combining the best of **Nike**, **Instagram**, **Swarm**, and **Facebook** design.

![PricePulse](https://img.shields.io/badge/PricePulse-v1.0-000000?style=for-the-badge)
![React](https://img.shields.io/badge/Node-20+-green?style=for-the-badge)
![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?style=for-the-badge)

## 🌟 Live Demo

**https://radziaman.github.io/pricepulse**

---

## ✨ Features

### Social Features
- ❤️ Like & save deals
- 💬 Comments & reactions (❤️ 😂 😮 😢 🔥 👏)
- 👥 Follow other hunters
- 🏆 XP & achievements system

### Deal Discovery
- 📍 Location-based deals
- 🔥 Trending/Hot deals
- 🆕 New deals
- 📊 Price comparisons
- 🏷️ Category filtering

### Gamification
- ⭐ XP points for activities
- 🏅 Achievement badges
- 🔥 Posting streaks
- 📈 Leaderboards

### AI Integration
- 🤖 Smart deal analysis
- 💡 AI recommendations
- 🏷️ Auto-categorization
- 📝 AI-generated descriptions

---

## 🎨 Design

Combines design elements from:
- **Nike**: Bold typography (Bebas Neue), sleek black theme
- **Instagram**: Full-width image cards, social interactions
- **Swarm**: Check-in features, location badges
- **Facebook**: Reactions picker, profile stats

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Vanilla JavaScript (ES6+) |
| Styling | Custom CSS |
| Maps | Leaflet.js + OpenStreetMap |
| AI | OpenRouter API (DeepSeek R1) |
| Auth | Firebase (optional) |
| Testing | Vitest |
| Linting | ESLint |

---

## 🚀 Development

### Quick Start
```bash
npm install          # Install dependencies
npm run lint         # Check code style
npm run test         # Run tests
```

### Available Scripts
```bash
npm run lint          # ESLint check
npm run test          # Run tests once
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

---

## 📁 Project Structure

```
pricepulse/
├── index.html        # Main HTML
├── style.css         # Styles
├── app.js           # Main app logic
├── ai-service.js    # AI integration
├── src/
│   ├── config/      # Constants
│   ├── state/       # State management
│   ├── services/   # Business logic
│   ├── utils/      # Helpers
│   └── components/ # UI components
├── .github/
│   └── workflows/   # CI/CD pipelines
├── tests/          # Test files
└── package.json
```

---

## ⚙️ Workflow

### Commit Format
```
<type>: <description>

Types:
- feat:     New feature
- fix:      Bug fix
- refactor: Code refactoring
- style:    UI changes
- docs:     Documentation
```

### CI/CD Pipeline
1. **Push to main** → Auto-triggers workflow
2. **ESLint** → Code quality check
3. **Vitest** → Run all tests
4. **Deploy** → Auto-deploy to GitHub Pages

### Status
| Check | Status |
|-------|--------|
| ESLint | ✅ |
| Vitest | ✅ |
| Deploy | ✅ |

---

## 🌐 Deployment

### Automatic
Every push to `main` automatically deploys to:
```
https://radziaman.github.io/pricepulse
```

### Manual
Not needed - deployment is fully automated.

---

## 🤝 Contributing

1. Fork the repo
2. Create your branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m "feat: add amazing feature"`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - See [LICENSE](LICENSE)

---

## 🔗 Links

- **Repo**: https://github.com/radziaman/pricepulse
- **Live**: https://radziaman.github.io/pricepulse
- **Issues**: https://github.com/radziaman/pricepulse/issues

---

*Built with ❤️ by the PricePulse Community*