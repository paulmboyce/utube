import "./ThumbnailVideo.css";
import React from "react";

class ThumbnailVideo extends React.Component {
	constructor(props) {
		super(props);
		this.handleClickVideo = this.handleClickVideo.bind(this);
	}

	handleClickVideo(evt) {
		this.props.setFeatureVideo(this.props.video);
		console.log("VIDEO:==> ", this.props.video);
	}

	render() {
		return (
			<div className="thumbnail-video ui card">
				<div className="ui image">
					<img
						src={this.props.video.snippet.thumbnails.medium.url}
						alt={this.props.video.snippet.description}
						onClick={this.handleClickVideo}
					/>
				</div>
				<div className="content">
					<div className="header">
						{this.props.video.snippet.title}
					</div>
				</div>
			</div>
		);
	}
}

export default ThumbnailVideo;
