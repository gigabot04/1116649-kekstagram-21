'use strict';

const picture = document.querySelector(`.pictures`);
const btnFilters = document.querySelectorAll(`.img-filters__button`);
const btnFilterRandom = document.querySelector(`#filter-random`);
const btnFilterDiscussed = document.querySelector(`#filter-discussed`);
const RANDOM_PICTURES = 10;

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

const loadingSuccess = (data) => {
  picturesArray = data;
  window.filtersModule.filterPictures(picturesArray);
  const imgFilters = document.querySelector(`.img-filters`);
  imgFilters.classList.remove(`img-filters--inactive`);
};

const filterPictures = (arr) => {
  let pics = arr;
  if (btnFilterRandom.classList.contains(`img-filters__button--active`)) {
    pics = [...arr].sort(() => Math.random() - 0.5).slice(0, RANDOM_PICTURES);
  } else if (btnFilterDiscussed.classList.contains(`img-filters__button--active`)) {
    pics = [...picturesArray].sort((a, b) => {
      return b.comments.length - a.comments.length;
    });
  }
  createPictures(pics);
};

btnFilters.forEach((btn) => {
  btn.addEventListener(`click`, () => {
    const btnFilterAct = document.querySelector(`.img-filters__button--active`);
    btnFilterAct.classList.remove(`img-filters__button--active`);
    btn.classList.add(`img-filters__button--active`);
    window.helpersModule.debounce(() => {
      return filterPictures(picturesArray);
    });
  });
});

window.filtersModule = {
  filterPictures,
  createPictures,
  loadingSuccess
};
