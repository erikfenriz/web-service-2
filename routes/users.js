const router = require('express').Router();
const controllers = require('../controllers/users');
const {userValidationRules, validate} = require('../middleware/validator');
const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', controllers.getAllUsers);
router.get('/:id', controllers.getUserById);
router.post('/', isAuthenticated, userValidationRules(), validate, controllers.createUser);
router.put('/:id', isAuthenticated, userValidationRules(), validate, controllers.updateUser);
router.delete('/:id', isAuthenticated, controllers.deleteUser);

module.exports = router;
