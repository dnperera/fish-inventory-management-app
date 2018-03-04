import React from "react";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import Fish from "./Fish";
import sampleFishes from '../sample-fishes';

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

	loadInventory =() =>{
		
		this.setState({ fishes:sampleFishes })
	}

	addToOrder = ( key ) => {
		//take  copy of the current state of the order
		const order = { ...this.state.order };
		//add new item to the order or update
		order[key] = order[key] + 1 || 1;
		//update the state
		this.setState({order});
	}

	render(){
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Marin SeaFood Market"/>
					<ul className="fishes">
					{ Object.keys(this.state.fishes).map( (key) => {
						return <Fish 
						key={key}
						index = {key} 
						fishDetail={this.state.fishes[key]}
						addToOrder ={ this.addToOrder }
						/>
					})}
					</ul>
				</div>
				<Order order={this.state.order} fishes={ this.state.fishes}/>
				<Inventory addFish={this.addFish} loadInventory={this.loadInventory}/>
			</div>
		);
	}
}
export default App;