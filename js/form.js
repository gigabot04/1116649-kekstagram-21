'use strict';

(function () {
// Добавление эффектов на превью
  // Перемещение ползунка (пин)
  const commentArea = document.querySelector(`.text__description`);
  const prewEffect = document.querySelectorAll(`.effects__item`);
  const pinLevel = document.querySelector(`.effect-level__pin`);
  const re = /^#[\w]*$/;
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

  const init = (photoPrew, onPhotoEditEscPress) => {
    for (let i = 0; i < prewEffect.length; i++) {
      prewEffect[i].addEventListener(`click`, () => {
        const spanPrewEffect = prewEffect[i].querySelector(`.effects__preview`).classList[1];
        photoPrew.className = ``;
        photoPrew.classList.add(spanPrewEffect);
        photoPrew.style.filter = ``;
      });
    }

    // код для mouseup

    pinLevel.addEventListener(`mouseup`, () => {
      const inputEffect = document.querySelector(`.effects__radio:checked`).value;
      const inputPin = document.querySelector(`.effect-level__value`).value;
      photoPrew.style.filter = prewFilters[inputEffect](inputPin);
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


    pushFormPrew.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const arrayHashtag = hashtagsInput.value.split(` `);
      let boolean = true;

      for (let i = 0; i < arrayHashtag.length; i++) {
        arrayHashtag[i] = arrayHashtag[i].toUpperCase();
        if (!isValidHashtag(arrayHashtag[i]) || arrayHashtag.some(isDublicateHashtag) || arrayHashtag.length > 5) {
          boolean = false;
        }
      }

      if (!boolean) {
        hashtagsInput.setCustomValidity(`Есть неправильные хеш-теги`);
        hashtagsInput.reportValidity();
      }
    });
  };

  window.formModule = {
    init
  };
})();
