import React from 'react';
import PropsTypes from 'prop-types';
import Book from "./Book";

class Shelf extends React.Component {
    static propTypes = {
        id: PropsTypes.string.isRequired,
        title: PropsTypes.string.isRequired,
        books: PropsTypes.array.isRequired,
        shelves: PropsTypes.array.isRequired,
        onBookShelfChange: PropsTypes.func.isRequired,
    }

    render() {
        const {books, id, title, shelves, onBookShelfChange} = this.props;
        const shelfBooks = books.filter(book => book.shelf === id)

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {shelfBooks.map(book =>
                            <li key={book.id}>
                                <Book onBookShelfChange={onBookShelfChange} book={book} shelves={shelves} />
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Shelf;
