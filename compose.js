import * as core from "brewing-app-logic"

import {
  findUserById,
  findUserByUsername,
  userExists,
  saveUser,
  isUsernameUnique,
  _createUser,
  _deleteUser,
  hashPassword
} from './adapters/userAdapter'

import {
  _createTimer,
  findTimersByUserId,
  findTimerById,
  timerExists,
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
  _createTimerAlert
} from './adapters/timerAlertsAdapter'

export const getUser = core.getUserUseCase(findUserById)
export const createUser = core.createUserUseCase(isUsernameUnique)(_createUser)(hashPassword)
export const updateUser = core.updateUserUseCase(findUserById)(saveUser)
export const authenticateUser = core.authenticateUserUseCase(findUserByUsername)(hashPassword)
export const deleteUser = core.deleteUserUseCase(_deleteUser)
export const createTimer = core.createTimerUseCase(_createTimer)
export const startTimer = core.startTimerUseCase(findTimerById)(saveTimer)
export const stopTimer = core.stopTimerUseCase(findTimerById)(saveTimer)
export const decrementTimer = core.decrementTimerUseCase(findTimerById)(saveTimer)
export const resetTimer = core.resetTimerUseCase(findTimerById)(saveTimer)
export const updateTimer = core.updateTimerUseCase(findTimerById)(saveTimer)
export const deleteTimer = core.deleteTimerUseCase(_deleteTimer)
export const getTimersByUserId = core.getTimersByUserIdUseCase(userExists)(findTimersByUserId)
export const createInventory = core.createInventoryUseCase(_createInventory)
export const updateInventory = core.updateInventoryUseCase(findInventoryById)(saveInventory)
export const deleteInventory = core.deleteInventoryUseCase(_deleteInventory)
export const getInventoriesByUserId = core.getInventoriesByUserIdUseCase(userExists)(findInventoriesByUserId)
export const getTimer = core.getTimerUseCase(findTimerById)
export const getInventory = core.getInventoryUseCase(findInventoryById)
export const createTimerAlert = core.createTimerAlertUseCase(_createTimerAlert)
export const updateTimerAlert = core.updateTimerAlertUseCase(findTimerAlertById)(saveTimerAlert)
export const getTimerAlertsByTimerId = core.getTimerAlertsByTimerIdUseCase(timerExists)(findTimerAlertsByTimerId)
export const createInventoryItem = core.createInventoryItemUseCase(_createInventoryItem)(addToInventory)
export const updateInventoryItem = core.updateInventoryItemUseCase(findInventoryItemById)(saveInventoryItem)
export const deleteInventoryItem = core.deleteInventoryItemUseCase(_deleteInventoryItem)