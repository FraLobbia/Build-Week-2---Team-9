console.log(token);

const audio = document.getElementById("myAudio");
//ottengo tutti i play buttons
const allPlayButtons = document.getElementsByClassName("playButtonClass");

document.addEventListener("DOMContentLoaded", function () {
  const volumeSlider = document.querySelector(".volume-slider");
  const progressBar = document.querySelector("#progressBar");

  volumeSlider.addEventListener("input", function () {
    const volumePercentage = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.style.setProperty("--volume-percentage", `${volumePercentage}%`);
  });

  progressBar.addEventListener("input", function () {
    const volumePercentage = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.style.setProperty("--volume-percentage", `${volumePercentage}%`);
  });
});

const discoverOtherArtist = document.getElementById("discoverOtherArtist");
const discoverArtistsMobile = document.getElementById("discoverArtistsMobile");

const query = "artist";

const endpoint = `search?q=${query}`;

const url = "https://deezerdevs-deezer.p.rapidapi.com/" + endpoint;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": token,
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

// fetch(url, {
// 	method: "GET",
// 	headers: {
// 		"X-RapidAPI-Key": token,
// 		"X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
// 	},
// })
// 	.then((response) => {
// 		if (!response.ok) console.log("errore personalizzato");
// 		return response.json();
// 	})
// 	.then((data) => {
// 		console.log(data);
// 		console.log(data.data[2]);
// 	});

const arrayAlbums = [74311, 45122, 52133, 54404, 51505, 68884];
createAlbum(5);

function createArtist(quantity) {
  for (let i = 0; i < quantity; i++) {
    const albumCasuale = Math.floor(Math.random() * (75000 - 10000 + 1)) + 10000;
    const endpointAlbum = `https://deezerdevs-deezer.p.rapidapi.com/album/${albumCasuale}`;

    fetch(endpointAlbum, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": token,
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          createAlbum(1);
          throw response.status;
        }
        return response.json();
      })
      .then((album) => {
        console.log(album);

        const elemento = document.createElement("div");
        elemento.className = "col-6 card bg-dark p-2 m-auto";
        elemento.innerHTML = `
                            <a href="./artist.html?id_artista=${id_artista}">
                                <img
                                    src="${data.picture_xl}"
                                    class="card-img-top"
                                    alt="copertina album/playlist"
                                />
                                <h6 class="card-title text-white fw-bold mt-3 mb-2">
                                    ${data.name}
                                </h6>
                                <p class="card-text text-secondary">
                                    Album totali ${data.nb_album}
                                </p> 
                            </a>    
            `;
        discoverOtherArtist.appendChild(elemento);
      })
      .catch((errorCode) => {
        switch (errorCode) {
          case 404:
            message = "🤬🤬🤬🤬 Risorsa non trovata. Codice errore: ";
            console.log(message + errorCode);
            break;
          case 401:
            message = "🤬🤬🤬🤬 Non sei autorizzato. Codice errore: ";
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
            message = "🤬🤬🤬🤬 Errore con codice non definito Codice errore: ";
            console.log(message + errorCode);
            createAlbum(1);
            break;
        }
      });
  }
}

///////////////////////////////////////////////////////////////////////

function fillHeroSection(album) {
  const spansArtist = document.getElementsByClassName("artistHeroSection");
  const imgHeroSection = document.getElementById("imgHeroSection");
  const spanAlbumHeroSection = document.getElementById("spanTrackHeroSection");

  for (const span of spansArtist) {
    span.innerHTML = album.artist.name;
  }

  const n = Math.floor(Math.random() * 5);
  const trackSceltaCasualmente = album.tracks.data[n];
  spanTrackHeroSection.innerHTML = trackSceltaCasualmente.title;
  imgHeroSection.setAttribute("src", album.cover_big);

  riempiDataPlayer(trackSceltaCasualmente);
}

function riempiDataPlayer(track) {
  const dataPlayer = document.getElementById("dataPlayer");
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
  for (const button of allPlayButtons) {
    button.addEventListener("click", play);
  }
}

// -----------------------------------------------

function play() {
  audio.play();
  for (const button of allPlayButtons) {
    button.addEventListener("click", pause);
  }
}
function pause() {
  audio.pause();
  console.log("pausa");
  for (const button of allPlayButtons) {
    button.addEventListener("click", play);
  }
}
