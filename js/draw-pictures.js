const picturesListElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const imgFiltersContainerElement = document.querySelector('.img-filters');

const removePictures = () => {
  document.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
  imgFiltersContainerElement.classList.remove('img-filters--inactive');
};

const drawPictures = (pictures) => {
  removePictures();
  pictures.forEach((picture) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);

    const pictureImgElement = pictureElement.querySelector('.picture__img');
    const pictureLikesElement = pictureElement.querySelector('.picture__likes');
    const pictureCommentsElement = pictureElement.querySelector('.picture__comments');

    pictureImgElement.src = picture.url;
    pictureImgElement.alt = picture.description;
    pictureLikesElement.textContent = picture.likes;
    pictureCommentsElement.textContent = picture.comments.length;
    pictureImgElement.dataset.photoId = picture.id;
    picturesListElement.appendChild(pictureElement);
  });
};

export { drawPictures };
