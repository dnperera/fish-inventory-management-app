import React from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

class Inventory extends React.Component {
	render() {
		return (
			<div className="inventory">
				<h3>Inventory!!!</h3>
				{Object.keys(this.props.fishes).map(key => {
					return (
						<EditFishForm
							key={key}
							fish={this.props.fishes[key]}
							index={key}
							updateFish={this.props.updateFish}
						/>
					);
				})}
				<AddFishForm addFish={this.props.addFish} />
				<button onClick={this.props.loadInventory}> Load Inventory</button>
			</div>
		);
	}
}

export default Inventory;
