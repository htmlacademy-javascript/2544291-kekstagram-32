import { photos } from './data.js';

const picturesList = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictures = photos();

const picturesListFragment = document.createDocumentFragment();

pictures.forEach(({url, description, likes, comments}) => {
  const pictureElement = picturesTemplate.cloneNode(true);

  const picture = pictureElement.querySelector('.picture__img');
  const pictureLikes = pictureElement.querySelector('.picture__likes');
  const pictureComments = pictureElement.querySelector('.picture__comments');

  picture.src = url;
  picture.alt = description;
  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;

  picturesListFragment.append(pictureElement);
});

picturesList.append(picturesListFragment);
