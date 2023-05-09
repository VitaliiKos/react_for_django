import {mainUrls} from "../config";
import {apiService} from "./apiService";

const orderServices = {
    getAll: (page=1) => apiService.get(`${mainUrls.users.order}}`, {params:{page}}),
    create: (car_id, data) => apiService.post(`${mainUrls.users.order}/${car_id}`, data),
    getAllMy: (page=1) => apiService.get(`${mainUrls.users.my_orders}`, {params:{page}}),
    deleteById: (id) => apiService.delete(mainUrls.users.orderById(id)),


}

export {orderServices};