export async function getData({ searchString, category, sortBy, startIndex = 0, maxResults = 30, apiKey }) {
  category = category == 'all' ? '' : category[0].toUpperCase() + category.slice(1);
  const url = new URL(
    `https://www.googleapis.com/books/v1/volumes?q=${searchString}+subject:${category}&orderBy=${sortBy}&startIndex=${startIndex}&maxResults=${maxResults}&key=${apiKey}`
  );
  const response = await fetch(url.toString());
  const data = await response.json();
  return data;
}
