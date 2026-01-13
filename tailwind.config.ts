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
        primary: {
          DEFAULT: '#CC5500',
          light: '#E07A5F',
        },
        secondary: {
          DEFAULT: '#E9B44C',
          alt: '#568259',
        },
        background: {
          DEFAULT: '#FAF3E0',
          alt: '#F5E6D3',
        },
        accent: {
          DEFAULT: '#264653',
          alt: '#722F37',
        },
        text: {
          DEFAULT: '#3D3D3D',
          light: '#6B6B6B',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'Archivo Black', 'sans-serif'],
        body: ['Inter', 'Source Sans Pro', 'Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
      },
      borderRadius: {
        'retro': '12px',
        'retro-lg': '16px',
      },
      boxShadow: {
        'retro': '0 4px 6px -1px rgba(204, 85, 0, 0.1), 0 2px 4px -1px rgba(204, 85, 0, 0.06)',
        'retro-lg': '0 10px 15px -3px rgba(204, 85, 0, 0.1), 0 4px 6px -2px rgba(204, 85, 0, 0.05)',
      },
      letterSpacing: {
        'retro': '0.03em',
      },
    },
  },
  plugins: [],
}
export default config

