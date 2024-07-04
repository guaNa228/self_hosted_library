// Assuming you have an Author interface defined somewhere
import React, { createContext, useState, useContext } from "react";
import Author from "../interfaces/author"; // Adjust the import path as necessary

interface AuthorsContextType {
	authors: Author[];
	setAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
}

const AuthorsContext = createContext<AuthorsContextType>({
	authors: [],
	setAuthors: () => {},
});

interface AuthorsProviderProps {
	children: React.ReactNode;
}

export const AuthorsProvider: React.FC<AuthorsProviderProps> = ({
	children,
}) => {
	const [authors, setAuthors] = useState<Author[]>([]);

	return (
		<AuthorsContext.Provider value={{ authors, setAuthors }}>
			{children}
		</AuthorsContext.Provider>
	);
};

export const useAuthors = () => useContext(AuthorsContext);
