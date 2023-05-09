import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {autoParkServices} from "../../services";

let initialState = {
    statusIsAuthenticated: false,
    autoParks: [],
    errors: null,
    loading: null,
    autoParkForUpdate: null,
    prevPage: null,
    nextPage: null,
    total_pages: null,
    total_items: null,
    current_auto_park: null,
    userCars: [],
    selectedPark: null

};

const getAll = createAsyncThunk(
    'autoParkSlice/getAll',
    // async ({page}, thunkAPI) => {
    async (_, thunkAPI) => {
        try {
            const {data} = await autoParkServices.getAll();
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

const getAllByUser = createAsyncThunk(
    'autoParkSlice/getAllByUser',
    async (_, thunkAPI) => {
        try {
            const {data} = await autoParkServices.getByUser();
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

const getById = createAsyncThunk(
    'autoParkSlice/getById',
    async ({id}, thunkAPI) => {
        try {
            const {data} = await autoParkServices.getById(id)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

const deleteAutoPark = createAsyncThunk(
    'autoParkSlice/deleteAutoPark',
    async ({id}, thunkAPI) => {
        console.log(id)
        try {
            await autoParkServices.deleteById(id);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

const createNew = createAsyncThunk(
    'autoParkSlice/createNew',
    async ({park, selectedPark}, thunkAPI) => {
        try {
            await autoParkServices.addNew(park);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

const updatePark = createAsyncThunk(
    'autoParkSlice/updatePark',
    async ({parkId, park}, thunkAPI) => {
        console.log(parkId, park)
        try {
            await autoParkServices.putById(parkId, park);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

const autoParkSlice = createSlice({
    name: 'autoParkSlice',
    initialState,
    reducers: {
        setParkForUpdate: (state, action) => {
            console.log(action.payload)
            state.autoParkForUpdate = action.payload;
        },
        setStatusIsAuthenticated: (state, action) => {
            state.statusIsAuthenticated = action.payload
        },
        setUserCars: (state, action) => {
            state.userCars = action.payload
        },
        setSelectedAutoParks: (state, action) => {
            console.log(action.payload)
            state.selectedPark = action.payload
        },
    },
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.loading = false;
            const {next, prev, data, total_pages, total_items} = action.payload;

            state.autoParks = data;
            state.prevPage = prev
            state.nextPage = next
            state.total_pages = total_pages;
            state.total_items = total_items
            state.current_auto_park = null

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
            state.current_auto_park = action.payload
        })
        .addCase(getById.rejected, (state, action) => {
            state.loading = false
            state.errors = action.payload
        })
        .addCase(getById.pending, (state) => {
            state.loading = true
        })
        .addCase(getAllByUser.fulfilled, (state, action) => {

            const {next, prev, data, total_pages, total_items} = action.payload;
            state.autoParks = data;
            state.prevPage = prev
            state.nextPage = next
            state.total_pages = total_pages;
            state.total_items = total_items
            state.loading = false;

        })
        .addCase(getAllByUser.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        })
        .addCase(getAllByUser.pending, (state) => {
            state.loading = true;
        })
});

const {
    reducer: autoParkReducer, actions: {
        setParkForUpdate,
        setStatusIsAuthenticated,
        setUserCars,
        setSelectedAutoParks,
    }
} = autoParkSlice;
const autoParkActions = {
    getAll,
    getAllByUser,
    deleteAutoPark,
    createNew,
    updatePark,
    setParkForUpdate,
    getById,
    setStatusIsAuthenticated,
    setUserCars,
    setSelectedAutoParks,
};

export {autoParkReducer, autoParkActions};