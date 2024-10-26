export const WORD_BANKS = {
    vietnamese: [
        'xin', 'chào', 'cảm', 'ơn', 'tạm', 'biệt', 'học', 'tập',
        'công', 'việc', 'gia', 'đình', 'bạn', 'bè', 'thành', 'phố',
        'quê', 'hương', 'đất', 'nước', 'tương', 'lai', 'hiện', 'tại',
        'quá', 'khứ', 'thành', 'công', 'hạnh', 'phúc'
    ],
    english: [
        'hello', 'thanks', 'goodbye', 'study', 'work', 'peace',
        'family', 'friends', 'city', 'hometown', 'country', 'smile',
        'future', 'present', 'past', 'success', 'happiness', 'joy',
        'love', 'hope', 'dream', 'faith', 'truth', 'wisdom'
    ]
} as const;

export const GAME_DURATION = 60; // seconds
export const VISIBLE_WORDS_AHEAD = 6;
export const VISIBLE_WORDS_BEHIND = 5;
export const WORDS_BUFFER_THRESHOLD = 10;
export const WORDS_BATCH_SIZE = 20;