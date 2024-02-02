const router = require('express').Router();
const controllers = require('../controllers/books');
const {bookValidationRules, validate} = require('../middleware/validator');
const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', controllers.getAllBooks);
router.get('/:id', controllers.getBookById);

router.post('/', isAuthenticated, bookValidationRules(), validate, controllers.createBook);
router.put('/:id', isAuthenticated, bookValidationRules(), validate, controllers.updateBook);
router.delete('/:id', isAuthenticated, controllers.deleteBook);

module.exports = router;
