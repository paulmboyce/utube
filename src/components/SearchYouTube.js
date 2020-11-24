import { useState, useEffect } from "react";
import { youTubeApiAxios, KEY } from "../api/YouTubeApiAxios";

const SearchYouTube = ({ term, handleSearchResults, onError }) => {
	const [q, setQ] = useState(term);

	useEffect(() => {
		console.log(`Term changed, setting 'q' to ${term}`);
		setQ(term);
	}, [term]);

	useEffect(() => {
		console.log("Call API *ONLY* when search term changes..");
		searchVideosFromYouTubeAxios();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [q]);

	const searchVideosFromYouTubeAxios = () => {
		youTubeApiAxios
			.get("/search", {
				params: {
					type: "video",
					part: "snippet",
					maxResults: 3,
					key: KEY,
					q: q,
				},
			})
			.then(function (response) {
				handleSearchResults(response.data.items);
			})
			.catch((err) => {
				onError(err.message);
			});
	};
	return null;
};

export default SearchYouTube;
