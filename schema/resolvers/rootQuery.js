import { getUser } from '../../compose'

export default {
  user: (_, { id }) => getUser(id)
}