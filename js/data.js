'use strict';

(function () {
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

  // Возвращается массив фотографий
  const photosArray = (count) => {
    const photos = [];
    for (let i = 1; i <= count; i++) {
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
  window.dataModule = {
    photosArray
  };
})();