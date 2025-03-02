
const modalInfos = document.querySelector("#modal-infos");
const modalFilms = document.querySelector("#modal-films");
const fade = document.querySelector("#fade");


export function toggleModalInfos() {

    modalInfos.classList.toggle("hide");
    fade.classList.toggle("hide");

    if (!modalInfos.classList.contains("hide")) {
        document.body.classList.add("no-scroll");
    } else {
        document.body.classList.remove("no-scroll");
    }

}

export function toggleModalFilms() {
    modalFilms.classList.toggle("hide");
    fade.classList.toggle("hide");

    if (!modalFilms.classList.contains("hide")) {
        document.body.classList.add("no-scroll");
    } else {
        document.body.classList.remove("no-scroll");
    }
}