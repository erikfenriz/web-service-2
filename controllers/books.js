const {getDb} = require('../db');
const {ObjectId} = require('mongodb');

const collectionName = 'books';

async function getAllBooks(req, res) {
  //#swagger.tags=['Books']
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

async function getBookById(req, res) {
  //#swagger.tags=['Books']
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

async function createBook(req, res) {
  //#swagger.tags=['Books']
  try {
    const bookDTO = {
      "title": req.body.title,
      "author": req.body.author,
      "genre": req.body.genre,
      "publicationYear": req.body.publicationYear,
      "isbn": req.body.isbn,
      "availableCopies": req.body.availableCopies,
      "publisher": req.body.publisher,
      "language": req.body.language,
    };

    const response = await getDb().db().collection(collectionName).insertOne(bookDTO);

    if (response.acknowledged > 0) {
      res.status(201).send({id: response.insertedId});
    } else {
      res.status(400).json({message: response.error || 'Bad request'});
    }
  } catch (e) {
    res.status(500).json({message: e.message || 'Something went wrong'});
  }
}

async function updateBook(req, res) {
  //#swagger.tags=['Books']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({message: 'Invalid id'});
    }
    const bookDTO = {
      "title": req.body.title,
      "author": req.body.author,
      "genre": req.body.genre,
      "publicationYear": req.body.publicationYear,
      "isbn": req.body.isbn,
      "availableCopies": req.body.availableCopies,
      "publisher": req.body.publisher,
      "language": req.body.language,
    };

    const response = await getDb().db().collection(collectionName).replaceOne({_id: new ObjectId(req.params.id)}, bookDTO);

    if (response.modifiedCount > 0) {
      res.status(200).send({code: 200});
    } else {
      res.status(404).json({message: response.error || 'Not found'});
    }
  } catch (e) {
    res.status(500).json({message: e.message || 'Something went wrong'});
  }
}

async function deleteBook(req, res) {
  //#swagger.tags=['Books']
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
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
}
