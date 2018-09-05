"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compose = require("../../compose");

exports.default = {
  id: function id(inventoryItem) {
    return inventoryItem.id;
  },
  inventory: function inventory(inventoryItem) {
    return (0, _compose.getInventory)(inventoryItem.inventoryId);
  },
  object: function object(inventoryItem) {
    return inventoryItem.object;
  },
  quantityUnit: function quantityUnit(inventoryItem) {
    return inventoryItem.quantityUnit;
  },
  currentQuantity: function currentQuantity(inventoryItem) {
    return inventoryItem.currentQuantity;
  },
  reorderQuantity: function reorderQuantity(inventoryItem) {
    return inventoryItem.reorderQuantity;
  },
  reorderThreshold: function reorderThreshold(inventoryItem) {
    return inventoryItem.reorderThreshold;
  },
  costUnit: function costUnit(inventoryItem) {
    return inventoryItem.costUnit;
  },
  unitCost: function unitCost(inventoryItem) {
    return inventoryItem.unitCost;
  },
  reorderCost: function reorderCost(inventoryItem) {
    return inventoryItem.reorderCost;
  },
  lastReorderDate: function lastReorderDate(inventoryItem) {
    return inventoryItem.lastReorderDate;
  },
  deliveryDate: function deliveryDate(inventoryItem) {
    return inventoryItem.deliveryDate;
  },
  createdAt: function createdAt(inventoryItem) {
    return inventoryItem.createdAt;
  },
  updatedAt: function updatedAt(inventoryItem) {
    return inventoryItem.updatedAt;
  }
};
//# sourceMappingURL=inventoryItem.js.map