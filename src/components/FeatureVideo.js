import React from "react";

class FeatureVideo extends React.Component {
	formatYouTubelink() {
		return `https://www.youtube.com/embed/${this.props.video.id.videoId}`;
	}

	render() {
		if (this.props.video) {
			return (
				<div>
					<div className="ui embed">
						<iframe
							title="Featured Video"
							src={this.formatYouTubelink()}
						></iframe>
					</div>
					<div className="ui segment">
						<h1>{this.props.video.snippet.title}</h1>
						<h4>{this.props.video.snippet.description}</h4>
					</div>
				</div>
			);
		} else {
			return <div></div>;
		}
	}
}

export default FeatureVideo;
