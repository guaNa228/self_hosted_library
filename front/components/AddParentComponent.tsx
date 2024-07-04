// ParentComponent.tsx
import React, { useState } from "react";
import AddBookButton from "./AddBookButton";
import AddFormWrapper from "./AddFormWrapper";

const ParentComponent: React.FC = () => {
	const [showForm, setShowForm] = useState(false);

	const handleAddBookClick = () => {
		setShowForm(!showForm);
		console.log(showForm);
	};

	return (
		<div>
			<AddBookButton onClick={handleAddBookClick} />
			{showForm && <AddFormWrapper />}
		</div>
	);
};

export default ParentComponent;
