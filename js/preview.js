'use strict';

(function () {
  // Полноэкранный размер фото
  const bigPictureCansel = document.querySelector(`.big-picture__cancel`);
  const bigPictute = document.querySelector(`.big-picture`);
  const bigPictureImg = document.querySelector(`.big-picture__img`).querySelector(`img`);
  const bigPictureLikes = document.querySelector(`.likes-count`);
  const bigPictureComments = document.querySelector(`.comments-count`);
  const socialComments = document.querySelector(`.social__comments`);
  const socialComment = document.querySelector(`#comment`).content;
  const bigPictureDesct = document.querySelector(`.social__caption`);

  const onPictureEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      bigPictute.classList.add(`hidden`);
      document.querySelector(`body`).classList.remove(`modal-open`);
    }
  };

  const pictureOpen = () => {
    bigPictute.classList.remove(`hidden`);
    document.querySelector(`body`).classList.add(`modal-open`);
    document.addEventListener(`keydown`, onPictureEscPress);
  };

  const pictureClose = () => {
    bigPictute.classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onPictureEscPress);
  };

  bigPictureCansel.addEventListener(`click`, pictureClose);

  const createComment = (comments) => {
    const fragmentComments = document.createDocumentFragment();

    comments.forEach((comment) => {
      const copyComment = socialComment.cloneNode(true);

      copyComment.querySelector(`.social__picture`).src = comment.avatar;
      copyComment.querySelector(`.social__picture`).alt = comment.name;
      copyComment.querySelector(`.social__text`).textContent = comment.message;

      fragmentComments.appendChild(copyComment);
    });

    return fragmentComments;
  };

  bigPictureDesct.textContent = `Описание фото`;

  // Прячем счётчик .social__comment-count и .comments-loader
  document.querySelector(`.social__comment-count`).classList.add(`hidden`);
  document.querySelector(`.comments-loader`).classList.add(`hidden`);

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

})();
