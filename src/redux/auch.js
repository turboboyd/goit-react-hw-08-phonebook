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
    axios.defaults.headers.common.Authorization = null;
  },
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
      console.log('data: ', data);

      if (response.status === 201) {
        return data;
      }
    } catch (error) {
      console.log('errors: ', error);
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
      console.log('response.data.token): ', response.data.token);
      return response.data;
    } catch (error) {
      if (error.response.status === 400) {
        return rejectWithValue('Wrong login or password');
      }
      return rejectWithValue(error.message);
    }
  }
);

const logOut = createAsyncThunk(
  'auch/logOut',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`/users/logout`, credentials);
      if (!response.statusText) {
        throw new Error('Failed to add User');
      }

      token.unset();
      console.log('token: ', token);
      const data = response.data;
      console.log('response.data: ', response.status);
      console.log('data: ', data);
      if (response.status === 201) {
        const data = response.data;
        return data;
      } else if (response.status === 400) {
        throw new Error('User creation error.');
      } else if (response.status === 500) {
        throw new Error('Server error.');
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
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
    console.log('persistToken: ', persistToken);
    if (persistToken === null || persistToken === '') {
      console.log('stop');
      return state;
    }
    token.set(persistToken);

    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      // return rejectWithValue(error.message);
      return;
    }
  }
);

const initialState = {
  user: { name: null, email: null },
  token: null,
  status: null,
  error: null,
  isLoggedIn: false,
};

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
  state.isLoggedIn = true;
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  extraReducers: {
    [auchSignUp.pending]: state => {
      state.status = 'loading';
      state.error = null;
      state.isLoggedIn = false;
    },
    [auchSignUp.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [auchSignUp.rejected]: setError,

    [auchSignIn.pending]: state => {
      state.status = 'loading';
      state.error = null;
      state.isLoggedIn = false;
    },
    [auchSignIn.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [auchSignIn.rejected]: setError,
    [logOut.fulfilled]: state => {
      state.user = {};
      state.token = '';
      state.status = 'resolved';
      state.error = null;
      state.isLoggedIn = false;
    },
    [logOut.rejected]: setError,
    [fetchCurrentUser.pending]: state => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchCurrentUser.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.user = action.payload.user;
    },
    [fetchCurrentUser.rejected]: setError,
  },
});

const authReducer = authSlice.reducer;


export const selectToken = state => state.auch.token;
export const selectStatus = state => state.auch.status;
export const selectError = state => state.auch.error;
export const selectIsLoggedIn = state => state.auch.isLoggedIn;

const auchPersistConfig = {
  key: 'auch',
  storage,
};

export const persistedAuchReducer = persistReducer(
  auchPersistConfig,
  authReducer
);
