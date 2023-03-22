import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BookItem } from './BookItem';
import { getData } from '../helpers/search';
import { addToCurrentBooksList } from '../states/booksSlice';
import { setStartIndex } from '../states/filtersSlice';

export const Main = () => {
  const books = useSelector((state) => state.books.books);
  const totalItems = useSelector((state) => state.books.totalItems);
  const apiKey = useSelector((state) => state.app.apiKey);
  const category = useSelector((state) => state.filters.category);
  const sortBy = useSelector((state) => state.filters.sortBy);
  const startIndex = useSelector((state) => state.filters.startIndex);
  const searchString = useSelector((state) => state.filters.searchString);

  const dispatch = useDispatch();

  const loadMoreHandler = () => {
    async function loadMore() {
      const loadedBooks = await getData({
        searchString: searchString,
        category,
        sortBy,
        apiKey,
        startIndex,
      });

      dispatch(addToCurrentBooksList(loadedBooks.items));
      dispatch(setStartIndex((startIndex += 30)));
    }

    loadMore();
  };

  return (
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
  );
};
