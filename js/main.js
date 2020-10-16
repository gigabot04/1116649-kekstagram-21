'use strict';

{
  const picture = document.querySelector(`.pictures`);
  const uploadFile = document.querySelector(`#upload-file`);

  const createPictures = (arr) => {
    const fragmentPhoto = document.createDocumentFragment();

    arr.forEach((photo) => {
      fragmentPhoto.appendChild(window.galleryModule.renderPhoto(photo));
    });

    picture.appendChild(fragmentPhoto);
  };

  window.backend.load(
      createPictures
  );

  uploadFile.addEventListener(`change`, window.pictureModule.uploadFile);
}
