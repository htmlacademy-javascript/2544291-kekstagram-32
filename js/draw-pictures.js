const picturesListElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const picturesListFragment = document.createDocumentFragment();

const drawPictures = (pictures) => {
  pictures.forEach(({url, description, likes, comments}) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);

    const pictureImgElement = pictureElement.querySelector('.picture__img');
    const pictureLikesElement = pictureElement.querySelector('.picture__likes');
    const pictureCommentsElement = pictureElement.querySelector('.picture__comments');

    pictureImgElement.src = url;
    pictureImgElement.alt = description;
    pictureLikesElement.textContent = likes;
    pictureCommentsElement.textContent = comments.length;

    picturesListFragment.appendChild(pictureElement);
  });
  picturesListElement.appendChild(picturesListFragment);
};

export { drawPictures };
