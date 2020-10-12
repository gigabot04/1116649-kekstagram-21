'use strict';

(function () {
  // Загрузка изображения

  const photoEdit = document.querySelector(`.img-upload__overlay`);
  const photoPrew = document.querySelector(`.img-upload__preview img`);
  const uploadFile = document.querySelector(`#upload-file`);
  const uploadCloseBtn = document.querySelector(`.img-upload__cancel`);

  const onPhotoEditEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      photoEdit.classList.add(`hidden`);
      document.querySelector(`body`).classList.remove(`modal-open`);
    }
  };

  const photoEditOpen = () => {
    photoEdit.classList.remove(`hidden`);
    document.querySelector(`body`).classList.add(`modal-open`);
    document.addEventListener(`keydown`, onPhotoEditEscPress);
  };

  const photoEditClose = () => {
    photoEdit.classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onPhotoEditEscPress);
  };

  uploadCloseBtn.addEventListener(`click`, () => {
    photoEditClose();
  });

  uploadFile.addEventListener(`change`, () => {
    photoEditOpen();

    if (uploadFile.files && uploadFile.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        photoPrew.setAttribute(`src`, e.target.result);
      };
      reader.readAsDataURL(uploadFile.files[0]);
    }
  });

})();
