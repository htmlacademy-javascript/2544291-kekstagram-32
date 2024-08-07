import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { resetEffect, initialSlider } from './effect.js';

const HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Невалидный хэштег',
  INVALID_COMMENT: 'Длина комментария не может составлять больше 140 символов.',
};
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Отправляю...',
};

const formElement = document.querySelector('.img-upload__form');
const imgOverlayElement = formElement.querySelector('.img-upload__overlay');
const cancelButtonElement = formElement.querySelector('.img-upload__cancel');
const inputFieldElement = formElement.querySelector('.img-upload__input');
const hashtagFieldElement = formElement.querySelector('.text__hashtags');
const descriptionFieldElement = formElement.querySelector('.text__description');
const imgPreviewElement = formElement.querySelector('.img-upload__preview img');
const submitButtonElement = formElement.querySelector('.img-upload__submit');
const effectsPreviewElements = formElement.querySelectorAll('.effects__preview');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const openForm = () => {
  imgOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  initialSlider();
};

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const onFileInputChange = () => {
  const file = inputFieldElement.files[0];
  if (file && isValidType(file)) {
    imgPreviewElement.src = URL.createObjectURL(file);
    effectsPreviewElements.forEach((preview) => {
      preview.style.backgroundImage = `url('${imgPreviewElement.src}')`;
    });
  }
  openForm();
};

const closeForm = () => {
  formElement.reset();
  pristine.reset();
  resetScale();
  resetEffect();
  imgOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
};

const toggleSubmitButton = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = isDisabled
    ? SubmitButtonText.SUBMITTING
    : SubmitButtonText.IDLE;
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagFieldElement || document.activeElement === descriptionFieldElement;

const isErrorMessageShown = () => Boolean(document.querySelector('.error'));

function onEscKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isErrorMessageShown()) {
    evt.preventDefault();
    closeForm();
  }
}

const onCancelButtonClick = () => {
  closeForm();
};

const normalizeTags = (tagString) =>
  tagString
    .trim()
    .split(' ')
    .filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => HASHTAG_SYMBOLS.test(tag));

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(hashtagFieldElement, hasValidTags, ErrorText.INVALID_PATTERN, 2, true);

pristine.addValidator(hashtagFieldElement, hasUniqueTags, ErrorText.NOT_UNIQUE, 1, true);

pristine.addValidator(hashtagFieldElement, hasValidCount, ErrorText.INVALID_COUNT, 3, true);

pristine.addValidator(descriptionFieldElement, validateComment, ErrorText.INVALID_COMMENT, 4, true);

const setOnFormSubmit = (callback) => {
  formElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      toggleSubmitButton(true);
      await callback(new FormData(formElement));
      toggleSubmitButton();
    }
  });
};

inputFieldElement.addEventListener('change', onFileInputChange);

cancelButtonElement.addEventListener('click', onCancelButtonClick);

export { setOnFormSubmit, closeForm };
