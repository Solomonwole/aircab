import React, { useEffect } from "react";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { setUser, useAppDispatch } from "@/redux/slice/auth";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore/lite";
import { auth, db } from "./firebase";

function AuthHook() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	useEffect(() => {
		const handleRedirect = async () => {
			try {
				const result = await getRedirectResult(auth);
				if (result?.user) {
					console.log("Redirect result user:", result.user);
					await createOrUpdateUser(result.user);
				}
			} catch (error) {
				console.error("getRedirectResult error:", error);
			}
		};

		const unsub = onAuthStateChanged(auth, async (user) => {
			if (user) {
				console.log("Auth state user:", user);
				await createOrUpdateUser(user);
			}
		});

		handleRedirect();

		return () => unsub();
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
	return null;
}

export default AuthHook;
