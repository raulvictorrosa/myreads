import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

import ListBooks from './components/ListBooks';
import SearchBooks from './components/SearchBooks';

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (id, shelf) => {
    BooksAPI.update({ id }, shelf).then(() => {
      let found = this.state.books.find(b => b.id === id)
      found.shelf = shelf
      this.setState({
        books: this.state.books.filter(b => b.id !== found.id)
      })
      this.setState({
        books: this.state.books.filter(b => b.id !== found.id).concat([found]) // Filtrando o livro fora do estado. E por fim add o livro no estado
      })
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
