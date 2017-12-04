import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends Component {
  state = {
    books: []
  }
  componentDidMount() {
    this.fetchBooks()
  }

  fetchBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (id, shelf) => {
    BooksAPI.update({ id }, shelf).then(() => {
      this.fetchBooks()
    })
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={books}
            onShelfChange={(id, shelf) => {
              this.changeShelf(id, shelf)
            }}
          />
        )} />
        <Route path="/search" render={({ history }) => (
          <SearchBooks
            books={books}
            onShelfChange={(id, shelf) => {
              this.changeShelf(id, shelf)
              history.push('/')
            }}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
