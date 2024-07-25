const commentsListElement = document.querySelector('.social__comments');
const commentElement = document.querySelector('.social__comment');
const commentsTotalElement = document.querySelector('.social__comment-total-count');
const commentsShownElement = document.querySelector('.social__comment-shown-count');
const commentsLoaderElement = document.querySelector('.comments-loader');

const MAX_COMMENTS_COUNT = 5;
let pictureComments = [];
let currentCommentsCount = 0;

const clearComments = () => {
  while (commentsListElement.firstChild) {
    commentsListElement.removeChild(commentsListElement.firstChild);
  }
  currentCommentsCount = 0;
  commentsLoaderElement.classList.remove('hidden');
};

const addComments = () => {
  const commentsElement = pictureComments.slice(currentCommentsCount, currentCommentsCount + MAX_COMMENTS_COUNT);
  const commentsElementLength = commentsElement.length + currentCommentsCount;
  commentsElement.forEach(({avatar, name, message}) => {
    const commentItemElement = commentElement.cloneNode(true);
    const pictureElement = commentItemElement.querySelector('.social__picture');
    pictureElement.src = avatar;
    pictureElement.alt = name;
    commentItemElement.querySelector('.social__text').textContent = message;
    commentsListElement.append(commentItemElement);
  });
  commentsShownElement.textContent = `${commentsElementLength}`;
  commentsTotalElement.textContent = `${pictureComments.length}`;
  if (pictureComments.length <= commentsElementLength) {
    commentsLoaderElement.classList.add('hidden');
  }
  currentCommentsCount += MAX_COMMENTS_COUNT;
};

const displayComments = (сomments) => {
  pictureComments = сomments;
  addComments();
  commentsLoaderElement.addEventListener('click', addComments);
};

export { clearComments, displayComments };
