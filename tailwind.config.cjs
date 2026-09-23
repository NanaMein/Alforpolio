/** @type {import('tailwindcss').Config} */
module.exports = {
    // Scan Ghost theme templates so Tailwind outputs only utilities that are used.
    // (This is the key to keeping the compiled CSS small.)
    content: [
        './*.hbs',
        './partials/**/*.hbs'
    ],
    theme: {
        extend: {}
    },
    // Prevent Tailwind from resetting your existing Ghost theme styles.
    corePlugins: {
        preflight: false
    }
};
