import React from 'react'
import { PropTypes } from 'prop-types'

import Book from './Book'

const BookShelf = (props) => {
  BookShelf.propTypes = {
    books: PropTypes.arrayOf(
      PropTypes.shape({
        authors: PropTypes.arrayOf(PropTypes.string.isRequired),
        id: PropTypes.string.isRequired,
        imageLinks: PropTypes.object.isRequired,
        shelf: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      })
    ),
    title: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  const { title, books, onShelfChange } = props
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, index) => (
            <Book
              authors={book.authors}
              index={book.id}
              imageLink={book.imageLinks}
              key={book.id}
              shelf={book.shelf}
              title={book.title}
              onShelfChange={(shelf) => {
                onShelfChange(book.id, shelf)
              }}
            />
          ))}
        </ol>
      </div>
    </div>
  )
}

export default BookShelf
