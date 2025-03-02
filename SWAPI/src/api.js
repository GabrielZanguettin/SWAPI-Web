import api from './custom.js'
import { createCharacters, createPlanets, createFilms } from "./creation.js";

const charactersContainer = document.querySelector("#characters-container");
const planetsContainer = document.querySelector("#planets-container");
const filmsContainer = document.querySelector("#films-container");

let cachedFilms = null;
let cachedPlanets = null;
let cachedCharacters = null;

export let originalPlanetsOrder = [];
export let originalFilmsOrder = [];

export async function getCharacters() {
    if (!cachedCharacters) {
        try {

            const response = await api.get("/people");
            cachedCharacters = response.data.results;

        } catch (error) {
            console.error(error);
        }
    }
    return cachedCharacters;
}

export async function getPlanets() {
    if (!cachedPlanets) {
        try {

            const response = await api.get("/planets")
            cachedPlanets = response.data.results;

        } catch (error) {
            console.log(error)
        }
    }
    return cachedPlanets;
}

export async function getFilms() {
    if (!cachedFilms) {
        try {

            const response = await api.get("/films");
            cachedFilms = response.data.results;
        }
        catch (error) {
            console.log(error);
        }
    }
    return cachedFilms;
}

export async function loadCharacters() {
    try {

        const characters = await getCharacters();
        characters.forEach(character => {
            const characterElement = createCharacters(character);
            charactersContainer.appendChild(characterElement);

        });
    } catch (error) {
        console.error(error);
    }
}

export async function loadPlanets() {
    try {

        const planets = await getPlanets();
        originalPlanetsOrder = planets.map((planet) => planet);

        planets.forEach((planet) => {
            const planetElement = createPlanets(planet);
            planetsContainer.appendChild(planetElement);

        })
    } catch (error) {
        console.log(error);
    }
}

export async function loadFilms() {
    try {

        const films = await getFilms();
        originalFilmsOrder = films.map((film) => film)

        films.forEach((film) => {
            const filmElement = createFilms(film);
            filmsContainer.appendChild(filmElement);
        });

    } catch (error) {
        console.log(error);
    }
}

export async function getFilmsByAPI(films, signal) {
    const requests = films.map(film => axios.get(film, { signal }));

    const responses = await Promise.all(requests);

    return responses.map(response => response.data.title);
}

export async function getHomeWorldsByAPI(homeworld, signal) {
    const response = await axios.get(homeworld, { signal });

    return response.data.name;
}

export async function getStarShipsByAPI(starships, signal) {
    const requests = starships.map(starship => axios.get(starship, { signal }));

    const responses = await Promise.all(requests);

    return responses.map(response => response.data.name);
}

export async function getVehiclesByAPI(vehicles, signal) {
    const requests = vehicles.map(vehicle => axios.get(vehicle, { signal }));

    const responses = await Promise.all(requests);

    return responses.map(response => response.data.name);
}