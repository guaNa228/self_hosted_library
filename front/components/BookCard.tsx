import React from "react";
import noImage from "../assets/no-image-svgrepo-com.svg";
import deleteIcon from "../assets/delete.svg";
import styles from "../css/BookCard.module.css";
import Book from "../interfaces/book";

type BookCardProps = {
	book: Book;
	setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
	onEdit: () => void; // Add this prop
};

const BookCard: React.FC<BookCardProps> = ({ book, setBooks, onEdit }) => {
	const handleDeleteBook = async () => {
		try {
			const response = await fetch(`http://localhost:3000/${book.id}`, {
				method: "DELETE",
			});
			if (!response.ok) throw new Error("Failed to delete book");
			setBooks((prevBooks: Book[]) =>
				prevBooks.filter(
					(bookFiltering: Book) => bookFiltering.id !== book.id
				)
			);
		} catch (error) {
			console.log(error);
		}
	};
	console.log(book);
	return (
		<div className={styles.bookCard} onClick={onEdit}>
			<img
				src={book.imageUrl ?? noImage}
				alt={book.name}
				className={styles.cover}
			/>
			<h2>{book.name}</h2>
			<p className={styles.author}>{book.author.name}</p>
			{book.rating ? (
				<p className={styles.rating}>{book.rating}/10</p>
			) : (
				""
			)}
			{book.comment ? (
				<p className={styles.comment}>{book.comment}</p>
			) : (
				""
			)}
			<img
				style={{
					position: "absolute",
					bottom: "5px",
					right: "5px",
					opacity: "0",
					transition: ".5s",
					width: "30px",
					cursor: "pointer",
				}}
				onClick={() => handleDeleteBook()}
				src={deleteIcon}
				alt=""
			/>
		</div>
	);
};

export default BookCard;
