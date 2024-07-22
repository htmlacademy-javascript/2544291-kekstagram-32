import { isEscapeKey } from './util.js';
import { picturesListElement } from './draw-pictures.js';


const renderPopup = (listPhotos) => {

  const bigPictureElement = document.querySelector('.big-picture');
  const PopupCloseElement = document.querySelector('.big-picture__cancel');
  const commentsListElement = document.querySelector('.social__comments');
  const commentElement = document.querySelector('.social__comment');
  const commentsLoaderElement = document.querySelector('.comments-loader');
  const socialCommentsElement = bigPictureElement.querySelector('.social__comment-count');

  const clearComments = () => {
    while (commentsListElement.firstChild) {
      commentsListElement.removeChild(commentsListElement.firstChild);
    }
  };

  const addComments = (comments) => {
    clearComments ();
    comments.forEach(({avatar, name, message}) => {
      const commentItem = commentElement.cloneNode(true);
      const pictureElement = commentItem.querySelector('.social__picture');
      pictureElement.src = avatar;
      pictureElement.alt = name;
      commentItem.querySelector('.social__text').textContent = message;
      commentsListElement.append(commentItem);
    });
  };

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

  picturesListElement.addEventListener('click', onClickPhoto);

  PopupCloseElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    closePopup();
  });

};

export { renderPopup };
