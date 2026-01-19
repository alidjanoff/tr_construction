import type { TranslatedString } from '../types';

/**
 * Get translation value based on current language
 * Falls back to 'az' if preferred language not found, then to first available value
 */
export const getTranslation = (
    translation: TranslatedString | string | undefined | null,
    lang: string
): string => {
    if (!translation) return '';
    if (typeof translation === 'string') return translation;
    return translation[lang] || translation['az'] || Object.values(translation)[0] || '';
};

/**
 * Parse count value - handles both numeric strings and translated strings
 * Stats count can be like "150+" or "10 il"
 */
export const parseCountValue = (
    count: TranslatedString | string | undefined,
    lang: string
): { value: number; suffix: string } => {
    const text = getTranslation(count, lang);
    // Extract number from string like "150+" or "10 il"
    const match = text.match(/^(\d+)\s*(.*)$/);
    if (match) {
        return {
            value: parseInt(match[1], 10),
            suffix: match[2] || '',
        };
    }
    return { value: 0, suffix: '' };
};
