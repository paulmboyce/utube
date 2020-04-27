import axios from "axios";

const KEY = "AIzaSyAOBlBJvZioLBNPneYZwFP6i_tGg-zITms";

const youTubeApiAxios = axios.create({
	baseURL: "https://www.googleapis.com/youtube/v3",
	timeout: 10000,
});

export { youTubeApiAxios, KEY };
