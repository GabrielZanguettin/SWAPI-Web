import { createPlanets, createFilms } from "./creation.js";
import { originalPlanetsOrder, originalFilmsOrder } from "./api.js";

export function filterCharacters(filterValue) {
    const characters = document.querySelectorAll(".character");

    characters.forEach((character) => {
        const gender = character.querySelector(".gender").innerText;

        if (filterValue === "all" || gender === filterValue) {
            character.classList.remove("hidden");
        } else {
            character.classList.add("hidden");
        }
    });
}

export function orderPlanets(orderPlanetValue) {
    const planetsContainer = document.querySelector("#planets-container");

    if (orderPlanetValue === "normal") {
        planetsContainer.innerHTML = "";
        originalPlanetsOrder.forEach((planet) => {
            const planetElement = createPlanets(planet);
            planetsContainer.appendChild(planetElement);
        });
        return;
    }

    const planets = Array.from(document.querySelectorAll(".planet"));

    planets.sort((a, b) => {
        let popA = a.querySelector(".pop").innerText.trim().toLowerCase();
        let popB = b.querySelector(".pop").innerText.trim().toLowerCase();


        popA = popA === "unknown" ? -1 : parseInt(popA.replace(/\D/g, "")) || 0;
        popB = popB === "unknown" ? -1 : parseInt(popB.replace(/\D/g, "")) || 0;

        return orderPlanetValue === "ascending" ? popA - popB : popB - popA;
    });


    planets.forEach((planet) => planetsContainer.appendChild(planet));
}

export function orderFilms(orderFilmValue) {
    const filmsContainer = document.querySelector("#films-container");

    if (orderFilmValue === "all") {
        filmsContainer.innerHTML = "";
        originalFilmsOrder.forEach((film) => {
            const filmElement = createFilms(film);
            filmsContainer.appendChild(filmElement);
        });
        return;
    }

    const films = Array.from(document.querySelectorAll(".film"));

    switch (orderFilmValue) {
        case "release-date":
            films.sort((a, b) => {
                let relDateA = new Date(a.querySelector(".rel_date").innerText);
                let relDateB = new Date(b.querySelector(".rel_date").innerText);
                return relDateA - relDateB;
            });
            break;

        case "episode-id":
            films.sort((a, b) => {
                let epIdA = parseInt(a.querySelector(".ep_id").innerText);
                let epIdB = parseInt(b.querySelector(".ep_id").innerText);
                return epIdA - epIdB;
            });
            break;
    }
    films.forEach((film) => filmsContainer.appendChild(film));
}

const arrayCharactersNames = [];

export async function searchCharacter(value) {
    const searchValue = value.trim().toLowerCase();
    if (!searchValue) return;

    const films = document.querySelectorAll(".film");
    const loadingElement = document.querySelector("#loading");

    loadingElement.classList.remove("hide");

    for (let i = 0; i < films.length; i++) {
        const film = films[i];

        if (arrayCharactersNames.length >= films.length) {

            if (arrayCharactersNames[i].some(name => name.includes(searchValue))) {
                film.style.border = "5px solid green";
            } else {
                film.style.border = "2px solid #4c4e53";
            }
            
        } else {
            const characterElements = film.querySelectorAll(".characters_of_film");
            let characterUrls = Array.from(characterElements).map(el => el.innerText.trim());
            characterUrls = characterUrls.join(",").split(",").map(url => url.trim());

            try {
                const characterRequests = characterUrls.map(url => axios.get(url));
                const responses = await Promise.all(characterRequests);
                const characterNames = responses.map(response => response.data.name.trim().toLowerCase());

                arrayCharactersNames.push(characterNames);

                if (characterNames.some(name => name.includes(searchValue))) {
                    film.style.border = "5px solid green";
                } else {
                    film.style.border = "2px solid #4c4e53";
                }
                
            } catch (error) {
                console.error(error);
            }
        }
    }

    loadingElement.classList.add("hide");
}
