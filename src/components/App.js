import React from "react";
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import FeatureVideo from "./FeatureVideo";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.handleSearchResults = this.handleSearchResults.bind(this);
		this.state = { videos: [], featureVideo: null };
	}

	getFeatureVideo() {
		if (this.state.featureVideo) {
			return this.state.featureVideo;
		} else {
			return this.state.videos ? this.state.videos[0] : {};
		}
	}
	handleSearchResults(videoList) {
		this.setState({ featureVideo: null }); // reset featured video
		this.setState({ videos: videoList });
	}

	setFeatureVideo = (videoId) => {
		console.log(`SET featureVideo: ${videoId}`);
		this.setState({ featureVideo: videoId });
	};

	render() {
		return (
			<div className="ui grid container">
				<div className="ui sixteen wide column">
					<SearchBar handleSearchResults={this.handleSearchResults} />
				</div>
				<div className="ui twelve wide column">
					<FeatureVideo video={this.getFeatureVideo()} />
				</div>
				<div className="ui four wide column">
					<VideoList
						videos={this.state.videos}
						setFeatureVideo={this.setFeatureVideo}
					/>
				</div>
			</div>
		);
	}
}

export default App;
