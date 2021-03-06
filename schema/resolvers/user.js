import {
  getTimersByUserId,
  getInventoriesByUserId,
  getSettingsByUserId
} from '../../compose'

export default {
  id: user => user.id,
  userName: user => user.userName,
  timers: user => getTimersByUserId(user.id),
  inventories: user => getInventoriesByUserId(user.id),
  settings: user => getSettingsByUserId(user.id)
}