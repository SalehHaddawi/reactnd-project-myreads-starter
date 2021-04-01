import React from 'react';
import PropsTypes from 'prop-types';

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
                                value={shelf.id}
                                disabled={shelf.id === this.props.shelf} onClick={(e) => console.log(e.target)}>
                            {shelf.title}
                        </option>
                    )}
                </select>
            </div>
        );
    }
}

export default ShelfChanger;
