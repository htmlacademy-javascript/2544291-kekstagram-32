const picturesList = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesListFragment = document.createDocumentFragment();

const drawPictures = (pictures) => {
  pictures.forEach(({url, description, likes, comments}) => {
    const pictureElement = picturesTemplate.cloneNode(true);

    const pictureImgElement = pictureElement.querySelector('.picture__img');
    const pictureLikesElement = pictureElement.querySelector('.picture__likes');
    const pictureCommentsElement = pictureElement.querySelector('.picture__comments');

    pictureImgElement.src = url;
    pictureImgElement.alt = description;
    pictureLikesElement.textContent = likes;
    pictureCommentsElement.textContent = comments.length;

    picturesListFragment.appendChild(pictureElement);
  });

  picturesList.appendChild(picturesListFragment);
};

export { drawPictures };
