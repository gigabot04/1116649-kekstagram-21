'use strict';

{
  const picture = document.querySelector(`.pictures`);
  const btnFilters = document.querySelectorAll(`.img-filters__button`);
  const btnFilterDefault = document.querySelector(`#filter-default`);
  const btnFilterRandom = document.querySelector(`#filter-random`);
  const btnFilterDiscussed = document.querySelector(`#filter-discussed`);
  const RANDOM_PICTURES = 10;

  const randNum = (arr) => {
    return Math.floor(Math.random() * arr.length);
  };

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
  };

  const filteredPictures = (arr) => {
    if (btnFilterDefault.classList.contains(`img-filters__button--active`)) {
      createPictures(arr);
    } else if (btnFilterRandom.classList.contains(`img-filters__button--active`)) {

      let randPic = [];

      while (randPic.length < RANDOM_PICTURES) {
        const randPicture = arr[randNum(arr)];
        if (!randPic.includes(randPicture)) {
          randPic.push(randPicture);
        }
      }

      createPictures(randPic);

    } else if (btnFilterDiscussed.classList.contains(`img-filters__button--active`)) {
      console.log(2);
    }
  };

  for (let i = 0; i < btnFilters.length; i++) {
    btnFilters[i].addEventListener(`click`, () => {
      const btnFilterAct = document.querySelector(`.img-filters__button--active`);
      btnFilterAct.classList.remove(`img-filters__button--active`);
      btnFilters[i].classList.add(`img-filters__button--active`);
      filteredPictures(picturesArray);
    });
  }

  window.filtersModule = {
    filteredPictures,
    createPictures,
    successLoad
  };
}
