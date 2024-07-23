import { isEscapeKey } from './util.js';
import { clearComments, addComments } from './comments.js';

const renderPopup = (listPhotos) => {
  const picturesContainerElement = document.querySelector('.pictures');
  const bigPictureElement = document.querySelector('.big-picture');
  const popupCloseElement = document.querySelector('.big-picture__cancel');
  const commentsLoaderElement = document.querySelector('.comments-loader');
  const socialCommentsElement = bigPictureElement.querySelector('.social__comment-count');

  const displayPopupImage = (photoId) => {
    const index = listPhotos.findIndex((photo) => photoId === photo.id.toString());
    const { url, likes, comments, description } = listPhotos[index];
    const popupImage = bigPictureElement.querySelector('.big-picture__img img');
    popupImage.src = url;
    popupImage.alt = description;
    bigPictureElement.querySelector('.social__caption').textContent = description;
    bigPictureElement.querySelector('.likes-count').textContent = likes;
    bigPictureElement.querySelector('.social__comment-total-count').textContent = comments.length;
    bigPictureElement.querySelector('.social__comment-shown-count').textContent = comments.length;
    clearComments();
    addComments(comments);
  };

  const closePopup = () => {
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', isEscapeKey);
  };

  const onEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePopup();
    }
  };

  const openPopup = () => {
    bigPictureElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    commentsLoaderElement.classList.add('hidden');
    socialCommentsElement.classList.add('hidden');
    document.addEventListener('keydown', onEscKeydown);
  };

  const onClickPhoto = (evt) => {
    if (evt.target.closest('.picture')) {
      const currentPhotoId = evt.target.dataset.photoId;
      displayPopupImage(currentPhotoId);
      openPopup();
    }
  };

  picturesContainerElement.addEventListener('click', onClickPhoto);

  popupCloseElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    closePopup();
  });

};

export { renderPopup };
