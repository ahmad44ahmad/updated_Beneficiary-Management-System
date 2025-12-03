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
                    DEFAULT: '#F5961E', // HRSD Orange (Pantone 1375 C)
                    50: '#fff8ed',
                    100: '#ffedd6',
                    200: '#ffd9ad',
                    300: '#ffbf7a',
                    400: '#ff9e47',
                    500: '#F5961E',
                    600: '#d9790f',
                    700: '#b35d0b',
                    800: '#8f4810',
                    900: '#753c10',
                },
                secondary: {
                    DEFAULT: '#FAB414', // HRSD Gold (Pantone 1235 C)
                    50: '#fefce8',
                    100: '#fff9c2',
                    200: '#fff08a',
                    300: '#ffe047',
                    400: '#FAB414',
                    500: '#eab308',
                    600: '#ca8a04',
                    700: '#a16207',
                    800: '#854d0e',
                    900: '#713f12',
                },
                accent: {
                    DEFAULT: '#148287', // HRSD Teal (Pantone 2237 C)
                    teal: '#148287',
                    green: '#2DB473', // HRSD Green (Pantone 3385 C)
                    blue: '#14415A', // HRSD Dark Blue (Pantone 3025 C)
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
