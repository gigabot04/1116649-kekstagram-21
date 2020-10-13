'use strict';

{
  const PICTURE_COUNT = 25;
  const picture = document.querySelector(`.pictures`);
  const fragmentPhoto = document.createDocumentFragment();
  const photoArray = window.dataModule.photosArray(PICTURE_COUNT);
  const uploadFile = document.querySelector(`#upload-file`);

  photoArray.forEach((photo) => {
    fragmentPhoto.appendChild(window.galleryModule.renderPhoto(photo));
  });

  picture.appendChild(fragmentPhoto);

  uploadFile.addEventListener(`change`, window.pictureModule.uploadFile);
}
