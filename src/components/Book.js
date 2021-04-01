import React from 'react';
import PropsTypes from 'prop-types';
import ShelfChanger from "./ShelfChanger";

class Book extends React.Component {
    static propTypes = {
        book: PropsTypes.object.isRequired,
        shelves: PropsTypes.array.isRequired,
        onBookShelfChange: PropsTypes.func.isRequired
    }

    get cover() {
        if (this.props.book.imageLinks) {
            return this.props.book.imageLinks.thumbnail || this.props.book.imageLinks.smallThumbnail
        }

        return '';
    }

    changeBookShelf = (shelf) => {
        this.props.onBookShelfChange(this.props.book, shelf);
    }

    render() {
        const {book, shelves} = this.props;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                         style={{width: 128, height: 193, backgroundImage: `url("${this.cover}")`}}/>
                    <ShelfChanger shelves={shelves} shelf={book.shelf} onChange={this.changeBookShelf}/>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors.map(author =>
                    <div key={author} className="book-authors">{author}</div>
                )}
            </div>
        );
    }
}

export default Book;
