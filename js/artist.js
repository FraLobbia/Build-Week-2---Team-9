<<<<<<< Updated upstream
const id_artista = new URLSearchParams(window.location.search).get("id_artista");
const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${id_artista}/top?limit=50`;

const fetchData = () => {
  fetch(url + id_artista)
    .then((response) => {
      if (!response.ok) {
        console.log("errore personalizzato");
        createArtist(1);
      }
      return response.json();
    })
    .then((tracks) => {
      console.log(tracks);
      const albumContainer = document.getElementById("albumContainer");
      tracks.data.forEach((data) => {
        const artistAlbum = document.createElement("div");
        artistAlbum.className = "row ms-1 align-items-center mb-3";

        artistAlbum.innerHTML = `
        <div class="col-sm-12 col-md-7 col-lg-6 d-flex align-items-center fs-5">
        <span class="text-muted me-2">2</span>
        <img src="${data.album.cover_xl}" style="height: 60px" class="mx-2" />
        <span
          >${data.album.title}<br />
          <p class="mb-0 text-muted d-block d-md-none">98.839.244</p></span
        >
        <a href="" class="d-block d-md-none ms-auto"
          ><i class="bi bi-three-dots-vertical text-secondary fs-3"></i
        ></a>
      </div>
      <div class="col-md-2 col-lg-3 text-center">
        <p class="mb-0 text-muted d-none d-md-block">98.839.244</p>
      </div>
      <div class="col-md-3 col-lg-3 text-end d-none d-lg-inline-block">
        <p class="mb-0 text-muted">4:17</p>
      </div>
        `;
        albumContainer.appendChild(artistAlbum);

        console.log(data.album);
      });
    });
};

fetchData();
=======
// const id_artist = new URLSearchParams(window.location.search).get("id_artist");
const id_artist = 412;
const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${id_artist}/top?limit=50`;

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": token,
		"X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
	},
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const fetchTracks = () => {
	fetch(url + id_artist)
		.then((response) => {
			if (!response.ok) {
				console.log("errore personalizzato");
			}
			return response.json();
		})
		.then((tracks) => {
			// console.log(tracks);
			tracks.data.forEach((track) => {});
			// console.log(tracks.data[1]);
			// console.log(tracks.data[2]);
		});
};
fetchTracks();
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const url2 = "https://deezerdevs-deezer.p.rapidapi.com/album/75621062";
const fetchAlbums = () => {
	fetch(url2, options)
		.then((response) => {
			if (!response.ok) {
				console.log(response);
			}
			return response.json();
		})
		.then((tracks) => {
			console.log(tracks);
			tracks.data.forEach((track) => {});
			console.log(tracks.data[1]);
			console.log(tracks.data[2]);
		});
};

fetchAlbums();
>>>>>>> Stashed changes
