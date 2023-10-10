const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://ec2-13-125-3-209.ap-northeast-2.compute.amazonaws.com", // 프록시할 백엔드 서버의 주소
      changeOrigin: true,
    })
  );
};
