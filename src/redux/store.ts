import { configureStore } from "@reduxjs/toolkit";
import localforage from "localforage";
import { persistReducer } from "redux-persist";
import authReducer from "./slice/auth";
import bookingReducer from "./slice/booking";

const authPersistConfig = {
	key: "auth",
	storage: localforage,
};

const persistAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
	reducer: {
		auth: persistAuthReducer,
		booking: bookingReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
