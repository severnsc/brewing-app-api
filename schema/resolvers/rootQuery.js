import { getUser } from '../../compose'

export default {
  user: (_, { id }, ctx) => {
    if(ctx.user.id === id) return getUser(id)
    return null
  }
}