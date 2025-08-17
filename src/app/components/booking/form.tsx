"use client";
import { ontarioAirports } from "@/app/data/airports";
import { inputClass } from "@/app/utils/utils";
import { useAppDispatch, useAppSelector } from "@/redux/slice/auth";
import {
	setDate,
	setFromLocation,
	setTime,
	setToLocation,
	setTripType,
} from "@/redux/slice/booking";
import React, { useState } from "react";

function BookingForm() {
	const dispatch = useAppDispatch();
	const { tripType, fromLocation, toLocation, date, time } = useAppSelector(
		(s) => s.booking
	);
	console.log(tripType);

	const handleForm = (e: React.FormEvent) => {
		e.preventDefault();
	};
	return (
		<form onSubmit={handleForm} className="space-y-4">
			<section className="grid grid-cols-2 bg-gray-100 border border-gray-100 rounded-xl">
				<input
					type="radio"
					name="tripType"
					id="pickup"
					value="pickup"
					checked={tripType === "pickup"}
					onChange={() => dispatch(setTripType("pickup"))}
					className="sr-only"
				/>
				<label
					htmlFor="pickup"
					className={`${
						tripType === "pickup" ? "border border-gray-300 shadow" : ""
					} text-gray-600 text-center py-3 rounded-xl`}>
					Pick up
				</label>

				<input
					type="radio"
					name="tripType"
					id="dropoff"
					value="dropoff"
					checked={tripType === "dropoff"}
					onChange={() => dispatch(setTripType("dropoff"))}
					className="sr-only"
				/>
				<label
					htmlFor="dropoff"
					className={`${
						tripType === "dropoff" ? "border border-gray-300 shadow" : ""
					} text-gray-600 text-center py-3 rounded-xl`}>
					Drop Off
				</label>
			</section>
			<fieldset className="bg-gray-100 rounded-xl p-4">
				<div>
					<label htmlFor="fromLocation" className="text-sm text-gray-500">From</label>
					<select
						name="fromLocation"
						id="fromLocation"
						value={fromLocation}
						onChange={(e) => dispatch(setFromLocation(e.target.value))}
						className={`${inputClass}`}
						required>
						<option value="" disabled selected hidden>
							Select Airport
						</option>
						{ontarioAirports.map((airport, index) => {
							return (
								<option key={index} value={airport.name}>
									{airport.name}
								</option>
							);
						})}
					</select>
				</div>
			</fieldset>
			{tripType && (
				<div className="bg-aircab-surface border border-accent rounded-xl p-4 space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Ontario Airports */}
						<div>
							<label className="block text-sm mb-1">Airport (Ontario)</label>
							<select
								value={fromLocation}
								onChange={(e) => dispatch(setFromLocation(e.target.value))}
								className="w-full rounded-md border px-3 py-2 outline-none"
								required>
								<option value="">Select airport</option>
								<option value="YYZ">Toronto Pearson (YYZ)</option>
								<option value="YTZ">Billy Bishop (YTZ)</option>
								<option value="YHM">Hamilton (YHM)</option>
								<option value="YKF">Region of Waterloo (YKF)</option>
								<option value="YQG">Windsor (YQG)</option>
								<option value="YOW">Ottawa (YOW)</option>
							</select>
						</div>

						<div>
							<label className="block text-sm mb-1">Date</label>
							<input
								type="date"
								value={date}
								onChange={(e) => dispatch(setDate(e.target.value))}
								className="w-full rounded-md border px-3 py-2 outline-none"
								required
							/>
						</div>

						<div>
							<label className="block text-sm mb-1">Time</label>
							<input
								type="time"
								value={time}
								onChange={(e) => dispatch(setTime(e.target.value))}
								className="w-full rounded-md border px-3 py-2 outline-none"
								required
							/>
						</div>

						{/* From/To switch based on tripType */}
						{tripType === "pickup" ? (
							<>
								<div>
									<label className="block text-sm mb-1">Pickup (Airport)</label>
									<input
										disabled
										value={fromLocation ? `${fromLocation} Airport` : ""}
										placeholder="Select airport above"
										className="w-full rounded-md border px-3 py-2 bg-gray-50"
									/>
								</div>
								<div>
									<label className="block text-sm mb-1">Drop-off address</label>
									<input
										value={toLocation}
										onChange={(e) => dispatch(setToLocation(e.target.value))}
										placeholder="Street, City, ON"
										className="w-full rounded-md border px-3 py-2 outline-none"
										required
									/>
								</div>
							</>
						) : (
							<>
								<div>
									<label className="block text-sm mb-1">Pickup address</label>
									<input
										value={fromLocation}
										onChange={(e) => dispatch(setFromLocation(e.target.value))}
										placeholder="Street, City, ON"
										className="w-full rounded-md border px-3 py-2 outline-none"
										required
									/>
								</div>
								<div>
									<label className="block text-sm mb-1">
										Drop-off (Airport)
									</label>
									<input
										disabled
										value={toLocation ? `${toLocation} Airport` : ""}
										placeholder="Select airport above"
										className="w-full rounded-md border px-3 py-2 bg-gray-50"
									/>
								</div>
							</>
						)}
					</div>

					<button className="mt-2 w-full md:w-auto bg-aircab-button text-white px-6 py-3 rounded-md">
						Continue
					</button>
				</div>
			)}
		</form>
	);
}

export default BookingForm;
