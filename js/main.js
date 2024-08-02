import { drawPictures } from './draw-pictures.js';
import { renderPopup } from './popup.js';
import { getData, sendData } from './api.js';
import { showAlert } from './util.js';
import { setOnFormSubmit, closeForm } from './form.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  drawPictures(data);
  renderPopup(data);
} catch {
  showAlert();
}
