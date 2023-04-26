import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {carReducer, userReducer, autoParkReducer} from "./slice";

const rootReducer = combineReducers({
    cars: carReducer,
    users: userReducer,
    autoParks: autoParkReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer
});

export {setupStore}