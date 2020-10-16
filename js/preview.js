'use strict';

{
  const bigPictureImg = document.querySelector(`.big-picture__img`).querySelector(`img`);
  const bigPictureLikes = document.querySelector(`.likes-count`);
  const bigPictureComments = document.querySelector(`.comments-count`);
  const bigPictureDesc = document.querySelector(`.social__caption`);
  const socialComments = document.querySelector(`.social__comments`);
  const socialComment = document.querySelector(`#comment`).content;
  const bigPictute = document.querySelector(`.big-picture`);
  const bigPictureCansel = document.querySelector(`.big-picture__cancel`);

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

  const onPictureEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      bigPictute.classList.add(`hidden`);
      document.querySelector(`body`).classList.remove(`modal-open`);
    }
  };

  const closePicture = () => {
    bigPictute.classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onPictureEscPress);

    bigPictureCansel.removeEventListener(`click`, closePicture);
  };

  const openPicture = (photo) => {
    bigPictureImg.src = photo.url;
    bigPictureLikes.textContent = photo.likes;
    bigPictureComments.textContent = photo.comments.length;
    bigPictureDesc.textContent = photo.description;

    // Прячем счётчик .social__comment-count и .comments-loader
    document.querySelector(`.social__comment-count`).classList.add(`hidden`);
    document.querySelector(`.comments-loader`).classList.add(`hidden`);

    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }

    socialComments.appendChild(createComment(photo.comments));

    bigPictute.classList.remove(`hidden`);
    document.querySelector(`body`).classList.add(`modal-open`);
    document.addEventListener(`keydown`, onPictureEscPress);

    bigPictureCansel.addEventListener(`click`, closePicture);
  };

  window.previewModule = {
    openPicture
  };
}
