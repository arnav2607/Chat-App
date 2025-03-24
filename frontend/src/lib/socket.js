import { io } from "socket.io-client";

const BASE_URL =
    import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

let socket = null;

export const connectSocket = (authUser) => {
    if (!authUser || socket?.connected) return socket;

    socket = io(BASE_URL, {
        query: { userId: authUser._id },
    });

    socket.connect();

    return socket;
};

export const disconnectSocket = () => {
    if (socket?.connected) {
        socket.disconnect();
        socket = null;
    }
};

export const getSocket = () => socket;
