"use client";
import React from "react";
import { useAppSelector } from "@/redux/slice/auth";
import BookingForm from "../components/booking/form";

function HomePage() {
	const auth = useAppSelector((state) => state.auth);
	console.log("User:", auth);

	return (
		<div>
			<div className="relative grid md:grid-cols-2 bg-gray-200">
				<div className="h-[50dvh] md:h-[100dvh] w-full bg-gray-200"></div>
				<div className="md:absolute md:right-6 md:top-4">
					<div className="bg-white h-full w-full md:max-w-lg rounded-t-[3em] md:rounded-[3em] p-6 space-y-6">
						<h1 className="text-left font-heading  font-medium text-[2.5em]">
							Book Airport Ride with <span className="font-bold">AirCab</span>
						</h1>
						<BookingForm />
					</div>
				</div>
			</div>
			
		</div>
	);
}

export default HomePage;
