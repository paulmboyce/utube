import axios from "axios";

// ACCOUNT: altstuff001@gmail.com
// SEE:
// Project YOUTUBE-REACT:
//const KEY = "AIzaSyAOBlBJvZioLBNPneYZwFP6i_tGg-zITms";
// Project YOUTUBE-REACT-HOOKS:
const KEY = "AIzaSyA5i7utNw3Fgp1_7ZMJGEmqWY3eTQwVPUY";

const youTubeApiAxios = axios.create({
	baseURL: "https://www.googleapis.com/youtube/v3",
	timeout: 10000,
});

export { youTubeApiAxios, KEY };
