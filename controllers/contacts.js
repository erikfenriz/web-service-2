const {getDb} = require('../db');
const {ObjectId} = require('mongodb');

const collectionName = 'contacts';

const getAllContacts = async (req, res, next) => {
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
};

const getContactById = async (req, res) => {
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

module.exports = {
  getAllContacts,
  getContactById,
}
