import React from "react";

type Props = {
	children: React.ReactNode;
};

function Container({ children }: Props) {
	return (
		<div className="w-full lg:max-w-screen-xl container mx-auto px-4">
			{children}
		</div>
	);
}

export default Container;
