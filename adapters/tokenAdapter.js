import bcrypt from 'bcrypt'
import uuidv4 from 'uuid/v4'
import { find, deleteOneByObject, insertOne } from './databaseAdapter'

export const generateResetToken = () => {
  return uuidv4()
}

export const hashToken = token => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(token, salt)
  return hash
}

export const saveResetHash = async (email, hash, url) => {
  //Expires in 2 hours
  const doc = {email, hash, callbackURL: url, expires: Date.now() + (2 * 60 * 60 * 1000)}
  insertOne("resetTokens", doc).then(() => {
    console.log("saved!")
  }).catch(e => e)
}

export const findHash = async token => {
  const docs = await find("resetTokens", {})
  const doc = docs.find(doc => bcrypt.compareSync(token, doc.hash))
  return doc
}

export const deleteResetHash = async token => {
  const docs = await find("resetTokens", {})
  const doc = docs.find(doc => bcrypt.compareSync(token, doc.hash))
  await deleteOneByObject("resetTokens", doc).catch(e => e)
}