import { listPhotos } from './data.js';
import { drawPictures } from './draw-pictures.js';
import { renderPopup } from './popup.js';

drawPictures(listPhotos);
renderPopup(listPhotos);
