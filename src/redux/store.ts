import { configureStore } from "@reduxjs/toolkit";
import localforage from "localforage";
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";

import authReducer from "./slice/auth";
import bookingReducer from "./slice/booking";

const authPersistConfig = {
	key: "auth",
	storage: localforage,
	version: 1,
};

const persistedAuth = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
	reducer: {
		auth: persistedAuth,
		booking: bookingReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
