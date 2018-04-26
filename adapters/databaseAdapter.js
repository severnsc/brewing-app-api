import { MongoClient } from 'mongodb'
require('dotenv').config()

const url = process.env.DB_URL
let db

export const dbConnection = cb => {
  MongoClient.connect(url, (err, _db) => {
    if(err){
      console.log(err)
    }else{
      db = _db
      console.log("Connected Successfully!")
      cb()
    }
  })
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