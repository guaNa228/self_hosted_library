import "./App.css";
import BookList from "./components/BookList";
import AddParentComponent from "./components/AddParentComponent";
import { BooksProvider } from "./contexts/BookContext";
import { AuthorsProvider } from "./contexts/AuthorContext";

const App = () => {
	return (
		<div
			style={{
				position: "relative",
			}}
		>
			{" "}
			<AuthorsProvider>
				<BooksProvider>
					<AddParentComponent></AddParentComponent>
					<BookList />
				</BooksProvider>
			</AuthorsProvider>
		</div>
	);
};

export default App;
