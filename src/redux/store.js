import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {carReducer, userReducer, autoParkReducer, orderReducer} from "./slice";

const rootReducer = combineReducers({
    cars: carReducer,
    users: userReducer,
    autoParks: autoParkReducer,
    orderMessages: orderReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer
});

export {setupStore}