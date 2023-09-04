import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#141414',
        'secondary': '#FFD600'
      },
      borderWidth: {
        '1': '1px'
      },
      backgroundImage: {
        'hero': "url('/products/modern-livingroom1.jpg')"
      }
    }
  },
  plugins: [],
}
export default config
