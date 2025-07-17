import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers, addUser, updateUser, deleteUser } from '../../services/api/userApi';
import bcrypt from 'bcryptjs';

// Initial State - Array kosong yang akan diisi dengan data API
const initialState = {
  users: [], // Data users dari API
  currentUser: null, // User yang sedang login
  loading: false,
  error: null,
  isInitializing: true
};

// Async Thunks untuk API calls

// Get all users
export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUsers();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch users');
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await getUsers();
      const users = response.data;
      const foundUser = users.find((u) => u.email === email);
      
      if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
        const userData = {
          email: foundUser.email,
          role: foundUser.role || 'user',
          id: foundUser.id,
          name: foundUser.name,
          telp: foundUser.telp || '',
        };
        
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
      } else {
        return rejectWithValue('Email atau password salah');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

// Register user
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Cek apakah email sudah terdaftar
      const existingUsers = await getUsers();
      const emailExists = existingUsers.data.find(user => user.email === userData.email);
      
      if (emailExists) {
        return rejectWithValue('Email sudah terdaftar');
      }

      // Transform userData for API
      const { fullName, phone, confirmPassword, password, ...rest } = userData;
      const hashedPassword = bcrypt.hashSync(password, 5);
      const apiData = {
        name: fullName,
        telp: phone,
        password: hashedPassword,
        role: 'user',
        ...rest
      };
      
      const response = await addUser(apiData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Registration failed');
    }
  }
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await updateUser(userId, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Update failed');
    }
  }
);

// Delete user
export const deleteUserAccount = createAsyncThunk(
  'user/deleteUserAccount',
  async (userId, { rejectWithValue }) => {
    try {
      await deleteUser(userId);
      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Delete failed');
    }
  }
);

// User Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Logout user
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem('user');
    },
    
    // Set user from localStorage
    setUserFromStorage: (state, action) => {
      state.currentUser = action.payload;
      state.isInitializing = false;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Set loading
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isInitializing = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        // Update user in users array
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        // Update current user if it's the same user
        if (state.currentUser && state.currentUser.id === action.payload.id) {
          state.currentUser = {
            ...state.currentUser,
            name: action.payload.name,
            email: action.payload.email,
            telp: action.payload.telp || ''
          };
          localStorage.setItem('user', JSON.stringify(state.currentUser));
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete User
      .addCase(deleteUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAccount.fulfilled, (state, action) => {
        state.loading = false;
        // Remove user from users array
        state.users = state.users.filter(user => user.id !== action.payload);
        // If deleted user is current user, logout
        if (state.currentUser && state.currentUser.id === action.payload) {
          state.currentUser = null;
          localStorage.removeItem('user');
        }
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Export actions
export const { logoutUser, setUserFromStorage, clearError, setLoading } = userSlice.actions;

// Export selectors
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectUsers = (state) => state.user.users;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;
export const selectIsInitializing = (state) => state.user.isInitializing;
export const selectIsAdmin = (state) => state.user.currentUser?.role === 'admin';

// Export reducer
export default userSlice.reducer;
