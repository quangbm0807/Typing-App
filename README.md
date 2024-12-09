# ⌨️ Typing Speed Test Application

A modern, feature-rich typing speed test application built with React that helps users improve their typing skills with real-time feedback and comprehensive statistics.

![Typing Speed Test Screenshot](/typing-app/screenshot/screenshot.png)

## ✨ Features

### Core Features
- 🌍 **Multilingual Support**
  - Vietnamese and English languages
  - Easy language switching
  - Language-specific word banks

- ⏱️ **Flexible Testing**
  - Multiple duration options (15s, 30s, 45s, 60s)
  - Real-time progress tracking
  - Instant results display

- 📊 **Advanced Statistics**
  - Words Per Minute (WPM)
  - Accuracy percentage
  - Error tracking
  - Historical performance data

### Additional Features
- 🎯 Word-by-word accuracy tracking
- 🏆 Personal best records
- 📈 Interactive performance charts
- 🎉 Achievement celebrations
- 📱 Fully responsive design
- ⌨️ Keyboard shortcuts support

## 🚀 Getting Started

### Prerequisites
- Node.js (v14.0+)
- npm (v6.0+) or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/typing-speed-test
cd typing-speed-test
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start development server
```bash
npm start
# or
yarn start
```

## 🛠️ Tech Stack

### Core Technologies
```
React 18           → Modern UI framework
TypeScript         → Type safety and better DX
Ant Design         → UI component library
Styled Components  → Styled CSS-in-JS
```

### Key Dependencies
```
date-fns           → Date manipulation
recharts           → Performance visualization
react-confetti     → Achievement effects
@ant-design/icons  → UI icons
lodash            → Utility functions
```

## 📁 Project Structure

```
src/
├── components/
│   ├── core/
│   │   ├── TypingArea.tsx
│   │   ├── Statistics.tsx
│   │   └── WordBank.tsx
│   └── shared/
│       ├── Charts.tsx
│       └── Controls.tsx
├── hooks/
│   ├── useTyping.ts
│   └── useStats.ts
├── context/
│   └── AppContext.tsx
├── utils/
│   └── calculations.ts
└── App.tsx
```

## 🎯 Key Features

### Typing Test Interface
- Real-time word highlighting
- Error indication
- Progress bar
- WPM counter
- Accuracy meter

### Statistics Dashboard
- Historical performance
- Personal bests
- Error patterns
- Progress charts
- Exportable data

### User Experience
- Keyboard shortcuts
- Custom themes
- Audio feedback
- Achievement system
- Responsive design

## ⚙️ Configuration

### Test Settings
```typescript
export const DEFAULT_SETTINGS = {
  durations: [15, 30, 45, 60],
  defaultDuration: 30,
  languages: ['en', 'vi'],
  defaultLanguage: 'en',
  minWordLength: 3,
  maxWordLength: 8
};
```

### Keyboard Shortcuts
- `Alt + R` → Reset test
- `Enter` → Start test
- `Esc` → Cancel test
- `Tab` → Switch language

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
```bash
git checkout -b feature/amazing-feature
```
3. Commit your changes
```bash
git commit -m 'Add amazing feature'
```
4. Push to the branch
```bash
git push origin feature/amazing-feature
```
5. Open a Pull Request


## 🙏 Acknowledgments

- Word banks from various public domain sources
- UI components from Ant Design
- Icons from @ant-design/icons
- Community feedback and contributions
