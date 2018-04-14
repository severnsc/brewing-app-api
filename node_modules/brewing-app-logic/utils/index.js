const constructErrorMessage = (name, type, item) => 
  `${name} must be of type ${type}! Got value: ` + item

module.exports = {
  constructErrorMessage
}