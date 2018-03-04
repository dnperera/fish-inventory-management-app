import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
	handleClick = () =>{
		this.props.addToOrder( this.props.index);
	}
	render(){
		const { name,image,description,price,status} = this.props.fishDetail;
		const isAvailable = status === "available";
		return (
			<li className="menu-fish">
				<img src={image} alt={name}/>
				<h3 className="fish-name">{name}
					<span className="price">{formatPrice(price)}</span>
				</h3>
				<p>{description}</p>
				<button onClick={this.handleClick} disabled={!isAvailable}>{isAvailable ? 'Add To Cart' :'Sold Out'}</button>
			</li>
		);
	}
}

export default Fish;