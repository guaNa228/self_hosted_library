import React, { Fragment, useState, useRef, useEffect } from "react";
import Book from "../interfaces/book";
import CoverPreview from "./CoverPreview";
import EditableDiv from "./ContentEditableDiv";
import styles from "../css/UpdateBookForm.module.css";

interface UpdateBookFormProps {
	initialBookData: Book;
	onSubmit: (data: Book) => void;
	setBook: (data: Book | null) => void;
}

const UpdateBookForm: React.FC<UpdateBookFormProps> = ({
	initialBookData,
	onSubmit,
	setBook,
}) => {
	const formRef = useRef<HTMLDivElement | null>(null);

	const handleClickOutside = (event: MouseEvent) => {
		const target = event.target as Node; // Cast the event target to Node

		// Check if the click target is outside the formRef element
		if (formRef.current && !formRef.current.contains(target)) {
			setBook(null); // Or whatever state update you need to close the form or clear the selection
		}
	};

	useEffect(() => {
		// Add when the component mounts
		document.addEventListener("mouseup", handleClickOutside);
		// Remove when the component unmounts
		return () =>
			document.removeEventListener("mouseup", handleClickOutside);
	}, []);

	const [bookData, setBookData] = useState<Book>(initialBookData);

	const handleChange = (content: string, field: keyof Book) => {
		if (field == "author") {
			bookData.author.name = content;
		} else {
			setBookData({ ...bookData, [field]: content });
		}
	};

	const handleRatingChange = (rating: number) => {
		setBookData({ ...bookData, rating });
		console.log(bookData);
	};

	const handleSubmit = () => {
		onSubmit(bookData);
	};

	return (
		<div ref={formRef} className={styles.wrapper}>
			<div className={styles.inputs}>
				<EditableDiv
					placeholder="Бедные люди..."
					value={bookData.name}
					onInput={(content) => handleChange(content, "name")}
				/>
				<EditableDiv
					placeholder="Федор Михайлович Достоевский..."
					value={bookData.author.name}
					onInput={(content) => handleChange(content, "author")}
				/>
				<EditableDiv
					placeholder=""
					value={bookData.imageUrl ?? ""}
					onInput={(content) => handleChange(content, "imageUrl")}
				/>
				<EditableDiv
					placeholder="Эта книга помогла мне..."
					value={bookData.comment ?? ""}
					onInput={(content) => handleChange(content, "comment")}
				/>
				<div className={styles.rating}>
					{Array.from({ length: 10 }, (_, i) => 10 - i).map((num) => (
						<Fragment>
							<input
								name="rating"
								type="radio"
								id={`star${num}`}
								checked={bookData.rating === num}
								onChange={() => handleRatingChange(num)}
							/>
							<label htmlFor={`star${num}`} key={num}></label>
						</Fragment>
					))}
				</div>
				<button onClick={handleSubmit}>Обновить</button>
			</div>
			<CoverPreview url={bookData.imageUrl} maw="200px" />
		</div>
	);
};

export default UpdateBookForm;
