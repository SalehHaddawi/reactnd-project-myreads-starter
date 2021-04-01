import React from 'react';
import PropsTypes from 'prop-types';
import Shelf from "../components/Shelf";
import * as BooksAPI from "../BooksAPI";

class List extends React.Component {
    static propTypes = {
        shelves: PropsTypes.array.isRequired
    }

    state = {
        books: []
    }

    componentDidMount() {
        this.getAllBooks();
    }

    getAllBooks = () => {
        BooksAPI.getAll().then(books => this.setState(() => ({
            books: books
        })));
    }

    changeBookShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(res => this.getAllBooks());
    }

    render() {
        const {shelves} = this.props;
        const {books} = this.state;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map(shelf =>
                            <Shelf id={shelf.id} onBookShelfChange={this.changeBookShelf} title={shelf.title} shelves={shelves} books={books} key={shelf.id} />
                        )}
                    </div>
                </div>
                <div className="open-search">
                    <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
                </div>
            </div>
        );
    }
}

export default List;
