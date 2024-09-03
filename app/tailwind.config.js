/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
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
        primary: '#003d61',
        // 'primary': '#1264A3',
        white: '#ffffff',
        black: '#000000',

        'ex-green': '#007A5A',

        'ex-grey': '#1D1C1D',
        'ex-grey-70': '#1D1C1D70',
        'ex-grey-50': '#454447',
        'ex-surf': '#d8eef6',
        'ex-text-primary': '#d1d2d3',
        'ex-text-1': '#ababad',
        'ex-bg-1': '#222529',
        'ex-active': '#3daa7c',
      },
    },
  },
  plugins: [],
};
