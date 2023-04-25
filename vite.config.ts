import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default {
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'Twill',
      fileName: 'twill',
    },
  },
  plugins: [dts()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  test: {},
}
