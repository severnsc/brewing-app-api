import * as core from "brewing-app-logic"

import {
  findUserById,
  userExists
} from './adapters/userAdapter'

import {
  findTimersByUserId,
  findTimerById
} from './adapters/timerAdapter'

import {
  findInventoriesByUserId,
  findInventoryById
} from './adapters/inventoryAdapter'

export const getUser = core.getUserUseCase(findUserById)
export const getTimersByUserId = core.getTimersByUserIdUseCase(userExists)(findTimersByUserId)
export const getInventoriesByUserId = core.getInventoriesByUserIdUseCase(userExists)(findInventoriesByUserId)
export const getTimer = core.getTimerUseCase(findTimerById)
export const getInventory = core.getInventoryUseCase(findInventoryById)