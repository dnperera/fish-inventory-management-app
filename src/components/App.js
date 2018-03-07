import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
	state = {
		fishes: {},
		order: {},
	};

	componentDidMount() {
		const { params } = this.props.match;
		//first reinstate the local storage . otherwise it will be set to blank
		const localStorageRef = localStorage.getItem(params.storeId);
		//if localstorage item exists
		if (localStorageRef) {
			this.setState({ order: JSON.parse(localStorageRef) });
		}

		this.ref = base.syncState(`${params.storeId}/fishes`, {
			context: this,
			state: 'fishes',
		});
	}

	componentDidUpdate() {
		localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	addFish = fish => {
		//take a copy of the existing state
		const fishes = { ...this.state.fishes };
		//add new fish to the copied fishes object
		fishes[`fish${Date.now()}`] = fish;
		//set the state
		//this.setState({fishes:fishes})
		this.setState({ fishes });
	};

	updateFish = (key, updatedFish) => {
		//take a current copy of the fishes state
		const fishes = { ...this.state.fishes };
		//take the eddited fish and update with new values
		fishes[key] = updatedFish;
		//then set the State
		//this.setState({fishes:fishes});
		this.setState({ fishes });
	};

	deleteFish = key => {
		//take a current copy of the fishes state
		const fishes = { ...this.state.fishes };
		//delete the selected fish from fishes and also from firebase
		//delete fishes[key]; - this will not update firebase
		fishes[key] = null; // this way firebase also remove the selected fish
		//update the state
		this.setState({ fishes });
	};

	loadInventory = () => {
		this.setState({ fishes: sampleFishes });
	};

	addToOrder = key => {
		//take  copy of the current state of the order
		const order = { ...this.state.order };
		//add new item to the order or update
		order[key] = order[key] + 1 || 1;
		//update the state
		this.setState({ order });
	};

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Marin SeaFood Market" />
					<ul className="fishes">
						{Object.keys(this.state.fishes).map(key => {
							return (
								<Fish
									key={key}
									index={key}
									fishDetail={this.state.fishes[key]}
									addToOrder={this.addToOrder}
								/>
							);
						})}
					</ul>
				</div>
				<Order order={this.state.order} fishes={this.state.fishes} />
				<Inventory
					fishes={this.state.fishes}
					addFish={this.addFish}
					updateFish={this.updateFish}
					deleteFish={this.deleteFish}
					loadInventory={this.loadInventory}
				/>
			</div>
		);
	}
}
export default App;
