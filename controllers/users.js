const {getDb} = require('../db');
const {ObjectId} = require('mongodb');

const collectionName = 'users';

async function getAllUsers(req, res) {
  //#swagger.tags=['Users']
  try {
    const result = await getDb().db().collection(collectionName).find();

    if (result) {
      result.toArray().then((list) => {
        res.status(200).json(list);
      });
    } else {
      res.status(404).json({message: 'Not found'});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

async function getUserById(req, res) {
  //#swagger.tags=['Users']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({message: 'Invalid id'});
    }

    const result = await getDb().db().collection(collectionName).findOne({
      _id: new ObjectId(req.params.id)
    });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({message: 'Not found'});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

async function createUser(req, res) {
  //#swagger.tags=['Users']
  try {
    const userDTO = {
      "firstName": req.body.firstName,
      "lastName": req.body.lastName,
      "email": req.body.email,
      "username": req.body.username,
      "password": req.body.password,
      "birthDate": req.body.birthDate,
      "address": req.body.address,
    };

    const response = await getDb().db().collection(collectionName).insertOne(userDTO);

    if (response.acknowledged > 0) {
      res.status(201).send({id: response.insertedId});
    } else {
      res.status(400).json({message: response.error || 'Bad request'});
    }
  } catch (e) {
    res.status(500).json({message: e.message || 'Something went wrong'});
  }
}

async function updateUser(req, res) {
  //#swagger.tags=['Users']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({message: 'Invalid id'});
    }
    const userDTO = {
      "firstName": req.body.firstName,
      "lastName": req.body.lastName,
      "email": req.body.email,
      "username": req.body.username,
      "password": req.body.password,
      "birthDate": req.body.birthDate,
      "address": req.body.address,
    };

    const response = await getDb().db().collection(collectionName).replaceOne({_id: new ObjectId(req.params.id)}, userDTO);

    if (response.modifiedCount > 0) {
      res.status(200).send({code: 200});
    } else {
      res.status(404).json({message: response.error || 'Not found'});
    }
  } catch (e) {
    res.status(500).json({message: e.message || 'Something went wrong'});
  }
}

async function deleteUser(req, res) {
  //#swagger.tags=['Users']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({message: 'Invalid id'});
    }
    const response = await getDb().db().collection(collectionName).deleteOne({_id: new ObjectId(req.params.id)});

    if (response.deletedCount > 0) {
      res.status(200).send({code: 200});
    } else {
      res.status(400).json({message: response.error || 'Bad request'});
    }
  } catch (e) {
    res.status(500).json({message: e.message || 'Something went wrong'});
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
