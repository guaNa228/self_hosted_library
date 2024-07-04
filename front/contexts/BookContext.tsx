import React, { createContext, useState, useContext } from "react";
import Book from "../interfaces/book";

interface BooksContextType {
	books: Book[];
	setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const BooksContext = createContext<BooksContextType>({
	books: [],
	setBooks: () => {},
});

interface BooksProviderProps {
	children: React.ReactNode;
}

export const BooksProvider: React.FC<BooksProviderProps> = ({ children }) => {
	const [books, setBooks] = useState<Book[]>([]);

	return (
		<BooksContext.Provider value={{ books, setBooks }}>
			{children}
		</BooksContext.Provider>
	);
};

export const useBooks = () => useContext(BooksContext);
