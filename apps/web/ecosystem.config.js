module.exports = {
  apps: [
    {
      name: "blog-web",
      script: "../../node_modules/next/dist/bin/next",
      args: "start -H 0.0.0.0 -p 3000",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
