import { FilterType } from "../types/Filter";
import http from '../utils/http';

export const fetchCars = (filter?: FilterType) => {
    let url = '/cars?';
    url += (filter && filter.filteredColor !== "") ? `color=${filter.filteredColor}&`: "";
    url += (filter && filter.filteredManufact  !== "") ? `manufacturer=${filter.filteredManufact}&`: "";
    url += filter && filter.currPage ? `page=${filter.currPage}` : "";

    return http.get(url)
        .then(res => res.data)
}

export const fetchCar = (stockNumber: number) => {
    return http.get(`/cars/${stockNumber}`)
        .then(res => res.data)
}

export const fetchManufacturers = () => {
    return http.get(`/manufacturers`)
        .then(res => res.data)
}

export const fetchColors= () => {
    return http.get(`/colors`)
        .then(res => res.data)
}