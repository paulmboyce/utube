import React, { useState } from "react";

const SearchBar = ({ doSearchAction, initialInput }) => {
	const [input, setInput] = useState(initialInput);

	const handleSubmitForm = (evt) => {
		evt.preventDefault();
		console.log(`SUBMIT Search for: ${input}`);
		doSearchAction(input);
	};

	const handleChangeInput = (evt) => {
		setInput(evt.target.value);
	};

	return (
		<div className="ui inverted segment">
			<form className="ui form" onSubmit={handleSubmitForm}>
				<div className="field">
					<div className="ui labeled icon input focus">
						<label className="ui basic label">Find videos:</label>
						<input
							value={input}
							type="text"
							placeholder="Enter your search..."
							onChange={handleChangeInput}
						/>
						<i className="search icon"></i>
					</div>
				</div>
			</form>
		</div>
	);
};

export default SearchBar;
