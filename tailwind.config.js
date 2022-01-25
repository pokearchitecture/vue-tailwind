module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkgray: {
          100: '#161b22',
          300: '#0d1117',
          500: '#010409',
        }
      },
      maxWidth: {
        '1/4': '25%',
        '1/3': '33%',
        '1/2': '50%',
      },
      width: {
        '200': '200px',
        '300': '300px',
      },
      gridTemplateRows: {
        'layout': '45px 1fr',
      },
      gridTemplateColumns: {
        'layout-full': '200px 1fr',
        'layout': '1fr',
      }
    },
    variants: {
      extend: {
        backgroundColor: ['checked'],
        borderColor: ['checked'],
      }
    },
    plugins: [require('@tailwindcss/forms'),],
  }
}
