import {
	insertOne
} from "./databaseAdapter"

export const _createSetting = async setting => {
	await insertOne('settings', setting).catch(e => e)
}