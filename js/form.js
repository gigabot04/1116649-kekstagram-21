'use strict';

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
