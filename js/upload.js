'use strict';

(function () {
  // Загрузка изображения

  const photoEdit = document.querySelector(`.img-upload__overlay`);
  window.photoPrew = document.querySelector(`.img-upload__preview img`);
  const uploadFile = document.querySelector(`#upload-file`);
  const uploadCloseBtn = document.querySelector(`.img-upload__cancel`);

  window.onPhotoEditEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      photoEdit.classList.add(`hidden`);
      document.querySelector(`body`).classList.remove(`modal-open`);
    }
  };

  const photoEditOpen = () => {
    photoEdit.classList.remove(`hidden`);
    document.querySelector(`body`).classList.add(`modal-open`);
    document.addEventListener(`keydown`, window.onPhotoEditEscPress);
  };

  const photoEditClose = () => {
    photoEdit.classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, window.onPhotoEditEscPress);
  };

  uploadCloseBtn.addEventListener(`click`, () => {
    photoEditClose();
  });

  uploadFile.addEventListener(`change`, () => {
    photoEditOpen();

    if (uploadFile.files && uploadFile.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        window.photoPrew.setAttribute(`src`, e.target.result);
      };
      reader.readAsDataURL(uploadFile.files[0]);
    }
  });

})();
