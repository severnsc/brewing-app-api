import * as core from "brewing-app-logic"

import {
  findUserById,
  findUserByUsername,
  userExists,
  saveUser,
  isUsernameUnique,
  isEmailUnique,
  _createUser,
  _deleteUser,
  hashPassword,
  compareHash
} from './adapters/userAdapter'

import {
  _createTimer,
  findTimersByUserId,
  findTimerById,
  findStartedTimers,
  saveTimer,
  _deleteTimer
} from './adapters/timerAdapter'

import {
  _createInventory,
  saveInventory,
  _deleteInventory,
  findInventoriesByUserId,
  findInventoryById
} from './adapters/inventoryAdapter'

import {
  _createInventoryItem,
  addToInventory,
  findInventoryItemById,
  saveInventoryItem,
  _deleteInventoryItem
} from './adapters/inventoryItemAdapter'

import {
  findTimerAlertsByTimerId,
  findTimerAlertById,
  saveTimerAlert,
  _createTimerAlert,
  _deleteTimerAlert
} from './adapters/timerAlertsAdapter'

import {
  _createSetting,
  findSettingById,
  saveSetting
} from "./adapters/settingAdapter"

import { sendMessage } from './adapters/messagingAdapter'

export { hashPassword }

//User
export const getUser = core.getUserUseCase(findUserById)
export const createUser = core.createUserUseCase(isUsernameUnique)(isEmailUnique)(_createUser)(hashPassword)
export const updateUser = core.updateUserUseCase(findUserById)(isUsernameUnique)(isEmailUnique)(saveUser)
export const authenticateUser = core.authenticateUserUseCase(findUserByUsername)(compareHash)
export const deleteUser = core.deleteUserUseCase(_deleteUser)

//Timer
export const getTimer = core.getTimerUseCase(findTimerById)
export const createTimer = core.createTimerUseCase(_createTimer)
export const startTimer = core.startTimerUseCase(findTimerById)(saveTimer)
export const stopTimer = core.stopTimerUseCase(findTimerById)(saveTimer)
export const decrementTimer = core.decrementTimerUseCase(findTimerById)(saveTimer)
export const resetTimer = core.resetTimerUseCase(findTimerById)(saveTimer)
export const updateTimer = core.updateTimerUseCase(findTimerById)(saveTimer)
export const deleteTimer = core.deleteTimerUseCase(_deleteTimer)
export const getTimersByUserId = core.getTimersByUserIdUseCase(userExists)(findTimersByUserId)

//Inventory
export const createInventory = core.createInventoryUseCase(_createInventory)
export const updateInventory = core.updateInventoryUseCase(findInventoryById)(saveInventory)
export const deleteInventory = core.deleteInventoryUseCase(_deleteInventory)
export const getInventoriesByUserId = core.getInventoriesByUserIdUseCase(userExists)(findInventoriesByUserId)
export const getInventory = core.getInventoryUseCase(findInventoryById)

//Timer Alert
export const getTimerAlert = core.getTimerAlertUseCase(findTimerAlertById)
export const createTimerAlert = core.createTimerAlertUseCase(_createTimerAlert)
export const updateTimerAlert = core.updateTimerAlertUseCase(findTimerAlertById)(saveTimerAlert)
export const activateTimerAlert = core.activateTimerAlertUseCase(findTimerAlertById)(saveTimerAlert)(sendMessage)
export const deactivateTimerAlert = core.deactivateTimerAlertUseCase(findTimerAlertById)(saveTimerAlert)
export const deleteTimerAlert = core.deleteTimerAlertUseCase(_deleteTimerAlert)
export const getTimerAlertsByTimerId = core.getTimerAlertsByTimerIdUseCase(findTimerAlertsByTimerId)

//Inventory Item
export const getInventoryItem = core.getInventoryItemUseCase(findInventoryItemById)
export const createInventoryItem = core.createInventoryItemUseCase(_createInventoryItem)(addToInventory)
export const updateInventoryItem = core.updateInventoryItemUseCase(findInventoryItemById)(saveInventoryItem)
export const deleteInventoryItem = core.deleteInventoryItemUseCase(_deleteInventoryItem)

//Setting
export const createSetting = core.createSettingUseCase(_createSetting)
export const getSetting = core.getSettingUseCase(findSettingById)
export const updateSetting = core.updateSettingUseCase(findSettingById)(saveSetting)

export const decrementTimers = async () => {
  const startedTimers = await findStartedTimers().catch(e => e)
  const promises = startedTimers.map(timer => decrementTimer(timer.id, Date.now()))
  const decrementedTimers = await Promise.all(promises)
  decrementedTimers.forEach(async timer => {
    const timerAlerts = await findTimerAlertsByTimerId(timer.id)
    const timerAlertsToActivate = timerAlerts.filter(alert => alert.activationTime === timer.remainingDuration)
    timerAlertsToActivate.forEach(alert => activateTimerAlert(alert.id).catch(e => console.error(e)))
  })
}