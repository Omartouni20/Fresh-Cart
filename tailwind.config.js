/** @type {import('tailwindcss').Config} */
//const plugin = require('./node_modules/flowbite/plugin')
import plugin from './node_modules/flowbite/plugin'
export default {
  content: [

    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin,
  ],
}

