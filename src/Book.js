import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

class Book extends Component {
  static propTypes = {
    authors: PropTypes.arrayOf(PropTypes.string.isRequired),
    index: PropTypes.string.isRequired,
    imageLink: PropTypes.object.isRequired,
    shelf: PropTypes.string,
    title: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  changeShelf = (event) => {
    this.props.onShelfChange(event.target.value)
  }

  render() {
    const idBook = this.props.index
    const imageLink = this.props.imageLink.thumbnail || this.props.imageLink.smallThumbnail
    const { authors, shelf, title } = this.props
    return (
      <li id={idBook}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${imageLink})`
            }}></div>
            <div className="book-shelf-changer">
              <select value={shelf} onChange={this.changeShelf}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          {authors && authors.map((author, index) => (
            <div className="book-authors" key={index}>
              {author}
            </div>
          ))}
        </div>
      </li>
    )
  }
}

export default Book
