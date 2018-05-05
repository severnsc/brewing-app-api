import { MongoClient } from 'mongodb'
require('dotenv').config()

const url = process.env.LOCAL_DB_URL
let db

export const dbConnection = cb => {
  MongoClient.connect(url).then(client => {
    console.log("Connected to database!")
    db = client.db("brewing-app-db")
    cb()
  }).catch(e => e)
}

export const findOne = async (collectionName, searchObj) => {
  const collection = db.collection(collectionName)
  const doc = await collection.findOne(searchObj)
  return doc
}

export const find = async (collectionName, searchObj) => {
  const collection = db.collection(collectionName)
  const docs = await collection.find(searchObj).toArray()
  return docs
}

export const insertOne = async (collectionName, doc) => {
  const collection = db.collection(collectionName)
  collection.insertOne(doc, (err, r) => {
    if(err){
      throw new Error('insertOne failed!')
    }

    console.log(r.insertedCount)
  })
}

export const updateOne = async (collectionName, filter, updateObj) => {
  const collection = db.collection(collectionName)
  collection.updateOne(filter, {$set: updateObj}, (err, r) => {
    if(err){
      throw new Error("updateOne failed!")
    }

    console.log(r.insertedCount)
  })
}

export const deleteOne = async (collectionName, id) => {
  const collection = db.collection(collectionName)
  collection.deleteOne({id}, (err, r) => {
    if(err){
      throw new Error("deleteOne failed!")
    }

    console.log(r)
  })
}

export const deleteOneByObject = async (collectionName, object) => {
  const collection = db.collection(collectionName)
  collection.deleteOne(object, (err, r) => {
    if(err){
      throw new Error("deleteOneByObject failed!")
    }

    console.log(r.deletedCount)
  })
}