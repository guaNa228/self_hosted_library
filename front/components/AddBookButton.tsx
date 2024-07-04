import styles from "../css/AddBook.module.css";
import addButton from "../assets/plus.svg";
import removeButton from "../assets/minus.svg";
import React, { useState } from "react";

type Props = {
	onClick: () => void;
};

const AddBookButton: React.FC<Props> = ({ onClick }) => {
	const [icon, setIcon] = useState(addButton);

	const handleAddButtonClick = () => {
		if (icon == addButton) {
			setIcon(removeButton);
		} else {
			setIcon(addButton);
		}
		onClick();
	};

	return (
		<button className={styles.addBookButton} onClick={handleAddButtonClick}>
			<img src={icon} />
		</button>
	);
};

export default AddBookButton;
