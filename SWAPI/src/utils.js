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

export let controller = new AbortController();

export async function showAllInfos(character) {

    controller.abort();
    controller = new AbortController();
    modalInfosBody.innerText = "Carregando...";

    const p = document.createElement("p");
    p.innerText = `Ano de nascimento: ${character.birth_year}\n 
      Cor dos olhos: ${character.eye_color}\n 
      Filmes em que participou: ${(await getFilmsByAPI(character.films, controller.signal))}\n
      Gênero: ${character.gender}\n 
      Cor do cabelo: ${character.hair_color}\n 
      Casa: ${await getHomeWorldsByAPI(character.homeworld, controller.signal)}\n 
      Cor da pele: ${character.skin_color}\n 
      Naves: ${await getStarShipsByAPI(character.starships, controller.signal)}\n 
      Veículos: ${await getVehiclesByAPI(character.vehicles, controller.signal)}\n`;

    modalInfosBody.innerHTML = "";
    modalInfosBody.appendChild(p);
}