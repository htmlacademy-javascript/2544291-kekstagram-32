import {createPhotos, MAX_VALUE_PHOTOS} from './data.js';

const photosArr = Array.from({length: MAX_VALUE_PHOTOS}, (_, index) => {
  const photo = createPhotos();
  photo.id = index + 1;
  photo.url = `photos/${photo.id}.jpg`;
  return photo;
});

// eslint-disable-next-line no-console
console.log(photosArr);
