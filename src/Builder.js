import * as React from 'react';



export const Builder = ({handleAddElement, createWidget}) => {
	const onButtonClick = () => {
		createWidget();
	};

	const onChangeSelect = e => {
		handleAddElement(e.target.value);
	};

	return (
		<div>
			<button onClick={onButtonClick}>Create "Custom Widget"</button>
			<select onChange={onChangeSelect}>
				<option value="button">Button</option>
				<option value="icon">Icon</option>
			</select>
		</div>
	)
};
