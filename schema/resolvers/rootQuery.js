import { getUser, getInventoryItem } from '../../compose'
import { cachedConvertCurrency } from "../../adapters/currencyAdapter"

export default {
  user: (_, { id }, ctx) => {
    if(ctx.user.id === id) return getUser(id)
    return null
  },

  currentUser: (_, {}, ctx) => {
    if(ctx.user) return getUser(ctx.user.id)
    return null
  },

  currencyExchange: (_, { from, to, amount }, ctx) => {
  	if(ctx.user){
  		return cachedConvertCurrency(from, to, amount)
  	}
  	return null
  }
}