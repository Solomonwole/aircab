"use client";
import {
	signInWithPopup,
	GoogleAuthProvider,
	signInWithRedirect,
	getRedirectResult,
	onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore/lite";
import { Heading } from "@radix-ui/themes";
import { auth, db, provider } from "@/app/firebase/firebase";
import { FcGoogle } from "react-icons/fc";
import { setUser, useAppDispatch } from "@/redux/slice/auth";
import { useRouter } from "next/navigation";
import { isDesktop } from "react-device-detect";
import { useEffect } from "react";

export const btnClass =
	"text-md text-white bg-foreground py-2 px-6 rounded-xl flex items-center justify-center gap-2";
export default function Login() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const handleGoogleSignIn = async () => {
		if (!isDesktop) {
			await signInWithRedirect(auth, provider);
		} else {
			await signInWithPopup(auth, provider)
				.then((result) => {
					// This gives you a Google Access Token. You can use it to access the Google API.
					const credential = GoogleAuthProvider.credentialFromResult(result);
					const token = credential?.accessToken;
					// The signed-in user info.
					const user = result.user;
					console.log(user);
					const userRef = doc(db, "users", user.uid);
					setDoc(
						userRef,
						{
							name: user.displayName,
							email: user.email,
							phone: user.phoneNumber,
							createdAt: new Date(),
							emailVerified: user.emailVerified,
							userId: user.uid,
						}
						// for updating { merge: true }
					);
					const payload = {
						userId: user.uid || "",
						name: user.displayName || "",
						email: user.email || "",
						phone: user.phoneNumber || null,
					};
					dispatch(setUser(payload));
					router.replace("/");
				})
				.catch((error) => {
					// Handle Errors here.
					const errorCode = error.code;
					const errorMessage = error.message;
					// The email of the user's account used.
					const email = error.customData.email;
					// The AuthCredential type that was used.
					const credential = GoogleAuthProvider.credentialFromError(error);
					// ...
				});
		}
	};

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

	return (
		<div className="w-full p-6">
			<div className="border border-accent w-full max-w-lg mx-auto p-6 rounded-lg shadow space-y-4">
				<div>
					<Heading as="h1">Login</Heading>
					<p className="text-sm">Use google secured authentication</p>
				</div>
				<button
					type="button"
					onClick={handleGoogleSignIn}
					className={`${btnClass} `}>
					<FcGoogle />
					<span>
						Continue with <span className="font-medium">Google</span>
					</span>
				</button>
			</div>
		</div>
	);
}
