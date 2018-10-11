import {
	insertOne
} from "./databaseAdapter"

export const _createSetting = async setting => {
	await insertOne('settings', setting).catch(e => e)
}

export const findSettingById = async id => {
	const setting = await findOne('settings', { id }).catch(e => e)
	return setting
}