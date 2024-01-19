const router = require('express').Router();
const controllers = require('../controllers/contacts');

router.get('/', controllers.getAllContacts);
router.get('/:id', controllers.getContactById);

router.post('/', controllers.createContact);
router.put('/:id', controllers.updateContact);
router.delete('/:id', controllers.deleteContact);

module.exports = router;
