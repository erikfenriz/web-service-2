const router = require('express').Router();
const controllers = require('../controllers/books');
const {bookValidationRules, validate} = require('../validator');

router.get('/', controllers.getAllBooks);
router.get('/:id', controllers.getBookById);

router.post('/', bookValidationRules(), validate, controllers.createBook);
router.put('/:id', bookValidationRules(), validate, controllers.updateBook);

router.delete('/:id', controllers.deleteBook);

module.exports = router;
