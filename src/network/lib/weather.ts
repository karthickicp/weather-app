import { api } from "src/utils/constants";
import axiosClient from "../apiClient";

export const getWeather = (name: string, days: number) => {
    let search = name ? `?q=${name}` : '';
    let numOfDays = `&days=${days}`;
    return axiosClient.get(`${api.WEARTHER_FORECAST}${search}${numOfDays}`).then(res=> res.data).catch(err => {throw err})
}

export const searchLocation = (location: string) => {
    return axiosClient.get(`${api.SEARCH}?q=${location}`).then(res=> res.data).catch(err => {throw err})
}