const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const controllers = require("../controllers");

// const routeFiles = fs.readdirSync(__dirname);
router.use('/', require('./swagger'));
router.get('/', controllers.helloWorld);
router.use('/contacts', require('./contacts'));

// routeFiles
//   .filter(file => file !== 'index.js')
//   .map(file => {
//     const routePath = `/${path.basename(file, path.extname(file))}`;
//     const filePath = '.' + routePath;
//     router.use(routePath, require(filePath));
//   });

module.exports = router;
