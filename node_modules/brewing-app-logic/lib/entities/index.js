const timerEntities = require('./timer')
const timerAlertEntityFactory = require('./timerAlert')
const userEntityFactory = require('./user')
const inventoryEntityFactory = require('./inventory')
const inventoryItemEntityFactory = require('./inventoryItem')
const timerAlertEntity = timerAlertEntityFactory.timerAlert
const userEntity = userEntityFactory.user
const inventoryEntity = inventoryEntityFactory.inventory
const inventoryItemEntity  = inventoryItemEntityFactory.inventoryItem

module.exports = {
  timerEntities,
  timerAlertEntity,
  userEntity,
  inventoryEntity,
  inventoryItemEntity
}