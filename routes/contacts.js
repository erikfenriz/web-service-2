const router = require('express').Router();
const controllers = require('../controllers/contacts');

router.get('/', controllers.getAllContacts);
router.get('/:id', controllers.getContactById);

module.exports = router;
