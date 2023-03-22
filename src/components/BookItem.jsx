import React from 'react';
import NoCover from '../assets/images/no-cover.jpg';
import { useNavigate } from 'react-router-dom';

export const BookItem = (book) => {
  let { title, authors, categories } = book.book.volumeInfo;
  let imageLink = NoCover;
  const id = book.book.id;

  let navigate = useNavigate();

  if ('imageLinks' in book.book.volumeInfo) {
    imageLink = book.book.volumeInfo.imageLinks.thumbnail;
  }

  categories = Array.isArray(categories) ? categories[0] : '';
  authors = authors || [''];

  const openBookInfoHandler = () => {
    return navigate(`/books/${id}`);
  };

  return (
    <li className='book' onClick={openBookInfoHandler}>
      <img className='book__cover' alt='book cover' src={imageLink} />
      <p className='book__category'>
        <a href='#'>{categories}</a>
      </p>
      <p className='book__title'>{title}</p>
      <div className='book__authors'>
        {authors.map((author) => {
          return (
            <p key={author} className='author'>
              {author}
            </p>
          );
        })}
      </div>
    </li>
  );
};
