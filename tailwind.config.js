import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';


/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                notif: {
                    '0%': { transform: 'translateY(-100%)' },
                    '50%': { transform: 'translateY(20%)' },
                    '100%': { transform: 'translateY(0)' }
                },
                drone: {
                    '0%': { opacity: '0' },
                    '50%': { opacity: '0.5' },
                    '100%': { opacity: '1' }
                }
            },
            animation: {
                notif: 'notif 0.7s ease-in-out',
                drone: 'drone 2s ease-in-out'
            },
            transitionProperty: {
                width: 'width',
            }
        },
        screens: {
            'sm': '640px',
            // => @media (min-width: 640px) { ... }

            'md': '850px',
            // => @media (min-width: 768px) { ... }

            'lg': '1110px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },

    },

    plugins: [
        forms,
        require("daisyui")
    ],
    daisyui: {
        themes: [
            "dark",
            "light",
        ],
    },
};