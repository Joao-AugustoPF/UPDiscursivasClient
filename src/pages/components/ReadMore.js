import { useState } from "react";

// eslint-disable-next-line react/prop-types

//Sets the read more from the Tests and Questions page
export default function ReadMore({ children }) {
	const text = `${children}`;
	const [isReadMore, setIsReadMore] = useState(true);
	if (children === null) {
		return;
	}

	if (text.length < 100) {
		return text;
	}

	const toggleReadMore = () => {
		setIsReadMore(!isReadMore);
	};
	return (
		<p className="text">
			{isReadMore ? text.slice(0, 100) : text}
			<span
				onClick={toggleReadMore}
				style={{ color: "red", cursor: "pointer" }}
			>
				{isReadMore ? "...Ler mais" : "...Mostrar menos"}
			</span>
		</p>
	);
}
