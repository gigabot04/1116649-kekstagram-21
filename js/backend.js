'use strict';

{
  const load = (onLoad, onError) => {
    const URL = `https://21.javascript.pages.academy/kekstagram/data`;
    const xhr = new XMLHttpRequest();
    const TIMEOUT = 10000;

    xhr.responseType = `json`;

    xhr.open(`GET`, URL);

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
    const URL = `https://21.javascript.pages.academy/kekstagram/`;
    const TIMEOUT = 10000;
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      onLoad(xhr.response);
    });
    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });
    xhr.timeout = TIMEOUT;
    xhr.open(`POST`, URL);
    xhr.send(data);
  };

  window.backend = {
    load,
    upload
  };
}
