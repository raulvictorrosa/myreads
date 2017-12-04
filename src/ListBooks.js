import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import BookShelf from './BookShelf'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(
      PropTypes.shape({
        authors: PropTypes.arrayOf(PropTypes.string.isRequired),
        id: PropTypes.string.isRequired,
        imageLinks: PropTypes.object.isRequired,
        shelf: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      })
    ),
    onShelfChange: PropTypes.func.isRequired
  }

  shelfs = [
    {
      slug: `currentlyReading`,
      heading: `Currently Reading`
    },
    {
      slug: `wantToRead`,
      heading: `Want to Read`
    },
    {
      slug: `read`,
      heading: `Read`
    }
  ]

  render() {
    const { shelfs } = this
    const { books, onShelfChange } = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelfs.map((shelf, index) => (
              <BookShelf
                books={books.filter((book) => book.shelf === shelf.slug)}
                key={index}
                title={shelf.heading}
                onShelfChange={(id, shelf) => {
                  onShelfChange(id, shelf)
                }}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks