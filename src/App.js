import { useRef, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCurrentBooksList, updateBooksList, updateTotalItems } from './states/booksSlice';
import { BookItem } from './components/BookItem';
import { updateCategory, updateSortBy } from './states/filtersSlice';
import { getData } from './helpers/search';

function App() {
  const apiKey = 'AIzaSyDqJ8WW5OCHdKT6rGJtawuJraEY_A_Qhsc';

  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const totalItems = useSelector((state) => state.books.totalItems);
  const category = useSelector((state) => state.filters.category);
  const sortBy = useSelector((state) => state.filters.sortBy);

  let [startIndex, setStartIndex] = useState(0);

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
      dispatch(updateBooksList(searchedBooks.items));
      dispatch(updateTotalItems(searchedBooks.totalItems));

      console.log(searchedBooks);
      return;
    }

    search();
  };

  const changeCategorySelectHandler = (e) => {
    dispatch(updateCategory(e.target.value));
  };

  const changeSortByHandler = (e) => {
    dispatch(updateSortBy(e.target.value));
  };

  const loadMoreHandler = () => {
    async function loadMore() {
      const loadedBooks = await getData({
        searchString: searchInputRef.current.value,
        category,
        sortBy,
        apiKey,
        startIndex,
      });

      dispatch(addToCurrentBooksList(loadedBooks.items));
      setStartIndex((startIndex += 30));
    }

    loadMore();
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

      <main className='main-section'>
        <div className='found-items-container'>
          <p className='found-items-count'>Found {totalItems} results</p>
        </div>
        <ul className='found-items-list'>
          {books.map((book) => {
            return <BookItem key={book.id} book={book.volumeInfo} />;
          })}
        </ul>
        <button onClick={loadMoreHandler}>Load More</button>
      </main>
    </div>
  );
}

export default App;
