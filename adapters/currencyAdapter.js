import axios from "axios"

const API_URL = "https://api.exchangeratesapi.io/latest"

export const convertCurrency = (from, to, amount) => {
	return axios.get(
		API_URL + "?base=" + from + "&symbols=" + to
	).then(({ data }) => ({
		from,
		to,
		rate: data.rates[to],
		result: amount * data.rates[to],
		date: data.date
	}))
	.catch(e => e)
}