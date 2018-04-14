const shortid = require('shortid')
const utils = require('../../utils')

const inventoryItem = (inventoryId, object, quantityUnit, currentQuantity, reorderQuantity, reorderThreshold, costUnit, unitCost, reorderCost, lastReorderDate, deliveryDate, createdAt, updatedAt) => {
  
  const stringProps = [inventoryId, quantityUnit, costUnit]

  stringProps.forEach(stringProp => {
    if(typeof stringProp !== 'string'){
      throw new TypeError('Exected type string! Got type ' + typeof stringProp)
    }
  })

  if(typeof object !== 'object'){
    throw new TypeError(utils.constructErrorMessage('object', 'object', object))
  }

  const numberProps = [currentQuantity, reorderQuantity, reorderThreshold, unitCost, reorderCost]

  numberProps.forEach(numberProp => {
    if(typeof numberProp !== 'number'){
      throw new TypeError('Expected type number! Got type ' + typeof numberProp)
    }
  })

  if(!(lastReorderDate instanceof Date)){
    if(lastReorderDate !== null){
      throw new TypeError(utils.constructErrorMessage('lastReorderDate', 'date', lastReorderDate))
    }
  }

  if(!(deliveryDate instanceof Date)){
    if(deliveryDate !== null){
      throw new TypeError(utils.constructErrorMessage('deliveryDate', 'date', deliveryDate))
    }
  }

  if(!(createdAt instanceof Date)){
    throw new TypeError(utils.constructErrorMessage('createdAt', 'date', createdAt))
  }

  if(!(updatedAt instanceof Date)){
    throw new TypeError(utils.constructErrorMessage('updatedAt', 'date', updatedAt))
  }

  return {
    id: shortid.generate(),
    inventoryId,
    object,
    quantityUnit,
    currentQuantity,
    reorderQuantity,
    reorderThreshold,
    costUnit,
    unitCost,
    reorderCost,
    lastReorderDate,
    deliveryDate,
    createdAt,
    updatedAt
  }
}

module.exports = {
  inventoryItem
}