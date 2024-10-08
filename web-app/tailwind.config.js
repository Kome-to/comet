/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            sans: ["Roboto", "Helvetica", "Arial", 'sans-serif']
        },
        screens: {
            xl: { max: '1280px' },
            lg: { max: '1024px' },
            md: { max: '768px' },
            sm: { max: '640px' },
            xs: { max: '480px' },
        },
        extend: {
            colors: {
                primary: '#1264A3',
                white: '#ffffff',
                black: '#000000'
            }
        },

    },
    plugins: [],
}

