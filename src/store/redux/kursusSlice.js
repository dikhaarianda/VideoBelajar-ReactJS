import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getKursus, addKursus, updateKursus, deleteKursus } from '../../services/api/kursusApi';

// Initial state
const initialState = {
  kursus: [],
  loading: false,
  error: null,
};

// Async thunks

export const fetchKursus = createAsyncThunk(
  'kursus/fetchKursus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getKursus();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch kursus');
    }
  }
);

export const createKursus = createAsyncThunk(
  'kursus/createKursus',
  async (kursusData, { rejectWithValue }) => {
    try {
      const response = await addKursus(kursusData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add kursus');
    }
  }
);

export const editKursus = createAsyncThunk(
  'kursus/editKursus',
  async ({ id, kursusData }, { rejectWithValue }) => {
    try {
      const response = await updateKursus(id, kursusData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update kursus');
    }
  }
);

export const removeKursus = createAsyncThunk(
  'kursus/removeKursus',
  async (id, { rejectWithValue }) => {
    try {
      await deleteKursus(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete kursus');
    }
  }
);

// Slice
const kursusSlice = createSlice({
  name: 'kursus',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKursus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKursus.fulfilled, (state, action) => {
        state.loading = false;
        state.kursus = action.payload;
      })
      .addCase(fetchKursus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createKursus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createKursus.fulfilled, (state, action) => {
        state.loading = false;
        state.kursus.push(action.payload);
      })
      .addCase(createKursus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editKursus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editKursus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.kursus.findIndex(kursus => kursus.id === action.payload.id);
        if (index !== -1) {
          state.kursus[index] = action.payload;
        }
      })
      .addCase(editKursus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeKursus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeKursus.fulfilled, (state, action) => {
        state.loading = false;
        state.kursus = state.kursus.filter(kursus => kursus.id !== action.payload);
      })
      .addCase(removeKursus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Export actions
export const { clearError, setLoading } = kursusSlice.actions;

// Export selectors
export const selectKursus = (state) => state.kursus.kursus;
export const selectKursusLoading = (state) => state.kursus.loading;
export const selectKursusError = (state) => state.kursus.error;

// Export reducer
export default kursusSlice.reducer;
