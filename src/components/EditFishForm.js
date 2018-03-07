import React from 'react';
import { formatPrice } from '../helpers.js';

class EditFishForm extends React.Component {
	handleChange = event => {
		var updatedFish = {
			...this.props.fish,
			[event.currentTarget.name]: event.currentTarget.value,
		};

		this.props.updateFish(this.props.index, updatedFish);
	};

	render() {
		return (
			<div className="fish-edit">
				<input
					type="text"
					name="name"
					onChange={this.handleChange}
					value={this.props.fish.name}
				/>
				<input
					type="text"
					name="price"
					onChange={this.handleChange}
					value={formatPrice(this.props.fish.price)}
				/>
				<select
					type="text"
					name="status"
					onChange={this.handleChange}
					value={this.props.fish.status}
				>
					<option defaultValue="available">Fresh</option>
					<option defaultValue="unavailable">Sold Out</option>
				</select>
				<textarea
					type="text"
					name="description"
					onChange={this.handleChange}
					value={this.props.fish.description}
				/>
				<input
					type="text"
					name="image"
					value={this.props.fish.image}
					onChange={this.handleChange}
				/>
			</div>
		);
	}
}

export default EditFishForm;
