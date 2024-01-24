const router = require('express').Router();
const controllers = require("../controllers");

router.use('/', require('./swagger'));
router.get('/', controllers.helloWorld);
router.use('/users', require('./users'));
router.use('/books', require('./books'));

module.exports = router;
