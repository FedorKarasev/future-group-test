import React from 'react';
import NoCover from '../assets/images/no-cover.jpg';

export const BookItem = (book) => {
  let { title, authors, categories } = book.book;
  let imageLink = NoCover;

  if ('imageLinks' in book.book) {
    imageLink = book.book.imageLinks.thumbnail;
  }

  //   console.log('title', title);
  //   console.log('authors', authors);
  //   console.log('categories', categories);

  //   return;

  categories = Array.isArray(categories) ? categories[0] : '';
  authors = authors || [''];

  return (
    <li className='book'>
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
