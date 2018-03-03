import React from "react";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";

class App extends React.Component {
	state = {
		fishes :{},
		order:{}
	}

	addFish = fish => {
		//take a copy of the existing state
		const fishes = { ...this.state.fishes };
		//add new fish to the copied fishes object
		fishes[`fish${Date.now()}`] = fish;
		//set the state
		//this.setState({fishes:fishes})
		this.setState({fishes});
	}
	render(){
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Marin SeaFood Market"/>
				</div>
				<Order/>
				<Inventory addFish={this.addFish}/>
			</div>
		);
	}
}
export default App;