"use client";
import { persistor, store } from "@/redux/store";
import { Theme } from "@radix-ui/themes";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import PageHeader from "./layout/header";
import AuthHook from "./firebase/authHook";
import { PersistGate } from "redux-persist/integration/react";

type Props = {
	children: React.ReactNode;
};
function AppSetup({ children }: Props) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Theme
					className="!font-text"
					radius="large"
					panelBackground="translucent">
					<AuthHook />
					<PageHeader />
					{children}
				</Theme>
			</PersistGate>
		</Provider>
	);
}

export default AppSetup;
