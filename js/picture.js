'use strict';

{
  const photoPrew = document.querySelector(`.img-upload__preview img`);
  const photoEdit = document.querySelector(`.img-upload__overlay`);
  const uploadCloseBtn = document.querySelector(`.img-upload__cancel`);
  let uploadInput;

  const onPhotoEditEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      photoEditClose();
    }
  };

  const editOpenPhoto = () => {
    photoEdit.classList.remove(`hidden`);
    document.querySelector(`body`).classList.add(`modal-open`);
    document.addEventListener(`keydown`, onPhotoEditEscPress);


    window.formModule.init(photoPrew, onPhotoEditEscPress);
  };

  const photoEditClose = () => {
    photoEdit.classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onPhotoEditEscPress);
    if (uploadInput) {
      uploadInput.value = ``;
    }
  };

  uploadCloseBtn.addEventListener(`click`, () => {
    photoEditClose();
  });


  const uploadFile = (evt) => {
    uploadInput = evt.target;
    editOpenPhoto();

    if (uploadInput.files && uploadInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        photoPrew.setAttribute(`src`, e.target.result);
      };
      reader.readAsDataURL(uploadInput.files[0]);
    }
  };

  // Изменение размера изображения

  const scaleBtnMin = document.querySelector(`.scale__control--smaller`);
  const scaleBtnMax = document.querySelector(`.scale__control--bigger`);
  const scaleControlNum = document.querySelector(`.scale__control--value`);
  let scale = 100;

  scaleBtnMin.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    if (scale > 25) {
      scale -= 25;
      scaleControlNum.value = `${scale}%`;
      photoPrew.style.transform = `scale(${scale / 100})`;
    }
  });

  scaleBtnMax.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    if (scale < 100) {
      scale += 25;
      scaleControlNum.value = `${scale}%`;
      photoPrew.style.transform = `scale(${scale / 100})`;
    }
  });

  window.pictureModule = {
    uploadFile
  };
}
