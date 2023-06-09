const baseURL = 'http://localhost:8888';


const auth = '/auth'
const autoParks = '/auto_parks'
const cars = '/cars'
const users = '/users'

const mainUrls = {
    auth: {
        login: auth,
        register: `${auth}/register`,
        refresh: `${auth}/refresh`,
        me: `${auth}/me`,
        activate: `${auth}/activate`
    },
    cars: {
        cars,
        byId: (id) => `${cars}/${id}`,
        addPhoto: (id) => `${cars}/${id}/photo`,
        deletePhoto: (id) => `${cars}/photo/${id}`,
        byParkId: (id) => `${autoParks}/${id}${cars}`
    },
    autoParks: {
        autoParks,
        byId: (id) => `${autoParks}/${id}`,
        byUser: `${autoParks}/my`,
    },
    users: {
        users: users,
        profile: `${users}/profile`,
        order: `/orders/car`,
        my_orders: `/orders/my`,
        orderById: (id) => `orders/${id}`,

    },

}


export {baseURL, mainUrls};