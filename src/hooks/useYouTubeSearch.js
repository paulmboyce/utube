import { useEffect, useState } from "react";
import { youTubeApiAxios, KEY } from "../api/YouTubeApiAxios";

const useYouTubeSearch = (defaultTerm) => {
	const [videos, setVideos] = useState([]);
	const [error, setError] = useState(null);
	useEffect(() => {
		doSearch(defaultTerm);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const doSearch = (term) => {
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
			.then(function ({ data }) {
				setVideos(data.items);
			})
			.catch((err) => {
				console.log("OOPS!! This error should reject/throw to the caller", err);
				setError(err.message);
				throw err;
			});
	};

	return [error, videos, doSearch]; // Array is React convention.
};

export default useYouTubeSearch;
