import { getUser, getInventoryItem } from '../../compose'

export default {
  user: (_, { id }, ctx) => {
    if(ctx.user.id === id) return getUser(id)
    return null
  },

  currentUser: (_, {}, ctx) => {
    if(ctx.user) return getUser(ctx.user.id)
    return null
  }
}