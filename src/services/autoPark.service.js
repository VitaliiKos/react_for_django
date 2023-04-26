import {mainUrls} from "../config";
import {apiService} from "./apiService";

const autoParkServices = {
    getAll: () => apiService.get(mainUrls.autoParks.autoParks),
    getById: (id) => apiService.get(mainUrls.autoParks.byId(id)),
    getByUser: () => apiService.get(mainUrls.autoParks.byUser),
    addNew: (data) => apiService.post(mainUrls.autoParks.autoParks, data),
    deleteById: (id) => apiService.delete(mainUrls.autoParks.byId(id)),
    putById: (id, data) => apiService.put(mainUrls.autoParks.byId(id), data)
}

export {autoParkServices};