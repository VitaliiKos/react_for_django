import {mainUrls} from "../config";
import {apiService} from "./apiService";

const carsServices = {
    getAll: (page=1) => apiService.get(mainUrls.cars.cars, {params:{page}}),
    getByParkId: (id) => apiService.get(mainUrls.cars.byParkId(id)),
    getById: (id) => apiService.get(mainUrls.cars.byId(id)),
    addNew: (car, selectedPark) => apiService.post(`${mainUrls.autoParks.autoParks}/${selectedPark}/cars`, car),
    deleteById: (id) => apiService.delete(mainUrls.cars.byId(id)),
    putById: (id, data) => apiService.put(mainUrls.cars.byId(id), data)
}

export {carsServices};