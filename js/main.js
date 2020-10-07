'use strict';

const template = document.querySelector(`#picture`).content.querySelector(`.picture`);
const picture = document.querySelector(`.pictures`);
const commentArea = document.querySelector(`.text__description`);
const message = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];
const names = [
  `Артем`,
  `Настя`,
  `Инна`,
  `Костя`,
  `Артур`,
  `Глеб`,
  `Андрей`
];

// Рандомное число
const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Создаем массив с комментами
const commentsArray = () => {
  const comments = [];

  for (let i = 0; i < getRandom(0, 20); i++) {
    const comment = {
      avatar: `img/avatar-${getRandom(1, 7)}.svg`,
      message: message[getRandom(0, 6)],
      name: names[getRandom(0, 7)]
    };
    comments.push(comment);
  }
  return comments;
};

// Возвращается массив из 25 элементов
const photosArray = () => {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
    const photo = {
      url: `photos/${i}.jpg`,
      description: `Описание фото`,
      likes: getRandom(15, 200),
      comments: commentsArray()
    };
    photos.push(photo);
  }
  return photos;
};

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

// Полноэкранный размер фото
const bigPictureCansel = document.querySelector(`.big-picture__cancel`);
const bigPictute = document.querySelector(`.big-picture`);
const bigPictureImg = document.querySelector(`.big-picture__img`).querySelector(`img`);
const bigPictureLikes = document.querySelector(`.likes-count`);
const bigPictureComments = document.querySelector(`.comments-count`);
const socialComments = document.querySelector(`.social__comments`);
const socialComment = document.querySelector(`#comment`).content;
const bigPictureDesct = document.querySelector(`.social__caption`);

const onPictureEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    bigPictute.classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
  }
};

const pictureOpen = () => {
  bigPictute.classList.remove(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
  document.addEventListener(`keydown`, onPictureEscPress);
};

const pictureClose = () => {
  bigPictute.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, onPictureEscPress);
};

bigPictureCansel.addEventListener(`click`, pictureClose);

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

bigPictureDesct.textContent = `Описание фото`;

// Прячем счётчик .social__comment-count и .comments-loader
document.querySelector(`.social__comment-count`).classList.add(`hidden`);
document.querySelector(`.comments-loader`).classList.add(`hidden`);

// Загрузка изображения

const photoEdit = document.querySelector(`.img-upload__overlay`);
const photoPrew = document.querySelector(`.img-upload__preview img`);
const uploadFile = document.querySelector(`#upload-file`);
const uploadCloseBtn = document.querySelector(`.img-upload__cancel`);

const onPhotoEditEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    photoEdit.classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
  }
};

const photoEditOpen = () => {
  photoEdit.classList.remove(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
  document.addEventListener(`keydown`, onPhotoEditEscPress);
};

const photoEditClose = () => {
  photoEdit.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, onPhotoEditEscPress);
};

uploadCloseBtn.addEventListener(`click`, () => {
  photoEditClose();
});

uploadFile.addEventListener(`change`, () => {
  photoEditOpen();

  if (uploadFile.files && uploadFile.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      photoPrew.setAttribute(`src`, e.target.result);
    };
    reader.readAsDataURL(uploadFile.files[0]);
  }
});

// Изменение размера изображения

const scaleBtnMin = document.querySelector(`.scale__control--smaller`);
const scaleBtnMax = document.querySelector(`.scale__control--bigger`);
const scaleControlNum = document.querySelector(`.scale__control--value`);
let scale = 100;

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

// Добавление эффектов на превью
// Перемещение ползунка (пин)

const prewEffect = document.querySelectorAll(`.effects__item`);
const pinLevel = document.querySelector(`.effect-level__pin`);
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

// Валидация хештегов
const hashtagsInput = document.querySelector(`.text__hashtags`);

hashtagsInput.addEventListener(`focus`, () => {
  document.removeEventListener(`keydown`, onPhotoEditEscPress);
});

hashtagsInput.addEventListener(`blur`, () => {
  document.addEventListener(`keydown`, onPhotoEditEscPress);
});

const re = /^#[\w]*$/;
const pushFormPrew = document.querySelector(`.img-upload__submit`);

const isValidHashtag = (hashtag) => {
  return hashtag !== `#` && re.test(hashtag) && hashtag.length > 2 && hashtag.length < 20;
};

const isDublicateHashtag = (element, index, array) => {
  return array.indexOf(element) !== index;
};

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

// УБРАЛ ЗАКРЫТИЕ ПРИ ФОКУСЕ НА КОММЕНТАРИЙ
commentArea.addEventListener(`focus`, () => {
  document.removeEventListener(`keydown`, onPhotoEditEscPress);
});

commentArea.addEventListener(`blur`, () => {
  document.addEventListener(`keydown`, onPhotoEditEscPress);
});

// --------------------------------------------//
// НЕ СДЕЛАНО: ОЧИСТКА iNPUT ЗАГРУЗКИ ФАЙЛА!!! //
// --------------------------------------------//
