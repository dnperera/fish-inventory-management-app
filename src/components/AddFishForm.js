import React from "react";

class AddFishForm extends React.Component {

	nameRef = React.createRef();
	priceRef = React.createRef();
	statusRef = React.createRef();
	descriptionRef = React.createRef();
	imageRef = React.createRef();

	createFish = (event) =>{
		//stop page being submitting
		event.preventDefault();
		const fish = {
			name: this.nameRef.value.value,
			price: parseFloat(this.priceRef.value.value),
			status: this.statusRef.value.value,
			description: this.descriptionRef.value.value,
			image: this.imageRef.value.value
		}
		this.props.addFish( fish );
		//Clear the form data
		event.currentTarget.reset();
	}

	render() {
		return (
			<form action="" className="fish-edit" onSubmit={this.createFish}>
				<input type="text" ref={ this.nameRef } name="name" placeholder="Name"/>
				<input type="text" ref={ this.priceRef } name="price" placeholder="Price"/>
				<select type="text" ref={ this.statusRef } name="status" >
					<option value="available">Fresh</option>
					<option value="unavailable">Sold Out</option>
				</select>
				<textarea type="text" ref={ this.descriptionRef } name="description" placeholder="Description" ></textarea>
				<input type="text" ref={ this.imageRef } name="image" />
				<button type="submit">+ Add Fish </button>
			</form>
		);
	}
}

export default AddFishForm;