import {
	insertOne,
	findOne,
	updateOne
} from "./databaseAdapter"

export const _createSetting = async setting => {
	await insertOne('settings', setting).catch(e => e)
}

export const findSettingById = async id => {
	const setting = await findOne('settings', { id }).catch(e => e)
	return setting
}

export const saveSetting = async setting => {
	await updateOne("settings", { id: setting.id }, setting).catch(e => e)
}