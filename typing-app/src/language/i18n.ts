import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            // Header
            'app.title': 'Typing Speed Test',
            'app.subtitle': 'Prod by Quang Bui',

            // Language and Duration
            'language.vietnamese': 'Vietnamese',
            'language.english': 'English',
            'duration.seconds': '{{count}} seconds',

            // Controls
            'button.start': 'Start',
            'button.running': 'Running...',
            'button.history': 'History',
            'button.help': 'Press Enter to start\nAlt+R to reset',

            // Stats
            'stats.bestWPM': 'Best WPM',
            'stats.bestAccuracy': 'Best Accuracy',
            'stats.timeLeft': 'Time Left',
            'stats.correctWords': 'Correct Words',
            'stats.incorrectWords': 'Wrong Words',
            'stats.wpm': 'WPM',
            'stats.accuracy': 'Accuracy',

            // History
            'history.title': 'Typing History',
            'history.chart.title': 'Progress Chart',
            'history.range.last10': 'Last 10 Tests',
            'history.range.hourly': 'Last 24 Hours',
            'history.range.daily': 'Last 30 Days',
            'history.range.monthly': 'Last 12 Months',

            // Table columns
            'table.date': 'Date',
            'table.wpm': 'WPM',
            'table.accuracy': 'Accuracy',
            'table.language': 'Language',
            'table.duration': 'Duration',

            // Input placeholders
            'input.start': 'Press Enter or \'Start\' to begin timer',
            'input.reset': 'Alt+R to reset'
        }
    },
    vi: {
        translation: {
            // Header
            'app.title': 'Kiểm Tra Tốc Độ Gõ',
            'app.subtitle': 'Phát triển bởi Quang Bui',

            // Language and Duration
            'language.vietnamese': 'Tiếng Việt',
            'language.english': 'Tiếng Anh',
            'duration.seconds': '{{count}} giây',

            // Controls
            'button.start': 'Bắt đầu',
            'button.running': 'Đang chạy...',
            'button.history': 'Lịch sử',
            'button.help': 'Enter để bắt đầu\nAlt+R để reset',

            // Stats
            'stats.bestWPM': 'Kỷ lục WPM',
            'stats.bestAccuracy': 'Kỷ lục Độ chính xác',
            'stats.timeLeft': 'Thời gian còn lại',
            'stats.correctWords': 'Từ đúng',
            'stats.incorrectWords': 'Từ sai',
            'stats.wpm': 'WPM',
            'stats.accuracy': 'Độ chính xác',

            // History
            'history.title': 'Lịch sử gõ phím',
            'history.chart.title': 'Biểu đồ tiến triển',
            'history.range.last10': '10 lần gần nhất',
            'history.range.hourly': '24 giờ qua',
            'history.range.daily': '30 ngày qua',
            'history.range.monthly': '12 tháng qua',

            // Table columns
            'table.date': 'Ngày',
            'table.wpm': 'WPM',
            'table.accuracy': 'Độ chính xác',
            'table.language': 'Ngôn ngữ',
            'table.duration': 'Thời gian',

            // Input placeholders
            'input.start': 'Nhấn Enter hoặc \'Bắt đầu\' để bắt đầu tính giờ',
            'input.reset': 'Alt+R để bắt đầu lại'
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('interfaceLanguage') || 'vi',
        fallbackLng: 'vi',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;