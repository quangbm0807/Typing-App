# Typing Speed Test Application

A modern, feature-rich typing speed test application built with React that supports multiple languages and provides detailed statistics and historical data visualization.

![Typing Speed Test Screenshot](/api/placeholder/800/400)

## Features

- 🌍 Multiple language support (Vietnamese and English)
- ⏱️ Configurable test durations (15s, 30s, 45s, 60s)
- 📊 Real-time statistics (WPM, accuracy, correct/incorrect words)
- 📈 Historical data tracking with interactive charts
- 🏆 Personal best tracking (WPM and accuracy)
- 🎯 Word-by-word accuracy tracking
- 🎉 Achievement celebrations with confetti effects
- 📱 Responsive design for all devices

## Technologies Used

### Core Technologies
- React 18
- TypeScript
- Ant Design (antd)
- Styled Components

### Key Libraries
- `date-fns` - Date manipulation and formatting
- `recharts` - Interactive charts for history visualization
- `react-confetti` - Celebration effects
- `@ant-design/icons` - Icon components
- `lodash` - Utility functions

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14.0 or higher)
- npm (version 6.0 or higher) or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/quangbm0807/Typing-App
```

2. Navigate to the project directory:
```bash
cd typing-speed-test
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

## Development

To start the development server:

```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The built files will be available in the `build` directory.

## Project Structure

```
src/
├── components/
│   ├── TypingChallenge.tsx    # Main typing test component
│   ├── Statistics.tsx         # Statistics display component
│   ├── TypingGuideTour.tsx   # Guide tour component
│   └── style.ts              # Styled components
├── constants/
│   └── index.ts              # Application constants
├── types/
│   └── index.ts              # TypeScript type definitions
└── App.tsx                   # Root component
```

## Features in Detail

### Test Configuration
- Language selection between Vietnamese and English
- Customizable test duration (15, 30, 45, or 60 seconds)
- Quick reset using Alt + R shortcut
- Start test using Enter key or start button

### Statistics and Tracking
- Real-time WPM calculation
- Accuracy percentage
- Correct and incorrect word counts
- Personal best records for WPM and accuracy
- Historical data visualization with filterable time ranges
- Detailed progress charts

### User Interface
- Clean, modern design using Ant Design components
- Responsive layout for all screen sizes
- Interactive word display with color-coded feedback
- Progress bar for remaining time
- Tooltips for additional information

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Word banks sourced from various public domain sources
- Icons provided by Ant Design Icons
- UI components from Ant Design (antd)