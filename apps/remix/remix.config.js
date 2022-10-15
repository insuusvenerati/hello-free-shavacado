/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverBuildTarget:
    process.env.NODE_ENV === "production" && process.env.VERCEL === 1 ? "vercel" : null,
  server: process.env.NODE_ENV === "production" && process.env.VERCEL === 1 ? "./server.js" : null,
  // serverDependenciesToBundle: ["@stiforr/ui/**", "@mantine/core/**"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
