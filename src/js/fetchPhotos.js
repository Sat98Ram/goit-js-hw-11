import Notiflix from 'notiflix';
import axios from 'axios';

const pixabayAPI = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '36249306-fe6d8c4d86ae48706cd60efae',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
  },
});

export async function fetchPhotos(input, page) {
  // return pixabayAPI
  //   .get('', { params: { q: input } })
  //   .then(({ data }) => data.hits);

  const response = await pixabayAPI.get('', { params: { q: input, page } });
  const data = await response.data;
  return data;
}
