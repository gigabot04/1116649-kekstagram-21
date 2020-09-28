'use strict';

const template = document.querySelector(`#picture`).content.querySelector(`.picture`);
const picture = document.querySelector(`.pictures`);
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

// К каждому элементу присваевается свой URL COMENTS LIKES
const renderPhoto = (photo) => {
  const photoElement = template.cloneNode(true);

  photoElement.querySelector(`.picture__img`).src = photo.url;
  photoElement.querySelector(`.picture__likes`).textContent = photo.likes;
  photoElement.querySelector(`.picture__comments`).textContent = photo.comments.length;

  return photoElement;
};

const fragmentPhoto = document.createDocumentFragment();
const photoArray = photosArray();

for (let i = 0; i < 25; i++) {
  fragmentPhoto.appendChild(renderPhoto(photoArray[i]));
}
picture.appendChild(fragmentPhoto);


// Полноэкранный размер фото

const bigPictute = document.querySelector(`.big-picture`);
const bigPictureImg = document.querySelector(`.big-picture__img`).querySelector(`img`);
const bigPictureLikes = document.querySelector(`.likes-count`);
const bigPictureComments = document.querySelector(`.comments-count`);
const socialComments = document.querySelector(`.social__comments`);
const socialComment = document.querySelectorAll(`.social__comment`);
const bigPictureDesct = document.querySelector(`.social__caption`);
const fragmentComments = document.createDocumentFragment();

bigPictute.classList.remove(`hidden`);

// Пока для одной фотки
for (let i = 0; i < photoArray.length; i++) {
  bigPictureImg.src = `photos/1.jpg`;
  bigPictureLikes.textContent = photoArray[0].likes;
  bigPictureComments.textContent = photoArray[0].comments.length;
}

const createComment = (comments) => {
  const copyComment = socialComment[0].cloneNode(true);

  copyComment.querySelector(`.social__picture`).src = comments.avatar;
  copyComment.querySelector(`.social__picture`).alt = comments.name;
  copyComment.querySelector(`.social__text`).textContent = comments.message;

  return copyComment;
};

const comments = commentsArray();

for (let i = 0; i < comments.length; i++) {
  fragmentComments.appendChild(createComment(comments[i]));
}


// удаляем все комменты с разметки
for (let i = 0; i < socialComment.length; i++) {
  socialComment[i].remove();
}

socialComments.appendChild(fragmentComments);

bigPictureDesct.textContent = `Описание фото`;

// Прячем счётчик .social__comment-count и .comments-loader
document.querySelector(`.social__comment-count`).classList.add(`hidden`);
document.querySelector(`.comments-loader`).classList.add(`hidden`);
document.querySelector(`body`).classList.add(`modal-open`);
