import React from 'react';
import PropsTypes from 'prop-types';
import Shelf from "../components/Shelf";

class List extends React.Component {
    static propTypes = {
        shelves: PropsTypes.array.isRequired,
        onBookShelfChange: PropsTypes.func.isRequired,
        books: PropsTypes.array.isRequired,
        getAllBooks: PropsTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getAllBooks();
    }

    render() {
        const {shelves, books} = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map(shelf =>
                            <Shelf id={shelf.id} onBookShelfChange={this.props.onBookShelfChange} title={shelf.title} shelves={shelves} books={books} key={shelf.id} />
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
