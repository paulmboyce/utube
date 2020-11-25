import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import FeatureVideo from "./FeatureVideo";
import "./App.css";
import useYouTubeSearch from "../hooks/useYouTubeSearch";

const App = () => {
	const [featureVideo, setFeatureVideo] = useState(null);
	const [term, setTerm] = useState("fun fun function");
	const [error, setError] = useState(null);
	const [searchErr, videos, doSearch] = useYouTubeSearch(term);

	const getFeatureVideo = () => {
		if (featureVideo) {
			return featureVideo;
		}
		return videos ? videos[0] : {};
	};

	useEffect(() => {
		console.log("Call API *ONLY* when search term changes..");
		doSearch(term);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [term]);

	useEffect(() => {
		setFeatureVideo(null); // reset featured video
	}, [videos]);

	useEffect(() => {
		setError(searchErr);
	}, [searchErr]);
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
