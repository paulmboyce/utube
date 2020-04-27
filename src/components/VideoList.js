import React from "react";
import ThumbnailVideo from "./ThumbnailVideo";

class VideoList extends React.Component {
	renderVideos = () => {
		return this.props.videos.map((video) => {
			return (
				<ThumbnailVideo
					setFeatureVideo={this.props.setFeatureVideo}
					key={video.id.videoId}
					video={video}
				/>
			);
		});
	};

	render() {
		return <div className="ui items">{this.renderVideos()}</div>;
	}
}

export default VideoList;
