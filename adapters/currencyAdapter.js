import axios from "axios"
import {
	insertOne,
	findOne,
	updateOne
} from "./databaseAdapter"

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

export const createCurrencyExchange = async currencyExchange =>
	await insertOne("currencyExchanges", currencyExchange).catch(e => e)

export const getCurrencyExchange = async (from, to) =>
	await findOne("currencyExchanges", { from, to }).catch(e => e)

export const saveCurrencyExchange = async currencyExchange => {
	const { from, to } = currencyExchange
	return await updateOne("currencyExchanges", { from, to }, currencyExchange)
								.catch(e => e)
}

export const cachedConvertCurrency = async (from, to, amount) => {
	const currencyExchange = await getCurrencyExchange(from, to).catch(e => e)
	if(currencyExchange){
		if(currencyExchange.date < new Date().toLocaleDateString()){
			const newCurrencyExchange = await convertCurrency(from, to, amount).catch(e => e)
			await saveCurrencyExchange(newCurrencyExchange)
			return newCurrencyExchange
		}else{
			return currencyExchange
		}
	}else{
		const newCurrencyExchange = await convertCurrency(from, to, amount).catch(e => e)
		await createCurrencyExchange(newCurrencyExchange)
		return newCurrencyExchange
	}
}