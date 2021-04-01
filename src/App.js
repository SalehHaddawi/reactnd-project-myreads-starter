import React from 'react'
import List from './pages/List'
import Search from './pages/Search'

import './App.css'

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
        shelves: [
            { id: 'currentlyReading', title: 'Currently Reading' },
            { id: 'wantToRead', title: 'Want To Read' },
            { id: 'read', title: 'Read' }
        ]
    }

    render() {
        return (
            <div className="app">
                {this.state.showSearchPage ? (
                    <Search/>
                ) : (
                    <List shelves={this.state.shelves}/>
                )}
            </div>
        )
    }
}

export default BooksApp
