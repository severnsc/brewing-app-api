import { getUser } from '../../compose'

export default {
  id: inventory => inventory.id,
  user: inventory => getUser(inventory.userId),
  name: inventory => inventory.name,
  items: inventory => inventory.items
}