import Author from "./author.ts";

type Book = {
	id: string;
	imageUrl?: string;
	name: string;
	author: Author;
	rating?: number;
	comment?: string;
};

export default Book;
