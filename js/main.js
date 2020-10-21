'use strict';

{

  const uploadFile = document.querySelector(`#upload-file`);

  window.backend.load(window.filtersModule.successLoad, window.formModule.uploadError);

  uploadFile.addEventListener(`change`, window.pictureModule.uploadFile);

}
