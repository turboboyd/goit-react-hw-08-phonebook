import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import axios from 'axios';
import storage from 'redux-persist/lib/storage';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    try {
      const response = await axios.get(`/contacts`);
      if (!response.statusText) {
        throw new Error(`Can't delete contact. Server errror.`);
      }
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      if (!response.statusText) {
        throw new Error(`Can't delete contact. Server errror.`);
      }
      dispatch(deleteContacts(id));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const pushContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`/contacts`, newContact);

      if (!response.statusText) {
        throw new Error('Failed to add contact');
      }

      const data = response.data;
      dispatch(addContacts(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  contacts: [],
  status: null,
  error: null,
};

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

export const contactsSlice = createSlice({
  name: 'contactsSlice',
  initialState,
  reducers: {
    addContacts(state, action) {
      state.contacts.push(action.payload);
    },
    deleteContacts(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
  },

  extraReducers: {
    [fetchContacts.pending]: state => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.contacts = action.payload;
    },
    [fetchContacts.rejected]: setError,
    [deleteContact.rejected]: setError,
    [pushContact.rejected]: setError,
  },
});

export const contactsReducer = contactsSlice.reducer;

export const { setContacts, addContacts, deleteContacts } =
  contactsSlice.actions;

export const selectContacts = state => state.contacts.contacts;
// export const selectStatus = state => state.contacts.status;
export const selectError = state => state.contacts.error;

const persistConfig = {
  key: 'contacts',
  storage,
  blacklist: ['status'],
};

export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsReducer
);
