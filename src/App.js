import { useRef, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCurrentBooksList, updateBooksList, updateTotalItems } from './states/booksSlice';
import { BookItem } from './components/BookItem';
import { setSearchString, updateCategory, updateSortBy } from './states/filtersSlice';
import { getData } from './helpers/search';
import { Main } from './components/Main';

function App() {
  const apiKey = useSelector((state) => state.app.apiKey);
  const startIndex = useSelector((state) => state.filters.startIndex);

  const dispatch = useDispatch();
  const category = useSelector((state) => state.filters.category);
  const sortBy = useSelector((state) => state.filters.sortBy);

  const searchInputRef = useRef();

  const submitSearchHandler = (e) => {
    e.preventDefault();

    async function search() {
      const searchedBooks = await getData({
        searchString: searchInputRef.current.value,
        category,
        sortBy,
        apiKey,
        startIndex,
      });
      dispatch(setSearchString(searchInputRef.current.value));
      dispatch(updateBooksList(searchedBooks.items));
      dispatch(updateTotalItems(searchedBooks.totalItems));
    }

    search();
  };

  const changeCategorySelectHandler = (e) => {
    dispatch(updateCategory(e.target.value));
  };

  const changeSortByHandler = (e) => {
    dispatch(updateSortBy(e.target.value));
  };

  return (
    <div className='app'>
      <header className='app-header'>
        <div className='wrapper'>
          <h2>Search for books</h2>
          <form onSubmit={(e) => submitSearchHandler(e)} className='search-form'>
            <input ref={searchInputRef} type='text' placeholder='Найти книгу' />
            <div className='filters-container'>
              <div className='filter'>
                <label htmlFor='categories'>Categories</label>
                <select onChange={(e) => changeCategorySelectHandler(e)} name='categories' value={category}>
                  <option value='all'>all</option>
                  <option value='art'>art</option>
                  <option value='biography'>biography</option>
                  <option value='computers'>computers</option>
                  <option value='history'>history</option>
                  <option value='medical'>medical</option>
                  <option value='poetry'>poetry</option>
                </select>
              </div>
              <div className='filter'>
                <label htmlFor='sort'>Sorting by</label>
                <select onChange={(e) => changeSortByHandler(e)} name='sortBy' value={sortBy}>
                  <option value='relevance'>relevance</option>
                  <option value='newest'>newest</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </header>
      <Main />
    </div>
  );
}

export default App;
