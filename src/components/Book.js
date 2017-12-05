import React from 'react'
import { PropTypes } from 'prop-types'

const Book = (props) => {
  Book.propTypes = {
    authors: PropTypes.arrayOf(PropTypes.string.isRequired),
    index: PropTypes.string.isRequired,
    imageLink: PropTypes.object.isRequired,
    shelf: PropTypes.string,
    title: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  const changeShelf = (event) => {
    props.onShelfChange(event.target.value)
  }

  const idBook = props.index
  const imageLink = props.imageLink.thumbnail || props.imageLink.smallThumbnail
  const { authors, shelf, title } = props

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
            <select value={shelf} onChange={changeShelf}>
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

export default Book
