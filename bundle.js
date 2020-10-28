/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!*****************************!*\
  !*** ./js/helpersModule.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


let lastTimeout;
const debounce = (cb, timeout = 500) => {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(cb, timeout);
};
window.helpersModule = {
  debounce
};

})();

(() => {
/*!***********************!*\
  !*** ./js/filters.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const picture = document.querySelector(`.pictures`);
const btnFilters = document.querySelectorAll(`.img-filters__button`);
const btnFilterRandom = document.querySelector(`#filter-random`);
const btnFilterDiscussed = document.querySelector(`#filter-discussed`);
const RANDOM_PICTURES = 10;

const createPictures = (arr) => {
  while (document.querySelector(`.picture`)) {
    document.querySelector(`.picture`).remove();
  }

  const fragmentPhoto = document.createDocumentFragment();

  arr.forEach((photo) => {
    fragmentPhoto.appendChild(window.galleryModule.renderPhoto(photo));
  });

  picture.appendChild(fragmentPhoto);
};

let picturesArray = [];

const successLoad = (data) => {
  picturesArray = data;
  window.filtersModule.filteredPictures(picturesArray);
  const imgFilters = document.querySelector(`.img-filters`);
  imgFilters.classList.remove(`img-filters--inactive`);
};

const filteredPictures = (arr) => {
  let pics = arr;
  if (btnFilterRandom.classList.contains(`img-filters__button--active`)) {
    pics = [...arr].sort(() => Math.random() - 0.5).slice(0, RANDOM_PICTURES);
  } else if (btnFilterDiscussed.classList.contains(`img-filters__button--active`)) {
    pics = [...picturesArray].sort((a, b) => {
      return b.comments.length - a.comments.length;
    });
  }
  createPictures(pics);
};

btnFilters.forEach((btn) => {
  btn.addEventListener(`click`, () => {
    const btnFilterAct = document.querySelector(`.img-filters__button--active`);
    btnFilterAct.classList.remove(`img-filters__button--active`);
    btn.classList.add(`img-filters__button--active`);
    window.helpersModule.debounce(() => {
      return filteredPictures(picturesArray);
    });
  });
});

window.filtersModule = {
  filteredPictures,
  createPictures,
  successLoad
};

})();

(() => {
/*!***********************!*\
  !*** ./js/backend.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const uploadURL = `https://21.javascript.pages.academy/kekstagram/`;
const TIMEOUT = 10000;

const loadURL = `https://21.javascript.pages.academy/kekstagram/data`;

const load = (onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.open(`GET`, loadURL);

  xhr.addEventListener(`load`, () => {
    const error = ``;
    switch (xhr.status) {
      case 200:
        onLoad(xhr.response);
        break;
      case 400:
        error = `Неверный запрос`;
        break;
      case 401:
        error = `Пользователь не авторизован`;
        break;
      case 404:
        error = `Ничего не найдено`;
        break;
      default:
        error = `Cтатус ответа: : ${xhr.status} ${xhr.statusText}`;
    }
    if (error) {
      onError(error);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT;
  xhr.send();
};

const upload = (data, onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    onLoad(xhr.response);
  });
  xhr.addEventListener(`error`, () => {
    onError();
  });
  xhr.addEventListener(`timeout`, () => {
    onError();
  });
  xhr.timeout = TIMEOUT;
  xhr.open(`POST`, uploadURL);
  xhr.send(data);
};

window.backend = {
  load,
  upload
};

})();

(() => {
/*!***********************!*\
  !*** ./js/picture.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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
  document.querySelector(`.img-upload__preview img`).removeAttribute(`style`, ``);
  document.querySelector(`.img-upload__preview img`).removeAttribute(`class`, ``);
  scale = 100;
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

})();

(() => {
/*!***********************!*\
  !*** ./js/preview.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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
  comments.length = 0;
  hiddenComment.length = 0;
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

})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const commentArea = document.querySelector(`.text__description`);
const prewEffect = document.querySelectorAll(`.effects__item`);
const uploadForm = document.querySelector(`.img-upload__form`);
const pinLevel = document.querySelector(`.effect-level__pin`);
const pinValue = document.querySelector(`.effect-level__value`);
const depthLevel = document.querySelector(`.effect-level__depth`);
const re = /^#[a-zA-Zа-яА-ЯЁё0-9]*$/;
const pushFormPrew = document.querySelector(`.img-upload__submit`);
const hashtagsInput = document.querySelector(`.text__hashtags`);

const PrewFilters = {
  sepia: (value) => {
    return `sepia(${value / 100})`;
  },
  chrome: (value) => {
    return `grayscale(${value / 100})`;
  },
  marvin: (value) => {
    return `invert(${value}%)`;
  },
  phobos: (value) => {
    return `blur(${value * 3 / 100}px)`;
  },
  heat: (value) => {
    return `brightness(${(value * 2 / 100) + 1})`;
  },
  none: () => {
    return ``;
  }
};

const isValidHashtag = (hashtag) => {
  return hashtag !== `#` && re.test(hashtag) && hashtag.length > 2 && hashtag.length <= 20;
};

const isDublicateHashtag = (element, index, array) => {
  return array.indexOf(element) !== index;
};
const uploadError = (errorMessage) => {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};
const init = (photoPrew, onPhotoEditEscPress) => {
  const effectItem = document.querySelectorAll(`.effects__item`);
  const effectLevel = document.querySelector(`.img-upload__effect-level`);
  const MOVEPIN_MIN = 0;
  const MOVEPIN_MAX = 453;

  // код для movepin

  const moveMouse = (evt) => {
    evt.preventDefault();
    const inputEffect = document.querySelector(`.effects__radio:checked`).value;
    let startCoordsX = evt.clientX;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      let shift = startCoordsX - moveEvt.clientX;

      startCoordsX = moveEvt.clientX;
      let numLevel = (pinLevel.offsetLeft - shift) / (MOVEPIN_MAX / 100);
      pinLevel.style.left = `${numLevel}%`;
      depthLevel.style.width = `${numLevel}%`;

      photoPrew.style.filter = PrewFilters[inputEffect](numLevel);

      pinValue.value = parseInt(numLevel, 10);

      if (pinLevel.offsetLeft <= MOVEPIN_MIN) {
        pinLevel.style.left = `0%`;
        depthLevel.style.width = `0%`;
      } else if (pinLevel.offsetLeft >= MOVEPIN_MAX) {
        pinLevel.style.left = `100%`;
        depthLevel.style.width = `100%`;
      }
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  effectLevel.classList.add(`hidden`);
  effectItem.forEach((item) => {
    item.addEventListener(`click`, () => {
      if (item.querySelector(`#effect-none`)) {
        effectLevel.classList.add(`hidden`);
      } else {
        effectLevel.classList.remove(`hidden`);
      }
    });
  });

  prewEffect.forEach((effect) => {
    effect.addEventListener(`click`, () => {
      const spanPrewEffect = effect.querySelector(`.effects__preview`).classList[1];
      photoPrew.className = ``;
      photoPrew.classList.add(spanPrewEffect);
      photoPrew.style.filter = ``;
      pinLevel.style.left = `100%`;
      depthLevel.style.width = `100%`;
    });
  });

  pinLevel.addEventListener(`mousedown`, moveMouse);

  // УБРАЛ ЗАКРЫТИЕ ПРИ ФОКУСЕ НА КОММЕНТАРИЙ
  commentArea.addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, onPhotoEditEscPress);
  });

  commentArea.addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, onPhotoEditEscPress);
  });

  hashtagsInput.addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, onPhotoEditEscPress);
  });

  hashtagsInput.addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, onPhotoEditEscPress);
  });

  const validatеHashtag = () => {
    const arrayHashtag = hashtagsInput.value.split(` `);
    let boolean = true;

    arrayHashtag.forEach((hashtag) => {
      hashtag = hashtag.toUpperCase();
      if (hashtagsInput.value !== `` && (!isValidHashtag(hashtag) || arrayHashtag.some(isDublicateHashtag) || arrayHashtag.length > 5)) {
        boolean = false;
      }
    });

    if (!boolean) {
      hashtagsInput.setCustomValidity(`Есть неправильные или повторяющиеся хеш-теги`);
      hashtagsInput.reportValidity();
    } else {
      hashtagsInput.setCustomValidity(``);
    }
  };

  pushFormPrew.addEventListener(`click`, validatеHashtag);

  const onMessageErrorEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      document.querySelector(`.error`).remove();
    }
  };
  const onMessageSuccessEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      document.querySelector(`.success`).remove();
    }
  };

  const getSuccessMessage = () => {
    const fragmentSuccess = document.createDocumentFragment();
    const templateSuccess = document.querySelector(`#success`).content;
    const copyTemplateSucces = templateSuccess.cloneNode(true);
    fragmentSuccess.appendChild(copyTemplateSucces);
    document.querySelector(`main`).appendChild(fragmentSuccess);

    document.addEventListener(`keydown`, onMessageSuccessEscPress);

    document.querySelector(`.success__button`).addEventListener(`click`, () => {
      document.removeEventListener(`keydown`, onMessageSuccessEscPress);
      document.querySelector(`.success`).remove();
    });
  };

  const getErrorMessage = () => {
    const fragmentError = document.createDocumentFragment();
    const templateError = document.querySelector(`#error`).content;
    const copyTemplateError = templateError.cloneNode(true);
    fragmentError.appendChild(copyTemplateError);
    document.querySelector(`main`).appendChild(fragmentError);

    document.addEventListener(`keydown`, onMessageErrorEscPress);

    document.querySelector(`.error__button`).addEventListener(`click`, () => {
      document.removeEventListener(`keydown`, onMessageErrorEscPress);
      document.querySelector(`.error`).remove();
    });
  };

  const submitForm = (evt) => {
    evt.preventDefault();
    pinLevel.removeEventListener(`mousedown`, moveMouse);
    document.removeEventListener(`keydown`, window.pictureModule.onPhotoEditEscPress);
    uploadForm.removeEventListener(`submit`, submitForm);
    window.backend.upload(
        new FormData(uploadForm),
        // success
        () => {
          uploadForm.reset();
          window.pictureModule.photoEditClose();
          getSuccessMessage();
          pushFormPrew.removeEventListener(`click`, validatеHashtag);
          document.querySelector(`.img-upload__preview img`).removeAttribute(`style`, ``);
          document.querySelector(`.img-upload__preview img`).removeAttribute(`class`, ``);
        },
        // error
        () => {
          window.pictureModule.photoEditClose();
          getErrorMessage();
        });
  };

  uploadForm.addEventListener(`submit`, submitForm);
};

window.formModule = {
  init,
  uploadError
};

})();

(() => {
/*!***********************!*\
  !*** ./js/gallery.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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

})();

(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const uploadFile = document.querySelector(`#upload-file`);

window.backend.load(window.filtersModule.successLoad, window.formModule.uploadError);

uploadFile.addEventListener(`change`, window.pictureModule.uploadFile);


})();

/******/ })()
;