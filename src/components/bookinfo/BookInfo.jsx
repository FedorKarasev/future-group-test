import React, { useState, useEffect } from 'react';
import './BookInfo.css';
import { useSelector } from 'react-redux';
import NoCover from '../../assets/images/no-cover.jpg';
import { getBookById } from '../../helpers/search';
import Spinner from 'react-bootstrap/Spinner';

export const BookInfo = () => {
  const apiKey = useSelector((state) => state.app.apiKey);
  const currentURL = new URL(document.location.href);
  const bookId = currentURL.pathname.split('/')[2];
  let imageLink = NoCover;
  let [book, setBook] = useState(undefined);
  let categories;
  let authors;
  let title;
  let description;

  useEffect(() => {
    const loadBook = async () => {
      const loadedBook = await getBookById(bookId, apiKey);
      setBook(loadedBook);
    };

    loadBook();
  }, [apiKey, bookId]);

  if (book === undefined) return <Spinner className='spinner' animation='border' variant='success' />;

  if (book) {
    if ('imageLinks' in book.volumeInfo) {
      imageLink = book.volumeInfo.imageLinks.thumbnail;
    }

    categories = Array.isArray(book.volumeInfo.categories) ? book.volumeInfo.categories[0] : '';
    authors = book.volumeInfo.authors || [''];
    title = book.volumeInfo.title;
    description = book.volumeInfo.description || '';
  }

  return (
    <div className='book-info'>
      <div className='cover-container'>
        <img src={imageLink} alt='book cover' />
      </div>
      <div className='info'>
        <p className='category'>{categories}</p>
        <h2 className='title'>{title}</h2>

        <div className='description'>{description}</div>
      </div>
    </div>
  );
};
