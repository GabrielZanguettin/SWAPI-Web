import { loadCharacters, loadFilms, loadPlanets } from "./api.js";
import { filterCharacters, orderPlanets, orderFilms, searchCharacter } from "./filter.js"
import { toggleModalInfos, toggleModalFilms } from "./modals.js";
import { sounds, controller } from "./utils.js";

const filterBtn = document.querySelector("#filter-btn");
const orderPlanetsBtn = document.querySelector("#order-btn");
const orderFilmsBtn = document.querySelector("#films-btn");
const closeModalInfosBtn = document.querySelector("#close-modal-infos");
const closeModalFilmsBtn = document.querySelector("#close-modal-films");
const helpBtn = document.querySelector("#need-help-btn");
const searchInput = document.querySelector("#search-input");

filterBtn.addEventListener("change", (e) => {
  const filterValue = e.target.value;
  filterCharacters(filterValue);
});

orderPlanetsBtn.addEventListener("change", (e) => {
  const orderPlanetValue = e.target.value;
  orderPlanets(orderPlanetValue);
})

orderFilmsBtn.addEventListener("change", (e) => {
  const orderFilmValue = e.target.value;
  orderFilms(orderFilmValue);
});

closeModalInfosBtn.addEventListener("click", () => {
  controller.abort();
  toggleModalInfos();
})

closeModalFilmsBtn.addEventListener("click", () => {
  toggleModalFilms();
})


helpBtn.addEventListener("mouseenter", () => {
  sounds[0].play();
  sounds[1].pause();
  sounds[1].currentTime = 0;
  sounds[0].currentTime = 0;
})

helpBtn.addEventListener("mouseleave", () => {
  sounds[1].play();
  sounds[0].pause();
  sounds[0].currenTime = 0;
  sounds[1].currentTime = 0;
})

helpBtn.addEventListener("click", () => {
  toggleModalFilms();
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchCharacter(e.target.value);
  }
});

loadCharacters();
loadPlanets();
loadFilms();