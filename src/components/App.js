import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import FeatureVideo from "./FeatureVideo";
import { youTubeApiAxios, KEY } from "../api/YouTubeApiAxios";

const App = () => {
	const [videos, setVideos] = useState([]);
	const [featureVideo, setFeatureVideo] = useState(null);
	const [term, setTerm] = useState("surf");
	const [error, setError] = useState(null);

	useEffect(() => {
		console.log("Call API *ONLY* when search term changes..");
		searchVideosFromYouTubeAxios();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [term]);

	const searchVideosFromYouTubeAxios = () => {
		youTubeApiAxios
			.get("/search", {
				params: {
					type: "video",
					part: "snippet",
					q: term,
					maxResults: 3,
					key: KEY,
				},
			})
			.then(function (response) {
				// Handle the results here (response.result has the parsed body).
				console.log("RESPONSE: ", response.data.items);
				response.data.items.map(function log(video) {
					return video;
				});
				handleSearchResults(response.data.items);
			})
			.catch((err) => {
				console.error(err);
				setError("Ups!" + err.message);
			});
	};

	const getFeatureVideo = () => {
		if (featureVideo) {
			return featureVideo;
		} else {
			return videos ? videos[0] : {};
		}
	};

	const handleSearchResults = (videoList) => {
		setFeatureVideo(null); // reset featured video
		setVideos(videoList);
	};

	return (
		<div className="ui grid container">
			<div className="ui sixteen wide column">
				<SearchBar doSearchAction={setTerm} initialInput={term} />
			</div>
			{error ? (
				<div style={{ color: "red" }}>{error}</div>
			) : (
				<React.Fragment>
					<div className="ui twelve wide column">
						<FeatureVideo video={getFeatureVideo()} />
					</div>
					<div className="ui four wide column">
						<VideoList videos={videos} setFeatureVideo={setFeatureVideo} />
					</div>
				</React.Fragment>
			)}
		</div>
	);
};

export default App;
