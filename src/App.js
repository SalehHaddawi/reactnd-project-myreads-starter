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
            { id: 'read', title: 'Read' }
        ],
        books: []
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
        return (
            <div className="app">

                <Route path="/" exact render={() => (
                    <List books={this.state.books} getAllBooks={this.getAllBooks} onBookShelfChange={this.changeBookShelf} shelves={this.state.shelves} />
                )} />

                <Route path="/search" exact render={() => (
                    <Search onBookShelfChange={this.changeBookShelf} shelves={this.state.shelves} />
                )}/>
            </div>
        )
    }
}

export default BooksApp
