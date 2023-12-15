const audio = document.getElementById("myAudio");
const allPlayButtons = document.getElementsByClassName("playButtonClass");
const discoverOtherArtist = document.getElementById("discoverOtherArtist");
const discoverArtistsMobile = document.getElementById("discoverArtistsMobile");
const arrayAlbums = [103248, 75621062, 242443, 54404, 51505, 68884];
const dataPlayer = document.getElementById("dataPlayer");
const dataPlayerMini = document.getElementById("playerMiniData");
const spansArtist = document.getElementsByClassName("artistHeroSection");
const imgHeroSection = document.getElementById("imgHeroSection");
const spanAlbumHeroSection = document.getElementById("spanTrackHeroSection");
const trackDuration = document.getElementById("trackDuration");
const timeProgress = document.getElementById("timeProgress");
let playerPlaylist = [];
let songIndex = -1;
let isPlaying = false;
let isAutoplayActive = false;
let lastVolume;
let isMuted = false;

let reproducedSeconds = 0;
const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": token,
		"X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
	},
};

window.addEventListener("DOMContentLoaded", () => {
	// formattaSliderVolume();
	audio.addEventListener("timeupdate", updateProgress);
	// applico comportamento e formattazione allo slider del volume

	// aggiungo album alla sezione "altro di ciò che ti piace"
	createAlbum(5);

	// Aggiungo comportamento di tutti i tasti play
	addPlayPauseEvents();
});

