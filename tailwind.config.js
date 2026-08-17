/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          blue: '#0066cc',
          blueFocus: '#0071e3',
          blueSky: '#2997ff',
          ink: '#1d1d1f',
          inkMuted80: '#333333',
          inkMuted48: '#7a7a7a',
          canvas: '#ffffff',
          parchment: '#f5f5f7',
          pearl: '#fafafc',
          tile1: '#272729',
          tile2: '#2a2a2c',
          tile3: '#252527',
          black: '#000000',
          hairline: '#e0e0e0',
          divider: '#f0f0f0',
          success: '#34c759',
          warning: '#ff9f0a',
          danger: '#ff3b30',
          purple: '#af52de',
          teal: '#5ac8fa'
        }
      },
      fontFamily: {
        display: ['"SF Pro Display"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['"SF Pro Text"', 'Inter', 'system-ui', '-apple-system', 'sans-serif']
      },
      borderRadius: {
        'none': '0px',
        'xs': '4px',
        'sm': '4px',
        'DEFAULT': '4px',
        'md': '4px',
        'lg': '4px',
        'xl': '4px',
        '2xl': '4px',
        '3xl': '4px',
        'pill': '4px',
        'full': '4px'
      },
      boxShadow: {
        'apple-product': 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px',
        'apple-card': '0 2px 12px rgba(0, 0, 0, 0.04)',
        'apple-float': '0 8px 30px rgba(0, 0, 0, 0.12)'
      },
      letterSpacing: {
        'apple-tight': '-0.025em',
        'apple-tighter': '-0.035em'
      }
    },
  },
  plugins: [],
}
