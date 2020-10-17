'use strict';

{
// Добавление эффектов на превью
  // Перемещение ползунка (пин)
  const commentArea = document.querySelector(`.text__description`);
  const prewEffect = document.querySelectorAll(`.effects__item`);
  const uploadForm = document.querySelector(`.img-upload__form`);
  const pinLevel = document.querySelector(`.effect-level__pin`);
  const depthLevel = document.querySelector(`.effect-level__depth`);
  const re = /^#[a-zA-Zа-яА-ЯЁё0-9]*$/;
  const pushFormPrew = document.querySelector(`.img-upload__submit`);
  // Валидация хештегов
  const hashtagsInput = document.querySelector(`.text__hashtags`);
  const prewFilters = {
    sepia: (value) => {
      return `sepia(${value / 100})`;
    },
    grayscale: (value) => {
      return `grayscale(${value / 100})`;
    },
    invert: (value) => {
      return `invert(${value}%)`;
    },
    blur: (value) => {
      return `blur(${value * 3 / 100}px)`;
    },
    brightness: (value) => {
      return `brightness(${(value * 2 / 100) + 1})`;
    },
    none: () => {
      return ``;
    }
  };

  const isValidHashtag = (hashtag) => {
    return hashtag !== `#` && re.test(hashtag) && hashtag.length > 2 && hashtag.length < 20;
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
    for (let i = 0; i < prewEffect.length; i++) {
      prewEffect[i].addEventListener(`click`, () => {
        const spanPrewEffect = prewEffect[i].querySelector(`.effects__preview`).classList[1];
        photoPrew.className = ``;
        photoPrew.classList.add(spanPrewEffect);
        photoPrew.style.filter = ``;
        pinLevel.style.left = `100%`;
        depthLevel.style.width = `100%`;
      });
    }

    const MOVEPIN_MIN = 0;
    const MOVEPIN_MAX = 453;

    // код для movepin

    pinLevel.addEventListener(`mousedown`, (evt) => {
      evt.preventDefault();
      const inputEffect = document.querySelector(`.effects__radio:checked`).value;
      let startCoordsX = evt.clientX;

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        let shift = startCoordsX - moveEvt.clientX;

        startCoordsX = moveEvt.clientX;

        pinLevel.style.left = `${(pinLevel.offsetLeft - shift) / (MOVEPIN_MAX / 100)}%`;
        depthLevel.style.width = `${(pinLevel.offsetLeft - shift) / (MOVEPIN_MAX / 100)}%`;

        photoPrew.style.filter = prewFilters[inputEffect]((pinLevel.offsetLeft - shift) / (MOVEPIN_MAX / 100));


        if (pinLevel.offsetLeft <= MOVEPIN_MIN) {
          pinLevel.style.left = `0%`;
          depthLevel.style.width = `0%`;
        } else if (pinLevel.offsetLeft >= MOVEPIN_MAX) {
          pinLevel.style.left = `100%`;
          depthLevel.style.width = `100%`;
        }
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    });

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


    pushFormPrew.addEventListener(`click`, () => {
      const arrayHashtag = hashtagsInput.value.split(` `);
      let boolean = true;

      for (let i = 0; i < arrayHashtag.length; i++) {
        arrayHashtag[i] = arrayHashtag[i].toUpperCase();
        if (hashtagsInput.value !== `` && (!isValidHashtag(arrayHashtag[i]) || arrayHashtag.some(isDublicateHashtag) || arrayHashtag.length > 5)) {
          boolean = false;
        }
      }

      if (!boolean) {
        hashtagsInput.setCustomValidity(`Есть неправильные или повторяющиеся хеш-теги`);
        hashtagsInput.reportValidity();
      }
    });

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

    const successMessage = () => {
      const fragmentSuccess = document.createDocumentFragment();
      const templateSuccess = document.querySelector(`#success`).content;
      const copyTemplateSucces = templateSuccess.cloneNode(true);
      fragmentSuccess.appendChild(copyTemplateSucces);
      document.querySelector(`main`).appendChild(fragmentSuccess);

      // Удалить прослушку на кнопку

      document.addEventListener(`keydown`, onMessageSuccessEscPress);

      document.querySelector(`.success__button`).addEventListener(`click`, () => {
        document.querySelector(`.success`).remove();
      });
    };
    const errorMessage = () => {
      const fragmentError = document.createDocumentFragment();
      const templateError = document.querySelector(`#error`).content;
      const copyTemplateError = templateError.cloneNode(true);
      fragmentError.appendChild(copyTemplateError);
      document.querySelector(`main`).appendChild(fragmentError);

      // Удалить прослушку на кнопку

      document.addEventListener(`keydown`, onMessageErrorEscPress);

      // СДЕЛАТЬ ВЫБОР НОВОГО ФАЙЛА, А НЕ УДАЛЕНИЕ

      document.querySelector(`.error__button`).addEventListener(`click`, () => {
        document.querySelector(`.error`).remove();
      });
    };

    uploadForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      window.backend.upload(
          new FormData(uploadForm),
          // success
          () => {
            uploadForm.reset();
            window.pictureModule.photoEditClose();
            successMessage();
          },
          // error
          () => {
            window.pictureModule.photoEditClose();
            errorMessage();
          });
    });
  };

  window.formModule = {
    init,
    uploadError
  };
}
