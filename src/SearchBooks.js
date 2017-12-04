import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import { search } from './utils/BooksAPI'

import Book from './Book'

class SearchBooks extends Component {
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

  state = {
    query: '', // query is the searched argument
    books: []
  }

  updateQuery = (event) => {
    const value = event.target.value
    // const value = event.target.value.trim()
    this.setState({ query: value })
    this.searchBook(value)
  }

  mergeShelf = (a, b) => {
    return a.map((itemA) => {
      b.forEach((itemB) => {
        if (itemB.id === itemA.id) {
          itemA.shelf = itemB.shelf
          return
        }
      })
      return itemA
    })
  }

  searchBook = (value) => {
    if (value.length  !== 0) {
      search(value, 10).then((books) => {
        if (books.length > 0) {
          books = books.filter((book) => book.imageLinks)
          books = this.mergeShelf(books, this.props.books)
          this.setState({ books })
        } else {
          this.setState({ books: [] })
        }
      })
    } else {
      this.setState({ books: [], query: '' })
    }
  }

  render() {
    const { onShelfChange } = this.props
    const { query, books } = this.state

    let showingBooks
    if (query) {
      showingBooks = books
    } else {
      showingBooks = this.props.books
    }

    showingBooks.sort(sortBy('title')) // Organiza os contatos em ordem alfabética

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.updateQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          {/* {JSON.stringify(this.state)} */}
          <ol className="books-grid">
            {showingBooks.length === 0 && <h2>Nothing found</h2>}
            {showingBooks.map((book, index) => (
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
}
export default SearchBooks
