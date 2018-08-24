import { pubsub } from "../../app"

export const TIMER_UPDATED = "TIMER_UPDATED"

export const Subscription = {
	timerUpdated: {
		subscribe: () => pubsub.asyncIterator([TIMER_UPDATED])
	}
}