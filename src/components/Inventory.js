import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
	render(){
		return (
			<div className="inventory">
				<h3>Inventory!!!</h3> 
				<AddFishForm addFish = { this.props.addFish }></AddFishForm>
				<button onClick={this.props.loadInventory}> Load Inventory</button>
			</div>

		);
	}
}

export default Inventory;