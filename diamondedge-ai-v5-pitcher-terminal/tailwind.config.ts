import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: { extend: { colors: { bg:'#07070b', card:'#11121a', card2:'#181923', purple:'#8b5cf6', green:'#20e3a2', red:'#ff5570', gold:'#f6c945' } } },
  plugins: []
}
export default config
