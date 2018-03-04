import React from 'react';
import { formatPrice } from '../helpers.js';

class Order extends React.Component {
	renderOrder = ( key ) =>{
		const fish = this.props.fishes[key];
		const count = this.props.order[key];

		const isAvailable = fish && fish.status ==='available';

		//Make sure the fish is loaded 
		if(!fish) {
			return null;
		}

		if(!isAvailable) {
			return <li key={key}>
				Sorry { fish ? fish.name :'fish'} is no longer available.
			</li>
		}

		return (<li key={key}>
					{count} lbs {fish.name}
					{formatPrice(count * fish.price)}
				</li>)
	}

	render(){

		const orderIDs = Object.keys(this.props.order);

		//calculate order total
		const total = orderIDs.reduce((total,key)=>{
			const fish = this.props.fishes[key];
			const count = this.props.order[key];
			const isAvailable = fish && fish.status ==='available';
			if(isAvailable) {
				return  total + count*fish.price;
			}
			return total;
		},0);

		return (
			<div className="order-wrap">
				<h2>Order</h2>
				<ul className="order">
					{ orderIDs.map( this.renderOrder ) }
				</ul>
				<div className="total">
					<strong>{formatPrice(total)}</strong>
				</div>
			</div>
		);
	}
}

export default Order;