import { getUser } from '../../compose'

export default {
	id: setting => setting.id,
	user: setting => getUser(setting.userId),
	name: setting => setting.name,
	value: setting => setting.value
}