'use strict';

const uploadFile = document.querySelector(`#upload-file`);
uploadFile.addEventListener(`change`, window.pictureModule.uploadFile);
window.backend.load(window.filtersModule.loadingSuccess, window.formModule.uploadError);
