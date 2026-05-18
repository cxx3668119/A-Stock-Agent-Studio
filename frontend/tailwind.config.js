/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        faint: 'var(--faint)',
        line: 'var(--line)',
        orange: 'var(--orange)',
        blue: 'var(--blue)',
        olive: 'var(--olive)',
        red: 'var(--red)',
        green: 'var(--green)',
        amber: 'var(--amber)',
        dark: 'var(--dark)',
        'dark-2': 'var(--dark-2)',
      },
      fontFamily: {
        ui: ['Poppins', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        serif: ['Lora', 'Noto Serif SC', 'Songti SC', 'serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      borderRadius: {
        xl: '28px',
        lg: '20px',
        md: '14px',
        sm: '10px',
      },
      boxShadow: {
        shell: '0 24px 80px rgba(20, 20, 19, .16)',
        card: '0 8px 28px rgba(20, 20, 19, .07)',
      },
    },
  },
  plugins: [],
}
