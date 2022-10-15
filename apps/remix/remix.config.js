const isVercel = process.env.NODE_ENV === "production" && process.env.VERCEL === "1";

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverBuildTarget: isVercel ? "vercel" : null,
  server: isVercel ? "./server.js" : null,
  // serverDependenciesToBundle: ["@stiforr/ui/**", "@mantine/core/**"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
