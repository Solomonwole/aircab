"use client";
import { store } from "@/redux/store";
import { Theme } from "@radix-ui/themes";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import PageHeader from "./layout/header";
import AuthHook from "./firebase/authHook";

type Props = {
	children: React.ReactNode;
};
function AppSetup({ children }: Props) {
	return (
		<Provider store={store}>
			<Theme
				className="!font-text"
				radius="large"
				panelBackground="translucent">
				<AuthHook />
				<PageHeader />
				{children}
			</Theme>
		</Provider>
	);
}

export default AppSetup;
