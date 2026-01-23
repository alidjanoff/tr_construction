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
    if (typeof translation === 'string') return translation.trim();

    // 1. Try requested language
    if (translation[lang] && typeof translation[lang] === 'string' && translation[lang].trim()) {
        return translation[lang].trim();
    }

    // 2. Try Azerbaijan as default fallback
    if (translation['az'] && typeof translation['az'] === 'string' && translation['az'].trim()) {
        return translation['az'].trim();
    }

    // 3. Try any available non-empty translation
    const nonEmptyValues = Object.values(translation).filter(
        (val) => typeof val === 'string' && val.trim() !== ''
    );

    if (nonEmptyValues.length > 0) {
        return nonEmptyValues[0].trim();
    }

    return '';
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
