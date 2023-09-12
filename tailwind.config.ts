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
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)'
      },
      borderWidth: {
        '1': '1px'
      },
      backgroundImage: {
        'hero': "url('/products/modern-livingroom1.jpg')",
        'fading': "linear-gradient(to bottom, rgba(255,255,255,0) 0%, var(--primary) 100%);"
      },
    }
  },
  plugins: [],
}
export default config
