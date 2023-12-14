console.log(token);

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

createArtist(5);

function createArtist(quantity) {
	for (let i = 0; i < quantity; i++) {
		const albumCasuale =
			Math.floor(Math.random() * (75000 - 10000 + 1)) + 10000;
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
							"🤬🤬🤬🤬 Errore con codice non definito Codice errore: ";
						console.log(message + errorCode);
						createAlbum(1);
						break;
				}
			});
	}
}
