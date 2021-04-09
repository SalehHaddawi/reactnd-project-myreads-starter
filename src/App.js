import React from 'react'
import {Route} from 'react-router-dom';
import * as BooksAPI from "./BooksAPI";
import List from './pages/List'
import Search from './pages/Search'

import './App.css'

class BooksApp extends React.Component {
    state = {
        shelves: [
            { id: 'currentlyReading', title: 'Currently Reading' },
            { id: 'wantToRead', title: 'Want To Read' },
            { id: 'read', title: 'Read' },
            { id: 'none', title: 'None' },
        ],
        books: []
    }

    componentDidMount() {
        this.getAllBooks();
    }

    getAllBooks = async () => {
        const books = await BooksAPI.getAll();

        this.setState(() => ({
            books: books
        }));
    }

    changeBookShelf = async (book, shelf) => {
        await BooksAPI.update(book, shelf);
        this.getAllBooks();
    }

    render() {
        return (
            <div className="app">

                <Route path="/" exact>
                    <List books={this.state.books} getAllBooks={this.getAllBooks} onBookShelfChange={this.changeBookShelf} shelves={this.state.shelves} />
                </Route>

                <Route path="/search" exact>
                    <Search books={this.state.books} onBookShelfChange={this.changeBookShelf} shelves={this.state.shelves} />
                </Route>
            </div>
        )
    }
}

export default BooksApp
