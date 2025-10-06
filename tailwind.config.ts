import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'chat-blue': '#2196F3',     // User message bubbles
        'chat-gray': '#E5E5EA',     // Other message bubbles
        'avatar-yellow': '#FDD835',
        'avatar-red': '#F44336',
        'avatar-pink': '#E91E63',
        'avatar-teal': '#26A69A',
        'avatar-blue': '#42A5F5',
        'avatar-purple': '#9C27B0',
      },
    },
  },
  plugins: [],
}
export default config
