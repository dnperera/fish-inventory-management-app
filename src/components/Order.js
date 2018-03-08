import React from 'react';
import { formatPrice } from '../helpers.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {
	renderOrder = key => {
		const fish = this.props.fishes[key];
		const count = this.props.order[key];
		const isAvailable = fish && fish.status === 'available';
		const transitionOptions = {
			classNames: 'order',
			key,
			timeout: { enter: 300, exit: 300 },
		};
		//Make sure the fish is loaded
		if (!fish) {
			return null;
		}

		if (!isAvailable) {
			return;
			<CSSTransition {...transitionOptions}>
				<li key={key}>Sorry {fish ? fish.name : 'fish'} is no longer available.</li>;
			</CSSTransition>;
		}

		return (
			<CSSTransition {...transitionOptions}>
				<li key={key}>
					<span>
						<TransitionGroup component="span" className="count">
							<CSSTransition
								classNames="count"
								key={count}
								timeout={{ enter: 300, exit: 300 }}
							>
								<span>{count}</span>
							</CSSTransition>
						</TransitionGroup>
						lbs {fish.name}
						{formatPrice(count * fish.price)}
						<button onClick={() => this.props.removeItem(key)}>X</button>
					</span>
				</li>
			</CSSTransition>
		);
	};

	render() {
		const orderIDs = Object.keys(this.props.order);

		//calculate order total
		const total = orderIDs.reduce((total, key) => {
			const fish = this.props.fishes[key];
			const count = this.props.order[key];
			const isAvailable = fish && fish.status === 'available';
			if (isAvailable) {
				return total + count * fish.price;
			}
			return total;
		}, 0);

		return (
			<div className="order-wrap">
				<h2>Order</h2>
				<TransitionGroup component="ul" className="order">
					{orderIDs.map(this.renderOrder)}
				</TransitionGroup>
				<div className="total">
					<strong>{formatPrice(total)}</strong>
				</div>
			</div>
		);
	}
}

export default Order;
