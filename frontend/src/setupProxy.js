const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000", // 프록시할 백엔드 서버의 주소
      changeOrigin: true,
    })
  );
};
