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