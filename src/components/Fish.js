import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
	render(){
		const { name,image,description,price,status} = this.props.fishDetail;
		return (
			<li className="menu-fish">
				<img src={image} alt={name}/>
				<h3 className="fish-name">{name}
					<span className="price">{formatPrice(price)}</span>
				</h3>
				<p>{description}</p>
				<button>Add To Cart</button>
			</li>
		);
	}
}

export default Fish;