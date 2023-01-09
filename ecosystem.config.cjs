// pm2 config file
module.exports = {
  apps: [
    {
      name: 'youfaceit',
      script: './src/main.js',
      watch: true,
    },
  ],
}
