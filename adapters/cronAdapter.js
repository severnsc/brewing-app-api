import { CronJob } from "cron"
import { insertOne, findOne, deleteOneByObject } from "./databaseAdapter"

let jobs = []
 
export const createEverySecondCronJob = cb => {
	return new CronJob("* * * * * *", cb)
}

export const createJob = (job, timerId) => {
	const newJob = {job, timerId}
	jobs.push(newJob)
}

export const findJobByTimerId = timerId =>{
	const job = jobs.find(job => job.timerId === timerId)
	return job.job
}

export const deleteJobByTimerId = timerId => {
	jobs = jobs.filter(job => job.timerId !== timerId)
}