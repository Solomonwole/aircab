import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookingState = {
	tripType: "pickup" | "dropoff";
	fromLocation: string;
	toLocation: string;
	date: string;
	time: string;
};

const initialState: BookingState = {
	tripType: "pickup",
	fromLocation: "",
	toLocation: "",
	date: "",
	time: "",
};
const bookingSlice = createSlice({
	name: "booking",
	initialState,
	reducers: {
		setTripType: (state, action: PayloadAction<BookingState["tripType"]>) => {
			state.tripType = action.payload;
		},
		setFromLocation: (state, action: PayloadAction<string>) => {
			state.fromLocation = action.payload;
		},
		setToLocation: (state, action: PayloadAction<string>) => {
			state.toLocation = action.payload;
		},
		setDate: (state, action: PayloadAction<string>) => {
			state.date = action.payload;
		},
		setTime: (state, action: PayloadAction<string>) => {
			state.time = action.payload;
		},
	},
});

export const { setTripType, setFromLocation, setToLocation, setDate, setTime } =
	bookingSlice.actions;

export default bookingSlice.reducer;
