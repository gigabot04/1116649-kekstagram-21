'use strict';

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
