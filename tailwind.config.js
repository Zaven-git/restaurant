module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false,
    theme: {
        extend: {
            backgroundImage: {
                'hamburger': "url('/images/hamburger.png')",
                'vegetarian-pizza': "url('/images/vegetarian-pizza.jpg')",
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}