"use client";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore/lite";
import { setUser, useAppDispatch } from "@/redux/slice/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "@/app/firebase/firebase";

function Layout({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	useEffect(() => {
		// Step 1: Check if redirect result exists (only once)
		getRedirectResult(auth)
			.then(async (result) => {
				if (result) {
					const user = result.user;
					console.log("From redirect result:", user);
					await createOrUpdateUser(user);
				}
			})
			.catch((error) => {
				console.error("Redirect error", error);
			});

		// Step 2: Always listen for auth state
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				console.log("From auth state:", user);
				await createOrUpdateUser(user);
			}
		});

		return () => unsubscribe();
	}, [dispatch]);
	const createOrUpdateUser = async (user: any) => {
		const userRef = doc(db, "users", user.uid);
		await setDoc(
			userRef,
			{
				name: user.displayName,
				email: user.email,
				phone: user.phoneNumber,
				createdAt: new Date(),
				emailVerified: user.emailVerified,
				userId: user.uid,
			},
			{ merge: true }
		);

		dispatch(
			setUser({
				userId: user.uid,
				name: user.displayName || "",
				email: user.email || "",
				phone: user.phoneNumber || null,
			})
		);

		router.replace("/");
	};
	return <div>{children}</div>;
}
export default Layout;
