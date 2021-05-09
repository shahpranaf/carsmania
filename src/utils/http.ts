import axios from "axios"

const http = axios.create({
  baseURL: process.env.CAR_APP_BASE_URL || "https://auto1-mock-server.herokuapp.com/api"
})

export const httpAll = axios.all;
export const httpSpread = axios.spread;
export default http
