const commentsListElement = document.querySelector('.social__comments');
const commentElement = document.querySelector('.social__comment');

const clearComments = () => {
  while (commentsListElement.firstChild) {
    commentsListElement.removeChild(commentsListElement.firstChild);
  }
};

const addComments = (comments) => {
  comments.forEach(({avatar, name, message}) => {
    const commentItem = commentElement.cloneNode(true);
    const pictureElement = commentItem.querySelector('.social__picture');
    pictureElement.src = avatar;
    pictureElement.alt = name;
    commentItem.querySelector('.social__text').textContent = message;
    commentsListElement.append(commentItem);
  });
};

export { clearComments, addComments };
