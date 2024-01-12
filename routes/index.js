const router = require('express').Router();
const jokes = require('../controllers/');

router.get('/', jokes.helloWorld);

module.exports = router;
