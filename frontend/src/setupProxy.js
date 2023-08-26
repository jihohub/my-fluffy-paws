const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://main.d1wigk6ozffp8g.amplifyapp.com", // 프록시할 백엔드 서버의 주소
      changeOrigin: true,
    })
  );
};
