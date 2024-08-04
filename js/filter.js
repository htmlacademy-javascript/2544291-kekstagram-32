import { debounce } from './util.js';
import { drawPictures } from './draw-pictures.js';

const MAX_RANDOM_PHOTO_COUNT = 10;

const filterDefaultElement = document.querySelector('#filter-default');
const filterRandomElement = document.querySelector('#filter-random');
const filterDiscussedElement = document.querySelector('#filter-discussed');

const setActiveButton = (currentButtonElement) => {
  const activeButtonElement = document.querySelector('.img-filters__button--active');
  if (currentButtonElement !== activeButtonElement) {
    activeButtonElement.classList.remove('img-filters__button--active');
  }
  currentButtonElement.classList.add('img-filters__button--active');
};

const compareByComments = (image1, image2) => image2.comments.length - image1.comments.length;

const applyFilters = (images, filterType) => {
  switch (filterType) {
    case 'default': {
      drawPictures(images);
      break;
    }
    case 'random': {
      const shuffledImages = images.slice().sort(() => 0.5 - Math.random()).slice(0, MAX_RANDOM_PHOTO_COUNT);
      drawPictures(shuffledImages);
      break;
    }
    case 'discussed': {
      const copiedImages = images.slice().sort(compareByComments);
      drawPictures(copiedImages);
      break;
    }
  }
};

const onFilterButton = (images, button, filterType) => {
  const debouncedFilter = debounce(() => applyFilters(images, filterType), 500);
  button.addEventListener('click', (evt) => {
    setActiveButton(evt.target);
    debouncedFilter();
  });
};

const initializeFilters = (images) => {
  onFilterButton(images, filterDefaultElement, 'default');
  onFilterButton(images, filterRandomElement, 'random');
  onFilterButton(images, filterDiscussedElement, 'discussed');
};

export { initializeFilters };
