import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import axios from 'axios';
import storage from 'redux-persist/lib/storage';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';
const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    return (axios.defaults.headers.common.Authorization = '');
  },
};

const clearAuth = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const auchSignUp = createAsyncThunk(
  'auth/auchSignUp',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/users/signup`, credentials);
      if (!response.statusText) {
        throw new Error('Failed to add User');
      }
      token.set(response.data.token);
      const data = response.data;

      if (response.status === 201) {
        return data;
      }
    } catch (error) {
      if (error.response.status === 400) {
        return rejectWithValue('User creation error.');
      } else if (error.response.status === 500) {
        return rejectWithValue('Server error.');
      }
      return rejectWithValue(error.message);
    }
  }
);

export const auchSignIn = createAsyncThunk(
  'auch/auchSignIn',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/users/login`, credentials);
      token.set(response.data.token);
      return response.data;
    } catch (error) {
      if (error.response.status === 400) {
        return rejectWithValue('Wrong login or password');
      }
      return rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  'auch/logOut',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`/users/logout`);

      clearAuth();
      const data = response.data;
      return data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auch/refresh',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const persistToken = state.auch.token;

    if (persistToken === null || persistToken === '') {
      return rejectWithValue('Ooops, You are not registered yet');
    }
    token.set(persistToken);
    try {
      token.set(persistToken);
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: { name: null, email: null },
  token: null,
  error: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: true,
  status: null,
};

const setError = (state, action) => {
  state.error = action.payload;
  state.isLoading = false;
  state.status = 'rejected';
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: {
    [auchSignUp.pending]: state => {
      state.error = null;
      state.isLoading = true;
      state.isLoggedIn = false;
      state.status = 'pending';
    },
    [auchSignUp.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.status = 'fulfilled';
    },
    [auchSignUp.rejected]: setError,

    [auchSignIn.pending]: state => {
      state.error = null;
      state.isLoading = true;
      state.isLoggedIn = false;
      state.status = 'pending';
    },
    [auchSignIn.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.status = 'fulfilled';
    },
    [auchSignIn.rejected]: (state, action) => {
      state.isRefreshing = false;
      state.error = action.payload;
      state.isLoading = false;
      state.status = 'rejected';
    },
    [logOut.fulfilled]: state => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
    },
    [logOut.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.status = 'rejected';
    },
    [fetchCurrentUser.pending]: state => {
      state.error = null;
      state.isLoading = true;
      state.isRefreshing = true;
    },
    [fetchCurrentUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.status = 'fulfilled';
      state.isRefreshing = false;
    },
    [fetchCurrentUser.rejected]: (state, action) => {
      state.isRefreshing = false;
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const authReducer = authSlice.reducer;

export const selectUserName = state => state.auch.user.name;
export const selectToken = state => state.auch.token;
export const selectError = state => state.auch.error;
export const selectIsLoggedIn = state => state.auch.isLoggedIn;
export const selectIsRefreshing = state => state.auch.isRefreshing;
export const selectIsLoading = state => state.auch.isLoading;
export const selectStatus = state => state.auch.status;

const auchPersistConfig = {
  key: 'auch',
  storage,
  whitelist: ['token'],
};

export const persistedAuchReducer = persistReducer(
  auchPersistConfig,
  authReducer
);