// DA QUI IN POI SOLO DICHIARAZIONI DI FUNZIONI
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createAlbum(quantity) {
	for (let i = 0; i < quantity; i++) {
		// const albumID = Math.floor(Math.random() * (75000 - 10000 + 1)) + 10000;
		const albumID = arrayAlbums[i];
		const endpointAlbum = `https://deezerdevs-deezer.p.rapidapi.com/album/${albumID}`;

		fetch(endpointAlbum, options)
			.then((response) => {
				if (!response.ok) {
					console.log(response);
					if (response.status === 429) {
						throw response.status;
					}
					createAlbum(1);
					throw response.status;
				}
				return response.json();
			})
			.then((album) => {
				console.log(album);
				fillHeroSection(album);
				const elemento = document.createElement("div");
				elemento.className = "card bg-g2d p-2 m-auto mb-3 ";
				// elemento.style.setProperty("max-width", "17%", "important");
				// elemento.style.setProperty("height", "230px", "important");
				elemento.innerHTML = `
                        <a href="./artist.html?artistId=${album.artist.id}">
                            <img
                                src="${album.artist.picture_xl}"              
                                class="card-img-top"
                                alt="copertina album/playlist"
                            />
                            <h6 class="text-truncate card-title text-white fw-bold mt-3 mb-2">
                                ${album.title}
                            </h6>
                            <p class="card-text text-secondary">
                                Album totali ${album.nb_tracks}
                            </p> 
                        </a>    
        `;
				discoverOtherArtist.appendChild(elemento);
			})
			.catch((errorCode) => {
				switch (errorCode) {
					case 404:
						message =
							"🤬🤬🤬🤬 Risorsa non trovata. Codice errore: ";
						console.log(message + errorCode);
						break;
					case 401:
						message =
							"🤬🤬🤬🤬 Non sei autorizzato. Codice errore: ";
						console.log(message + errorCode);
						break;
					case 418:
						message = "🤬🤬🤬🤬 I'm a teapot. Codice errore: ";
						console.log(message + errorCode);
						break;
					case 429:
						message = "🤬🤬🤬🤬 Troppe richieste: ";
						console.log(message + errorCode);
						break;
					case 500:
						message = "🤬🤬🤬🤬 Errore del server: ";
						console.log(message + errorCode);
						break;
					case 800:
						message = "🤬🤬🤬🤬 Non ci sono dati!!!: ";
						console.log(message + errorCode);
						break;
					default:
						message =
							"❌❌❌❌ Errore con codice non definito. Codice errore: ";
						console.log(message + errorCode);
						// createAlbum(1);
						break;
				}
			});
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fillHeroSection(album) {
	for (const span of spansArtist) {
		span.innerHTML = album.artist.name;
	}

	const n = Math.floor(Math.random() * 5);
	const trackSceltaCasualmente = album.tracks.data[n];
	spanTrackHeroSection.innerHTML = trackSceltaCasualmente.title;
	imgHeroSection.setAttribute("src", album.cover_big);
	riempiDataPlayer(trackSceltaCasualmente);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// questa funzione inserisce i riferimenti per far riprodurre la track passata e al contempo inserisci i dati del'artista, titolo track e copertina album nei player

function riempiDataPlayer(track) {
	const previewAudioLink = track.preview;

	// vado a predisporre l'audio da riprodurre
	audio.innerHTML = `
    <source id="audioSource" src="${previewAudioLink}" type="audio/mp3" />
    `;

	// vado a riempire il player con i dati del'artista, titolo track e copertina album
	dataPlayer.innerHTML = ""; // prima lo svuoto dal riempimento fatto alla prima apertura della pagina
	dataPlayer.innerHTML = `
        
                <img
                    src="${track.album.cover_small}"
                    alt=""
                    style="height: 40px"
                />
                <div class="fs-6 px-3">
                    <a href="#"
                        ><p class="my-0 fw-bold text-white">
                            ${track.title_short}
                        </p></a
                    >
                    <a href="#"
                        ><p class="my-0">${track.artist.name}</p></a
                    >
                </div>
                <button
                    type="button"
                    class="btn text-secondary p-0"
                >
                    <i class="bi bi-heart"></i>
                </button>
    `;
	trackDuration.innerHTML = formatTrackDuration(30);
	dataPlayerMini.innerHTML = ""; // prima lo svuoto dal riempimento fatto alla prima apertura della pagina
	dataPlayerMini.innerHTML = `
        
    <div class="col-7 d-flex">
    <div class="fs-6 pe-3">
        <a href="#"
            ><p class="my-0 fw-bold text-white">
            ${track.title_short}
            </p></a
        >
        <a href="#"><p class="my-0">${track.duration}</p></a>
    </div>
    `;
	for (const button of allPlayButtons) {
		button.addEventListener("click", togglePlayPause);
	}
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// questo gruppo di funzioni gestisci i comportamenti dei tasti play, facendo distinzione tra tasti del player e tasto play nella hero section

function addPlayPauseEvents() {
	for (const button of allPlayButtons) {
		button.addEventListener("click", togglePlayPause);
	}
}

// gestisco il comportamento in base allo stato della riproduzione
function togglePlayPause() {
	if (audio.paused) {
		audio.play();
		switchIconaPlayPause("pause");
	} else {
		audio.pause();
		switchIconaPlayPause("play");
	}
}

function switchIconaPlayPause(status) {
	for (const button of allPlayButtons) {
		if (button.getAttribute("id") === "playButtonHeroSection") {
			button.innerHTML = `<i class="bi bi-${status}-circle-fill fs-1 me-2"></i> <span>${status}</span>`;
		} else {
			button.innerHTML = `<i class="bi bi-${status}-circle-fill fs-1 me-2 text-white"></i>`;
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// questa funzione formatta gli slider del volume

// function formattaSliderVolume() {
// 	document.addEventListener("DOMContentLoaded", function () {
// 		const volumeSlider = document.querySelector(".volume-slider");
// 		const progressBar = document.querySelector("#progressBar");
// 		volumeSlider.addEventListener("input", function () {
// 			const volumePercentage =
// 				((this.value - this.min) / (this.max - this.min)) * 100;
// 			this.style.setProperty(
// 				"--volume-percentage",
// 				`${volumePercentage}%`
// 			);
// 		});
// 	});
// }
// function formattaSliderProgress(avanzamento) {
// 	progressBar.addEventListener("input", function () {
// 		const volumePercentage =
// 			((this.value - this.min) / (this.max - this.min)) * 100;
// 		this.style.setProperty("--volume-percentage", `${avanzamento}%`);
// 	});
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function formatTrackDuration(durationInSeconds) {
	const minutes = Math.floor(durationInSeconds / 60);
	const seconds = durationInSeconds % 60;
	return ` ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateProgress(event) {
	const progressBar = document.getElementById("progressBar");

	let duration = event.currentTarget.duration;

	let currentTime = event.currentTarget.currentTime;

	const progressPercent = (currentTime / duration) * 100;
	console.log(progressPercent);
	progressBar.value = progressPercent;
	timeProgress.innerHTML = formatTrackDuration(Math.floor(currentTime));
	trackDuration.innerHTML = formatTrackDuration(Math.floor(duration));
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function playSong() {
	if (!isPlaying) {
		isPlaying = !isPlaying;
	}

	const audio = document.getElementById("audio");
	const playPauseButton = document.getElementById("playPauseIcon");

	playPauseButton.classList.remove("bi-play-circle-fill");
	playPauseButton.classList.add("bi-pause-circle-fill");

	audio.play();
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function pauseSong() {
	if (isPlaying) {
		isPlaying = !isPlaying;
	}

	const audio = document.getElementById("audio");

	const playPauseButton = document.getElementById("playPauseIcon");
	playPauseButton.classList.remove("bi-pause-circle-fill");
	playPauseButton.classList.add("bi-play-circle-fill");

	audio.pause();
}
