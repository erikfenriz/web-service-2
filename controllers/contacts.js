const {getDb} = require('../db');
const {ObjectId} = require('mongodb');

const collectionName = 'contacts';

async function getAllContacts(req, res) {
  //#swagger.tags=['Contacts']
  try {
    const result = await getDb().db().collection(collectionName).find();

    if (!result) {
      res.status(404).json({message: 'Not found'});
      return;
    }

    result.toArray().then((list) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(list);
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

async function getContactById(req, res) {
  //#swagger.tags=['Contacts']
  try {
    const result = await getDb().db().collection(collectionName).findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!result) {
      res.status(404).json({message: 'Not found'});
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

async function createContact(req, res) {
  //#swagger.tags=['Contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  const response = await getDb().db().collection(collectionName).insertOne(contact);

  if (response.acknowledged > 0) {
    console.log(response);
    res.status(201).send({id: response.insertedId});
  } else {
    res.status(500).json({message: response.error || 'something went wrong'});
  }
}

async function updateContact(req, res) {
  //#swagger.tags=['Contacts']
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  const response = await getDb().db().collection(collectionName).replaceOne({_id: contactId}, contact);

  if (response.modifiedCount > 0) {
    res.status(200).send({code: 200});
  } else {
    res.status(500).json({message: response.error || 'something went wrong'});
  }
}

async function deleteContact(req, res) {
  //#swagger.tags=['Contacts']
  const contactId = new ObjectId(req.params.id);

  const response = await getDb().db().collection(collectionName).deleteOne({_id: contactId});

  if (response.deletedCount > 0) {
    res.status(200).send({code: 200});
  } else {
    res.status(500).json({message: response.error || 'something went wrong'});
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
}
