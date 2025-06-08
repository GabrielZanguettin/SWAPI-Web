import { getFilmsByAPI, getHomeWorldsByAPI, getStarShipsByAPI, getVehiclesByAPI } from "./api.js";

export const sounds = [
  new Audio("./audios/lightsaberon.mp3"),
  new Audio("./audios/lightsaberoff.mp3"),
];

const modalInfosBody = document.querySelector("#modal-infos-body");

export function formatPopulation(population) {
    if (population === "unknown") return "unknown";
    return Number(population).toLocaleString("pt-BR");
}

export function resetBorderOfFilms() {
  const films = document.querySelectorAll(".film");
  films.forEach((film) => {
    film.style.border = "1px solid #202124";
  });
}

export let controller = new AbortController();

const arrayInfoCharacter = [];

export async function showAllInfos(character) {
    controller.abort();
    controller = new AbortController();
    modalInfosBody.innerText = "Carregando...";

    if (arrayInfoCharacter.length > 0 && arrayInfoCharacter[0] === character.name) {
        modalInfosBody.innerHTML = "";
        modalInfosBody.appendChild(arrayInfoCharacter[1]);
        return;
    }

    arrayInfoCharacter.length = 0;

    const p = document.createElement("p");

    try {
        p.innerText = `Ano de nascimento: ${character.birth_year}\n 
        Cor dos olhos: ${character.eye_color}\n 
        Filmes em que participou: ${(await getFilmsByAPI(character.films, controller.signal))}\n
        Gênero: ${character.gender}\n 
        Cor do cabelo: ${character.hair_color}\n 
        Casa: ${await getHomeWorldsByAPI(character.homeworld, controller.signal)}\n 
        Cor da pele: ${character.skin_color}\n 
        Naves: ${await getStarShipsByAPI(character.starships, controller.signal)}\n 
        Veículos: ${await getVehiclesByAPI(character.vehicles, controller.signal)}\n`;
        
        
        arrayInfoCharacter.push(character.name, p);

    } catch (error) {
        console.error(error);
    }

    modalInfosBody.innerHTML = "";
    modalInfosBody.appendChild(p);
}