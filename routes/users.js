const router = require('express').Router();
const controllers = require('../controllers/users');
const {userValidationRules, validate} = require('../validator');

router.get('/', controllers.getAllUsers);
router.get('/:id', controllers.getUserById);

router.post('/', userValidationRules(), validate, controllers.createUser);
router.put('/:id', userValidationRules(), validate, controllers.updateUser);

router.delete('/:id', controllers.deleteUser);

module.exports = router;
