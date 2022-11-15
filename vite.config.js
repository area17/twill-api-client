import path from 'path'

export default {
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'Twill',
      fileName: 'twill'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}
