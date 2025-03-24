import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
    import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

// ----------------------
// Thunks for Async Logic
// ----------------------

// Check Auth
export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, thunkAPI) => {
    try {
        const res = await axiosInstance.get("/auth/check");
        thunkAPI.dispatch(connectSocket(res.data));
        return res.data;
    } catch (error) {
        console.log("Error in checkAuth:", error);
        return thunkAPI.rejectWithValue(null);
    }
});

// Signup
export const signup = createAsyncThunk("auth/signup", async (data, thunkAPI) => {
    try {
        const res = await axiosInstance.post("/auth/signup", data);
        toast.success("Account created successfully");
        thunkAPI.dispatch(connectSocket(res.data));
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(null);
    }
});

// Login
export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
    try {
        const res = await axiosInstance.post("/auth/login", data);
        toast.success("Logged in successfully");
        thunkAPI.dispatch(connectSocket(res.data));
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(null);
    }
});

// Logout
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        await axiosInstance.post("/auth/logout");
        toast.success("Logged out successfully");
        thunkAPI.dispatch(disconnectSocket());
        return null;
    } catch (error) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(null);
    }
});

// Update Profile
export const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    async (data, thunkAPI) => {
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            toast.success("Profile updated successfully");
            return res.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkAPI.rejectWithValue(null);
        }
    }
);

// ----------------------
// Socket Connection Logic
// ----------------------

let socket = null;

export const connectSocket = (authUser) => (dispatch, getState) => {
    if (!authUser || socket?.connected) return;

    socket = io(BASE_URL, {
        query: { userId: authUser._id },
    });

    socket.connect();

    socket.on("getOnlineUsers", (userIds) => {
        dispatch(setOnlineUsers(userIds));
    });

    dispatch(setSocket(socket));
};

export const disconnectSocket = () => (dispatch, getState) => {
    if (socket?.connected) {
        socket.disconnect();
        dispatch(setSocket(null));
    }
};

// ----------------------
// Auth Slice Definition
// ----------------------

const initialState = {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSocket: (state, action) => {
            state.socket = action.payload;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Check Auth
        builder
            .addCase(checkAuth.pending, (state) => {
                state.isCheckingAuth = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.authUser = action.payload;
                state.isCheckingAuth = false;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.authUser = null;
                state.isCheckingAuth = false;
            });

        // Signup
        builder
            .addCase(signup.pending, (state) => {
                state.isSigningUp = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.authUser = action.payload;
                state.isSigningUp = false;
            })
            .addCase(signup.rejected, (state) => {
                state.isSigningUp = false;
            });

        // Login
        builder
            .addCase(login.pending, (state) => {
                state.isLoggingIn = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.authUser = action.payload;
                state.isLoggingIn = false;
            })
            .addCase(login.rejected, (state) => {
                state.isLoggingIn = false;
            });

        // Logout
        builder
            .addCase(logout.fulfilled, (state) => {
                state.authUser = null;
            });

        // Update Profile
        builder
            .addCase(updateProfile.pending, (state) => {
                state.isUpdatingProfile = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.authUser = action.payload;
                state.isUpdatingProfile = false;
            })
            .addCase(updateProfile.rejected, (state) => {
                state.isUpdatingProfile = false;
            });
    },
});

export const { setSocket, setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;
