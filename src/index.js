import Notiflix from 'notiflix';

import { fetchPhotos } from './js/fetchPhotos';

import { getGalleryList } from './js/gallery';

const form = document.querySelector('#search-form');

const gallery = document.querySelector('.gallery');

const btnLoadMore = document.querySelector('.load-more');
let page = 1;
let input = '';

form.addEventListener('submit', handleSubmit);

const lightbox = new SimpleLightbox('.gallery__link');

async function handleSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  input = event.target.elements.searchQuery.value;
  createGallery();
}

btnLoadMore.style.display = 'none';
btnLoadMore.addEventListener('click', handleLoadMore);

function handleLoadMore() {
  page += 1;
  createGallery(page);
}

async function createGallery(page = 1) {
  try {
    const { hits, totalHits, error } = await fetchPhotos(input, page);

    if (!totalHits || error) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    const galleryList = getGalleryList(hits);
    gallery.insertAdjacentHTML('beforeend', galleryList.join(''));

    lightbox.refresh();

    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);

    if (hits.length === 40) {
      btnLoadMore.style.display = 'block';
    }

    if (gallery.children.length === totalHits && page !== 1) {
      btnLoadMore.style.display = 'none';
    }
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
