const commentsListElement = document.querySelector('.social__comments');
const commentElement = document.querySelector('.social__comment');

const clearComments = () => {
  while (commentsListElement.firstChild) {
    commentsListElement.removeChild(commentsListElement.firstChild);
  }
};

const addComments = (comments) => {
  comments.forEach(({avatar, name, message}) => {
    const commentItemElement = commentElement.cloneNode(true);
    const pictureElement = commentItemElement.querySelector('.social__picture');
    pictureElement.src = avatar;
    pictureElement.alt = name;
    commentItemElement.querySelector('.social__text').textContent = message;
    commentsListElement.append(commentItemElement);
  });
};

export { clearComments, addComments };
