import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";
import { useAuthStore } from "../../store/useAuthStore";

// ----------------------
// Async Thunks for API Calls
// ----------------------

// Get Users
export const getUsers = createAsyncThunk("chat/getUsers", async (_, thunkAPI) => {
    try {
        const res = await axiosInstance.get("/messages/users");
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

// Get Messages
export const getMessages = createAsyncThunk("chat/getMessages", async (userId, thunkAPI) => {
    try {
        const res = await axiosInstance.get(`/messages/${userId}`);
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

// Send Message
export const sendMessage = createAsyncThunk("chat/sendMessage", async (messageData, thunkAPI) => {
    const { selectedUser, messages } = thunkAPI.getState().chat;
    try {
        const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

// ----------------------
// WebSocket Handlers
// ----------------------

let socket = null;

export const subscribeToMessages = () => (dispatch, getState) => {
    const { selectedUser } = getState().chat;
    if (!selectedUser) return;

    socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
        const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
        if (!isMessageSentFromSelectedUser) return;

        dispatch(addMessage(newMessage));
    });
};

export const unsubscribeFromMessages = () => {
    if (socket) {
        socket.off("newMessage");
    }
};

// ----------------------
// Chat Slice Definition
// ----------------------

const initialState = {
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        // Get Users
        builder
            .addCase(getUsers.pending, (state) => {
                state.isUsersLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.isUsersLoading = false;
            })
            .addCase(getUsers.rejected, (state) => {
                state.isUsersLoading = false;
            });

        // Get Messages
        builder
            .addCase(getMessages.pending, (state) => {
                state.isMessagesLoading = true;
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.messages = action.payload;
                state.isMessagesLoading = false;
            })
            .addCase(getMessages.rejected, (state) => {
                state.isMessagesLoading = false;
            });

        // Send Message
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.messages.push(action.payload);
        });
    },
});

export const { setSelectedUser, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
