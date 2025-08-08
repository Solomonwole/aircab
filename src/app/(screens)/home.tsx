"use client";
import React from "react";
import { useAppSelector } from "@/redux/slice/auth";
import Image from "next/image";
import Container from "../layout/container";

function HomePage() {
	const auth = useAppSelector((state) => state.auth);
	console.log("User:", auth);

	return (
		<div>
			<Container>
				<div className=" w-full h-[70dvh] grid grid-cols-2 place-items-center">
					<div className="w-full">
						<h1 className="text-left font-heading text-black font-bold text-3xl">
							Safe Trip With AIRcab
						</h1>
						<p>Book instant rides with AIRcab</p>
					</div>
					<div>
						<Image
							src="/hero.jpeg"
							alt="Aircab"
							width={1056}
							height={1024}
							quality={100}
							loading="lazy"
							className="rounded-xl"
						/>
					</div>
				</div>
			</Container>
			<p>{auth.name}</p>
		</div>
	);
}

export default HomePage;
