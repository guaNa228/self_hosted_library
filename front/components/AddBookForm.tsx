import styles from "../css/AddBookForm.module.css";
import ConfirmButton from "./ConfirmButton";
import CoverPreview from "./CoverPreview";
import { useBooks } from "../contexts/BookContext";
import { useState } from "react";
import Book from "../interfaces/book";
import { useAuthors } from "../contexts/AuthorContext";

type BookCollectedData = {
	id: string;
	imageUrl: string;
	name: string;
	author: string;
	numberOfPages: number;
};

export default function AddBookForm(props: Partial<BookCollectedData> = {}) {
	const { setBooks } = useBooks();
	const { authors } = useAuthors();

	const [title, setTitle] = useState(props.name ?? "");
	const [author, setAuthor] = useState(props.author ?? "");
	const [imageUrl, setImageUrl] = useState(props.imageUrl ?? "");
	const [ISBN, setISBN] = useState("");
	const [ISBNError, setISBNError] = useState("");

	const searchByISBN = async () => {
		try {
			const response = await fetch(`http://localhost:3000/isbn/${ISBN}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error(await response.text());
			}

			const rawData = await response.json();
			setISBNError("");

			setTitle(rawData.name);
			setAuthor(rawData.author);
			setImageUrl(rawData.image_url);
		} catch (e: unknown) {
			if (e instanceof Error) {
				setISBNError(e.message);
			}
		}
	};

	const addBook = async () => {
		try {
			const newBook = {
				name: title,
				author,
				image_url: imageUrl,
			};

			console.log(newBook);
			const response = await fetch("http://localhost:3000/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newBook),
			});
			if (!response.ok) throw new Error("Failed to add book");
			const rawData = await response.json();

			const bookToAdd: Book = {
				id: rawData._id,
				imageUrl: rawData.image_url || null,
				name: rawData.name,
				author: rawData.author,
			};

			console.log(bookToAdd);

			setBooks((prevBooks) => [...prevBooks, bookToAdd]);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.inputs_wrapper}>
				<span className={styles.isbn_error}>{ISBNError}</span>
				<div className={styles.isbn_search_wrapper}>
					<span>ISBN: </span>
					<input
						pattern="\d{10}|\d{13}|[0-9X]{10}"
						type="text"
						name="ISBN"
						value={ISBN}
						placeholder="В точности как на книге"
						onChange={(e) => setISBN(e.target.value)}
					/>
					<ConfirmButton
						buttonText="Поиск"
						onClick={() => {
							searchByISBN();
						}}
					></ConfirmButton>
				</div>
				<div className={styles.property_wrapper}>
					<label htmlFor="name">Название</label>
					<input
						name="name"
						type="text"
						value={title}
						placeholder="Бедные Люди"
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className={styles.property_wrapper}>
					<label htmlFor="image">Обложка</label>
					<input
						name="image"
						type="text"
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
					/>
				</div>
				<div className={styles.property_wrapper}>
					<label htmlFor="author">Автор</label>
					<input
						name="author"
						list="authors"
						type="text"
						value={author}
						placeholder="Федор Михайлович Достоевский"
						onChange={(e) => setAuthor(e.target.value)}
					/>
					<datalist id="authors">
						{authors.map((author) => (
							<option key={author.id} value={author.name}>
								{author.name}
							</option>
						))}
					</datalist>
				</div>
				<ConfirmButton
					buttonText="Отправить"
					onClick={() => {
						addBook();
					}}
				></ConfirmButton>
			</div>
			<CoverPreview maw="15%" url={imageUrl}></CoverPreview>
		</div>
	);
}
