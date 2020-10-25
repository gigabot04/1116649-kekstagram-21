'use strict';

const photoPrew = document.querySelector(`.img-upload__preview img`);
const photoEdit = document.querySelector(`.img-upload__overlay`);
const uploadCloseBtn = document.querySelector(`.img-upload__cancel`);
const scaleBtnMin = document.querySelector(`.scale__control--smaller`);
const scaleBtnMax = document.querySelector(`.scale__control--bigger`);
const scaleControlNum = document.querySelector(`.scale__control--value`);
let uploadInput;
let scale = 100;

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

const uploadFile = (evt) => {
  uploadInput = evt.target;
  editOpenPhoto();

  if (uploadInput.files && uploadInput.files[0]) {
    const reader = new FileReader();
    reader.addEventListener(`load`, (e) => {
      photoPrew.setAttribute(`src`, e.target.result);
    });
    reader.readAsDataURL(uploadInput.files[0]);
  }
};

uploadCloseBtn.addEventListener(`click`, () => {
  photoEditClose();
});

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
  uploadFile,
  photoEditClose,
  onPhotoEditEscPress
};
