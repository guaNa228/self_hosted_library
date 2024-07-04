import React, { Fragment, useState } from "react";
import styles from "../css/ContentEditableDiv.module.css";
import { useAuthors } from "../contexts/AuthorContext";

interface EditableDivProps {
	placeholder: string;
	value: string;
	onInput: (content: string) => void;
}

const EditableDiv: React.FC<EditableDivProps> = ({
	placeholder,
	value,
	onInput,
}) => {
	const [newValue, setNewValue] = useState(value);
	const { authors } = useAuthors();

	console.log(authors);

	const handleInput = (
		event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setNewValue(event.currentTarget.value ?? "");
		onInput(event.currentTarget.value);
	};

	return (
		<Fragment>
			{placeholder == "Эта книга помогла мне..." ? (
				<textarea
					onInput={handleInput}
					placeholder={placeholder}
					value={newValue}
					className={`${styles.editable}`}
				></textarea>
			) : (
				<input
					onInput={handleInput}
					placeholder={placeholder}
					value={newValue}
					className={`${styles.editable}`}
					list={`${
						placeholder == "Федор Михайлович Достоевский..."
							? "authors"
							: ""
					}`}
				></input>
			)}
			{placeholder == "Федор Михайлович Достоевский..." && (
				<datalist id="authors">
					{authors.map((author) => (
						<option key={author.id} value={author.name}>
							{author.name}
						</option>
					))}
				</datalist>
			)}
		</Fragment>
	);
};

export default EditableDiv;
