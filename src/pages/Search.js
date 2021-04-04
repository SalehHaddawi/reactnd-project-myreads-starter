import React from 'react';
import PropsTypes from "prop-types";
import Book from "../components/Book";
import SearchBar from "../components/SearchBar";
import * as BooksAPI from "../BooksAPI";
import Loading from "../components/Loading";

class Search extends React.Component {
    static propTypes = {
        shelves: PropsTypes.array.isRequired,
        books: PropsTypes.array.isRequired,
        onBookShelfChange: PropsTypes.func.isRequired
    }

    state = {
        searchBooks: [],
        query: '',
        loading: false,
    }

    searchBooks = (query) => {
        this.setState(() => ({
            query: query,
        }));

        if (query !== '') {
            let queryBooks = [];

            this.setState(() => ({loading: true}));

            BooksAPI.search(query).then(books => {
                queryBooks = Array.isArray(books) ? books.map(book => {
                    const myBook = this.props.books.find(b => b.id === book.id);
                    book.shelf = myBook ? myBook.shelf : 'none';

                    return book;
                }) : [];

                // if query changed, then ignore results
                if (query !== this.state.query) {
                    return;
                }

                this.setState(() => ({
                    searchBooks: queryBooks
                }));

                this.setState(() => ({loading: false}))
            });

            return;
        }

        this.setState(() => ({
            query: query,
            searchBooks: []
        }));
    }

    render() {
        return (
            <div className="search-books">
                <SearchBar thresh={400} onChange={this.searchBooks}/>
                {this.state.loading && <Loading scale={0.1}/>}
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchBooks.map(book =>
                            <Book key={book.id} book={book} shelves={this.props.shelves}
                                  onBookShelfChange={this.props.onBookShelfChange}/>
                        )}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;
