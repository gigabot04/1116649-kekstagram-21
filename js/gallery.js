'use strict';

{
  const template = document.querySelector(`#picture`).content.querySelector(`.picture`);

  const renderPhoto = (photo) => {
    const photoElement = template.cloneNode(true);

    photoElement.querySelector(`.picture__img`).src = photo.url;
    photoElement.querySelector(`.picture__likes`).textContent = photo.likes;
    photoElement.querySelector(`.picture__comments`).textContent = photo.comments.length;

    const clickPicture = () => {
      window.previewModule.openPicture(photo);
    };
    photoElement.addEventListener(`click`, clickPicture);

    return photoElement;
  };

  window.galleryModule = {
    renderPhoto
  };
}
