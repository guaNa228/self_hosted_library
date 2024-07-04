import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import Book from "../interfaces/book";
import Author from "../interfaces/author";
import UpdateBookForm from "./UpdateBookForm";
import { useBooks } from "../contexts/BookContext";
import { useAuthors } from "../contexts/AuthorContext";

interface RawBookData {
	_id: string;
	image_url?: string;
	name: string;
	author: object;
	rating: number;
	comment: string;
}

interface RawAuthorData {
	_id: string;
	name: string;
	country: string;
}

const BookList = () => {
	const { books, setBooks } = useBooks();
	const { setAuthors } = useAuthors();
	const [editingBook, setEditingBook] = useState<Book | null>(null);

	const handleEditBook = (book: Book) => {
		setEditingBook(book);
	};

	const handleUpdateSubmit = async (updatedBookData: Book) => {
		setEditingBook(null);
		try {
			const response = await fetch(
				`http://localhost:3000/${updatedBookData.id}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: updatedBookData.name,
						image_url: updatedBookData.imageUrl,
						rating: updatedBookData.rating,
						comment: updatedBookData.comment,
						author: updatedBookData.author.name,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to update the book");
			}

			const result = await response.json();
			console.log("Book successfully updated:", result);
			setBooks([
				...books.filter(
					(currentBook) => currentBook.id != updatedBookData.id
				),
				updatedBookData,
			]);
		} catch (error) {
			console.error("Error updating book:", error);
		}
	};

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await fetch("http://localhost:3000/");
				if (!response.ok) throw new Error("Something went wrong!");
				const rawData = await response.json();

				const books: Book[] = rawData.map((rawBook: RawBookData) => ({
					id: rawBook._id,
					imageUrl: rawBook.image_url ?? null,
					name: rawBook.name,
					author: rawBook.author,
					comment: rawBook.comment,
					rating: rawBook.rating,
				}));
				setBooks(books);
				console.log(books);
			} catch (error) {
				console.log(error);
			}
		};

		const fetchAuthors = async () => {
			try {
				const response = await fetch("http://localhost:3000/authors");
				if (!response.ok) throw new Error("Something went wrong!");
				const rawData = await response.json();

				const authors: Author[] = rawData.map(
					(rawAuthor: RawAuthorData) => ({
						id: rawAuthor._id,
						name: rawAuthor.name,
						country: rawAuthor.country,
					})
				);

				setAuthors(authors);
				console.log(authors);
			} catch (error) {
				console.log(error);
			}
		};

		fetchBooks();
		fetchAuthors();
	}, [setAuthors, setBooks, handleUpdateSubmit]);

	return (
		<div
			style={{
				maxWidth: "1280px",
				display: "flex",
				justifyContent: "space-between",
				alignContent: "flex-start",
				marginTop: "20px",
				flexWrap: "wrap",
			}}
		>
			{books.map((book: Book) => (
				<BookCard
					key={book.id}
					book={book}
					setBooks={setBooks}
					onEdit={() => handleEditBook(book)}
				/>
			))}
			{editingBook && (
				<UpdateBookForm
					initialBookData={editingBook}
					onSubmit={handleUpdateSubmit}
					setBook={setEditingBook}
				/>
			)}
		</div>
	);
};

export default BookList;
