import React from 'react';
import PropsTypes from 'prop-types';
import ShelfChanger from "./ShelfChanger";
import Loading from "./Loading";
import noCoverImg from '../images/no-cover.jpeg';

class Book extends React.Component {
    static propTypes = {
        book: PropsTypes.object.isRequired,
        shelves: PropsTypes.array.isRequired,
        onBookShelfChange: PropsTypes.func.isRequired
    }

    state = {
        loading: false,
    }

    get cover() {
        if (this.props.book.imageLinks) {
            return this.props.book.imageLinks.thumbnail || this.props.book.imageLinks.smallThumbnail
        }

        return noCoverImg;
    }

    get authors() {
        return this.props.book.authors || [];
    }

    changeBookShelf = async (shelf) => {
        this.setState(() => ({loading: true}));

        await this.props.onBookShelfChange(this.props.book, shelf);

        this.setState(() => ({loading: false}));
    }

    render() {
        const {book, shelves} = this.props;

        return (
            <div className={`book ${this.state.loading ? 'opacity-6' : ''}`}>
                <div className="book-top">
                    {this.state.loading && <Loading/>}
                    <div className="book-cover"
                         style={{width: 128, height: 193, backgroundImage: `url("${this.cover}")`}}/>
                    <ShelfChanger shelves={shelves} shelf={book.shelf || 'move'} onChange={this.changeBookShelf}/>
                </div>
                <div className="book-title">{book.title}</div>
                {this.authors.map(author =>
                    <div key={author} className="book-authors">{author}</div>
                )}
            </div>
        );
    }
}

export default Book;
