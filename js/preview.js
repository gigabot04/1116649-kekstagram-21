'use strict';

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

const comments = [];
const hiddenComment = [];

const commentLoad = document.querySelector(`.comments-loader`);
const commentLot = document.querySelector(`.social__comment-count`);

const closePicture = () => {
  bigPictute.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, onPictureEscPress);
  while (comments.length) {
    comments.pop();
  }
  while (hiddenComment.length) {
    hiddenComment.pop();
  }
  commentLoad.removeEventListener(`click`, loadComment);
  bigPictureCansel.removeEventListener(`click`, closePicture);
};

const loadComment = () => {
  socialComments.appendChild(createComment(hiddenComment.splice(0, 5)));
  if (hiddenComment.length === 0) {
    commentLoad.classList.add(`hidden`);
    commentLot.classList.add(`hidden`);
  }
};

const openPicture = (photo) => {
  comments.push(...photo.comments);
  hiddenComment.push(...comments.splice(5, comments.length));


  commentLoad.classList.remove(`hidden`);
  commentLot.classList.remove(`hidden`);

  bigPictureImg.src = photo.url;
  bigPictureLikes.textContent = photo.likes;
  bigPictureComments.textContent = photo.comments.length;
  bigPictureDesc.textContent = photo.description;

  commentLoad.addEventListener(`click`, loadComment);

  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }

  socialComments.appendChild(createComment(comments));

  bigPictute.classList.remove(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
  document.addEventListener(`keydown`, onPictureEscPress);

  bigPictureCansel.addEventListener(`click`, closePicture);
};

window.previewModule = {
  openPicture
};
