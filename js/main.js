import { listPhotos } from './data.js';
import { drawPictures } from './draw-pictures.js';
import { renderPopup } from './popup.js';
import './form.js';

drawPictures(listPhotos);
renderPopup(listPhotos);
