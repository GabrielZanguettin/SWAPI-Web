import { toggleModalInfos } from "./modals.js";
import { showAllInfos, formatPopulation } from "./utils.js";


export function createCharacters(character) {
    const div = document.createElement("div");
    div.classList.add("character");

    div.style.backgroundImage = `url('./img/${character.name}.jpg')`;
    div.style.backgroundPosition = "center";
    div.style.backgroundSize = "cover";

    const characterInfos = document.createElement("div");
    characterInfos.classList.add("infos");

    const h3 = document.createElement("h3");

    if (character.name === "Beru Whitesun lars") {
        h3.innerText = "Beru Lars";
        characterInfos.appendChild(h3);

    } else {
        h3.innerText = character.name;
        characterInfos.appendChild(h3);
    }

    const p1 = document.createElement("p");
    p1.innerText = `Altura: ${character.height}cm`
    characterInfos.appendChild(p1);

    const p2 = document.createElement("p");
    p2.innerText = `Peso: ${character.mass}kg`
    characterInfos.appendChild(p2);

    div.appendChild(characterInfos);

    const p3 = document.createElement("p");
    p3.classList.add("gender");
    p3.innerText = character.gender;
    p3.style.display = "none";
    div.appendChild(p3);

    const threeDotsButton = document.createElement("button");
    threeDotsButton.classList.add("get-info")
    div.appendChild(threeDotsButton);

    // Evento de elemento dinâmico

    threeDotsButton.addEventListener("click", () => {
        showAllInfos(character);
        toggleModalInfos();
    });

    const threeDotsIcon = document.createElement("i");
    threeDotsIcon.classList.add(...["bi", "bi-three-dots-vertical"]);
    threeDotsButton.appendChild(threeDotsIcon);

    return div;
}

export function createPlanets(planet) {
    const div = document.createElement("div");
    div.classList.add("planet");

    div.style.backgroundImage = `url('./img/${planet.name}.jpg')`;
    div.style.backgroundPosition = "center";
    div.style.backgroundSize = "cover";

    const planetInfos = document.createElement("div");
    planetInfos.classList.add("infos");

    const h3 = document.createElement("h3");
    h3.innerText = planet.name;
    planetInfos.appendChild(h3);

    const p1 = document.createElement("p");
    p1.innerText = `População: \n`
    planetInfos.appendChild(p1);

    const p2 = document.createElement("p");
    p2.classList.add("pop");
    p2.innerText = formatPopulation(planet.population);
    planetInfos.appendChild(p2);
    
    div.appendChild(planetInfos);

    return div;
}

export function createFilms(film) {
    const div = document.createElement("div");
    div.classList.add("film");

    div.style.backgroundImage = `url('./img/${film.title}.jpg')`;
    div.style.backgroundPosition = "center";
    div.style.backgroundSize = "cover";

    const h3 = document.createElement("h3");
    h3.innerText = film.title;
    div.appendChild(h3);

    const ep_id = document.createElement("p");
    ep_id.classList.add("ep_id")
    ep_id.innerText = film.episode_id;
    ep_id.style.display = "none";
    div.appendChild(ep_id);

    const rel_date = document.createElement("p");
    rel_date.classList.add("rel_date");
    rel_date.innerText = film.release_date;
    rel_date.style.display = "none";
    div.appendChild(rel_date);

    const characters = document.createElement("p");
    characters.classList.add("characters_of_film");
    characters.innerText = film.characters;
    characters.style.display = "none";
    div.appendChild(characters)

    return div;
}