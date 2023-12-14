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
<<<<<<< Updated upstream
  for (let i = 0; i < quantity; i++) {
    const id_artista = Math.floor(Math.random() * 300);
    const endpointArtist = `https://striveschool-api.herokuapp.com/api/deezer/artist/${id_artista}`;

    fetch(endpointArtist)
      .then((response) => {
        if (!response.ok) {
          console.log("errore personalizzato");
          createArtist(1);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);

        // for (let i = 0; i < data.data.length; i++) {
        // 	const brano = data.data[i];
        // 	console.log(brano);
        // }
        const elemento = document.createElement("div");
        elemento.className = "col-6 card bg-dark p-2 m-auto";
        elemento.innerHTML = `
                            <a href="./artist.html?id_artista=${id_artista}">
=======
	for (let i = 0; i < quantity; i++) {
		const id_artist = Math.floor(Math.random() * 300);
		const endpointArtist = `https://striveschool-api.herokuapp.com/api/deezer/artist/${id_artist}`;

		fetch(endpointArtist)
			.then((response) => {
				if (!response.ok) {
					console.log("errore personalizzato");
					createArtist(1);
				}
				return response.json();
			})
			.then((data) => {
				console.log(data);

				// for (let i = 0; i < data.data.length; i++) {
				// 	const brano = data.data[i];
				// 	console.log(brano);
				// }
				const elemento = document.createElement("div");
				elemento.className = "col-6 card bg-dark p-2 m-auto";
				elemento.innerHTML = `
                            <a href="./artist.html?id_artist=${id_artist}">
>>>>>>> Stashed changes
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
      .catch((error) => {});
  }
}

/////////////////////////////////////////////////////////////////////////
