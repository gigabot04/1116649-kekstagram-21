'use strict';

(function () {
  const bigPictureImg = document.querySelector(`.big-picture__img`).querySelector(`img`);
  const bigPictureLikes = document.querySelector(`.likes-count`);
  const bigPictureComments = document.querySelector(`.comments-count`);
  const socialComments = document.querySelector(`.social__comments`);
  const template = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const picture = document.querySelector(`.pictures`);

  const openPicture = (photo) => {
    bigPictureImg.src = photo.url;
    bigPictureLikes.textContent = photo.likes;
    bigPictureComments.textContent = photo.comments.length;

    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }

    socialComments.appendChild(createComment(photo.comments));

    pictureOpen();
  };

  // К каждому элементу присваевается свой URL COMENTS LIKES
  const renderPhoto = (photo) => {
    const photoElement = template.cloneNode(true);

    photoElement.querySelector(`.picture__img`).src = photo.url;
    photoElement.querySelector(`.picture__likes`).textContent = photo.likes;
    photoElement.querySelector(`.picture__comments`).textContent = photo.comments.length;

    const picturePush = () => {
      openPicture(photo);
    };
    photoElement.addEventListener(`click`, picturePush);

    return photoElement;
  };

  const fragmentPhoto = document.createDocumentFragment();
  const photoArray = photosArray();

  for (let i = 0; i < 25; i++) {
    fragmentPhoto.appendChild(renderPhoto(photoArray[i]));
  }
  picture.appendChild(fragmentPhoto);
})();
