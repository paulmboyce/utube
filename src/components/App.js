import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import FeatureVideo from "./FeatureVideo";
import { youTubeApiAxios, KEY } from "../api/YouTubeApiAxios";
import "./App.css";

const App = () => {
	const [videos, setVideos] = useState([]);
	const [featureVideo, setFeatureVideo] = useState(null);
	const [term, setTerm] = useState("fun fun function machine learning");
	const [error, setError] = useState(null);
	const params = {
		type: "video",
		part: "snippet",
		maxResults: 3,
		key: KEY,
	};

	useEffect(() => {
		console.log("Call API *ONLY* when search term changes..");
		searchVideosFromYouTubeAxios();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [term]);

	const searchVideosFromYouTubeAxios = () => {
		params["q"] = term;
		youTubeApiAxios
			.get("/search", {
				params: params,
			})
			.then(function (response) {
				handleSearchResults(response.data.items);
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	const getFeatureVideo = () => {
		if (featureVideo) {
			return featureVideo;
		}
		return videos ? videos[0] : {};
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
				<div className="error">{error}</div>
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
