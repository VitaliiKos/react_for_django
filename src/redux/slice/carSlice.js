import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {carsServices} from "../../services";

let initialState = {
    statusIsAuthenticated: false,
    cars: [],
    errors: null,
    loading: null,
    carForUpdate: null,
    prevPage: null,
    nextPage: null,
    total_pages: null,
    total_items: null,
    current_car: null,
    user_profile: null

};

const getAll = createAsyncThunk(
    'carSlice/getAll',
    async ({page}, thunkAPI) => {
        try {
            const {data} = await carsServices.getAll(page);
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);
const getAllByPark = createAsyncThunk(
    'carSlice/getAllByPark',
    async ({id}, thunkAPI) => {
        try {
            const {data} = await carsServices.getByParkId(id);
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

const getById = createAsyncThunk(
    'carSlice/getById',
    async ({id}, thunkAPI) => {
        try {
            const {data} = await carsServices.getById(id)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

const deleteCar = createAsyncThunk(
    'carSlice/deleteCar',
    async ({id}, thunkAPI) => {
        try {
            await carsServices.deleteById(id);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

const createNew = createAsyncThunk(
    'carSlice/createNew',
    async ({car, selectedPark}, thunkAPI) => {
        try {
            await carsServices.addNew(car, selectedPark);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

const updateCar = createAsyncThunk(
    'carSlice/updateCar',
    async ({carId, car}, thunkAPI) => {
        try {
            await carsServices.putById(carId, car);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);
const addPhoto = createAsyncThunk(
    'carSlice/addPhoto',
    async ({id, formData}, thunkAPI) => {
        try {
            await carsServices.photo(id, formData);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);
const deletePhoto = createAsyncThunk(
    'carSlice/deletePhoto',
    async ({id}, thunkAPI) => {
        try {
            await carsServices.deletePhotoById(id);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

const carSlice = createSlice({
    name: 'carSlice',
    initialState,
    reducers: {
        setCarForUpdate: (state, action) => {
            state.carForUpdate = action.payload;
        },
        setStatusIsAuthenticated: (state, action) => {
            state.statusIsAuthenticated = action.payload
        },
    },
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.loading = false;
            const {next, prev, data, total_pages, total_items} = action.payload;

            state.prevPage = prev
            state.nextPage = next
            state.cars = data;
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
        .addCase(getById.fulfilled, (state, action) => {
            state.loading = false
            state.current_car = action.payload
        })
        .addCase(getById.rejected, (state, action) => {
            state.loading = false
            state.errors = action.payload
        })
        .addCase(getById.pending, (state) => {
            state.loading = true
        })
        .addCase(getAllByPark.fulfilled, (state, action) => {
            state.loading = false;
            state.cars = action.payload;

        })
        .addCase(getAllByPark.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        })
        .addCase(getAllByPark.pending, (state) => {
            state.loading = true;
        })

});

const {
    reducer: carReducer, actions: {
        setCarForUpdate,
        setStatusIsAuthenticated,
    }
} = carSlice;
const carActions = {
    getAll,
    deleteCar,
    createNew,
    updateCar,
    getAllByPark,
    addPhoto,
    deletePhoto,
    setCarForUpdate,
    getById,
    setStatusIsAuthenticated,
};

export {carReducer, carActions};