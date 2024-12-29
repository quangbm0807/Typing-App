export const WORD_BANKS = {
    vi: [
        'xin', 'chào', 'cảm', 'ơn', 'tạm', 'biệt', 'tập',
        'công', 'việc', 'gia', 'đình', 'bạn', 'bè', 'thành', 'phố',
        'quê', 'hương', 'đất', 'nước', 'tương', 'lai', 'hiện', 'tại',
        'quá', 'khứ', 'hạnh', 'phúc', 'mạc', 'ân', 'đoan', 'tốt',
        'giáo', 'dục', 'nghệ', 'thuật', 'khởi', 'nghiệp', 'phát', 'triển',
        'tình', 'yêu', 'kết', 'nối', 'sức', 'mạnh', 'phong', 'cảnh',
        'đặc', 'biệt', 'môi', 'trường', 'xã', 'hội', 'trách',
        'nhiệm', 'đổi', 'mới', 'cuộc', 'sống', 'tự', 'do', 'bình',
        'đẳng', 'hòa', 'dân', 'chủ', 'pháp', 'luật', 'văn', 'hóa',
        'tôn', 'giáo', 'khoa', 'kỹ', 'thuật', 'ân', 'học', 'sức',
        'khỏe', 'thương', 'mại', 'quốc', 'gia', 'không', 'được', 'trùng'
    ],
    en: [
        'hello', 'thanks', 'goodbye', 'study', 'work', 'peace',
        'family', 'friends', 'city', 'hometown', 'country', 'smile',
        'future', 'present', 'past', 'success', 'happiness', 'joy',
        'love', 'hope', 'dream', 'faith', 'truth', 'wisdom'
    ]
} as const;

export const GAME_DURATION = 60;
export const VISIBLE_WORDS_AHEAD = 6;
export const VISIBLE_WORDS_BEHIND = 5;
export const WORDS_BUFFER_THRESHOLD = 10;
export const WORDS_BATCH_SIZE = 20;