import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {orderServices} from "../../services";

let initialState = {
    errors: null,
    order_messages: [],
    loading: null,
    messageForUpdate: null,
    prevPage: null,
    nextPage: null,
    total_pages: null,
    total_items: null,
    current_message: null,


};
const getAll = createAsyncThunk(
    'ordersSlice/getAll',
    async ({page}, thunkAPI) => {
        try {
            const {data} = await orderServices.getAllMy(page);
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);
const deleteOrder = createAsyncThunk(
    'carSlice/deleteOrder',
    async ({id}, thunkAPI) => {
        try {
            await orderServices.deleteById(id);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);


const ordersSlice = createSlice({
    name: 'ordersSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.loading = false;
            const {next, prev, data, total_pages, total_items} = action.payload;
            state.prevPage = prev
            state.nextPage = next
            state.order_messages = data;
            state.total_pages = total_pages;
            state.total_items = total_items
            state.current_car = null

        })
        .addCase(getAll.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        })
        .addCase(getAll.pending, (state) => {
            state.loading = true;
        })
});

const {reducer: orderReducer, actions: {}} = ordersSlice;
const orderActions = {
    getAll,
    deleteOrder
};

export {orderReducer, orderActions};