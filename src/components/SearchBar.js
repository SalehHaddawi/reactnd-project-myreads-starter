import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class SearchBar extends React.Component {
    static propTypes = {
        onChange: PropTypes.func,
        thresh: PropTypes.number.isRequired,
    }

    timer = setTimeout(null, 0);

    handleChange = (query) => {
        if (typeof this.props.onChange === 'function') {
            clearTimeout(this.timer);

            this.timer = setTimeout(() => {
                this.props.onChange(query);
            }, this.props.timer);
        }
    }

    render() {
        return (
            <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    <input onChange={(e) => this.handleChange(e.target.value.trim())} type="search" placeholder="Search by title or author"/>
                </div>
            </div>
        );
    }
}

export default SearchBar;
