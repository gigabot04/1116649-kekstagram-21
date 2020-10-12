'use strict';

(function () {
  // Создаем массив с комментами
  const commentsArray = () => {
    const comments = [];

    for (let i = 0; i < getRandom(0, 20); i++) {
      const comment = {
        avatar: `img/avatar-${window.getRandom(1, 7)}.svg`,
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
})();
