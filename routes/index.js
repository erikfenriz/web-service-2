const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const routeFiles = fs.readdirSync(__dirname);

routeFiles
  .filter(file => file !== 'index.js')
  .map(file => {
    const routePath = `/${path.basename(file, path.extname(file))}`;
    const filePath = '.' + routePath;
    router.use(routePath, require(filePath));
  });

module.exports = router;
