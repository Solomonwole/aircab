import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface UserObject {
	userId: string;
	name: string;
	email: string;
	phone: string | null;
	city?: string;
}

const initialState: UserObject = {
	userId: "",
	name: "",
	email: "",
	phone: null,
	city: "Ontario, CA",
};

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser(_, action: PayloadAction<UserObject>) {
			return action.payload;
		},
		clearUser: () => initialState,
		setCity(state, action: PayloadAction<string>) {
			state.city = action.payload;
		},
	},
});

export const { setUser, clearUser, setCity } = authSlice.actions;
export default authSlice.reducer;
