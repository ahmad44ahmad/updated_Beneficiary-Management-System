/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#F5961E', // Pantone 1375 C - Orange (RGB 245-150-30)
                    50: '#fef7ee',
                    100: '#fdecd3',
                    200: '#fad6a5',
                    300: '#f7ba6d',
                    400: '#f59633',
                    500: '#F5961E',
                    600: '#d48200',
                    700: '#b06602',
                    800: '#8e5007',
                    900: '#744208',
                },
                secondary: {
                    DEFAULT: '#FAB414', // Pantone 1235 C - Gold (RGB 250-180-20)
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#FAB414',
                    600: '#d39e0b',
                    700: '#b08309',
                    800: '#8e6a0a',
                    900: '#74560c',
                },
                accent: {
                    DEFAULT: '#2DB473', // Pantone 3385 C - Green (RGB 45-180-115)
                    teal: '#148287', // Pantone 2237 C - Teal (RGB 20-130-135)
                    dark: '#14415A', // Pantone 3025 C - Dark Blue (RGB 20-65-90)
                },
                surface: '#F9FAFB',
            },
            fontFamily: {
                sans: ['Tajawal', 'IBM Plex Sans Arabic', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
