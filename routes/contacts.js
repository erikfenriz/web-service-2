const router = require('express').Router();
const controllers = require('../controllers/');

router.get('/', controllers.helloWorld);

module.exports = router;
