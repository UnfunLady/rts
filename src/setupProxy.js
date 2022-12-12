const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use('/api', createProxyMiddleware({
        target: 'http://localhost:8888',
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
    })
    )
    app.use('/wy', createProxyMiddleware({
        target: 'http://c.m.163.com',
        changeOrigin: true,
        pathRewrite: { "^/wy": "" }
    })
    )
}