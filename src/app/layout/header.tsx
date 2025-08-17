import Link from "next/link";
import React from "react";
import Container from "./container";
import { useAppSelector } from "@/redux/slice/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

function PageHeader() {
	const authUser = useAppSelector((state) => state.auth);
	return (
		<header className="w-full h-[10dvh] bg-foreground grid place-items-center">
			<Container>
				<div className="grid grid-cols-2 place-items-center">
					<div className="text-left w-full">
						<Link
							href="/"
							className="text-input font-heading font-bold text-xl">
							AirCab
						</Link>
					</div>
					<nav className="flex justify-end items-end w-full">
						{!authUser.email ? (
							<ul className="w-full flex items-center justify-end gap-5 lg:gap-12">
								<li className="hidden lg:inline-block">
									<span className="text-input">EN</span>
								</li>
								<li>
									<Link href="/login" className="text-input">
										Log in
									</Link>
								</li>
								<li>
									<Link
										href="sign-up"
										className="bg-background py-2 px-4 rounded-xl text-nowrap">
										Sign up
									</Link>
								</li>
							</ul>
						) : (
							<ul className="w-full flex items-center justify-end gap-5 lg:gap-12">
								<li className="hidden lg:inline-block">
									<span className="text-input">EN</span>
								</li>
								<li>
									<Link href="/" className="text-input">
										Home
									</Link>
								</li>
								<li>
									<Link href="/bookings" className="text-input">
										Bookings
									</Link>
								</li>
								<li className="hiddenn lg:inline-block">
									<button
										onClick={() => {
											signOut(auth);
										}}
										className="bg-background py-2 px-4 rounded-xl text-nowrap">
										Sign out
									</button>
								</li>
							</ul>
						)}
					</nav>
				</div>
			</Container>
		</header>
	);
}

export default PageHeader;
