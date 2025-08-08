"use client";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore/lite";
import { Heading } from "@radix-ui/themes";
import { auth, db, provider } from "@/app/firebase/firebase";
import { FcGoogle } from "react-icons/fc";
import { btnClass } from "../login/login";
import { setUser, useAppDispatch } from "@/redux/slice/auth";
import { useRouter } from "next/navigation";

export default function Signup() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const handleGoogleSignIn = async () => {
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
	};
	// console.log("uu", user);

	return (
		<div className="w-full p-6">
			<div className="border border-accent w-full max-w-lg mx-auto p-6 rounded-lg shadow space-y-4">
				<div>
					<Heading as="h1">Sign up</Heading>
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
