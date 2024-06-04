export default {
  dev: {
    '/api': {
      // 要代理的地址
      // target: 'http://101.43.20.171:3000',
      target: 'http://localhost:3000',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      pathRewrite: { '^/api': '/' },
    },
  }
}