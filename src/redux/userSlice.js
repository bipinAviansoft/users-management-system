import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  users: [],
  loading: false,
  error: null,
  totalPages: 1,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page }, { rejectWithValue, getState }) => {
    try {
      const authData = getState().auth.user;

      const response = await axios.get(
        `https://interview.optimavaluepro.com/api/v1/users?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${authData}`,
          },
        }
      );

      console.log("ho ja bhai: ", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, { rejectWithValue, getState }) => {
    try {
      console.log("create user data: ", userData);

      const authData = getState().auth.user;
      const response = await axios.post(
        "https://interview.optimavaluepro.com/api/v1/users",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData}`,
          },
        }
      );
      console.log("create res: ", response);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userData, { rejectWithValue, getState }) => {
    try {
      console.log("userData: udpate: ", userData);

      const authData = getState().auth.user;
      const response = await axios.put(
        `https://interview.optimavaluepro.com/api/v1/users/${userData.id}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData}`,
          },
        }
      );
      console.log("response data: ", response);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const authData = getState().auth.user;
      console.log("userId: ", userId);

      await axios.delete(
        `https://interview.optimavaluepro.com/api/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authData}`,
          },
        }
      );

      return userId;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        console.log("dissssss: ", action.payload.data);

        state.users = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload);
        state.error = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload);
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload);
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload);
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
