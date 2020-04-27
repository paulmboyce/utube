import React from "react";
import { youTubeApiAxios, KEY } from "../api/YouTubeApiAxios";

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleChangeInput = this.handleChangeInput.bind(this);
		this.handleSubmitForm = this.handleSubmitForm.bind(this);
	}
	state = { term: "surf", error: null };

	componentDidMount() {
		this.searchVideosFromYouTubeAxios();
	}

	handleSubmitForm(evt) {
		evt.preventDefault();
		console.log("SUBMIT");
		this.searchVideosFromYouTubeAxios();
	}

	searchVideosFromYouTubeAxios = (term) => {
		youTubeApiAxios
			.get("/search", {
				params: {
					type: "video",
					part: "snippet",
					q: this.state.term,
					maxResults: 3,
					key: KEY,
				},
			})
			.then(
				function (response) {
					// Handle the results here (response.result has the parsed body).
					console.log("RESPONSE: ", response.data.items);
					response.data.items.map(function log(video) {
						console.log("Video: ", video.snippet);
						return video;
					});
					this.props.handleSearchResults(response.data.items);
				}.bind(this)
			)
			.catch((err) => {
				console.error(err);
			});
	};

	handleChangeInput(evt) {
		this.setState({ term: evt.target.value });
	}

	render() {
		if (this.state.error) {
			return <div>{this.state.error}</div>;
		}

		return (
			<div className="ui inverted segment">
				<form className="ui form" onSubmit={this.handleSubmitForm}>
					<div className="field">
						<div className="ui labeled icon input focus">
							<label className="ui basic label">
								Find videos:
							</label>
							<input
								value={this.state.term}
								type="text"
								placeholder="Enter your search..."
								onChange={this.handleChangeInput}
							/>
							<i className="search icon"></i>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default SearchBar;
