import { useEffect } from "react";
import { youTubeApiAxios, KEY } from "../api/YouTubeApiAxios";

const SearchYouTube = ({ term, handleSearchResults, onError }) => {
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
					maxResults: 3,
					key: KEY,
					q: term,
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
