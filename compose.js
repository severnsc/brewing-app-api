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
  createEverySecondCronJob,
  createJob,
  findJobByTimerId,
  deleteJobByTimerId
} from "./adapters/cronAdapter"

import { sendMessage } from './adapters/messagingAdapter'

import { TIMER_UPDATED } from "./schema/resolvers/subscription"
import { pubsub } from "./app"

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
const decrementTimerUseCase = core.decrementTimerUseCase(findTimerById)(saveTimer)

const publishDecrementedTimerUpdate = async id => {
  const timer = await decrementTimerUseCase(id)
  pubsub.publish(TIMER_UPDATED, {timerUpdated: timer})
}

export const decrementTimer = timer => {
  const job = createEverySecondCronJob(() => publishDecrementedTimerUpdate(timer.id))
  createJob(job)
  job.start()
}

export const stopDecrementing = async timer => {
  const job = findJobByTimerId(timer.id)
  deleteJobByTimerId(timer.id)
  job.stop()
}

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
export const deleteTimerAlert = core.deleteTimerAlertUseCase(_deleteTimerAlert)
export const getTimerAlertsByTimerId = core.getTimerAlertsByTimerIdUseCase(findTimerAlertsByTimerId)

//Inventory Item
export const getInventoryItem = core.getInventoryItemUseCase(findInventoryItemById)
export const createInventoryItem = core.createInventoryItemUseCase(_createInventoryItem)(addToInventory)
export const updateInventoryItem = core.updateInventoryItemUseCase(findInventoryItemById)(saveInventoryItem)
export const deleteInventoryItem = core.deleteInventoryItemUseCase(_deleteInventoryItem)