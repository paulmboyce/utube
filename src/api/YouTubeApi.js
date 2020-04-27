const KEY = "AIzaSyAOBlBJvZioLBNPneYZwFP6i_tGg-zITms";

function startYouTubeAPI() {
	// 2. Initialize the JavaScript client library.
	let gapi = window.gapi;

	gapi.client
		.init({
			apiKey: KEY,
			// clientId and scope are optional if auth is not required.
			//      'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
			//      'scope': 'profile',
		})
		.then(function () {
			// 3. Initialize and make the API request.
			return gapi.client.load(
				"https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
			);
		})
		.then(function () {
			console.log("GAPI client loaded for API");
		})
		.catch(function (error) {
			console.error("Error loading GAPI client for API", error);
		});
}

export default startYouTubeAPI;

/*** 
NOTES on usage (Though AXIOS is far easier ta GAPI):

1) Add to index.html:

<script src="https://apis.google.com/js/api.js"></script>

2) on App startup (add to constructor()):
		window.gapi.load("client", startYouTubeAPI);

3) After GAPI is loaded, can call as follows:

	searchVideosFromYouTube = () => {
		let gapi = window.gapi;

		return gapi.client.youtube.search
			.list({
				type: "video",
				part: "snippet",
				q: {your serach term, e.g. 'surfing'},
				maxResults: 3,
			})
			.then(
				function (response) {
					// Handle the results here (response.result has the parsed body).
					response.result.items.map(function log(video) {
						console.log("Video: ", video.snippet);
						return video;
					});
					this.props.handleSearchResults(response.result.items);
				}.bind(this)
			)
			.then(
				null,
				function (reason) {
					console.log("ERROR on GAPI execute(): ", reason);
					this.setState({ error: reason.result.error.message });
				}.bind(this)
			);
	};




***/
