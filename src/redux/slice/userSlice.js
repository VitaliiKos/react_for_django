import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {authService} from "../../services";

let initialState = {
    errors: null,
    loading: null,
    user_profile: null,
    statusIsAuthenticated: false,
    avatar_img: null,


};

const activateUser = createAsyncThunk(
    'userSlice/activateUser',
    async ({token}, thunkAPI) => {
        try {
            const {data} = await authService.activateUser(token);
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);
const addAvatar = createAsyncThunk(
    'userSlice/addAvatar',
    async ({formData}, thunkAPI) => {
        try {
            const {data} = await authService.avatar(formData);
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);


const userUpdate = createAsyncThunk(
    'userSlice/userUpdate',
    async ({user}, thunkAPI) => {
        try {
            const {data} = await authService.updateProfile(user);
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);



const myProfile = createAsyncThunk(
    'userSlice/myProfile',
    async (_, thunkAPI) => {
        try {
            const {data} = await authService.me();
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        logOut: (state) => {
            authService.deleteTokens()
            state.statusIsAuthenticated = false
        },
        setStatusIsAuthenticated: (state,action) => {
            state.statusIsAuthenticated = action.payload
        },

    },
    extraReducers: builder => builder
        .addCase(myProfile.fulfilled, (state, action) => {
            state.avatar_img = action.payload.profile.avatar
            state.user_profile = action.payload;

        })
        .addCase(myProfile.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        })
        .addCase(myProfile.pending, (state) => {
            state.loading = true;
        })

});

const {reducer: userReducer, actions: {logOut, setStatusIsAuthenticated}} = userSlice;
const userActions = {
    logOut,
    activateUser,
    myProfile,
    addAvatar,
    userUpdate,
    setStatusIsAuthenticated
};

export {userReducer, userActions};