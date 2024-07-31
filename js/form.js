import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { resetEffect, initialSlider } from './effect.js';

const HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Невалидный хэштег',
};

const form = document.querySelector('.img-upload__form');
const imgOverlayElement = form.querySelector('.img-upload__overlay');
const cancelButtonElement = form.querySelector('.img-upload__cancel');
const inputFieldElement = form.querySelector('.img-upload__input');
const hashtagFieldElement = form.querySelector('.text__hashtags');
const descriptionFieldElement = form.querySelector('.text__description');
const imgPreviewElement = form.querySelector('.img-upload__preview img');

const pristine = new Pristine(form, {
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

const onFileInputChange = () => {
  const file = inputFieldElement.files[0];
  if (file) {
    imgPreviewElement.src = URL.createObjectURL(file);
  }
  openForm();
};

const closeForm = () => {
  form.reset();
  pristine.reset();
  resetScale();
  resetEffect();
  imgOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagFieldElement || document.activeElement === descriptionFieldElement;

function onEscKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
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

pristine.addValidator(hashtagFieldElement, hasValidTags, ErrorText.INVALID_PATTERN, 2, true);

pristine.addValidator(hashtagFieldElement, hasUniqueTags, ErrorText.NOT_UNIQUE, 1, true);

pristine.addValidator(hashtagFieldElement, hasValidCount, ErrorText.INVALID_COUNT, 3, true);

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

inputFieldElement.addEventListener('change', onFileInputChange);

cancelButtonElement.addEventListener('click', onCancelButtonClick);

