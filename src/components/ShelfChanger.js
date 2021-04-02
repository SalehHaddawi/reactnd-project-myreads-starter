import React from 'react';
import PropsTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

class ShelfChanger extends React.Component {
    static propTypes = {
        shelf: PropsTypes.string.isRequired,
        shelves: PropsTypes.array.isRequired,
        onChange: PropsTypes.func
    }
    state = {
        selectedShelf: this.props.shelf
    }

    changeHandle = (value) => {
        this.setState(() => ({
            selectedShelf: value
        }));

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(value);
        }
    }

    render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.state.selectedShelf} onChange={(e) => this.changeHandle(e.target.value)}>
                    <option value="move" disabled>Move to...</option>
                    {this.props.shelves.map(shelf =>
                        <option key={shelf.id}
                                value={shelf.id}>
                            {shelf.title} {shelf.id === this.state.selectedShelf && ReactHtmlParser('&#10003;')}
                        </option>
                    )}
                </select>
            </div>
        );
    }
}

export default ShelfChanger;
