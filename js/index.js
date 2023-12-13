import { APIkey } from "./token.js";
console.log(APIkey);

const axios = require("axios");

const options = {
	method: "GET",
	url: "https://deezerdevs-deezer.p.rapidapi.com/infos",
	headers: {
		"X-RapidAPI-Key": APIkey,
		"X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
	},
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
