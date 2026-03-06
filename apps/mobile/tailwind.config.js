/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  // Dark mode handled via JS (vars() injection), not media query
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg:             'var(--color-bg)',
        'bg-card':      'var(--color-bg-card)',
        'bg-subtle':    'var(--color-bg-subtle)',
        'text-primary': 'var(--color-text)',
        'text-muted':   'var(--color-text-muted)',
        'text-light':   'var(--color-text-light)',
        accent:         'var(--color-accent)',
        'accent-mid':   'var(--color-accent-mid)',
        'accent-pale':  'var(--color-accent-pale)',
        'accent-deep':  'var(--color-accent-deep)',
        'accent-warm':  'var(--color-accent-warm)',
        'accent-muted': 'var(--color-accent-muted)',
        border:         'var(--color-border)',
        'border-light': 'var(--color-border-light)',
        'tag-tech':     'var(--color-tag-tech)',
        'tag-life':     'var(--color-tag-life)',
        'tag-essay':    'var(--color-tag-essay)',
      },
    },
  },
  plugins: [],
}

